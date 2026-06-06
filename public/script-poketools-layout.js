const TOOL_LAYOUT_LANG_KEY = 'champions-tool-ui-lang-v1';
const TOOL_LAYOUT_REGULATION_KEY = 'champions-tool-ui-regulation-v1';
const TOOL_LAYOUT_CONFIG_URL = '/layout-config.json';
const DEFAULT_LAYOUT_CONFIG = {
  footerOwner: 'sakas_poke',
};

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
    return `<a class="tool-nav-btn inline-flex items-center justify-center gap-2 border px-3 py-2 text-xs md:text-sm font-medium transition-colors ${active ? 'active' : ''}" ${active ? 'aria-current="page"' : ''} href="${item.href}"><i class="bi bi-${item.icon}"></i><span>${item.label}</span></a>`;
  }).join('');

  return `<nav class="tool-global-nav" aria-label="global navigation">${nav}</nav>`;
}

function buildRegulationControl() {
  const lang = readLang();
  const regulation = readRegulation();
  const regulationLabel = lang === 'ja' ? 'レギュ' : 'Reg';
  return `
    <label class="tool-regulation-control" for="tool-regulation-select" aria-label="対象レギュレーション">
      <span class="tool-regulation-label"><i class="bi bi-list-ul" aria-hidden="true"></i>${regulationLabel}</span>
      <select id="tool-regulation-select" class="tool-regulation-select" name="regulation">
        <option value="M-A" ${regulation === 'M-A' ? 'selected' : ''}>M-A</option>
      </select>
      <i class="bi bi-chevron-down tool-regulation-caret" aria-hidden="true"></i>
    </label>
  `;
}

function mountHeader() {
  const headerContainer = document.querySelector('.calc-header .container');
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <nav class="tool-navbar w-full" aria-label="tool global navigation">
      <div class="tool-header-row">
        <a class="tool-header-brand" href="/box-party.html" aria-label="リスポケ ボックスへ">
          <span class="calc-title mb-0">リスポケ</span>
        </a>
        <button class="tool-navbar-toggler" id="tool-nav-toggle" type="button" aria-controls="tool-nav-collapse" aria-expanded="false" aria-label="ナビゲーションを開閉">
          <i class="bi bi-list"></i>
        </button>
        <div class="tool-header-main" aria-label="tool controls">
          <div class="tool-nav-collapse is-collapsed" id="tool-nav-collapse">${buildNavigationTabs()}</div>
        </div>
        <div class="tool-header-reg" aria-label="regulation controls">
          ${buildRegulationControl()}
        </div>
        <div class="tool-header-lang" aria-label="language controls">
          ${buildLangToggle()}
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
      window.setTimeout(syncRegulationLabel, 0);
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
  const layoutConfig = await loadLayoutConfig();
  mountHeader();
  mountFooter(layoutConfig);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeToolLayout);
} else {
  initializeToolLayout();
}
