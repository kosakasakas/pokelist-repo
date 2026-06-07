const TOOL_AD_CONFIG_URL = '/layout-config.json';

function getAdKey(node) {
  const explicit = String(node.getAttribute('data-ad-key') || '').trim();
  if (explicit) return explicit;
  return String(node.getAttribute('aria-label') || '').trim();
}

async function loadAdConfig() {
  try {
    const response = await fetch(TOOL_AD_CONFIG_URL, { cache: 'no-store' });
    if (!response.ok) return null;
    const config = await response.json();
    return config?.ads || null;
  } catch (_error) {
    return null;
  }
}

function inferFormat(node) {
  if (node.classList.contains('ad-rail')) return 'vertical';
  return 'auto';
}

function ensureAdSenseScript(client) {
  if (!client) return null;
  const existing = document.querySelector('script[data-poketools-adsense="1"]');
  if (existing) return existing;

  const script = document.createElement('script');
  script.async = true;
  script.dataset.poketoolsAdsense = '1';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  return script;
}

function mountAdsenseIntoSlot(node, adClient, adSlot) {
  if (!adClient || !adSlot) return;

  node.innerHTML = '';
  const ins = document.createElement('ins');
  ins.className = 'adsbygoogle';
  ins.style.display = 'block';
  ins.style.width = '100%';
  ins.style.height = '100%';
  ins.dataset.adClient = adClient;
  ins.dataset.adSlot = adSlot;
  ins.dataset.adFormat = inferFormat(node);
  ins.dataset.fullWidthResponsive = 'true';

  node.appendChild(ins);

  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (_error) {
    // ignore push failure and keep an empty slot container
  }
}

async function initializeAds() {
  const slots = Array.from(document.querySelectorAll('.ad-slot'));
  if (!slots.length) return;

  const adConfig = await loadAdConfig();
  const isEnabled = Boolean(adConfig?.enabled);
  const provider = String(adConfig?.provider || '').toLowerCase();
  const adClient = String(adConfig?.adsenseClient || '').trim();
  const slotMap = adConfig?.slots && typeof adConfig.slots === 'object' ? adConfig.slots : {};

  if (!isEnabled || provider !== 'adsense' || !adClient) return;

  ensureAdSenseScript(adClient);

  slots.forEach(node => {
    const key = getAdKey(node);
    const adSlot = String(slotMap[key] || '').trim();
    if (!adSlot) return;
    mountAdsenseIntoSlot(node, adClient, adSlot);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAds);
} else {
  initializeAds();
}
