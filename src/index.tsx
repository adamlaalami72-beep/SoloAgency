import { Hono } from 'hono'

const app = new Hono()

const PAGE = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SoloAgency — Agencia Digital Premium</title>
<meta name="description" content="Agencia digital independiente especializada en diseño web, SEO, publicidad y redes sociales. Resultados reales para tu negocio.">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
<style>
/* ══════════════════════════════════ TOKENS */
:root{
  --bg:#08080e;--bg2:#0f0f18;--bg3:#14141f;--card:#191924;--card2:#1e1e2c;
  --border:rgba(255,255,255,.06);--border2:rgba(255,255,255,.12);--border3:rgba(255,255,255,.20);
  --lime:#b5ff4d;--lime-dim:rgba(181,255,77,.10);--lime-glow:rgba(181,255,77,.22);
  --red:#ff4d6a;--red-dim:rgba(255,77,106,.10);
  --teal:#4dffce;--teal-dim:rgba(77,255,206,.09);
  --amber:#ffcc44;--amber-dim:rgba(255,204,68,.09);
  --purple:#c084fc;--purple-dim:rgba(192,132,252,.09);
  --text:#eeeef8;--muted:#787895;--muted2:#46465e;
  --f:'Plus Jakarta Sans',system-ui,sans-serif;
  --r:12px;--r2:16px;--r3:22px;
  --wa:#25D366;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:60px}
body{font-family:var(--f);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{text-decoration:none;color:inherit}
img{max-width:100%}

/* ══════════════════════════════════ SCROLLBAR */
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--border3);border-radius:10px}

/* ══════════════════════════════════ TOPBAR */
#topbar{
  position:fixed;top:0;left:0;right:0;height:60px;z-index:1000;
  background:rgba(8,8,14,.88);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
  border-bottom:1px solid var(--border);
  display:flex;align-items:center;padding:0 32px;gap:16px;
  transition:all 0.3s ease;
}
.tb-logo{font-size:17px;font-weight:800;letter-spacing:-.03em;white-space:nowrap;cursor:pointer}
.tb-logo span{color:var(--lime)}
.tb-dot{width:6px;height:6px;border-radius:50%;background:var(--lime);animation:pulse 2s infinite;flex-shrink:0;margin-left:4px}
.tb-badge{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:var(--lime-dim);border:1px solid rgba(181,255,77,.25);color:var(--lime);padding:3px 10px;border-radius:20px;white-space:nowrap}
.tb-nav{margin-left:auto;display:flex;gap:4px;align-items:center;flex-shrink:0}
.tb-nav a{font-size:12px;font-weight:600;color:var(--muted);padding:7px 14px;border-radius:20px;transition:all .2s ease;border:1px solid transparent}
.tb-nav a:hover{color:var(--lime);border-color:rgba(181,255,77,.25);background:rgba(181,255,77,0.05)}
.tb-cta{background:var(--lime) !important;color:#08080e !important;border-color:var(--lime) !important;font-weight:700 !important}
.tb-cta:hover{background:#c8ff6e !important;transform:translateY(-1px);box-shadow:0 4px 15px var(--lime-glow)}
.ham{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:6px;border:1px solid var(--border2);border-radius:8px}
.ham span{display:block;width:20px;height:2px;background:var(--text);border-radius:2px;transition:all .2s}

/* ══════════════════════════════════ MOBILE NAV */
#mob-nav{
  display:none;position:fixed;inset:0;z-index:999;
  background:rgba(8,8,14,.97);backdrop-filter:blur(20px);
  flex-direction:column;align-items:center;justify-content:center;gap:8px;
}
#mob-nav.open{display:flex}
#mob-nav a{font-size:22px;font-weight:700;color:var(--muted);padding:12px 28px;border-radius:12px;transition:all .18s;width:220px;text-align:center}
#mob-nav a:hover{color:var(--lime);background:var(--lime-dim)}
#mob-nav .mob-cta{background:var(--lime);color:#08080e !important;margin-top:12px}
.mob-close{position:absolute;top:22px;right:28px;font-size:24px;color:var(--muted);cursor:pointer;background:none;border:none}

/* ══════════════════════════════════ HERO */
#hero{
  min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;
  padding-top:60px;position:relative;overflow:hidden;
}
.hero-bg{
  position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 60% at 65% 25%, rgba(181,255,77,.06) 0%, transparent 65%),
    radial-gradient(ellipse 50% 70% at 15% 75%, rgba(77,255,206,.04) 0%, transparent 60%),
    radial-gradient(ellipse 30% 40% at 85% 80%, rgba(192,132,252,.04) 0%, transparent 60%),
    repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,.015) 59px,rgba(255,255,255,.015) 60px),
    repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,.010) 59px,rgba(255,255,255,.010) 60px);
}
.hero-watermark{
  position:absolute;right:-40px;top:50%;transform:translateY(-55%);
  font-size:clamp(180px,25vw,340px);font-weight:800;
  color:rgba(255,255,255,.018);line-height:1;user-select:none;pointer-events:none;
  letter-spacing:-.04em;
}
.hero-inner{padding:80px 64px 72px;position:relative;z-index:2;max-width:1200px}
.hero-eyebrow{
  display:inline-flex;align-items:center;gap:9px;
  background:var(--lime-dim);border:1px solid rgba(181,255,77,.25);
  border-radius:20px;padding:6px 16px;
  font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--lime);
  margin-bottom:30px;
}
.hero-edot{width:6px;height:6px;border-radius:50%;background:var(--lime);animation:pulse 2s infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.6)}}
.hero-h1{
  font-size:clamp(48px,7.5vw,100px);
  font-weight:800;line-height:1.0;letter-spacing:-.035em;
  margin-bottom:24px;
}
.hero-h1 em{color:var(--lime);font-style:normal}
.hero-sub{font-size:18px;font-weight:400;color:var(--muted);max-width:540px;line-height:1.7;margin-bottom:48px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.btn{
  display:inline-flex;align-items:center;gap:10px;
  padding:14px 28px;border-radius:12px;font-size:14px;font-weight:700;
  cursor:pointer;transition:all .3s cubic-bezier(0.23, 1, 0.32, 1);border:1px solid transparent;
  text-decoration:none;
}
.btn-primary{background:var(--lime);color:#08080e;border-color:var(--lime)}
.btn-primary:hover{background:#c8ff6e;transform:translateY(-3px);box-shadow:0 10px 25px rgba(181,255,77,0.3)}
.btn-ghost{background:transparent;color:var(--text);border-color:var(--border3)}
.btn-ghost:hover{border-color:var(--lime);color:var(--lime);transform:translateY(-2px);background:rgba(181,255,77,0.03)}

/* STATS STRIP */
.hero-stats{
  display:grid;grid-template-columns:repeat(4,1fr);gap:1px;
  background:var(--border2);border-top:1px solid var(--border2);
  position:relative;z-index:2;
}
.hs-cell{background:var(--bg2);padding:28px 40px;text-align:center;transition:background .3s ease}
.hs-cell:hover{background:var(--bg3)}
.hs-v{font-size:40px;font-weight:800;color:var(--lime);display:block;letter-spacing:-.02em;line-height:1}
.hs-l{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-top:6px;display:block}

/* ══════════════════════════════════ SECTION LAYOUTS */
section{padding:120px 64px}
.sec-inner{max-width:1200px;margin:0 auto}
.sec-eyebrow{
  font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--lime);display:flex;align-items:center;gap:10px;margin-bottom:14px;
}
.sec-eyebrow::before{content:'';display:block;width:24px;height:2px;background:var(--lime)}
.sec-h2{font-size:clamp(32px,4.5vw,52px);font-weight:800;line-height:1.08;letter-spacing:-.03em;margin-bottom:14px}
.sec-h2 em{color:var(--lime);font-style:normal}
.sec-lead{font-size:17px;color:var(--muted);max-width:600px;line-height:1.7;margin-bottom:64px}
.divider{border:none;border-top:1px solid var(--border);margin:0}

/* ══════════════════════════════════ SERVICES */
#services{background:var(--bg)}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.svc-card{
  background:var(--card);border:1px solid var(--border);border-radius:var(--r3);
  padding:32px;position:relative;overflow:hidden;transition:all .3s cubic-bezier(0.23, 1, 0.32, 1);cursor:default;
}
.svc-card::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 80% 10%,var(--glow,rgba(181,255,77,0.1)),transparent 70%);
  opacity:0;transition:opacity .4s ease;pointer-events:none;
}
.svc-card:hover{border-color:var(--border3);transform:translateY(-8px);box-shadow:0 20px 40px rgba(0,0,0,.5)}
.svc-card:hover::after{opacity:1}
.svc-icon{
  width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;
  font-size:24px;margin-bottom:24px;border:1px solid var(--border2);
  background:var(--bg3);color:var(--lime);
}
.svc-num{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted2);margin-bottom:12px}
.svc-title{font-size:22px;font-weight:700;margin-bottom:10px;line-height:1.2}
.svc-desc{font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:24px}
.svc-features{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.svc-features li{font-size:12.5px;color:var(--muted);display:flex;gap:10px;align-items:flex-start;line-height:1.45}
.svc-features li i{color:var(--lime);font-size:10px;margin-top:4px}
.chip{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;padding:4px 12px;border-radius:6px}
.chip-lime{background:var(--lime-dim);color:var(--lime);border:1px solid rgba(181,255,77,.2)}
.chip-teal{background:var(--teal-dim);color:var(--teal);border:1px solid rgba(77,255,206,.2)}
.chip-red{background:var(--red-dim);color:var(--red);border:1px solid rgba(255,77,106,.2)}
.chip-amber{background:var(--amber-dim);color:var(--amber);border:1px solid rgba(255,204,68,.2)}
.chip-purple{background:var(--purple-dim);color:var(--purple);border:1px solid rgba(192,132,252,.2)}
.chip-gray{background:rgba(255,255,255,.05);color:var(--muted);border:1px solid var(--border2)}

/* ══════════════════════════════════ PACKAGES */
#packages{background:var(--bg2)}
.pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.pkg-card{
  background:var(--card);border:1px solid var(--border);border-radius:var(--r3);
  overflow:hidden;position:relative;transition:all .3s cubic-bezier(0.23, 1, 0.32, 1);
}
.pkg-card:hover{transform:translateY(-8px);box-shadow:0 25px 50px rgba(0,0,0,.6)}
.pkg-card.featured{border-color:var(--lime);background:linear-gradient(145deg,var(--card2),var(--card))}
.pkg-badge{position:absolute;top:24px;right:24px;font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border-radius:20px}
.pkg-badge-pop{background:var(--lime);color:#08080e}
.pkg-head{padding:40px 32px 28px}
.pkg-tier{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--lime);margin-bottom:12px}
.pkg-name{font-size:26px;font-weight:800;letter-spacing:-.02em;margin-bottom:8px}
.pkg-tagline{font-size:14px;color:var(--muted);line-height:1.55;margin-bottom:28px}
.pkg-price-area{display:flex;align-items:baseline;gap:6px;margin-bottom:10px}
.pkg-price{font-size:48px;font-weight:800;letter-spacing:-.03em;color:var(--lime)}
.pkg-period{font-size:14px;color:var(--muted)}
.pkg-price-note{font-size:12px;color:var(--muted2);margin-bottom:32px}
.pkg-cta{display:flex;align-items:center;justify-content:center;gap:10px;padding:14px 24px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;border:1px solid var(--border2);color:var(--text);background:var(--bg3);width:100%;text-align:center;text-decoration:none}
.pkg-cta:hover{border-color:var(--lime);color:var(--lime);background:var(--lime-dim)}
.pkg-card.featured .pkg-cta{background:var(--lime);color:#08080e;border-color:var(--lime)}
.pkg-card.featured .pkg-cta:hover{background:#c8ff6e;transform:translateY(-1px)}
.pkg-divider{border:none;border-top:1px solid var(--border);margin:0}
.pkg-body{padding:32px}
.pkg-features{list-style:none;display:flex;flex-direction:column;gap:12px}
.pkg-features li{font-size:14px;color:var(--muted);display:flex;gap:12px;align-items:flex-start;line-height:1.45}
.pkg-features li i{font-size:14px;flex-shrink:0;margin-top:2px}
.fi-ok{color:var(--lime)}
.fi-x{color:var(--muted2)}
.fi-star{color:var(--amber)}

/* ══════════════════════════════════ PROJECTS */
#projects{background:var(--bg)}
.proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.proj-card{
  background:var(--card);border:1px solid var(--border);border-radius:var(--r3);
  padding:0;overflow:hidden;transition:all .3s ease;position:relative;cursor:pointer;
}
.proj-card:hover{border-color:var(--border3);transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.5)}
.proj-visual{
  height:240px;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
  background:var(--bg2);
}
.proj-visual-bg{
  position:absolute;inset:0;
  background:radial-gradient(circle at 50% 50%,var(--glow2,rgba(181,255,77,.08)),transparent 70%);
}
.proj-icon-wrap{
  width:90px;height:90px;border-radius:24px;
  display:flex;align-items:center;justify-content:center;
  font-size:36px;position:relative;z-index:1;border:1px solid var(--border2);background:var(--card);
  color:var(--lime);
}
.proj-meta{display:flex;gap:8px;position:absolute;top:20px;left:20px;z-index:2;flex-wrap:wrap}
.proj-body{padding:32px}
.proj-cat{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted2);margin-bottom:12px}
.proj-title{font-size:20px;font-weight:700;margin-bottom:10px;line-height:1.2}
.proj-desc{font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:24px}
.proj-results{display:flex;gap:12px;flex-wrap:wrap}
.proj-stat{
  background:var(--bg3);border:1px solid var(--border);border-radius:10px;
  padding:10px 16px;text-align:center;
}
.proj-stat-v{font-size:20px;font-weight:800;color:var(--lime);display:block;line-height:1;letter-spacing:-.01em}
.proj-stat-l{font-size:9px;font-weight:600;color:var(--muted2);text-transform:uppercase;letter-spacing:.07em;margin-top:4px}
.proj-more{display:flex;align-items:center;justify-content:center;text-align:center;background:var(--bg2);border:1px dashed var(--border2);border-radius:var(--r3);padding:40px;cursor:pointer;transition:all .3s ease;gap:16px;flex-direction:column;min-height:350px}
.proj-more:hover{border-color:var(--lime);background:var(--lime-dim)}
.proj-more-icon{font-size:40px;color:var(--muted2);transition:all 0.3s ease}
.proj-more-text{font-size:15px;font-weight:600;color:var(--muted);transition:all 0.3s ease}
.proj-more:hover .proj-more-icon,.proj-more:hover .proj-more-text{color:var(--lime);transform:scale(1.05)}

/* ══════════════════════════════════ PROCESS */
#process{background:var(--bg2)}
.process-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
.process-steps::before{content:'';position:absolute;top:32px;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,var(--border2) 20%,var(--lime) 50%,var(--border2) 80%,transparent);z-index:0}
.ps-item{padding:32px 24px;text-align:center;position:relative;z-index:1}
.ps-num{
  width:60px;height:60px;border-radius:50%;border:2px solid var(--border2);
  background:var(--card);display:flex;align-items:center;justify-content:center;
  font-size:18px;font-weight:800;color:var(--lime);margin:0 auto 24px;
  position:relative;z-index:1;transition:all .3s ease;
}
.ps-item:hover .ps-num{border-color:var(--lime);background:var(--lime-dim);box-shadow:0 0 25px var(--lime-glow);transform:scale(1.1)}
.ps-title{font-size:17px;font-weight:700;margin-bottom:10px}
.ps-desc{font-size:13px;color:var(--muted);line-height:1.6}

