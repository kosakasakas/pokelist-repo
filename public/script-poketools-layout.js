const TOOL_LAYOUT_LANG_KEY = 'champions-tool-ui-lang-v1';
const TOOL_LAYOUT_REGULATION_KEY = 'champions-tool-ui-regulation-v1';
const TOOL_LAYOUT_CONFIG_URL = '/layout-config.json';
const DEFAULT_LAYOUT_CONFIG = {
  footerOwner: 'sakas_poke',
};

function ensureGlobalFont() {
  if (!document.getElementById('noto-sans-jp-font-link')) {
    const link = document.createElement('link');
    link.id = 'noto-sans-jp-font-link';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap';
    document.head.appendChild(link);
  }
  if (!document.getElementById('noto-sans-jp-font-style')) {
    const style = document.createElement('style');
    style.id = 'noto-sans-jp-font-style';
    style.textContent = 'html, body, button, input, select, textarea { font-family: "Noto Sans JP", sans-serif !important; }';
    document.head.appendChild(style);
  }
}

function ensureHeaderStyles() {
  if (document.getElementById('tool-layout-inline-style')) return;
  const style = document.createElement('style');
  style.id = 'tool-layout-inline-style';
  style.textContent = `
    .calc-header { background: #ffffff; border: 0 !important; box-shadow: none !important; }
    .tool-header-row { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; min-height: 52px; flex-wrap: nowrap; }
    .tool-header-brand { text-decoration: none; color: #111827; font-weight: 700; flex: 0 0 auto; white-space: nowrap; }
    .tool-header-right { margin-left: auto; display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; min-width: 0; flex: 1 1 auto; flex-wrap: nowrap; }
    .tool-header-main { flex: 1 1 auto; min-width: 0; display: flex; justify-content: flex-end; }
    .tool-global-nav { display: flex; flex-wrap: nowrap; gap: 0.35rem; justify-content: flex-end; overflow-x: auto; scrollbar-width: thin; }
    .tool-nav-btn { white-space: nowrap; }
    .tool-nav-btn.active { background: #6c757d; border-color: #6c757d; color: #fff; }
    .tool-header-reg, .tool-header-lang { flex: 0 0 auto; font-size: 1rem; }
    .tool-regulation-control {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.2rem 0.55rem;
      background: #f8fafc;
      border: 1px solid #dbe4ee;
      border-radius: 999px;
      margin: 0;
      color: #334155;
    }
    .tool-regulation-label {
      color: #475569;
      font-size: 0.86rem;
      display: inline-flex;
      align-items: center;
      gap: 0.22rem;
    }
    .tool-regulation-select {
      border: 0;
      background: transparent;
      outline: none;
      appearance: none;
      font-size: 0.92rem;
      font-weight: 600;
      padding: 0;
      color: #0f172a;
      cursor: pointer;
    }
    .tool-lang-toggle {
      display: inline-flex;
      align-items: center;
      gap: 0.15rem;
      border: 1px solid #dbe4ee;
      background: #f8fafc;
      border-radius: 999px;
      padding: 0.16rem;
    }
    .tool-lang-toggle .nav-link {
      border: 0;
      background: transparent;
      color: #64748b;
      font-weight: 700;
      font-size: 0.8rem;
      padding: 0.18rem 0.48rem;
      border-radius: 999px;
      line-height: 1.1;
    }
    .tool-lang-toggle .nav-link.active {
      background: #334155;
      color: #fff;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.2);
    }
    .tool-lang-separator { display: none; }
    .tool-nav-toggler { display: none; flex: 0 0 auto; border: 1px solid #d1d5db; border-radius: 0.5rem; background: #fff; padding: 0.25rem 0.45rem; cursor: pointer; font-size: 1rem; line-height: 1; }
    .tool-nav-panel {
      display: block;
    }
    .tool-nav-panel.is-collapsed { display: none; }
    .tool-footer {
      margin-top: 1rem;
      border-top: 1px solid rgba(148, 163, 184, 0.28);
      background: #ffffff;
    }
    .tool-footer-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0.85rem 0.9rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      color: #64748b;
      font-size: 0.74rem;
      line-height: 1.45;
      letter-spacing: 0.01em;
      text-align: center;
    }
    .tool-footer-copyright {
      margin-top: 0.1rem;
      font-weight: 600;
      color: #475569;
      letter-spacing: 0.04em;
    }
    @media (max-width: 991.98px) {
      .tool-header-row { gap: 0.35rem; }
      .tool-header-right { gap: 0.3rem; }
      .tool-header-brand { font-size: 0.95rem; }
      .tool-header-main { display: none; }
      .tool-nav-toggler { display: inline-flex; align-items: center; justify-content: center; }
      .tool-nav-panel {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 1090;
        background: #fff;
        border-bottom: 1px solid #e5e7eb;
        box-shadow: 0 8px 20px rgba(2, 6, 23, 0.12);
        padding: 0.5rem 0.75rem;
      }
      .tool-global-nav { display: flex; flex-wrap: wrap; gap: 0.35rem; justify-content: flex-start; overflow-x: visible; }
      .tool-nav-btn { flex: 1 1 calc(50% - 0.35rem); border-radius: 0.5rem; }
      .tool-header-reg, .tool-header-lang { font-size: 1rem; }
    }
    @media (max-width: 575.98px) {
      .tool-footer-inner { padding-bottom: 1.2rem; }
    }
  `;
  document.head.appendChild(style);
}

