(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';

  const navItems = [
    { label: 'Welcome', href: 'index.html' },
    {
      label: 'Media', href: '#', dropdown: [
        { label: 'Sermons', href: 'sermons.html' },
        { label: 'Watch Live', href: 'sermons.html#watch-live' },
      ]
    },
    { label: 'Ministries', href: 'ministries.html' },
    { label: 'Events', href: 'events.html' },
    { label: 'Give', href: 'https://icanj.churchcenter.com/giving', external: true },
    { label: 'Visit', href: 'visit.html' },
    {
      label: 'About', href: '#', dropdown: [
        { label: 'Mission / Vision', href: 'about.html#mission' },
        { label: 'Our Values', href: 'about.html#values' },
        { label: 'Our Beliefs', href: 'about.html#beliefs' },
        { label: 'Pastors', href: 'about.html#pastors' },
        { label: 'Contact Us', href: 'connect.html' },
      ]
    },
  ];

  const nav = navItems.map(item => {
    const isActive = path === item.href ? ' active' : '';
    if (item.dropdown) {
      const drops = item.dropdown.map(d =>
        `<a href="${d.href}" class="dropdown-item">${d.label}</a>`
      ).join('');
      return `<div class="nav-dropdown-wrap">
        <a href="${item.href}" class="nav-link has-dropdown${isActive}">${item.label} <span class="nav-caret">▾</span></a>
        <div class="nav-dropdown">${drops}</div>
      </div>`;
    }
    const target = item.external ? ' target="_blank"' : '';
    return `<a href="${item.href}"${target} class="nav-link${isActive}">${item.label}</a>`;
  }).join('');

  const mobileNav = navItems.map(item => {
    const isActive = path === item.href ? ' active' : '';
    if (item.dropdown) {
      const drops = item.dropdown.map(d =>
        `<a href="${d.href}" class="mobile-dropdown-item">${d.label}</a>`
      ).join('');
      return `<div class="mobile-nav-group">
        <button class="mobile-nav-link mobile-nav-parent${isActive}" onclick="toggleMobileGroup(this)">${item.label} <span class="mobile-caret">▾</span></button>
        <div class="mobile-nav-children">${drops}</div>
      </div>`;
    }
    const target = item.external ? ' target="_blank"' : '';
    return `<a href="${item.href}"${target} class="mobile-nav-link${isActive}">${item.label}</a>`;
  }).join('');

  document.currentScript.insertAdjacentHTML('afterend', `
<style>
.nav-dropdown-wrap{position:relative;display:flex;align-items:center;}
.nav-dropdown-wrap:hover .nav-dropdown{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0);}
.nav-caret{font-size:9px;margin-left:3px;display:inline-block;}
.nav-dropdown{
  position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(-6px);
  background:#fff;border:1px solid var(--border);border-radius:10px;
  box-shadow:0 8px 32px rgba(0,0,0,0.12);min-width:180px;padding:8px 0;
  opacity:0;visibility:hidden;transition:opacity 0.18s,transform 0.18s,visibility 0.18s;
  z-index:300;
}
.dropdown-item{display:block;padding:10px 20px;font-size:13px;font-weight:600;color:#1a1a1a;transition:color 0.15s,background 0.15s;}
.dropdown-item:hover{background:var(--bg-soft);color:var(--teal);}
.has-dropdown{cursor:default;}
.mobile-nav-group{display:flex;flex-direction:column;}
.mobile-nav-parent{background:none;border:none;border-bottom:1px solid rgba(0,0,0,0.07);text-align:left;width:100%;font-size:15px;font-weight:600;color:#1a1a1a;padding:13px 0;display:flex;justify-content:space-between;align-items:center;}
.mobile-nav-parent.active{color:var(--teal);}
.mobile-caret{font-size:10px;transition:transform 0.2s;}
.mobile-nav-group.open .mobile-caret{transform:rotate(180deg);}
.mobile-nav-children{display:none;padding-left:16px;border-left:2px solid var(--teal-light);}
.mobile-nav-group.open .mobile-nav-children{display:flex;flex-direction:column;}
.mobile-dropdown-item{font-size:14px;font-weight:500;color:#444;padding:9px 0;border-bottom:1px solid rgba(0,0,0,0.05);}
.mobile-dropdown-item:hover{color:var(--teal);}
</style>
<div class="announce-bar">
  <p>VBS 2026 — <strong>July 9–11</strong> — Registration open · Ages 4–12</p>
  <a href="connect.html">Register Now →</a>
</div>
<header class="site-header">
  <div class="header-inner">
    <a href="index.html" class="logo">
      <img src="LOGO_transparent2.png" alt="ICANJ" onerror="this.style.display='none'"/>
    </a>
    <nav class="site-nav">${nav}</nav>
    <div class="header-actions">
      <a href="https://icanj.churchcenter.com/home" target="_blank" class="btn-cc">Church Center</a>
    </div>
    <button class="menu-toggle" id="menuToggle" aria-label="Open menu" onclick="toggleMobileNav()">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<div class="mobile-nav" id="mobileNav">
  <div class="mobile-nav-backdrop" onclick="closeMobileNav()"></div>
  <div class="mobile-nav-panel">
    <div class="mobile-nav-header">
      <img src="LOGO_transparent2.png" alt="ICANJ" style="height:34px;" onerror="this.style.display='none'"/>
      <button class="mobile-nav-close" onclick="closeMobileNav()">✕</button>
    </div>
    <nav class="mobile-nav-links">${mobileNav}</nav>
    <div class="mobile-nav-actions">
      <a href="https://icanj.churchcenter.com/home" target="_blank" class="btn-cc">Church Center</a>
      <a href="https://icanj.churchcenter.com/giving" target="_blank" class="btn-give">Give</a>
    </div>
  </div>
</div>`);
})();
function toggleMobileNav(){const n=document.getElementById('mobileNav');n.classList.contains('open')?closeMobileNav():openMobileNav();}
function openMobileNav(){document.getElementById('mobileNav').classList.add('open');document.getElementById('menuToggle').classList.add('open');document.body.style.overflow='hidden';}
function closeMobileNav(){document.getElementById('mobileNav').classList.remove('open');document.getElementById('menuToggle').classList.remove('open');document.body.style.overflow='';}
function toggleMobileGroup(btn){const group=btn.closest('.mobile-nav-group');group.classList.toggle('open');}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMobileNav();});