/* ══════════════════════════════════ WHY ME */
#why{background:var(--bg)}
.why-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}
.why-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:24px;margin-bottom:16px;transition:all .3s ease;cursor:default}
.why-card:hover{border-color:var(--border2);transform:translateX(8px)}
.why-card-head{display:flex;align-items:center;gap:16px;margin-bottom:12px}
.why-card-icon{font-size:22px;width:48px;height:48px;border-radius:12px;background:var(--bg3);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--lime)}
.why-card-title{font-size:16px;font-weight:700}
.why-card-body{font-size:14px;color:var(--muted);line-height:1.65}
.why-quote{background:var(--bg2);border-radius:var(--r3);padding:40px;border:1px solid var(--border);position:relative;overflow:hidden}
.why-quote::before{content:'"';position:absolute;top:-20px;left:20px;font-size:140px;font-weight:900;color:rgba(181,255,77,.04);line-height:1;font-family:serif}
.why-quote blockquote{font-size:20px;font-weight:600;line-height:1.6;margin-bottom:20px;position:relative;z-index:1}
.why-quote blockquote em{color:var(--lime);font-style:normal}
.why-quote cite{font-size:13px;color:var(--muted);font-style:normal;display:block}

.kpi-row{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:24px}
.kpi-box{background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:20px;text-align:center}
.kpi-v{font-size:36px;font-weight:800;color:var(--lime);display:block;letter-spacing:-.02em;line-height:1}
.kpi-l{font-size:10px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-top:6px}

/* ══════════════════════════════════ TESTIMONIALS */
#testimonials{background:var(--bg2)}
.test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.test-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r3);padding:32px;transition:all .3s ease}
.test-card:hover{border-color:var(--border2);transform:translateY(-5px)}
.test-stars{display:flex;gap:4px;margin-bottom:16px}
.test-stars i{color:var(--amber);font-size:13px}
.test-text{font-size:15px;color:var(--muted);line-height:1.7;margin-bottom:24px;font-style:italic}
.test-text em{color:var(--text);font-style:normal;font-weight:600}
.test-author{display:flex;align-items:center;gap:16px}
.test-avatar{
  width:48px;height:48px;border-radius:50%;background:var(--bg3);
  border:2px solid var(--border2);display:flex;align-items:center;justify-content:center;
  font-size:20px;flex-shrink:0;color:var(--lime);
}
.test-name{font-size:14px;font-weight:700}
.test-role{font-size:12px;color:var(--muted)}

/* ══════════════════════════════════ CTA BAND */
#cta{background:linear-gradient(135deg,var(--bg2),var(--bg3));border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:120px 64px;text-align:center;position:relative;overflow:hidden}
#cta::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(181,255,77,.08),transparent 70%);pointer-events:none}
.cta-eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--lime-dim);border:1px solid rgba(181,255,77,.25);border-radius:20px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--lime);margin-bottom:24px}
.cta-h2{font-size:clamp(36px,6vw,68px);font-weight:800;line-height:1.05;letter-spacing:-.03em;margin-bottom:20px}
.cta-h2 em{color:var(--lime);font-style:normal}
.cta-sub{font-size:18px;color:var(--muted);max-width:540px;margin:0 auto 48px;line-height:1.7}
.cta-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.btn-wa{background:var(--wa);color:#fff;border-color:var(--wa);gap:12px}
.btn-wa:hover{background:#1fb856;transform:translateY(-3px);box-shadow:0 10px 25px rgba(37,211,102,0.3)}

/* ════════════════════════ FOOTER */
footer{background:var(--bg2);border-top:1px solid var(--border);padding:64px 32px}
.footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:32px}
.footer-logo{font-size:20px;font-weight:800;letter-spacing:-.03em}
.footer-logo span{color:var(--lime)}
.footer-links{display:flex;gap:8px;flex-wrap:wrap}
.footer-links a{font-size:13px;color:var(--muted);padding:8px 16px;border-radius:8px;transition:all 0.3s ease}
.footer-links a:hover{color:var(--lime);background:rgba(181,255,77,0.05)}
.footer-copy{font-size:11px;color:var(--muted2);text-align:center;margin-top:40px;padding-top:32px;border-top:1px solid var(--border);width:100%}

/* ════════════════════════ WHATSAPP FAB */
#wa-fab{
  position:fixed;bottom:32px;right:32px;z-index:900;
  width:60px;height:60px;border-radius:50%;background:var(--wa);
  display:flex;align-items:center;justify-content:center;
  font-size:28px;color:#fff;cursor:pointer;
  box-shadow:0 6px 20px rgba(37,211,102,.4);
  animation:wa-ring 2.5s infinite;transition:all .3s ease;text-decoration:none;
}
#wa-fab:hover{transform:scale(1.1);box-shadow:0 10px 30px rgba(37,211,102,.6)}
@keyframes wa-ring{0%,100%{box-shadow:0 6px 20px rgba(37,211,102,.4),0 0 0 0 rgba(37,211,102,.4)}70%{box-shadow:0 6px 20px rgba(37,211,102,.4),0 0 0 15px rgba(37,211,102,0)}}
.wa-tooltip{
  position:fixed;bottom:38px;right:104px;z-index:901;
  background:var(--card);border:1px solid var(--border2);border-radius:12px;
  padding:10px 18px;font-size:13px;font-weight:600;color:var(--text);
  white-space:nowrap;opacity:0;transform:translateX(10px);
  transition:all .3s ease;pointer-events:none;
}
#wa-fab:hover + .wa-tooltip{opacity:1;transform:none}