function isEmbedDetailContext() {
  const params = new URLSearchParams(window.location.search);
  return params.get('embed') === 'detail';
}

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function currentPageKey(pathname) {
  if (pathname.endsWith('/pokedex.html') || pathname.includes('/pokedex-')) return 'pokedex';
  if (pathname.endsWith('/box-party.html')) return 'box';
  if (pathname.endsWith('/damage-calc.html')) return 'damage';
  if (pathname.endsWith('/speed-adjust.html')) return 'speed';
  return '';
}

function readLang() {
  try {
    const lang = localStorage.getItem(TOOL_LAYOUT_LANG_KEY);
    if (lang === 'ja' || lang === 'en') return lang;
  } catch (_error) {
    // ignore
  }
  return 'ja';
}

function readRegulation() {
  try {
    const value = localStorage.getItem(TOOL_LAYOUT_REGULATION_KEY);
    if (value === 'M-A') return value;
  } catch (_error) {
    // ignore
  }
  return 'M-A';
}

function writeRegulation(value) {
  const nextValue = value === 'M-A' ? value : 'M-A';
  try {
    localStorage.setItem(TOOL_LAYOUT_REGULATION_KEY, nextValue);
  } catch (_error) {
    // ignore
  }
  window.dispatchEvent(new CustomEvent('poketools:regulationchange', {
    detail: { regulation: nextValue },
  }));
}

function buildLangToggle() {
  const isJa = readLang() === 'ja';
  return `
    <div class="tool-lang-toggle" id="lang-tabs" role="group" aria-label="language toggle">
      <button class="nav-link ${isJa ? 'active' : ''}" data-lang="ja" type="button">JP</button>
      <span class="tool-lang-separator" aria-hidden="true">|</span>
      <button class="nav-link ${isJa ? '' : 'active'}" data-lang="en" type="button">EN</button>
    </div>
  `;
}

function buildNavigationTabs() {
  const pageKey = currentPageKey(window.location.pathname);
  const navItems = [
    { key: 'pokedex', href: '/pokedex.html', icon: 'search', label: '図鑑' },
    { key: 'box', href: '/box-party.html', icon: 'box-seam', label: 'ボックス' },
    { key: 'damage', href: '/damage-calc.html', icon: 'calculator', label: 'ダメージ計算' },
    { key: 'speed', href: '/speed-adjust.html', icon: 'speedometer2', label: '素早さ比較' },
  ];

  const nav = navItems.map(item => {
    const active = item.key === pageKey;
    return `<a class="btn ${active ? 'btn-secondary active' : 'btn-outline-secondary'} tool-nav-btn d-inline-flex align-items-center gap-1" ${active ? 'aria-current="page"' : ''} href="${item.href}"><i class="bi bi-${item.icon}"></i><span>${item.label}</span></a>`;
  }).join('');

  return `<nav class="tool-global-nav" aria-label="global navigation">${nav}</nav>`;
}

function buildRegulationControl() {
  const lang = readLang();
  const regulation = readRegulation();
  const regulationLabel = lang === 'ja' ? 'レギュ' : 'Reg';
  return `
    <label class="tool-regulation-control" for="tool-regulation-select" aria-label="対象レギュレーション">
      <span class="tool-regulation-label">${regulationLabel}</span>
      <select id="tool-regulation-select" class="tool-regulation-select" name="regulation">
        <option value="M-A" ${regulation === 'M-A' ? 'selected' : ''}>MA-1</option>
      </select>
    </label>
  `;
}

