(function() {

const COLORS_KEY = 'icanj_colors';
const FONTS_KEY  = 'icanj_fonts';

const defaultColors = {
  teal:'#00C5CD', tealDark:'#00a8b5',
  bg:'#ffffff', bgSoft:'#f4f4f4', bgCard:'#f9f9f9', bgWhite:'#ffffff',
  dark:'#2a2a2a', dark2:'#222222',
  ink:'#1a1a1a', body:'#333333', muted:'#666666', subtle:'#555555', faint:'#999999',
  borderLight:'#e8e8e8',
};

const colorPresets = {
  'Pure White': { teal:'#00C5CD',tealDark:'#00a8b5',bg:'#ffffff',bgSoft:'#f4f4f4',bgCard:'#f9f9f9',bgWhite:'#ffffff',dark:'#1a1a1a',dark2:'#111111',ink:'#1a1a1a',body:'#444444',muted:'#888888',subtle:'#555555',faint:'#999999',borderLight:'#e8e8e8' },
  'Grey 300':   { teal:'#00C5CD',tealDark:'#00a8b5',bg:'#C8C8C8',bgSoft:'#D4D4D4',bgCard:'#DEDEDE',bgWhite:'#EBEBEB',dark:'#2a2a2a',dark2:'#222222',ink:'#1a1a1a',body:'#333333',muted:'#666666',subtle:'#555555',faint:'#999999',borderLight:'#bbbbbb' },
  'Dark':       { teal:'#00C5CD',tealDark:'#00a8b5',bg:'#141414',bgSoft:'#1c1c1c',bgCard:'#222222',bgWhite:'#2a2a2a',dark:'#0d0d0d',dark2:'#111111',ink:'#f0f0f0',body:'#a0a0a0',muted:'#666666',subtle:'#888888',faint:'#555555',borderLight:'#333333' },
  'Warm Peach': { teal:'#00C5CD',tealDark:'#00a8b5',bg:'#fffbf8',bgSoft:'#fef0e6',bgCard:'#fde4d2',bgWhite:'#fff5ee',dark:'#1a3d5c',dark2:'#12293d',ink:'#2a1a10',body:'#5a4535',muted:'#9a8070',subtle:'#7a5040',faint:'#b09080',borderLight:'#e8d5c8' },
  'Coastal':    { teal:'#00C5CD',tealDark:'#00a8b5',bg:'#e8f4fa',bgSoft:'#cce8f4',bgCard:'#b8ddf0',bgWhite:'#f5fbff',dark:'#0a4a6b',dark2:'#082d42',ink:'#082d42',body:'#2d5a72',muted:'#6a9cb4',subtle:'#4a7a92',faint:'#8ab4c8',borderLight:'#b0d4e8' },
  'Slate':      { teal:'#00C5CD',tealDark:'#00a8b5',bg:'#e8eaf0',bgSoft:'#dde0ea',bgCard:'#d2d5e0',bgWhite:'#eef0f5',dark:'#1e2130',dark2:'#161824',ink:'#1e2130',body:'#3d4060',muted:'#7880a0',subtle:'#5d6080',faint:'#9098b8',borderLight:'#c8cad8' },
};

const defaultFonts = {
  fontBody:'Inter', fontHeading:'Inter',
  fontSizeBase:'16', fontWeightBody:'400', fontWeightBold:'700',
  lineHeightBody:'1.8', lineHeightHead:'1.12',
};

const fontPresets = {
  'Inter':        { fontBody:'Inter',       fontHeading:'Inter',          fontSizeBase:'16', fontWeightBody:'400', fontWeightBold:'700', lineHeightBody:'1.8',  lineHeightHead:'1.12' },
  'Playfair':     { fontBody:'Inter',       fontHeading:'Playfair Display', fontSizeBase:'16', fontWeightBody:'400', fontWeightBold:'700', lineHeightBody:'1.8',  lineHeightHead:'1.1'  },
  'Poppins':      { fontBody:'Poppins',     fontHeading:'Poppins',         fontSizeBase:'16', fontWeightBody:'400', fontWeightBold:'600', lineHeightBody:'1.75', lineHeightHead:'1.15' },
  'Lato':         { fontBody:'Lato',        fontHeading:'Lato',            fontSizeBase:'16', fontWeightBody:'400', fontWeightBold:'700', lineHeightBody:'1.75', lineHeightHead:'1.15' },
  'Montserrat':   { fontBody:'Montserrat',  fontHeading:'Montserrat',      fontSizeBase:'15', fontWeightBody:'400', fontWeightBold:'700', lineHeightBody:'1.8',  lineHeightHead:'1.1'  },
  'Raleway':      { fontBody:'Raleway',     fontHeading:'Raleway',         fontSizeBase:'16', fontWeightBody:'400', fontWeightBold:'700', lineHeightBody:'1.8',  lineHeightHead:'1.1'  },
  'Open Sans':    { fontBody:'Open Sans',   fontHeading:'Open Sans',       fontSizeBase:'16', fontWeightBody:'400', fontWeightBold:'700', lineHeightBody:'1.75', lineHeightHead:'1.15' },
  'Merriweather': { fontBody:'Merriweather',fontHeading:'Merriweather',    fontSizeBase:'15', fontWeightBody:'400', fontWeightBold:'700', lineHeightBody:'1.9',  lineHeightHead:'1.2'  },
};

const GOOGLE_FONTS = ['Inter','Roboto','Open Sans','Lato','Montserrat','Poppins','Raleway','Nunito','Source Sans Pro','PT Sans','Oswald','Playfair Display','Merriweather','Crimson Text','Libre Baskerville','EB Garamond','DM Sans','Outfit','Plus Jakarta Sans','Sora','Figtree'];

let colors = Object.assign({}, defaultColors);
let fonts  = Object.assign({}, defaultFonts);
try { const s = localStorage.getItem(COLORS_KEY); if (s) colors = Object.assign({}, defaultColors, JSON.parse(s)); } catch(e) {}
try { const s = localStorage.getItem(FONTS_KEY);  if (s) fonts  = Object.assign({}, defaultFonts,  JSON.parse(s)); } catch(e) {}

const colorStyle = document.createElement('style'); colorStyle.id = 'icanj-color-vars'; document.head.appendChild(colorStyle);
const fontStyle  = document.createElement('style'); fontStyle.id  = 'icanj-font-vars';  document.head.appendChild(fontStyle);

const loadedFonts = new Set(['Inter']);
function loadGoogleFont(name) {
  if (!name || loadedFonts.has(name)) return;
  loadedFonts.add(name);
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family='+encodeURIComponent(name)+':wght@300;400;500;600;700;800&display=swap';
  document.head.appendChild(l);
}

function hexRgba(hex, a) {
  hex = (hex||'#000000');
  const r=parseInt(hex.slice(1,3),16)||0, g=parseInt(hex.slice(3,5),16)||0, b=parseInt(hex.slice(5,7),16)||0;
  return 'rgba('+r+','+g+','+b+','+a+')';
}

function applyColors() {
  const c = colors;
  colorStyle.textContent = ':root{'
    +'--teal:'+c.teal+';'
    +'--teal-dark:'+c.tealDark+';'
    +'--teal-light:'+hexRgba(c.teal,0.12)+';'
    +'--bg:'+c.bg+';'
    +'--bg-soft:'+c.bgSoft+';'
    +'--bg-card:'+c.bgCard+';'
    +'--bg-white:'+c.bgWhite+';'
    +'--dark:'+c.dark+';'
    +'--dark-2:'+c.dark2+';'
    +'--ink:'+c.ink+';'
    +'--body:'+c.body+';'
    +'--muted:'+c.muted+';'
    +'--subtle:'+c.subtle+';'
    +'--faint:'+c.faint+';'
    +'--border-light:'+c.borderLight+';'
    +'--border:'+hexRgba(c.ink,0.1)+';'
    +'--border-mid:'+hexRgba(c.ink,0.18)+';'
    +'}';
  document.querySelectorAll('.announce-bar').forEach(el=>el.style.background=c.teal);
  document.querySelectorAll('.site-header').forEach(el=>el.style.background=c.bgSoft);
  document.querySelectorAll('.btn-give').forEach(el=>el.style.background=c.teal);
  document.querySelectorAll('.site-footer').forEach(el=>el.style.background=c.dark);
  document.querySelectorAll('.verse-band').forEach(el=>el.style.background=c.dark2);
  document.querySelectorAll('.page-masthead').forEach(el=>el.style.background=c.dark);
  try { localStorage.setItem(COLORS_KEY, JSON.stringify(c)); } catch(e) {}
}

function applyFonts() {
  const f = fonts;
  loadGoogleFont(f.fontBody);
  if (f.fontHeading !== f.fontBody) loadGoogleFont(f.fontHeading);
  const base = parseInt(f.fontSizeBase)||16;
  fontStyle.textContent = ':root{'
    +'--font-body:\''+f.fontBody+'\',sans-serif;'
    +'--font-heading:\''+f.fontHeading+'\',sans-serif;'
    +'--font-size-base:'+f.fontSizeBase+'px;'
    +'--font-size-sm:'+Math.round(base*0.875)+'px;'
    +'--font-size-xs:'+Math.round(base*0.75)+'px;'
    +'--font-size-xxs:'+Math.round(base*0.6875)+'px;'
    +'--font-size-tiny:'+Math.round(base*0.625)+'px;'
    +'--font-weight-body:'+f.fontWeightBody+';'
    +'--font-weight-med:600;'
    +'--font-weight-bold:'+f.fontWeightBold+';'
    +'--font-weight-black:800;'
    +'--line-height-body:'+f.lineHeightBody+';'
    +'--line-height-head:'+f.lineHeightHead+';'
    +'--letter-spacing-heading:-0.02em;'
    +'--letter-spacing-upper:0.18em;'
    +'}';
  document.body.style.fontFamily = '\''+f.fontBody+'\',sans-serif';
  document.body.style.fontSize   = f.fontSizeBase+'px';
  try { localStorage.setItem(FONTS_KEY, JSON.stringify(f)); } catch(e) {}
}

// Build panel HTML
function fsel(id, label, desc) {
  const opts = GOOGLE_FONTS.map(fn=>'<option value="'+fn+'">'+fn+'</option>').join('');
  return '<div style="margin-bottom:12px;">'
    +'<div style="font-size:11px;font-weight:500;color:#ccc;margin-bottom:5px;">'+label+' <span style="font-size:9px;color:#555;">'+desc+'</span></div>'
    +'<select id="'+id+'" onchange="window._cmFontSelect(\''+id+'\',this.value)" style="width:100%;padding:8px 10px;background:#2a2a2a;border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#fff;font-family:Inter,sans-serif;font-size:12px;cursor:pointer;outline:none;">'+opts+'</select>'
    +'</div>';
}

function fslider(id, label, min, max, val, unit, step) {
  step = step||'1';
  return '<div style="margin-bottom:14px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">'
    +'<div style="font-size:11px;font-weight:500;color:#ccc;">'+label+'</div>'
    +'<div id="'+id+'-val" style="font-size:10px;font-weight:700;color:#777;font-family:monospace;">'+val+unit+'</div>'
    +'</div>'
    +'<input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" oninput="window._cmFontSlide(\''+id+'\',\''+unit+'\',this.value)" style="width:100%;accent-color:var(--teal);cursor:pointer;"/>'
    +'</div>';
}

const panelHTML = '<div id="cm-toggle" title="Style Manager" onclick="window._cmToggle()" style="position:fixed;bottom:24px;right:24px;z-index:9999;width:48px;height:48px;border-radius:50%;background:var(--teal);box-shadow:0 4px 20px rgba(0,0,0,0.25);cursor:pointer;display:flex;align-items:center;justify-content:center;border:none;transition:transform 0.2s;">'
+'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><circle cx="12" cy="12" r="7" stroke-dasharray="3 3"/></svg>'
+'</div>'

+'<div id="cm-panel" style="position:fixed;top:0;right:-380px;width:380px;height:100vh;background:#1e1e1e;z-index:9998;display:flex;flex-direction:column;transition:right 0.3s cubic-bezier(0.16,1,0.3,1);box-shadow:-8px 0 40px rgba(0,0,0,0.3);font-family:Inter,sans-serif;">'
// Tab bar
+'<div style="background:#161616;display:flex;align-items:stretch;border-bottom:1px solid rgba(255,255,255,0.07);flex-shrink:0;">'
+'<div style="display:flex;flex:1;">'
+'<button id="cm-tab-colors" onclick="window._cmTab(\'colors\')" style="flex:1;padding:14px 0;border:none;border-bottom:2px solid var(--teal);background:transparent;color:#fff;font-family:Inter,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;">🎨 Colors</button>'
+'<button id="cm-tab-fonts"  onclick="window._cmTab(\'fonts\')"  style="flex:1;padding:14px 0;border:none;border-bottom:2px solid transparent;background:transparent;color:rgba(255,255,255,0.4);font-family:Inter,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;">Aa Fonts</button>'
+'</div>'
+'<button onclick="window._cmToggle()" style="width:44px;border:none;border-left:1px solid rgba(255,255,255,0.07);background:transparent;color:rgba(255,255,255,0.4);cursor:pointer;font-size:18px;">✕</button>'
+'</div>'

// Colors body
+'<div id="cm-colors-body" style="overflow-y:auto;flex:1;padding:16px 20px;">'
+'<div style="margin-bottom:18px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Presets</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;" id="cm-presets"></div></div>'
+'<div style="margin-bottom:16px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Accent</div><div id="cm-rows-accent"></div></div>'
+'<div style="margin-bottom:16px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Backgrounds</div><div id="cm-rows-bg"></div></div>'
+'<div style="margin-bottom:16px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Dark Sections</div><div id="cm-rows-dark"></div></div>'
+'<div style="margin-bottom:16px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Text</div><div id="cm-rows-text"></div></div>'
+'<div style="margin-bottom:16px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Borders</div><div id="cm-rows-border"></div></div>'
+'</div>'

// Fonts body
+'<div id="cm-fonts-body" style="overflow-y:auto;flex:1;padding:16px 20px;display:none;">'
+'<div style="margin-bottom:18px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Font Presets</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;" id="cm-font-presets"></div></div>'
+'<div style="margin-bottom:18px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Typefaces</div>'
+fsel('cm-sel-body','Body Font','Paragraphs, labels')
+fsel('cm-sel-heading','Heading Font','Titles, nav, buttons')
+'</div>'
+'<div style="margin-bottom:18px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Size &amp; Rhythm</div>'
+fslider('cm-sl-size','Base Size','12','22',defaultFonts.fontSizeBase,'px')
+fslider('cm-sl-lh-body','Body Line Height','1.2','2.2',defaultFonts.lineHeightBody,'','0.05')
+fslider('cm-sl-lh-head','Heading Line Height','0.9','1.6',defaultFonts.lineHeightHead,'','0.01')
+'</div>'
+'<div style="margin-bottom:16px;"><div style="font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#555;margin-bottom:10px;">Live Preview</div>'
+'<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:14px;border:1px solid rgba(255,255,255,0.08);">'
+'<div id="cm-prev-h" style="font-size:20px;font-weight:800;color:#fff;margin-bottom:8px;line-height:1.12;">God is Faithful</div>'
+'<div id="cm-prev-b" style="font-size:13px;color:rgba(255,255,255,0.55);line-height:1.75;margin-bottom:10px;">A welcoming community in Hackensack, NJ — a place to find hope and build real relationships.</div>'
+'<div id="cm-prev-e" style="font-size:9px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--teal);">Who We Are</div>'
+'</div>'
+'</div>'
+'</div>'

// Footer
+'<div style="padding:14px 20px;border-top:1px solid rgba(255,255,255,0.07);display:flex;gap:8px;flex-shrink:0;">'
+'<button onclick="window._cmReset()" style="flex:1;padding:10px;border-radius:7px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:rgba(255,255,255,0.6);font-family:Inter,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;">Reset</button>'
+'<button onclick="window._cmExport()" style="flex:2;padding:10px;border-radius:7px;border:none;background:var(--teal);color:#fff;font-family:Inter,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;">Export CSS →</button>'
+'</div>'
+'</div>'

// Export modal
+'<div id="cm-export-modal" style="position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:10000;display:none;align-items:center;justify-content:center;">'
+'<div style="background:#fff;border-radius:14px;width:580px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;margin:20px;">'
+'<div style="padding:18px 22px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;justify-content:space-between;">'
+'<div style="font-size:15px;font-weight:800;color:#1a1a1a;">Export — Paste into style.css</div>'
+'<button onclick="document.getElementById(\'cm-export-modal\').style.display=\'none\'" style="width:30px;height:30px;border:none;background:#f5f5f5;border-radius:6px;cursor:pointer;font-size:16px;color:#666;">✕</button>'
+'</div>'
+'<div style="padding:18px 22px;overflow-y:auto;flex:1;">'
+'<p style="font-size:12px;color:#888;margin-bottom:12px;">Replace the <code style="background:#f0f0f0;padding:1px 5px;border-radius:3px;">:root { }</code> block in style.css:</p>'
+'<pre id="cm-export-code" style="font-family:monospace;font-size:11px;line-height:1.8;color:#333;background:#f8f8f8;border-radius:8px;padding:14px;white-space:pre-wrap;word-break:break-all;"></pre>'
+'</div>'
+'<div style="padding:14px 22px;border-top:1px solid #f0f0f0;display:flex;gap:8px;justify-content:flex-end;">'
+'<button onclick="document.getElementById(\'cm-export-modal\').style.display=\'none\'" style="padding:9px 18px;border-radius:7px;border:1px solid #ddd;background:transparent;color:#555;font-family:Inter,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;">Close</button>'
+'<button onclick="window._cmCopy()" id="cm-copy-btn" style="padding:9px 20px;border-radius:7px;border:none;background:#00C5CD;color:#fff;font-family:Inter,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;">Copy to Clipboard</button>'
+'</div></div></div>';

document.body.insertAdjacentHTML('beforeend', panelHTML);

// Build color rows
function buildColorRow(cid, key, label, desc) {
  const c = colors[key]||'#000000';
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;';
  row.innerHTML = '<div style="flex:1;"><div style="font-size:12px;font-weight:500;color:#ccc;">'+label+'</div>'+(desc?'<div style="font-size:10px;color:#555;">'+desc+'</div>':'')+'</div>'
    +'<div style="display:flex;align-items:center;gap:8px;">'
    +'<div id="cm-hex-'+key+'" style="font-size:10px;font-weight:600;color:#777;font-family:monospace;min-width:62px;text-align:right;">'+c+'</div>'
    +'<div id="cm-sw-'+key+'" style="width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,0.15);overflow:hidden;position:relative;background:'+c+';cursor:pointer;">'
    +'<input type="color" value="'+c+'" style="position:absolute;inset:-4px;width:calc(100%+8px);height:calc(100%+8px);opacity:0;cursor:pointer;" oninput="window._cmColorUpdate(\''+key+'\',this.value)"/></div></div>';
  document.getElementById(cid).appendChild(row);
}

buildColorRow('cm-rows-accent','teal','Brand Accent','Buttons, eyebrows, active nav');
buildColorRow('cm-rows-accent','tealDark','Accent Hover','Hover & focus states');
buildColorRow('cm-rows-bg','bg','Page Background','Main site background');
buildColorRow('cm-rows-bg','bgSoft','Section BG','Alternating sections');
buildColorRow('cm-rows-bg','bgCard','Cards','Ministry, event, info cards');
buildColorRow('cm-rows-bg','bgWhite','Elevated Cards','Forms, top-level cards');
buildColorRow('cm-rows-dark','dark','Hero / Masthead','Page headers, stats band');
buildColorRow('cm-rows-dark','dark2','Footer / Verse','Verse bands, footer bg');
buildColorRow('cm-rows-text','ink','Headings',null);
buildColorRow('cm-rows-text','body','Body Text',null);
buildColorRow('cm-rows-text','muted','Muted Text',null);
buildColorRow('cm-rows-text','subtle','Subtle Text','Secondary descriptions');
buildColorRow('cm-rows-text','faint','Faint Text','Labels, timestamps');
buildColorRow('cm-rows-border','borderLight','Light Border','Cards, dividers');

// Build color presets
const presetsEl = document.getElementById('cm-presets');
Object.keys(colorPresets).forEach(name => {
  const btn = document.createElement('button');
  btn.style.cssText = 'padding:8px 10px;border-radius:7px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);cursor:pointer;font-family:Inter,sans-serif;font-size:11px;font-weight:600;color:#aaa;text-align:left;display:flex;align-items:center;gap:6px;transition:all 0.2s;';
  const dot = document.createElement('span');
  dot.style.cssText = 'width:10px;height:10px;border-radius:50%;background:'+colorPresets[name].bg+';border:1px solid rgba(255,255,255,0.2);flex-shrink:0;';
  btn.appendChild(dot); btn.appendChild(document.createTextNode(name));
  btn.onclick = () => {
    Object.assign(colors, colorPresets[name]); syncColorUI(); applyColors();
    presetsEl.querySelectorAll('button').forEach(b=>{b.style.borderColor='rgba(255,255,255,0.1)';b.style.color='#aaa';});
    btn.style.borderColor=colors.teal; btn.style.color='#fff';
  };
  presetsEl.appendChild(btn);
});

// Build font presets
const fontPresetsEl = document.getElementById('cm-font-presets');
Object.keys(fontPresets).forEach(name => {
  const btn = document.createElement('button');
  btn.style.cssText = 'padding:8px 10px;border-radius:7px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);cursor:pointer;font-family:Inter,sans-serif;font-size:11px;font-weight:600;color:#aaa;text-align:left;transition:all 0.2s;';
  btn.textContent = name;
  btn.onclick = () => {
    Object.assign(fonts, fontPresets[name]); syncFontUI(); applyFonts();
    fontPresetsEl.querySelectorAll('button').forEach(b=>{b.style.borderColor='rgba(255,255,255,0.1)';b.style.color='#aaa';});
    btn.style.borderColor=colors.teal; btn.style.color='#fff';
  };
  fontPresetsEl.appendChild(btn);
});

function syncColorUI() {
  Object.entries(colors).forEach(([k,v])=>{
    const hex=document.getElementById('cm-hex-'+k), sw=document.getElementById('cm-sw-'+k);
    if(hex) hex.textContent=v;
    if(sw){sw.style.background=v; const i=sw.querySelector('input'); if(i) i.value=v;}
  });
}

function syncFontUI() {
  const bodyEl=document.getElementById('cm-sel-body');
  const headEl=document.getElementById('cm-sel-heading');
  const sizeEl=document.getElementById('cm-sl-size');
  const lhbEl =document.getElementById('cm-sl-lh-body');
  const lhhEl =document.getElementById('cm-sl-lh-head');
  if(bodyEl) bodyEl.value=fonts.fontBody;
  if(headEl) headEl.value=fonts.fontHeading;
  if(sizeEl){sizeEl.value=fonts.fontSizeBase; document.getElementById('cm-sl-size-val').textContent=fonts.fontSizeBase+'px';}
  if(lhbEl){lhbEl.value=fonts.lineHeightBody; document.getElementById('cm-sl-lh-body-val').textContent=fonts.lineHeightBody;}
  if(lhhEl){lhhEl.value=fonts.lineHeightHead; document.getElementById('cm-sl-lh-head-val').textContent=fonts.lineHeightHead;}
  updateFontPreview();
}

function updateFontPreview() {
  const h=document.getElementById('cm-prev-h');
  const b=document.getElementById('cm-prev-b');
  const e=document.getElementById('cm-prev-e');
  if(h){h.style.fontFamily='\''+fonts.fontHeading+'\',sans-serif'; h.style.lineHeight=fonts.lineHeightHead; h.style.fontSize=Math.max(16,parseInt(fonts.fontSizeBase)+4)+'px';}
  if(b){b.style.fontFamily='\''+fonts.fontBody+'\',sans-serif';    b.style.lineHeight=fonts.lineHeightBody; b.style.fontSize=Math.max(11,parseInt(fonts.fontSizeBase)-3)+'px';}
  if(e){e.style.fontFamily='\''+fonts.fontHeading+'\',sans-serif';}
}

window._cmTab = function(tab) {
  const ic = tab==='colors';
  document.getElementById('cm-colors-body').style.display=ic?'block':'none';
  document.getElementById('cm-fonts-body').style.display=ic?'none':'block';
  document.getElementById('cm-tab-colors').style.borderBottomColor=ic?'var(--teal)':'transparent';
  document.getElementById('cm-tab-colors').style.color=ic?'#fff':'rgba(255,255,255,0.4)';
  document.getElementById('cm-tab-fonts').style.borderBottomColor=ic?'transparent':'var(--teal)';
  document.getElementById('cm-tab-fonts').style.color=ic?'rgba(255,255,255,0.4)':'#fff';
};

window._cmToggle = function() {
  const p=document.getElementById('cm-panel'), open=p.style.right==='0px';
  p.style.right=open?'-380px':'0px';
  document.getElementById('cm-toggle').style.transform=open?'rotate(0deg)':'rotate(90deg)';
};

window._cmColorUpdate = function(key, val) {
  colors[key]=val;
  const hex=document.getElementById('cm-hex-'+key), sw=document.getElementById('cm-sw-'+key);
  if(hex) hex.textContent=val;
  if(sw) sw.style.background=val;
  applyColors();
};

window._cmFontSelect = function(id, val) {
  loadGoogleFont(val);
  if(id==='cm-sel-body')    fonts.fontBody=val;
  if(id==='cm-sel-heading') fonts.fontHeading=val;
  applyFonts(); updateFontPreview();
};

window._cmFontSlide = function(id, unit, val) {
  const d=document.getElementById(id+'-val'); if(d) d.textContent=val+unit;
  if(id==='cm-sl-size')    fonts.fontSizeBase=val;
  if(id==='cm-sl-lh-body') fonts.lineHeightBody=val;
  if(id==='cm-sl-lh-head') fonts.lineHeightHead=val;
  applyFonts(); updateFontPreview();
};

window._cmReset = function() {
  Object.assign(colors,defaultColors); Object.assign(fonts,defaultFonts);
  syncColorUI(); syncFontUI(); applyColors(); applyFonts();
};

window._cmExport = function() {
  const c=colors, f=fonts, base=parseInt(f.fontSizeBase)||16;
  const code=':root {\n'
    +'  /* Font imports — add ABOVE this block:\n'
    +'     @import url(\'https://fonts.googleapis.com/css2?family='+encodeURIComponent(f.fontBody)+':wght@300;400;500;600;700;800'
    +(f.fontHeading!==f.fontBody?'&family='+encodeURIComponent(f.fontHeading)+':wght@300;400;500;600;700;800':'')
    +'&display=swap\');\n  */\n\n'
    +'  /* Accent */\n'
    +'  --teal:        '+c.teal+';\n'
    +'  --teal-dark:   '+c.tealDark+';\n'
    +'  --teal-light:  '+hexRgba(c.teal,0.12)+';\n\n'
    +'  /* Backgrounds */\n'
    +'  --bg:          '+c.bg+';\n'
    +'  --bg-soft:     '+c.bgSoft+';\n'
    +'  --bg-card:     '+c.bgCard+';\n'
    +'  --bg-white:    '+c.bgWhite+';\n\n'
    +'  /* Dark sections */\n'
    +'  --dark:        '+c.dark+';\n'
    +'  --dark-2:      '+c.dark2+';\n\n'
    +'  /* Text */\n'
    +'  --ink:         '+c.ink+';\n'
    +'  --body:        '+c.body+';\n'
    +'  --muted:       '+c.muted+';\n'
    +'  --subtle:      '+c.subtle+';\n'
    +'  --faint:       '+c.faint+';\n'
    +'  --border:      '+hexRgba(c.ink,0.1)+';\n'
    +'  --border-mid:  '+hexRgba(c.ink,0.18)+';\n'
    +'  --border-light:'+c.borderLight+';\n\n'
    +'  /* Font Manager */\n'
    +'  --font-body:              \''+f.fontBody+'\', sans-serif;\n'
    +'  --font-heading:           \''+f.fontHeading+'\', sans-serif;\n'
    +'  --font-size-base:         '+f.fontSizeBase+'px;\n'
    +'  --font-size-sm:           '+Math.round(base*0.875)+'px;\n'
    +'  --font-size-xs:           '+Math.round(base*0.75)+'px;\n'
    +'  --font-size-xxs:          '+Math.round(base*0.6875)+'px;\n'
    +'  --font-size-tiny:         '+Math.round(base*0.625)+'px;\n'
    +'  --font-weight-body:       '+f.fontWeightBody+';\n'
    +'  --font-weight-med:        600;\n'
    +'  --font-weight-bold:       '+f.fontWeightBold+';\n'
    +'  --font-weight-black:      800;\n'
    +'  --line-height-body:       '+f.lineHeightBody+';\n'
    +'  --line-height-head:       '+f.lineHeightHead+';\n'
    +'  --letter-spacing-heading: -0.02em;\n'
    +'  --letter-spacing-upper:   0.18em;\n'
    +'}';
  document.getElementById('cm-export-code').textContent=code;
  document.getElementById('cm-export-modal').style.display='flex';
};

window._cmCopy = function() {
  navigator.clipboard.writeText(document.getElementById('cm-export-code').textContent).then(()=>{
    const btn=document.getElementById('cm-copy-btn'); btn.textContent='Copied!';
    setTimeout(()=>btn.textContent='Copy to Clipboard',2000);
  });
};

applyColors(); applyFonts(); syncColorUI(); syncFontUI();

})();