/* ════════════════════════ SCROLL REVEAL */
.reveal{opacity:0;transform:translateY(30px);transition:opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1),transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)}
.reveal.visible{opacity:1;transform:none}
.reveal-delay-1{transition-delay:.15s}
.reveal-delay-2{transition-delay:.3s}
.reveal-delay-3{transition-delay:.45s}

/* ════════════════════════ RESPONSIVE */
@media(max-width:1024px){
  section{padding:80px 40px}
  #hero .hero-inner{padding:80px 40px 64px}
  .svc-grid{grid-template-columns:repeat(2,1fr)}
  .pkg-grid{grid-template-columns:repeat(2,1fr)}
  .test-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:768px){
  #topbar{padding:0 24px}
  .tb-nav{display:none}
  .ham{display:flex}
  section{padding:64px 24px}
  #hero .hero-inner{padding:64px 24px 56px}
  .hero-h1{font-size:46px}
  .svc-grid,.pkg-grid,.proj-grid,.test-grid,.why-grid{grid-template-columns:1fr}
  .hero-stats{grid-template-columns:repeat(2,1fr)}
  .process-steps{grid-template-columns:1fr}
  .process-steps::before{display:none}
  #cta{padding:80px 24px}
}
@media(max-width:480px){
  .hero-h1{font-size:38px}
  .hs-v{font-size:32px}
  .cta-h2{font-size:34px}
}
</style>
</head>
<body>

<!-- ════════════════════════ TOPBAR -->
<header id="topbar">
  <a href="#" class="tb-logo" onclick="scrollToTop()">Solo<span>Agency</span></a>
  <div class="tb-dot"></div>
  <div class="tb-badge">Disponible ahora</div>
  <nav class="tb-nav">
    <a href="#services">Servicios</a>
    <a href="#packages">Planes</a>
    <a href="/projects">Proyectos</a>
    <a href="#why">Sobre mí</a>
    <a href="#cta" class="btn-cta tb-cta btn">Empezar →</a>
  </nav>
  <div class="ham" onclick="toggleMobileNav()" id="ham-btn" aria-label="Menu">
    <span></span><span></span><span></span>
  </div>
</header>

<!-- MOBILE NAV -->
<div id="mob-nav">
  <button class="mob-close" onclick="toggleMobileNav()">✕</button>
  <a href="#services" onclick="toggleMobileNav()">Servicios</a>
  <a href="#packages" onclick="toggleMobileNav()">Planes</a>
  <a href="/projects" onclick="toggleMobileNav()">Proyectos</a>
  <a href="#why" onclick="toggleMobileNav()">Sobre mí</a>
  <a href="#testimonials" onclick="toggleMobileNav()">Testimonios</a>
  <a href="#cta" onclick="toggleMobileNav()" class="mob-cta">Empezar ahora →</a>
</div>

<!-- ════════════════════════ HERO -->
<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-watermark">SA</div>
  <div class="hero-inner">
    <div class="hero-eyebrow">
      <span class="hero-edot"></span>
      <span>Agencia Digital Independiente · Disponible 2025</span>
    </div>
    <h1 class="hero-h1">
      Tu crecimiento<br>
      <em>digital</em><br>
      en manos expertas
    </h1>
    <p class="hero-sub">Diseño Web · SEO · Publicidad · Redes Sociales. Resultados medibles, colaboración directa, sin intermediarios innecesarios.</p>
    <div class="hero-btns">
      <a href="#packages" class="btn btn-primary">Ver planes →</a>
      <a href="/projects" class="btn btn-ghost">Ver mis proyectos</a>
    </div>
  </div>
  <div class="hero-stats">
    <div class="hs-cell">
      <span class="hs-v">50+</span>
      <span class="hs-l">Proyectos entregados</span>
    </div>
    <div class="hs-cell">
      <span class="hs-v">98%</span>
      <span class="hs-l">Clientes satisfechos</span>
    </div>
    <div class="hs-cell">
      <span class="hs-v">3×</span>
      <span class="hs-l">ROI promedio</span>
    </div>
    <div class="hs-cell">
      <span class="hs-v">72h</span>
      <span class="hs-l">Respuesta máxima</span>
    </div>
  </div>
</section>

<hr class="divider">

<!-- ════════════════════════ SERVICES -->
<section id="services">
  <div class="sec-inner">
    <div class="reveal">
      <div class="sec-eyebrow">Lo que ofrezco</div>
      <h2 class="sec-h2">Servicios digitales<br>que <em>generan resultados</em></h2>
      <p class="sec-lead">Cada servicio está diseñado para tener un impacto directo en tu visibilidad, tus leads y tu facturación.</p>
    </div>
    <div class="svc-grid">
      <!-- Diseño Web -->
      <div class="svc-card reveal reveal-delay-1" style="--glow:rgba(181,255,77,.15)">
        <div class="svc-icon"><i class="fas fa-globe"></i></div>
        <div class="svc-num">01</div>
        <div class="svc-title">Diseño de Sitios Web</div>
        <div class="svc-desc">Sitios modernos, rápidos y optimizados que convierten visitantes en clientes — no solo una cara bonita.</div>
        <ul class="svc-features">
          <li><i class="fas fa-arrow-right"></i> Sitios corporativos hasta 10 páginas</li>
          <li><i class="fas fa-arrow-right"></i> Landing pages de alta conversión</li>
          <li><i class="fas fa-arrow-right"></i> E-commerce WooCommerce / Shopify</li>
          <li><i class="fas fa-arrow-right"></i> SEO on-page integrado</li>
          <li><i class="fas fa-arrow-right"></i> Mobile-first & Core Web Vitals</li>
        </ul>
        <span class="chip chip-red">Alta demanda</span>
      </div>

      <!-- SEO -->
      <div class="svc-card reveal reveal-delay-2" style="--glow:rgba(181,255,77,.15)">
        <div class="svc-icon"><i class="fas fa-search"></i></div>
        <div class="svc-num">02</div>
        <div class="svc-title">SEO Local & Contenido</div>
        <div class="svc-desc">Posiciónate en los primeros lugares de Google en tu zona geográfica y sector. Tráfico cualificado garantizado.</div>
        <ul class="svc-features">
          <li><i class="fas fa-arrow-right"></i> Auditoría SEO completa</li>
          <li><i class="fas fa-arrow-right"></i> Optimización Google Business Profile</li>
          <li><i class="fas fa-arrow-right"></i> 2–4 artículos de blog / mes</li>
          <li><i class="fas fa-arrow-right"></i> Link building cualitativo</li>
          <li><i class="fas fa-arrow-right"></i> Reporte mensual de posiciones</li>
        </ul>
        <span class="chip chip-lime">El más rentable</span>
      </div>

      <!-- Publicidad -->
      <div class="svc-card reveal reveal-delay-3" style="--glow:rgba(77,255,206,.12)">
        <div class="svc-icon"><i class="fas fa-bullhorn"></i></div>
        <div class="svc-num">03</div>
        <div class="svc-title">Google & Meta Ads</div>
        <div class="svc-desc">Campañas publicitarias segmentadas que maximizan tu ROAS. Resultados medibles desde las primeras semanas.</div>
        <ul class="svc-features">
          <li><i class="fas fa-arrow-right"></i> Estrategia & estructura de campañas</li>
          <li><i class="fas fa-arrow-right"></i> Copywriting & creatividades visuales</li>
          <li><i class="fas fa-arrow-right"></i> Seguimiento de conversiones GA4</li>
          <li><i class="fas fa-arrow-right"></i> Optimización semanal</li>
          <li><i class="fas fa-arrow-right"></i> Reporte de ROAS mensual</li>
        </ul>
        <span class="chip chip-teal">Resultados rápidos</span>
      </div>

      <!-- Social Media -->
      <div class="svc-card reveal reveal-delay-1" style="--glow:rgba(192,132,252,.12)">
        <div class="svc-icon"><i class="fas fa-mobile-alt"></i></div>
        <div class="svc-num">04</div>
        <div class="svc-title">Social Media Management</div>
        <div class="svc-desc">Una presencia coherente y atractiva en redes sociales que construye tu marca y atrae nuevos clientes.</div>
        <ul class="svc-features">
          <li><i class="fas fa-arrow-right"></i> Estrategia editorial personalizada</li>
          <li><i class="fas fa-arrow-right"></i> 12–16 publicaciones / mes</li>
          <li><i class="fas fa-arrow-right"></i> Diseño visual (Canva Pro / Figma)</li>
          <li><i class="fas fa-arrow-right"></i> Gestión de comunidad</li>
          <li><i class="fas fa-arrow-right"></i> Reporte de métricas mensual</li>
        </ul>
        <span class="chip chip-purple">Crecimiento orgánico</span>
      </div>

      <!-- Email Marketing -->
      <div class="svc-card reveal reveal-delay-2" style="--glow:rgba(255,204,68,.1)">
        <div class="svc-icon"><i class="fas fa-envelope"></i></div>
        <div class="svc-num">05</div>
        <div class="svc-title">Email Marketing</div>
        <div class="svc-desc">Automatizaciones inteligentes y newsletters que nutren a tus prospectos y fidelizan a tus clientes.</div>
        <ul class="svc-features">
          <li><i class="fas fa-arrow-right"></i> Secuencias de automatización</li>
          <li><i class="fas fa-arrow-right"></i> Newsletters mensuales</li>
          <li><i class="fas fa-arrow-right"></i> Segmentación de listas</li>
          <li><i class="fas fa-arrow-right"></i> A/B testing de asuntos</li>
          <li><i class="fas fa-arrow-right"></i> Mailchimp / Klaviyo / ActiveCampaign</li>
        </ul>
        <span class="chip chip-amber">Ideal para fidelizar</span>
      </div>

      <!-- Mantenimiento -->
      <div class="svc-card reveal reveal-delay-3" style="--glow:rgba(181,255,77,.08)">
        <div class="svc-icon"><i class="fas fa-tools"></i></div>
        <div class="svc-num">06</div>
        <div class="svc-title">Mantenimiento & Consultoría</div>
        <div class="svc-desc">Mantén tu sitio web seguro y actualizado mientras recibes asesoría experta para tus decisiones digitales.</div>
        <ul class="svc-features">
          <li><i class="fas fa-arrow-right"></i> Actualizaciones & respaldos</li>
          <li><i class="fas fa-arrow-right"></i> Seguridad & monitoreo 24/7</li>
          <li><i class="fas fa-arrow-right"></i> Auditoría de presencia digital</li>
          <li><i class="fas fa-arrow-right"></i> Sesiones estratégicas mensuales</li>
          <li><i class="fas fa-arrow-right"></i> Soporte prioritario</li>
        </ul>
        <span class="chip chip-gray">Tranquilidad total</span>
      </div>
    </div>
  </div>
