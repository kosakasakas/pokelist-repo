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
    .tool-header-row { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; min-height: 52px; flex-wrap: wrap; }
    .tool-header-brand { text-decoration: none; color: #111827; font-weight: 700; flex: 0 0 auto; }
    .tool-header-right { margin-left: auto; display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; min-width: 0; flex: 1 1 auto; flex-wrap: wrap; }
    .tool-header-main { flex: 1 1 auto; min-width: 0; position: relative; display: flex; justify-content: flex-end; }
    .tool-global-nav { display: flex; flex-wrap: wrap; gap: 0.35rem; justify-content: flex-end; }
    .tool-nav-btn { white-space: nowrap; }
    .tool-nav-btn.active { background: #6c757d; border-color: #6c757d; color: #fff; }
    .tool-navbar-toggler { display: none; border: 1px solid #d1d5db; border-radius: 0.5rem; background: #fff; width: 36px; height: 36px; }
    .tool-header-reg, .tool-header-lang { flex: 0 0 auto; font-size: 0.77rem; }
    .tool-regulation-control { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0; background: transparent; border: 0; margin: 0; }
    .tool-regulation-label { color: #6b7280; }
    .tool-regulation-select { border: 0; background: transparent; outline: none; appearance: auto; font-size: 0.77rem; padding: 0 0.1rem; }
    .tool-lang-toggle { display: inline-flex; align-items: center; gap: 0.24rem; border: 0; padding: 0; }
    .tool-lang-toggle .nav-link { border: 0; background: transparent; padding: 0.1rem 0.35rem; border-radius: 999px; }
    .tool-lang-toggle .nav-link.active { background: #111827; color: #fff; }
    .tool-lang-separator { color: #9ca3af; }
    @media (max-width: 991.98px) {
      .tool-navbar-toggler { display: inline-flex; align-items: center; justify-content: center; }
      .tool-header-row { flex-wrap: wrap; gap: 0.45rem; }
      .tool-header-right { gap: 0.35rem; width: 100%; }
      .tool-header-brand { font-size: 0.95rem; }
      .tool-header-main { order: 5; position: static; width: 100%; justify-content: flex-end; }
      .tool-nav-collapse.is-collapsed { display: none; }
      .tool-nav-collapse {
        position: absolute;
        left: 0;
        right: 0;
        top: calc(100% + 6px);
        z-index: 1100;
      }
      .tool-global-nav {
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(2, 6, 23, 0.12);
        background: #fff;
      }
      .tool-nav-btn {
        flex: 1 1 50%;
        border-right: 1px solid #e5e7eb;
        border-bottom: 1px solid #e5e7eb;
        padding: 0.5rem 0.55rem;
      }
      .tool-nav-btn:nth-child(2n) { border-right: 0; }
      .tool-nav-btn:nth-last-child(-n + 2) { border-bottom: 0; }
      .tool-header-reg, .tool-header-lang { font-size: 0.72rem; }
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
    return `<a class="btn btn-sm ${active ? 'btn-secondary active' : 'btn-outline-secondary'} tool-nav-btn d-inline-flex align-items-center gap-1" ${active ? 'aria-current="page"' : ''} href="${item.href}"><i class="bi bi-${item.icon}"></i><span>${item.label}</span></a>`;
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
  let headerContainer = headerEl.querySelector('.container, .container-fluid');
  if (!headerContainer) {
    headerContainer = document.createElement('div');
    headerContainer.className = 'container';
    headerEl.innerHTML = '';
    headerEl.appendChild(headerContainer);
  }

  if (!headerEl.classList.contains('calc-header')) {
    headerEl.classList.add('calc-header', 'py-2');
  }

  headerContainer.innerHTML = `
    <nav class="tool-navbar" aria-label="tool global navigation">
      <div class="tool-header-row">
        <a class="tool-header-brand" href="/box-party.html" aria-label="リスポケ ボックスへ">
          <span class="calc-title mb-0">リスポケ</span>
        </a>
        <div class="tool-header-right">
          <div class="tool-header-main" aria-label="tool controls">
            <div class="tool-nav-collapse is-collapsed" id="tool-nav-collapse">${buildNavigationTabs()}</div>
          </div>
          <div class="tool-header-reg" aria-label="regulation controls">
            ${buildRegulationControl()}
          </div>
          <div class="tool-header-lang" aria-label="language controls">
            ${buildLangToggle()}
          </div>
          <button class="tool-navbar-toggler" id="tool-nav-toggle" type="button" aria-controls="tool-nav-collapse" aria-expanded="false" aria-label="ナビゲーションを開閉">
            <i class="bi bi-list"></i>
          </button>
        </div>
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

  const toggle = document.getElementById('tool-nav-toggle');
  const collapse = document.getElementById('tool-nav-collapse');
  const mobileQuery = window.matchMedia('(max-width: 991.98px)');
  const syncMobileNav = () => {
    if (!toggle || !collapse) return;
    if (mobileQuery.matches) {
      collapse.classList.add('is-collapsed');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      collapse.classList.remove('is-collapsed');
      toggle.setAttribute('aria-expanded', 'true');
    }
  };

  if (toggle && collapse) {
    toggle.addEventListener('click', () => {
      const collapsed = collapse.classList.toggle('is-collapsed');
      toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    });
    collapse.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', () => {
        if (mobileQuery.matches) {
          collapse.classList.add('is-collapsed');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
    mobileQuery.addEventListener('change', syncMobileNav);
    syncMobileNav();
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
      <span>Data source: <a href="https://pokemonshowdown.com/" target="_blank" rel="noopener noreferrer">Pokemon Showdown</a></span>
      <span>Pokemon and related names are trademarks of Nintendo, Creatures, and GAME FREAK.</span>
      <span>© ${new Date().getFullYear()} ${escapeHtml(footerOwner)}</span>
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