function mountHeader() {
  const headerEl = document.querySelector('.calc-header') || document.querySelector('header');
  if (!headerEl) return;
  const hasFluid = Boolean(headerEl.querySelector('.container-fluid'));
  const containerClass = hasFluid ? 'container-fluid' : 'container';
  headerEl.innerHTML = `<div class="${containerClass}"></div>`;
  const headerContainer = headerEl.firstElementChild;

  if (!headerEl.classList.contains('calc-header')) {
    headerEl.classList.add('calc-header', 'py-2');
  }

  headerContainer.innerHTML = `
    <nav class="tool-navbar" aria-label="tool global navigation" style="position:relative">
      <div class="tool-header-row">
        <a class="tool-header-brand" href="/box-party.html" aria-label="リスポケ ボックスへ">
          <span class="calc-title mb-0">リスポケ</span>
        </a>
        <div class="tool-header-right">
          <div class="tool-header-main" aria-label="tool controls">
            ${buildNavigationTabs()}
          </div>
          <div class="tool-header-reg" aria-label="regulation controls">
            ${buildRegulationControl()}
          </div>
          <div class="tool-header-lang" aria-label="language controls">
            ${buildLangToggle()}
          </div>
          <button class="tool-nav-toggler" id="tool-nav-toggler" type="button" aria-label="ナビゲーション" aria-expanded="false">
            <i class="bi bi-list" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="tool-nav-panel is-collapsed" id="tool-nav-panel" aria-label="ページナビゲーション">
        ${buildNavigationTabs()}
      </div>
    </nav>
  `;

  const regulationSelect = document.getElementById('tool-regulation-select');
  const regulationLabel = document.querySelector('.tool-regulation-label');
  const syncRegulationLabel = () => {
    if (!regulationLabel) return;
    const label = readLang() === 'ja' ? 'レギュ' : 'Reg';
    regulationLabel.innerHTML = `<i class="bi bi-list-ul" aria-hidden="true"></i>${label}`;
  };
  if (regulationSelect) {
    regulationSelect.value = readRegulation();
    regulationSelect.addEventListener('change', event => {
      const nextValue = String(event.target.value || 'M-A');
      writeRegulation(nextValue);
      regulationSelect.value = readRegulation();
    });
  }
  syncRegulationLabel();
  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang;
      if (!lang || (lang !== 'ja' && lang !== 'en')) return;
      try {
        localStorage.setItem(TOOL_LAYOUT_LANG_KEY, lang);
      } catch (_error) {
        // ignore
      }
      document.querySelectorAll('#lang-tabs [data-lang]').forEach(node => {
        node.classList.toggle('active', node.dataset.lang === lang);
      });
      syncRegulationLabel();
      window.dispatchEvent(new CustomEvent('poketools:langchange', { detail: { lang } }));
    });
  });

  const toggler = document.getElementById('tool-nav-toggler');
  const navPanel = document.getElementById('tool-nav-panel');
  if (toggler && navPanel) {
    const closePanel = () => {
      navPanel.classList.add('is-collapsed');
      toggler.setAttribute('aria-expanded', 'false');
    };
    toggler.addEventListener('click', () => {
      const collapsed = navPanel.classList.toggle('is-collapsed');
      toggler.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });
    navPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closePanel();
      });
    });
    document.addEventListener('click', event => {
      if (navPanel.classList.contains('is-collapsed')) return;
      const target = event.target;
      if (navPanel.contains(target) || toggler.contains(target)) return;
      closePanel();
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      if (navPanel.classList.contains('is-collapsed')) return;
      closePanel();
    });
  }
}
async function loadLayoutConfig() {
  try {
    const response = await fetch(TOOL_LAYOUT_CONFIG_URL, { cache: 'no-store' });
    if (!response.ok) return { ...DEFAULT_LAYOUT_CONFIG };
    const config = await response.json();
    return {
      ...DEFAULT_LAYOUT_CONFIG,
      ...(config && typeof config === 'object' ? config : {}),
    };
  } catch (_error) {
    return { ...DEFAULT_LAYOUT_CONFIG };
  }
}

function mountFooter(config = DEFAULT_LAYOUT_CONFIG) {
  if (document.getElementById('tool-footer')) return;
  const footer = document.createElement('footer');
  footer.id = 'tool-footer';
  footer.className = 'tool-footer';
  const footerOwner = String(config?.footerOwner || DEFAULT_LAYOUT_CONFIG.footerOwner);
  footer.innerHTML = `
    <div class="tool-footer-inner">
      <span>Pokemon and related names are trademarks of Nintendo, Creatures, and GAME FREAK.</span>
      <span class="tool-footer-copyright">© ${new Date().getFullYear()} ${escapeHtml(footerOwner)}. All rights reserved.</span>
    </div>
  `;
  document.body.appendChild(footer);
}

async function initializeToolLayout() {
  ensureGlobalFont();
  if (isEmbedDetailContext()) return;
  ensureHeaderStyles();
  const layoutConfig = await loadLayoutConfig();
  mountHeader();
  mountFooter(layoutConfig);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeToolLayout);
} else {
  initializeToolLayout();
}