</section>

<hr class="divider">

<!-- ════════════════════════ PACKAGES -->
<section id="packages">
  <div class="sec-inner">
    <div class="reveal">
      <div class="sec-eyebrow">Precios transparentes</div>
      <h2 class="sec-h2">Elige tu<br><em>plan</em> de crecimiento</h2>
      <p class="sec-lead">Tres ofertas claras, sin sorpresas. Todos los planes incluyen reportes mensuales y contacto directo por WhatsApp.</p>
    </div>
    <div class="pkg-grid">

      <!-- STARTER -->
      <div class="pkg-card reveal reveal-delay-1">
        <div class="pkg-head">
          <div class="pkg-tier">Starter</div>
          <div class="pkg-name">Lanzamiento</div>
          <div class="pkg-tagline">Ideal para iniciar tu presencia digital con bases sólidas.</div>
          <div class="pkg-price-area">
            <span class="pkg-price">€590</span>
            <span class="pkg-period">/mes</span>
          </div>
          <div class="pkg-price-note">+ Setup inicial desde €990 (pago único)</div>
          <a href="https://wa.me/+33600000000?text=Hola,%20me%20interesa%20el%20plan%20Lanzamiento" target="_blank" class="pkg-cta">Empezar por WhatsApp</a>
        </div>
        <hr class="pkg-divider">
        <div class="pkg-body">
          <ul class="pkg-features">
            <li><i class="fas fa-check fi-ok"></i> Web corporativa hasta 5 páginas</li>
            <li><i class="fas fa-check fi-ok"></i> SEO on-page básico</li>
            <li><i class="fas fa-check fi-ok"></i> Perfil de Google Business optimizado</li>
            <li><i class="fas fa-check fi-ok"></i> 8 posts en redes sociales / mes</li>
            <li><i class="fas fa-check fi-ok"></i> 1 reporte mensual</li>
            <li><i class="fas fa-check fi-ok"></i> Soporte por email (48h)</li>
            <li><i class="fas fa-times fi-x"></i> Publicidad pagada</li>
            <li><i class="fas fa-times fi-x"></i> Blog & contenido SEO avanzado</li>
            <li><i class="fas fa-times fi-x"></i> Email marketing</li>
          </ul>
        </div>
      </div>

      <!-- GROWTH — FEATURED -->
      <div class="pkg-card featured reveal">
        <div class="pkg-badge pkg-badge-pop">⭐ Popular</div>
        <div class="pkg-head">
          <div class="pkg-tier">Growth</div>
          <div class="pkg-name">Crecimiento</div>
          <div class="pkg-tagline">La mejor relación rendimiento / precio para escalar tu negocio.</div>
          <div class="pkg-price-area">
            <span class="pkg-price">€1,290</span>
            <span class="pkg-period">/mes</span>
          </div>
          <div class="pkg-price-note">Todo incluido · Compromiso mín. 3 meses</div>
          <a href="https://wa.me/+33600000000?text=Hola,%20me%20interesa%20el%20plan%20Crecimiento" target="_blank" class="pkg-cta">Empezar ahora →</a>
        </div>
        <hr class="pkg-divider">
        <div class="pkg-body">
          <ul class="pkg-features">
            <li><i class="fas fa-check fi-ok"></i> Web corporativa hasta 10 páginas</li>
            <li><i class="fas fa-check fi-ok"></i> SEO local completo + 2 artículos/mes</li>
            <li><i class="fas fa-check fi-ok"></i> Google & Meta Ads (presupuesto ≤€1k)</li>
            <li><i class="fas fa-check fi-ok"></i> 16 posts en redes sociales / mes</li>
            <li><i class="fas fa-check fi-ok"></i> 1 newsletter mensual</li>
            <li><i class="fas fa-check fi-ok"></i> Reporte completo + reunión mensual</li>
            <li><i class="fas fa-check fi-ok"></i> Soporte WhatsApp prioritario</li>
            <li><i class="fas fa-star fi-star"></i> Optimización CRO de landing page</li>
            <li><i class="fas fa-star fi-star"></i> Seguimiento semanal de métricas</li>
          </ul>
        </div>
      </div>

      <!-- PREMIUM -->
      <div class="pkg-card reveal reveal-delay-2">
        <div class="pkg-head">
          <div class="pkg-tier">Premium</div>
          <div class="pkg-name">Socio Digital</div>
          <div class="pkg-tagline">Un equipo digital completo para empresas que quieren dominar su mercado.</div>
          <div class="pkg-price-area">
            <span class="pkg-price">A medida</span>
          </div>
          <div class="pkg-price-note">Proyecto personalizado · Presupuesto en 24h</div>
          <a href="https://wa.me/+33600000000?text=Hola,%20quiero%20un%20presupuesto%20para%20el%20plan%20Socio%20Digital" target="_blank" class="pkg-cta">Solicitar presupuesto →</a>
        </div>
        <hr class="pkg-divider">
        <div class="pkg-body">
          <ul class="pkg-features">
            <li><i class="fas fa-check fi-ok"></i> Todo lo del plan Crecimiento</li>
            <li><i class="fas fa-check fi-ok"></i> E-commerce o app web a medida</li>
            <li><i class="fas fa-check fi-ok"></i> Ads sin límite de presupuesto gestionado</li>
            <li><i class="fas fa-check fi-ok"></i> 4+ artículos SEO long-form / mes</li>
            <li><i class="fas fa-check fi-ok"></i> Email automation avanzada</li>
            <li><i class="fas fa-check fi-ok"></i> Coordinación de contenido audiovisual</li>
            <li><i class="fas fa-check fi-ok"></i> Estrategia digital trimestral</li>
            <li><i class="fas fa-star fi-star"></i> Acceso directo 7j/7 WhatsApp</li>
            <li><i class="fas fa-star fi-star"></i> Dashboard de métricas en tiempo real</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>

<hr class="divider">

<!-- ════════════════════════ PROJECTS -->
<section id="projects">
  <div class="sec-inner">
    <div class="reveal">
      <div class="sec-eyebrow">Casos de éxito</div>
      <h2 class="sec-h2">Resultados<br><em>concretos y medibles</em></h2>
      <p class="sec-lead">Algunos proyectos que ilustran el impacto real de mi trabajo. Cada cifra es verificable.</p>
    </div>
    <div class="proj-grid">

      <!-- Projet 1: motone/studio -->
      <div class="proj-card reveal reveal-delay-1">
        <div class="pv2-preview" style="height:240px">
          <img src="/motone.png" alt="motone/studio" class="pv2-img">
          <div class="pv2-img-overlay"></div>
          <div class="proj-meta">
            <span class="chip chip-lime">Strategy</span>
            <span class="chip chip-teal">eCommerce</span>
          </div>
        </div>
        <div class="proj-body">
          <div class="proj-cat">Consultoría · International</div>
          <div class="proj-title">motone/studio — eCommerce Strategy</div>
          <div class="proj-desc">Diseño estratégico para marcas globales de alto nivel. Optimizamos la conversión mediante una experiencia de usuario minimalista y sofisticada.</div>
          <div class="proj-results" style="margin-bottom:24px">
            <div class="proj-stat"><span class="proj-stat-v">+45%</span><span class="proj-stat-l">Conversión</span></div>
            <div class="proj-stat"><span class="proj-stat-v">2.5×</span><span class="proj-stat-l">Revenue</span></div>
          </div>
          <div style="display:flex;gap:10px">
            <a href="https://motone.studio/" target="_blank" class="btn btn-ghost" style="padding:10px 16px;font-size:12px;flex:1;justify-content:center">Visitar sitio <i class="fas fa-external-link-alt" style="font-size:10px;margin-left:5px"></i></a>
            <a href="/projects" class="btn btn-primary" style="padding:10px 16px;font-size:12px;flex:1;justify-content:center">Ver caso →</a>
          </div>
        </div>
      </div>

      <!-- Projet 2: X2Y Creative -->
      <div class="proj-card reveal reveal-delay-2">
        <div class="pv2-preview" style="height:240px">
          <img src="/x2y.png" alt="X2Y Creative" class="pv2-img">
          <div class="pv2-img-overlay"></div>
          <div class="proj-meta">
            <span class="chip chip-amber">Branding</span>
            <span class="chip chip-lime">Experience</span>
          </div>
        </div>
        <div class="proj-body">
          <div class="proj-cat">Estudio Creativo · Londres</div>
          <div class="proj-title">X2Y Creative — Branding & Digital</div>
          <div class="proj-desc">Experiencias digitales vanguardistas en el corazón de Londres. Fusión de arte y tecnología para marcas que buscan romper moldes.</div>
          <div class="proj-results" style="margin-bottom:24px">
            <div class="proj-stat"><span class="proj-stat-v">Gold</span><span class="proj-stat-l">Award</span></div>
            <div class="proj-stat"><span class="proj-stat-v">99</span><span class="proj-stat-l">Performance</span></div>
          </div>
          <div style="display:flex;gap:10px">
            <a href="https://x2ycreative.com/" target="_blank" class="btn btn-ghost" style="padding:10px 16px;font-size:12px;flex:1;justify-content:center">Visitar sitio <i class="fas fa-external-link-alt" style="font-size:10px;margin-left:5px"></i></a>
            <a href="/projects" class="btn btn-primary" style="padding:10px 16px;font-size:12px;flex:1;justify-content:center">Ver caso →</a>
          </div>
        </div>
      </div>

      <!-- Projet 3: Menawer Journey -->
      <div class="proj-card reveal reveal-delay-3">
        <div class="pv2-preview" style="height:240px">
          <img src="/menawer.png" alt="Menawer Journey" class="pv2-img">
          <div class="pv2-img-overlay"></div>
          <div class="proj-meta">
            <span class="chip chip-purple">Motion</span>
            <span class="chip chip-teal">Interactive</span>
          </div>
        </div>
        <div class="proj-body">
          <div class="proj-cat">Storytelling · Global</div>
          <div class="proj-title">Menawer Journey — Storytelling</div>
          <div class="proj-desc">Narrativa digital inmersiva con animaciones cinemáticas. Una experiencia visual única que redefine el storytelling web moderno.</div>
          <div class="proj-results" style="margin-bottom:24px">
            <div class="proj-stat"><span class="proj-stat-v">#1</span><span class="proj-stat-l">SOTD</span></div>
            <div class="proj-stat"><span class="pv2-stat-v">8m</span><span class="proj-stat-l">Sesión Media</span></div>
          </div>
          <div style="display:flex;gap:10px">
            <a href="https://menawerjourney.com/" target="_blank" class="btn btn-ghost" style="padding:10px 16px;font-size:12px;flex:1;justify-content:center">Visitar sitio <i class="fas fa-external-link-alt" style="font-size:10px;margin-left:5px"></i></a>
            <a href="/projects" class="btn btn-primary" style="padding:10px 16px;font-size:12px;flex:1;justify-content:center">Ver caso →</a>
          </div>
        </div>
      </div>

      <!-- Projet 4 CTA -->
      <a href="/projects" class="proj-more reveal reveal-delay-2">
        <div class="proj-more-icon"><i class="fas fa-th-large"></i></div>
        <div class="proj-more-text">Ver todos los<br>proyectos premium</div>
        <span class="chip chip-lime" style="margin-top:12px">Portfolio completo →</span>
      </a>

    </div>
  </div>
</section>

<hr class="divider">

<!-- ════════════════════════ PROCESS -->
<section id="process">
  <div class="sec-inner">
    <div class="reveal" style="text-align:center;margin-bottom:64px">
      <div class="sec-eyebrow" style="justify-content:center">Cómo trabajamos</div>
      <h2 class="sec-h2">Un proceso simple<br>y <em>transparente</em></h2>
    </div>
    <div class="process-steps reveal">
      <div class="ps-item">
        <div class="ps-num">1</div>
        <div class="ps-title">Primer Contacto</div>
        <div class="ps-desc">Hablamos sobre tus objetivos, mercado y expectativas. Gratis y sin compromiso (30 min).</div>
      </div>
      <div class="ps-item">
        <div class="ps-num">2</div>
        <div class="ps-title">Propuesta a Medida</div>
        <div class="ps-desc">Te envío una estrategia personalizada con un presupuesto claro en 24–48 horas.</div>
      </div>
      <div class="ps-item">
        <div class="ps-num">3</div>
        <div class="ps-title">Ejecución & Reportes</div>
        <div class="ps-desc">Empezamos a trabajar y ves los resultados. Reporte mensual + reunión de seguimiento.</div>
      </div>
      <div class="ps-item">
        <div class="ps-num">4</div>
        <div class="ps-title">Escalado & Optimización</div>
        <div class="ps-desc">Analizamos los datos juntos e impulsamos lo que funciona para llegar más lejos.</div>
      </div>
    </div>
  </div>
</section>

<hr class="divider">

<!-- ════════════════════════ WHY ME -->
<section id="why">
  <div class="sec-inner">
    <div class="why-grid">
      <div class="why-left reveal">
        <div class="sec-eyebrow">Por qué elegirme</div>
        <h2 class="sec-h2" style="margin-bottom:36px">Lo que me<br><em>diferencia</em></h2>
        
        <div class="why-card">
          <div class="why-card-head">
            <div class="why-card-icon"><i class="fas fa-crosshairs"></i></div>
            <div class="why-card-title">Hablas directo con el experto</div>
          </div>
          <div class="why-card-body">Sin ejecutivos de cuentas ni juniors. Gestiono tu proyecto personalmente de principio a fin para garantizar la máxima calidad.</div>
        </div>
        
        <div class="why-card">
          <div class="why-card-head">
            <div class="why-card-icon"><i class="fas fa-chart-line"></i></div>
            <div class="why-card-title">Orientado a resultados reales</div>
          </div>
          <div class="why-card-body">No vendo horas, vendo crecimiento. Mi interés está alineado con el tuyo — tu éxito es mi mejor carta de presentación.</div>
        </div>
        
        <div class="why-card">
          <div class="why-card-head">
            <div class="why-card-icon"><i class="fas fa-bolt"></i></div>
            <div class="why-card-title">Rapidez & respuesta garantizada</div>
          </div>
          <div class="why-card-body">Respuesta en menos de 24-48h. Sin tickets complicados ni esperas eternas. Un mensaje de WhatsApp y estamos conectados.</div>
        </div>
        
        <div class="why-card">
          <div class="why-card-head">
            <div class="why-card-icon"><i class="fas fa-microscope"></i></div>
            <div class="why-card-title">Basado en datos & transparencia</div>
          </div>
          <div class="why-card-body">Cada decisión se basa en datos reales. Sabrás exactamente qué funciona, cuánto se gasta y por qué lo hacemos.</div>
        </div>
      </div>
      
      <div class="why-right reveal reveal-delay-2">
        <div class="why-quote">
          <blockquote>
            \"Trabajar con una <em>solo agency</em> es tener la experiencia de una gran agencia con la <em>rapidez y pasión</em> de un socio comprometido.\"
          </blockquote>
          <cite>— Mi filosofía de trabajo diaria</cite>
        </div>
        
        <div class="kpi-row">
          <div class="kpi-box">
            <span class="kpi-v">50+</span>
            <span class="kpi-l">Proyectos</span>
          </div>
          <div class="kpi-box">
            <span class="kpi-v">5 años</span>
            <span class="kpi-l">Experiencia</span>
          </div>
          <div class="kpi-box">
            <span class="kpi-v">12</span>
            <span class="kpi-l">Sectores</span>
          </div>
          <div class="kpi-box">
            <span class="kpi-v">0</span>
            <span class="kpi-l">Compromisos</span>
          </div>
        </div>
        
        <!-- Tech Stack -->
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--r2);padding:24px;margin-top:20px">
          <div style="font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted2);margin-bottom:16px">Herramientas & Tech</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            <span class="chip chip-gray">WordPress</span>
            <span class="chip chip-gray">Shopify</span>
            <span class="chip chip-gray">Figma</span>
            <span class="chip chip-gray">Google Ads</span>
            <span class="chip chip-gray">Meta Ads</span>
            <span class="chip chip-gray">GA4</span>
            <span class="chip chip-gray">Semrush</span>
            <span class="chip chip-gray">Mailchimp</span>
            <span class="chip chip-gray">Klaviyo</span>
            <span class="chip chip-gray">Notion</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr class="divider">

<!-- ════════════════════════ TESTIMONIALS -->
<section id="testimonials">
  <div class="sec-inner">
    <div class="reveal" style="text-align:center;margin-bottom:64px">
      <div class="sec-eyebrow" style="justify-content:center">Clientes satisfechos</div>
      <h2 class="sec-h2" style="margin-bottom:12px">Lo que dicen<br><em>mis clientes</em></h2>
    </div>
    <div class="test-grid">
      
      <div class="test-card reveal reveal-delay-1">
        <div class="test-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="test-text">\"En 4 meses, mi negocio pasó de <em>la página 4 al primer lugar</em> en Google. Las reservas se triplicaron. Recomiendo totalmente.\"</p>
        <div class="test-author">
          <div class="test-avatar"><i class="fas fa-user"></i></div>
          <div>
            <div class="test-name">Marco L.</div>
            <div class="test-role">Dueño de Restaurante · Madrid</div>
          </div>
        </div>
      </div>
      
      <div class="test-card reveal">
        <div class="test-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="test-text">\"El ROAS de 4.8× en Meta Ads fue <em>mucho más de lo esperado</em>. La atención por WhatsApp es rápida y profesional. Excelente trabajo.\"</p>
        <div class="test-author">
          <div class="test-avatar"><i class="fas fa-user-tie"></i></div>
          <div>
            <div class="test-name">Sophie M.</div>
            <div class="test-role">Fundadora · Boutique de Moda</div>
          </div>
        </div>
      </div>
      
      <div class="test-card reveal reveal-delay-2">
        <div class="test-stars">
          <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
        </div>
        <p class="test-text">\"580 leads en 3 meses. <em>Mi agenda está llena por los próximos 2 meses.</em> No creía que fuera posible lograr estos números tan rápido.\"</p>
        <div class="test-author">
          <div class="test-avatar"><i class="fas fa-tools"></i></div>
          <div>
            <div class="test-name">Karim B.</div>
            <div class="test-role">Servicios Técnicos · Valencia</div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

<hr class="divider">

<!-- ════════════════════════ CTA BAND -->
<section id="cta">
  <div style="position:relative;z-index:1">
    <div class="cta-eyebrow">
      <span class="hero-edot"></span>
      ¿Listo para empezar?
    </div>
    <h2 class="cta-h2">Hablemos de tu<br><em>próximo proyecto</em></h2>
    <p class="cta-sub">Primer contacto gratuito y sin compromiso. Respondemos en menos de 24h por WhatsApp.</p>
    <div class="cta-btns">
      <a href="https://wa.me/+33600000000?text=Hola,%20quiero%20hablar%20de%20mi%20proyecto" target="_blank" class="btn btn-wa btn">
        <i class="fab fa-whatsapp"></i>
        Empezar en WhatsApp
      </a>
      <a href="#packages" class="btn btn-ghost">Ver planes →</a>
    </div>
  </div>
</section>

<!-- ════════════════════════ FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-logo">Solo<span>Agency</span></div>
    <nav class="footer-links">
      <a href="#services">Servicios</a>
      <a href="#packages">Planes</a>
      <a href="/projects">Proyectos</a>
      <a href="#why">Sobre mí</a>
      <a href="#testimonials">Testimonios</a>
      <a href="https://wa.me/+33600000000" target="_blank">WhatsApp</a>
    </nav>
    <div class="footer-copy">
      © 2025 SoloAgency · Todos los derechos reservados · Hecho con ❤️ y datos
    </div>
  </div>
</footer>

<!-- ════════════════════════ WHATSAPP FAB -->
<a id="wa-fab" href="https://wa.me/+33600000000?text=Hola,%20quiero%20saber%20más%20sobre%20tus%20servicios" target="_blank" aria-label="Contacto WhatsApp">
  <i class="fab fa-whatsapp"></i>
</a>
<div class="wa-tooltip">💬 Escríbeme por WhatsApp</div>

<script>
// ─── MOBILE NAV
function toggleMobileNav(){
  const nav = document.getElementById('mob-nav');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

function scrollToTop(){
  window.scrollTo({top:0,behavior:'smooth'});
}

// ─── TOPBAR SCROLL
const topbar = document.getElementById('topbar');
window.addEventListener('scroll',()=>{
  if(window.scrollY > 60){
    topbar.style.background = 'rgba(8,8,14,.95)';
    topbar.style.height = '70px';
  } else {
    topbar.style.background = 'rgba(8,8,14,.88)';
    topbar.style.height = '60px';
  }
});

// ─── SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
reveals.forEach(el=>observer.observe(el));

// ─── ACTIVE NAV LINK
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.tb-nav a[href^=\"#\"]');
const observerNav = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id = e.target.getAttribute('id');
      navLinks.forEach(a=>{
        a.style.color = '';
        if(a.getAttribute('href') === '#'+id && !a.classList.contains('tb-cta')){
          a.style.color = 'var(--lime)';
        }
      });
    }
  });
},{threshold:0.4});
sections.forEach(s=>observerNav.observe(s));

// ─── SMOOTH ANCHOR SCROLL
document.querySelectorAll('a[href^=\"#\"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// ─── STATS COUNTER ANIMATION
function animateValue(el, end, suffix='', duration=2000){
  let startTime = null;
  const start = 0;
  const isDecimal = String(end).includes('.');
  function update(ts){
    if(!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const val = isDecimal ? (start + (end - start) * ease).toFixed(1) : Math.floor(start + (end - start) * ease);
    el.textContent = val + suffix;
    if(progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const statCells = document.querySelectorAll('.hs-cell .hs-v');
      const values = [{v:50,s:'+'},{v:98,s:'%'},{v:3,s:'×'},{v:72,s:'h'}];
      statCells.forEach((cell,i)=>{
        const {v,s} = values[i] || {};
        if(v !== undefined) animateValue(cell, v, s);
      });
      statsObserver.disconnect();
    }
  });
},{threshold:0.5});
const heroStats = document.querySelector('.hero-stats');
if(heroStats) statsObserver.observe(heroStats);
</script>
</body>
</html>
`

const PROJECTS_PAGE = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Proyectos · Portfolio — SoloAgency</title>
<meta name="description" content="Portfolio de sitios web premium, e-commerce y estrategias digitales con resultados reales y medibles.">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
<style>
:root{
  --bg:#08080e;--bg2:#0f0f18;--bg3:#14141f;--card:#191924;--card2:#1e1e2c;
  --border:rgba(255,255,255,.06);--border2:rgba(255,255,255,.12);--border3:rgba(255,255,255,.20);
  --lime:#b5ff4d;--lime-dim:rgba(181,255,77,.10);--lime-glow:rgba(181,255,77,.22);
  --red:#ff4d6a;--red-dim:rgba(255,77,106,.10);
  --teal:#4dffce;--teal-dim:rgba(77,255,206,.09);
  --amber:#ffcc44;--amber-dim:rgba(255,204,68,.09);
  --purple:#c084fc;--purple-dim:rgba(192,132,252,.09);
  --text:#eeeef8;--muted:#787895;--muted2:#46465e;
  --f:'Plus Jakarta Sans',system-ui,sans-serif;
  --r:12px;--r2:16px;--r3:22px;--wa:#25D366;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:60px}
body{font-family:var(--f);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{text-decoration:none;color:inherit}
img{max-width:100%}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--border3);border-radius:10px}

/* TOPBAR */
#topbar{position:fixed;top:0;left:0;right:0;height:60px;z-index:1000;background:rgba(8,8,14,.88);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 32px;gap:16px;transition:all 0.3s ease}
.tb-logo{font-size:17px;font-weight:800;letter-spacing:-.03em;white-space:nowrap;cursor:pointer}
.tb-logo span{color:var(--lime)}
.tb-dot{width:6px;height:6px;border-radius:50%;background:var(--lime);animation:pulse 2s infinite;flex-shrink:0;margin-left:4px}
.tb-badge{font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:var(--lime-dim);border:1px solid rgba(181,255,77,.25);color:var(--lime);padding:3px 10px;border-radius:20px;white-space:nowrap}
.tb-nav{margin-left:auto;display:flex;gap:4px;align-items:center;flex-shrink:0}
.tb-nav a{font-size:12px;font-weight:600;color:var(--muted);padding:7px 14px;border-radius:20px;transition:all .2s ease;border:1px solid transparent}
.tb-nav a:hover{color:var(--lime);border-color:rgba(181,255,77,.25);background:rgba(181,255,77,0.05)}
.tb-nav a.active{color:var(--lime)}
.tb-cta{background:var(--lime) !important;color:#08080e !important;border-color:var(--lime) !important;font-weight:700 !important}
.tb-cta:hover{background:#c8ff6e !important;transform:translateY(-1px);box-shadow:0 4px 15px var(--lime-glow)}
.ham{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:6px;border:1px solid var(--border2);border-radius:8px}
.ham span{display:block;width:20px;height:2px;background:var(--text);border-radius:2px;transition:all .2s}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.6)}}

/* MOBILE NAV */
#mob-nav{display:none;position:fixed;inset:0;z-index:999;background:rgba(8,8,14,.97);backdrop-filter:blur(20px);flex-direction:column;align-items:center;justify-content:center;gap:8px}
#mob-nav.open{display:flex}
#mob-nav a{font-size:22px;font-weight:700;color:var(--muted);padding:12px 28px;border-radius:12px;transition:all .18s;width:220px;text-align:center}
#mob-nav a:hover{color:var(--lime);background:var(--lime-dim)}
#mob-nav .mob-cta{background:var(--lime);color:#08080e !important;margin-top:12px}
.mob-close{position:absolute;top:22px;right:28px;font-size:24px;color:var(--muted);cursor:pointer;background:none;border:none}

/* PAGE HERO */
#page-hero{padding:140px 64px 80px;position:relative;overflow:hidden;background:var(--bg)}
#page-hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 80% at 75% 50%,rgba(181,255,77,.05),transparent 65%),radial-gradient(ellipse 40% 50% at 10% 80%,rgba(77,255,206,.04),transparent 60%)}
.ph-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1}
.ph-eyebrow{display:inline-flex;align-items:center;gap:9px;background:var(--lime-dim);border:1px solid rgba(181,255,77,.25);border-radius:20px;padding:6px 16px;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--lime);margin-bottom:24px}
.ph-dot{width:6px;height:6px;border-radius:50%;background:var(--lime);animation:pulse 2s infinite}
.ph-h1{font-size:clamp(40px,6vw,76px);font-weight:800;line-height:1.05;letter-spacing:-.035em;margin-bottom:18px}
.ph-h1 em{color:var(--lime);font-style:normal}
.ph-sub{font-size:17px;color:var(--muted);max-width:560px;line-height:1.7;margin-bottom:48px}
.ph-chips{display:flex;gap:10px;flex-wrap:wrap}
.ph-chip{display:inline-flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border2);border-radius:10px;padding:10px 18px}
.ph-chip-v{font-size:20px;font-weight:800;color:var(--lime)}
.ph-chip-l{font-size:11px;color:var(--muted)}

/* SECTION */
#proj-section{padding:0 64px 120px;background:var(--bg)}
.proj-section-inner{max-width:1200px;margin:0 auto}

/* FILTER */
.filter-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:52px;padding-top:16px}
.filter-btn{font-size:12px;font-weight:700;padding:8px 20px;border-radius:20px;border:1px solid var(--border2);background:transparent;color:var(--muted);cursor:pointer;transition:all .2s ease;font-family:var(--f)}
.filter-btn:hover{color:var(--text);border-color:var(--border3)}
.filter-btn.active{background:var(--lime-dim);border-color:rgba(181,255,77,.35);color:var(--lime)}

/* PROJECTS GRID */
.pv2-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}

/* PROJECT CARD */
.pv2-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r3);overflow:hidden;transition:all .35s cubic-bezier(0.23,1,0.32,1);display:flex;flex-direction:column}
.pv2-card:hover{border-color:var(--border3);transform:translateY(-8px);box-shadow:0 24px 48px rgba(0,0,0,.55)}

/* PREVIEW AREA */
.pv2-preview{height:240px;overflow:hidden;position:relative;background:var(--bg2);flex-shrink:0}
.pv2-img{width:100%;height:100%;object-fit:cover;object-position:top;transition:transform .5s ease;display:block}
.pv2-card:hover .pv2-img{transform:scale(1.04)}
.pv2-img-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 50%,rgba(8,8,14,.6))}

/* BROWSER MOCKUP */
.bm{position:absolute;inset:0;display:flex;flex-direction:column;overflow:hidden}
.bm-bar{height:28px;background:#1b1b28;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;padding:0 10px;gap:8px;flex-shrink:0}
.bm-dots{display:flex;gap:4px;flex-shrink:0}
.bm-dots span{width:7px;height:7px;border-radius:50%}
.bm-dots span:nth-child(1){background:#ff5f57}
.bm-dots span:nth-child(2){background:#febc2e}
.bm-dots span:nth-child(3){background:#28c840}
.bm-addr{flex:1;height:16px;background:rgba(255,255,255,.06);border-radius:3px;display:flex;align-items:center;padding:0 7px;gap:4px;margin:0 8px;overflow:hidden}
.bm-lock{font-size:7px;opacity:.4;flex-shrink:0}
.bm-domain{font-size:8px;color:rgba(255,255,255,.28);font-family:monospace;white-space:nowrap}
.bm-body{flex:1;position:relative;overflow:hidden}

/* MINI SITE INSIDE MOCKUP */
.ms-nav{height:22px;display:flex;align-items:center;padding:0 10px;justify-content:space-between;background:rgba(0,0,0,.35);position:relative;z-index:2}
.ms-logo{width:40px;height:8px;border-radius:2px;background:var(--c,.8);opacity:.9}
.ms-links{display:flex;gap:5px;align-items:center}
.ms-link{width:18px;height:5px;border-radius:2px;background:rgba(255,255,255,.18)}
.ms-cta{width:28px;height:13px;border-radius:3px;background:var(--c);opacity:.85}

.ms-hero{display:flex;align-items:flex-start;gap:8px;padding:10px 10px 6px}
.ms-hero-text{flex:1}
.ms-tag{width:44px;height:7px;border-radius:2px;background:var(--c);opacity:.25;margin-bottom:5px}
.ms-h1a{width:88%;height:10px;border-radius:2px;background:var(--c);opacity:.8;margin-bottom:4px}
.ms-h1b{width:62%;height:10px;border-radius:2px;background:var(--c);opacity:.5;margin-bottom:7px}
.ms-p1{width:90%;height:4px;border-radius:2px;background:rgba(255,255,255,.13);margin-bottom:3px}
.ms-p2{width:72%;height:4px;border-radius:2px;background:rgba(255,255,255,.1);margin-bottom:7px}
.ms-btns{display:flex;gap:5px}
.ms-btn-p{width:38px;height:12px;border-radius:3px;background:var(--c);opacity:.9}
.ms-btn-g{width:32px;height:12px;border-radius:3px;border:1px solid rgba(255,255,255,.2)}
.ms-hero-img{width:62px;height:65px;border-radius:5px;background:var(--c);opacity:.18;flex-shrink:0}

.ms-cards{display:flex;gap:6px;padding:0 10px 8px}
.ms-card{flex:1;border-radius:4px;overflow:hidden;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)}
.ms-ci{height:28px;background:var(--c);opacity:.3}
.ms-ct{height:4px;border-radius:2px;background:rgba(255,255,255,.14);margin:4px 5px 2px}
.ms-ct2{height:4px;border-radius:2px;background:rgba(255,255,255,.08);margin:0 5px 4px;width:60%}

/* CARD BODY */
.pv2-body{padding:26px;flex:1;display:flex;flex-direction:column}
.pv2-tags{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px}
.pv2-client{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:7px}
.pv2-name{font-size:20px;font-weight:700;margin-bottom:9px;line-height:1.2}
.pv2-desc{font-size:13.5px;color:var(--muted);line-height:1.65;margin-bottom:20px;flex:1}
.pv2-stats{display:flex;gap:8px;flex-wrap:wrap}
.pv2-stat{background:var(--bg3);border:1px solid var(--border);border-radius:9px;padding:9px 13px;text-align:center}
.pv2-stat-v{font-size:17px;font-weight:800;color:var(--lime);display:block;line-height:1;letter-spacing:-.01em}
.pv2-stat-l{font-size:8.5px;font-weight:600;color:var(--muted2);text-transform:uppercase;letter-spacing:.07em;margin-top:3px;display:block;white-space:nowrap}

/* CHIPS */
.chip{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;padding:4px 11px;border-radius:6px}
.chip-lime{background:var(--lime-dim);color:var(--lime);border:1px solid rgba(181,255,77,.2)}
.chip-teal{background:var(--teal-dim);color:var(--teal);border:1px solid rgba(77,255,206,.2)}
.chip-red{background:var(--red-dim);color:var(--red);border:1px solid rgba(255,77,106,.2)}
.chip-amber{background:var(--amber-dim);color:var(--amber);border:1px solid rgba(255,204,68,.2)}
.chip-purple{background:var(--purple-dim);color:var(--purple);border:1px solid rgba(192,132,252,.2)}
.chip-gray{background:rgba(255,255,255,.05);color:var(--muted);border:1px solid var(--border2)}

/* DIVIDER */
.divider{border:none;border-top:1px solid var(--border);margin:0}

/* CTA BAND */
#cta-band{background:linear-gradient(135deg,var(--bg2),var(--bg3));border-top:1px solid var(--border);padding:100px 64px;text-align:center;position:relative;overflow:hidden}
#cta-band::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(181,255,77,.08),transparent 65%);pointer-events:none}
.cta-eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--lime-dim);border:1px solid rgba(181,255,77,.25);border-radius:20px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--lime);margin-bottom:22px}
.cta-h2{font-size:clamp(32px,5vw,60px);font-weight:800;line-height:1.06;letter-spacing:-.03em;margin-bottom:16px}
.cta-h2 em{color:var(--lime);font-style:normal}
.cta-sub{font-size:17px;color:var(--muted);max-width:500px;margin:0 auto 40px;line-height:1.7}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;transition:all .3s cubic-bezier(0.23,1,0.32,1);border:1px solid transparent;text-decoration:none}
.btn-primary{background:var(--lime);color:#08080e;border-color:var(--lime)}
.btn-primary:hover{background:#c8ff6e;transform:translateY(-3px);box-shadow:0 10px 25px rgba(181,255,77,0.3)}
.btn-ghost{background:transparent;color:var(--text);border-color:var(--border3)}
.btn-ghost:hover{border-color:var(--lime);color:var(--lime);transform:translateY(-2px)}
.btn-wa{background:var(--wa);color:#fff;border-color:var(--wa)}
.btn-wa:hover{background:#1fb856;transform:translateY(-3px);box-shadow:0 10px 25px rgba(37,211,102,0.3)}

/* FOOTER */
footer{background:var(--bg2);border-top:1px solid var(--border);padding:56px 32px}
.footer-inner{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:28px}
.footer-logo{font-size:20px;font-weight:800;letter-spacing:-.03em}
.footer-logo span{color:var(--lime)}
.footer-links{display:flex;gap:6px;flex-wrap:wrap}
.footer-links a{font-size:13px;color:var(--muted);padding:7px 14px;border-radius:8px;transition:all .3s}
.footer-links a:hover{color:var(--lime);background:rgba(181,255,77,.05)}
.footer-copy{font-size:11px;color:var(--muted2);text-align:center;margin-top:36px;padding-top:28px;border-top:1px solid var(--border);width:100%}

/* WA FAB */
#wa-fab{position:fixed;bottom:32px;right:32px;z-index:900;width:60px;height:60px;border-radius:50%;background:var(--wa);display:flex;align-items:center;justify-content:center;font-size:28px;color:#fff;cursor:pointer;box-shadow:0 6px 20px rgba(37,211,102,.4);animation:wa-ring 2.5s infinite;transition:all .3s;text-decoration:none}
#wa-fab:hover{transform:scale(1.1);box-shadow:0 10px 30px rgba(37,211,102,.6)}
@keyframes wa-ring{0%,100%{box-shadow:0 6px 20px rgba(37,211,102,.4),0 0 0 0 rgba(37,211,102,.4)}70%{box-shadow:0 6px 20px rgba(37,211,102,.4),0 0 0 15px rgba(37,211,102,0)}}

/* REVEAL */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(0.23,1,0.32,1),transform .75s cubic-bezier(0.23,1,0.32,1)}
.reveal.visible{opacity:1;transform:none}
.reveal-d1{transition-delay:.1s}.reveal-d2{transition-delay:.2s}.reveal-d3{transition-delay:.3s}

/* RESPONSIVE */
@media(max-width:1100px){.pv2-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){
  #topbar{padding:0 20px}
  .tb-nav{display:none}
  .ham{display:flex}
  #page-hero{padding:110px 24px 56px}
  #proj-section{padding:0 24px 80px}
  .pv2-grid{grid-template-columns:1fr}
  #cta-band{padding:72px 24px}
  .ph-chips{gap:8px}
}
@media(max-width:480px){.ph-h1{font-size:38px}}
</style>
</head>
<body>

<!-- TOPBAR -->
<header id="topbar">
  <a href="/" class="tb-logo">Solo<span>Agency</span></a>
  <div class="tb-dot"></div>
  <div class="tb-badge">Disponible ahora</div>
  <nav class="tb-nav">
    <a href="/#services">Servicios</a>
    <a href="/#packages">Planes</a>
    <a href="/projects" class="active">Proyectos</a>
    <a href="/#why">Sobre mí</a>
    <a href="/#cta" class="btn-cta tb-cta btn">Empezar →</a>
  </nav>
  <div class="ham" onclick="toggleMobileNav()" aria-label="Menu">
    <span></span><span></span><span></span>
  </div>
</header>

<!-- MOBILE NAV -->
<div id="mob-nav">
  <button class="mob-close" onclick="toggleMobileNav()">✕</button>
  <a href="/#services" onclick="toggleMobileNav()">Servicios</a>
  <a href="/#packages" onclick="toggleMobileNav()">Planes</a>
  <a href="/projects" onclick="toggleMobileNav()">Proyectos</a>
  <a href="/#why" onclick="toggleMobileNav()">Sobre mí</a>
  <a href="/#testimonials" onclick="toggleMobileNav()">Testimonios</a>
  <a href="/#cta" onclick="toggleMobileNav()" class="mob-cta">Empezar ahora →</a>
</div>

<!-- PAGE HERO -->
<section id="page-hero">
  <div class="ph-inner">
    <div class="ph-eyebrow reveal">
      <span class="ph-dot"></span>
      Portfolio de proyectos
    </div>
    <h1 class="ph-h1 reveal">Sitios web que<br><em>venden y convierten</em></h1>
    <p class="ph-sub reveal">Diseño premium, estrategia digital y resultados medibles. Cada proyecto es una historia de crecimiento real.</p>
    <div class="ph-chips reveal">
      <div class="ph-chip">
        <span class="ph-chip-v">10+</span>
        <span class="ph-chip-l">Proyectos mostrados</span>
      </div>
      <div class="ph-chip">
        <span class="ph-chip-v">50+</span>
        <span class="ph-chip-l">Clientes satisfechos</span>
      </div>
      <div class="ph-chip">
        <span class="ph-chip-v">5</span>
        <span class="ph-chip-l">Años de experiencia</span>
      </div>
      <div class="ph-chip">
        <span class="ph-chip-v">3×</span>
        <span class="ph-chip-l">ROI promedio</span>
      </div>
    </div>
  </div>
</section>

<!-- PROJECTS -->
<section id="proj-section">
  <div class="proj-section-inner">

    <!-- FILTER -->
    <div class="filter-row reveal">
      <button class="filter-btn active" data-filter="all">Todos</button>
      <button class="filter-btn" data-filter="web">Web Design</button>
      <button class="filter-btn" data-filter="ecom">E-commerce</button>
      <button class="filter-btn" data-filter="seo">SEO Local</button>
      <button class="filter-btn" data-filter="ads">Publicidad</button>
    </div>

    <!-- GRID -->
    <div class="pv2-grid">

      <!-- 1. motone/studio -->
      <div class="pv2-card reveal reveal-d1" data-cat="web">
        <div class="pv2-preview">
          <img src="/motone.png" alt="motone/studio — Consultoría de diseño eCommerce" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-lime">Strategy</span>
            <span class="chip chip-teal">eCommerce</span>
          </div>
          <div class="pv2-client">motone/studio · International</div>
          <div class="pv2-name">Consultoría Estratégica de eCommerce</div>
          <div class="pv2-desc">Asesoramiento de diseño estratégico para marcas globales. Enfoque minimalista y funcional que maximiza la conversión y la identidad de marca premium.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">+45%</span><span class="pv2-stat-l">Conversión</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">2.5×</span><span class="pv2-stat-l">Revenue</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">A+</span><span class="pv2-stat-l">Design Score</span></div>
          </div>
        </div>
      </div>

      <!-- 2. X2Y Creative -->
      <div class="pv2-card reveal" data-cat="web">
        <div class="pv2-preview">
          <img src="/x2y.png" alt="X2Y Creative — Estudio creativo Londres" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-amber">Branding</span>
            <span class="chip chip-lime">Web Design</span>
          </div>
          <div class="pv2-client">X2Y Creative · London</div>
          <div class="pv2-name">Identidad Digital & Experiencia Web</div>
          <div class="pv2-desc">Creación de experiencias digitales vanguardistas para marcas disruptivas en el corazón de Londres. Fusión de arte, tecnología y branding de alto nivel.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">Gold</span><span class="pv2-stat-l">Award</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">+120k</span><span class="pv2-stat-l">Visitas</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">99</span><span class="pv2-stat-l">Performance</span></div>
          </div>
        </div>
      </div>

      <!-- 3. Menawer Journey -->
      <div class="pv2-card reveal reveal-d2" data-cat="web">
        <div class="pv2-preview">
          <img src="/menawer.png" alt="Menawer Journey — Storytelling digital" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-purple">Storytelling</span>
            <span class="chip chip-teal">Interactive</span>
          </div>
          <div class="pv2-client">Menawer Journey · Global</div>
          <div class="pv2-name">Narrativa Digital Interactiva</div>
          <div class="pv2-desc">Una experiencia inmersiva que combina animaciones cinemáticas con una interfaz de usuario fluida para contar historias que cautivan y emocionan.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">8m</span><span class="pv2-stat-l">Avg. Session</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">100%</span><span class="pv2-stat-l">Immersive</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">#1</span><span class="pv2-stat-l">SOTD</span></div>
          </div>
        </div>
      </div>

      <!-- 4. Chris Macari -->
      <div class="pv2-card reveal reveal-d1" data-cat="web">
        <div class="pv2-preview">
          <img src="https://assets.awwwards.com/awards/submissions/2026/04/69eb839b76f51444792549.jpg" alt="Chris Macari — Director de cine" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-red">Film</span>
            <span class="chip chip-lime">Portfolio</span>
          </div>
          <div class="pv2-client">Chris Macari · Paris / NY</div>
          <div class="pv2-name">Showcase de Dirección Cinematográfica</div>
          <div class="pv2-desc">Portfolio visual para el reconocido director Chris Macari. Una interfaz oscura y minimalista que permite que el contenido visual sea el protagonista absoluto.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">4K</span><span class="pv2-stat-l">Video Support</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">+1M</span><span class="pv2-stat-l">Views</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">Bold</span><span class="pv2-stat-l">Aesthetic</span></div>
          </div>
        </div>
      </div>

      <!-- 5. New Studio Partners -->
      <div class="pv2-card reveal" data-cat="web">
        <div class="pv2-preview">
          <img src="https://assets.awwwards.com/awards/submissions/2026/04/69e06c9f53b6c392102706.png" alt="New Studio Partners" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-teal">Branding</span>
            <span class="chip chip-purple">Web</span>
          </div>
          <div class="pv2-client">New Studio · International</div>
          <div class="pv2-name">Identidad Visual & Plataforma Digital</div>
          <div class="pv2-desc">Redefiniendo identidades visuales para el sector creativo. Una plataforma limpia y estructurada que refleja la excelencia en el diseño y la dirección de arte.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">Elite</span><span class="pv2-stat-l">Status</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">98</span><span class="pv2-stat-l">UX Score</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">Fresh</span><span class="pv2-stat-l">Vibe</span></div>
          </div>
        </div>
      </div>

      <!-- 6. Julia Krantz -->
      <div class="pv2-card reveal reveal-d2" data-cat="web">
        <div class="pv2-preview">
          <img src="https://assets.awwwards.com/awards/submissions/2026/04/69e142cf1554b277980528.png" alt="Julia Krantz — Portfolio" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-amber">Design</span>
            <span class="chip chip-lime">Creative</span>
          </div>
          <div class="pv2-client">Julia Krantz · Scandinavia</div>
          <div class="pv2-name">Portfolio de Diseño Multidisciplinar</div>
          <div class="pv2-desc">Un escaparate elegante para el trabajo de Julia Krantz. Diseño minimalista con tipografía exquisita y una navegación intuitiva que resalta cada detalle.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">Pure</span><span class="pv2-stat-l">Minimalism</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">95</span><span class="pv2-stat-l">SEO Score</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">100%</span><span class="pv2-stat-l">Responsive</span></div>
          </div>
        </div>
      </div>

      <!-- 7. Marimba. Designs -->
      <div class="pv2-card reveal reveal-d1" data-cat="web">
        <div class="pv2-preview">
          <img src="https://assets.awwwards.com/awards/submissions/2026/04/69de98afc7c98153015918.png" alt="Marimba Designs" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-red">Creative</span>
            <span class="chip chip-teal">Web Design</span>
          </div>
          <div class="pv2-client">Marimba · Global</div>
          <div class="pv2-name">Soluciones Digitales Sofisticadas</div>
          <div class="pv2-desc">Interfaces vibrantes y modernas para marcas que buscan destacar. Un diseño audaz que rompe moldes y ofrece una experiencia de usuario memorable.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">Bold</span><span class="pv2-stat-l">UX</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">+80%</span><span class="pv2-stat-l">Engagement</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">Modern</span><span class="pv2-stat-l">Tech</span></div>
          </div>
        </div>
      </div>

      <!-- 8. Yan Liu -->
      <div class="pv2-card reveal" data-cat="web">
        <div class="pv2-preview">
          <img src="https://assets.awwwards.com/awards/submissions/2026/04/69dd3b725745b138483837.jpg" alt="Yan Liu — UI/UX Design" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-lime">UI/UX</span>
            <span class="chip chip-purple">Product</span>
          </div>
          <div class="pv2-client">Yan Liu · Silicon Valley</div>
          <div class="pv2-name">Product Design Showcase</div>
          <div class="pv2-desc">Proyectos digitales centrados en el usuario. Yan Liu demuestra cómo el diseño funcional puede ser estéticamente impecable y altamente eficaz.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">User</span><span class="pv2-stat-l">Centric</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">Top</span><span class="pv2-stat-l">Talent</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">Clean</span><span class="pv2-stat-l">Code</span></div>
          </div>
        </div>
      </div>

      <!-- 9. KZIADOVA -->
      <div class="pv2-card reveal reveal-d2" data-cat="web">
        <div class="pv2-preview">
          <img src="https://assets.awwwards.com/awards/submissions/2026/04/69dd1e1831d69640360658.jpg" alt="KZIADOVA — Design" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-amber">High-Impact</span>
            <span class="chip chip-lime">Minimal</span>
          </div>
          <div class="pv2-client">KZIADOVA · Global</div>
          <div class="pv2-name">Diseño Web de Alto Impacto</div>
          <div class="pv2-desc">Minimalismo extremo con un impacto visual máximo. Katia Ziadova crea espacios digitales donde cada píxel tiene un propósito y una belleza única.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">Sleek</span><span class="pv2-stat-l">UI</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">Pixel</span><span class="pv2-stat-l">Perfect</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">A+</span><span class="pv2-stat-l">Quality</span></div>
          </div>
        </div>
      </div>

      <!-- 10. Off Menu -->
      <div class="pv2-card reveal reveal-d3" data-cat="web">
        <div class="pv2-preview">
          <img src="https://assets.awwwards.com/awards/submissions/2026/03/69cbc978275e8009504716.png" alt="Off Menu — Experience" class="pv2-img">
          <div class="pv2-img-overlay"></div>
        </div>
        <div class="pv2-body">
          <div class="pv2-tags">
            <span class="chip chip-purple">Lifestyle</span>
            <span class="chip chip-teal">Food</span>
          </div>
          <div class="pv2-client">Off Menu · Lifestyle</div>
          <div class="pv2-name">Experiencia Gastronómica Curada</div>
          <div class="pv2-desc">Una plataforma inmersiva para los amantes de la gastronomía. Visuales premium y una navegación fluida que te transportan a los mejores sabores del mundo.</div>
          <div class="pv2-stats">
            <div class="pv2-stat"><span class="pv2-stat-v">Tasty</span><span class="pv2-stat-l">Visuals</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">5★</span><span class="pv2-stat-l">Experience</span></div>
            <div class="pv2-stat"><span class="pv2-stat-v">Elite</span><span class="pv2-stat-l">Content</span></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<hr class="divider">

<!-- CTA BAND -->
<section id="cta-band">
  <div style="position:relative;z-index:1">
    <div class="cta-eyebrow">
      <span class="ph-dot"></span>
      ¿Tu proyecto podría ser el próximo?
    </div>
    <h2 class="cta-h2">Hablemos de tu<br><em>próximo proyecto</em></h2>
    <p class="cta-sub">Primer contacto gratuito y sin compromiso. Respondemos en menos de 24h por WhatsApp.</p>
    <div class="cta-btns">
      <a href="https://wa.me/+33600000000?text=Hola,%20quiero%20hablar%20de%20mi%20proyecto" target="_blank" class="btn btn-wa">
        <i class="fab fa-whatsapp"></i>
        Empezar en WhatsApp
      </a>
      <a href="/#packages" class="btn btn-ghost">Ver planes →</a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-logo">Solo<span>Agency</span></div>
    <nav class="footer-links">
      <a href="/#services">Servicios</a>
      <a href="/#packages">Planes</a>
      <a href="/projects">Proyectos</a>
      <a href="/#why">Sobre mí</a>
      <a href="/#testimonials">Testimonios</a>
      <a href="https://wa.me/+33600000000" target="_blank">WhatsApp</a>
    </nav>
    <div class="footer-copy">
      © 2025 SoloAgency · Todos los derechos reservados · Hecho con ❤️ y datos
    </div>
  </div>
</footer>

<!-- WA FAB -->
<a id="wa-fab" href="https://wa.me/+33600000000?text=Hola,%20quiero%20saber%20más%20sobre%20tus%20servicios" target="_blank" aria-label="Contacto WhatsApp">
  <i class="fab fa-whatsapp"></i>
</a>

<script>
function toggleMobileNav(){
  const nav = document.getElementById('mob-nav');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}

// Topbar scroll
const topbar = document.getElementById('topbar');
window.addEventListener('scroll',()=>{
  topbar.style.background = window.scrollY > 60 ? 'rgba(8,8,14,.95)' : 'rgba(8,8,14,.88)';
});

// Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.pv2-card');
filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card=>{
      const cats = card.dataset.cat || '';
      const show = f === 'all' || cats.split(' ').includes(f);
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
reveals.forEach(el=>observer.observe(el));
</script>
</body>
</html>
`

app.get('/projects', (c) => c.html(PROJECTS_PAGE))
app.get('/', (c) => c.html(PAGE))
app.get('*', (c) => c.html(PAGE))

export default app
