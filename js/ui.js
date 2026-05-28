// ══════════════════════════════════════════════
//  ui.js — Navigare, modals, toast, helpers UI
// ══════════════════════════════════════════════

function icon(name, className = '') {
  return `<i data-lucide="${name}"${className ? ` class="${className}"` : ''}></i>`;
}

function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}

/* ── Navigare secțiuni ── */
function showSection(name) {
  const user = getCurrentUser();
  if (user?.role !== 'admin' && ['dashboard', 'apartments', 'tenants', 'contracts', 'payments', 'maintenance'].includes(name)) {
    name = 'home';
  }
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const sec = document.getElementById('section-' + name);
  if (sec) sec.classList.add('active');
  const btn = document.querySelector(`[data-section="${name}"]`);
  if (btn) btn.classList.add('active');

  // Render secțiunea activată
  if (name === 'home')         renderHomeListings();
  if (name === 'dashboard')    renderDashboard();
  if (name === 'apartments')   renderApartments();
  if (name === 'tenants')      { populateTenantApartments(); renderTenants(); }
  if (name === 'contracts')    renderContracts();
  if (name === 'payments')     { renderPayments(); renderFinanceSummary(); populatePayMonths(); }
  if (name === 'listings')     renderListings();
  if (name === 'favorites')    renderFavorites();
  if (name === 'messages')     renderMessages();
  if (name === 'maintenance')  { populateMaintSelect(); renderMaintenance(); }
  refreshIcons();
}

function updateNavigationForRole() {
  const user = getCurrentUser();
  const isAdmin = user?.role === 'admin';
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = isAdmin ? '' : 'none';
  });
}

/* ── Toast notifications ── */
function toast(msg, type = '') {
  const d = document.createElement('div');
  d.className = 'toast-msg ' + type;
  d.textContent = msg;
  document.getElementById('toast').appendChild(d);
  setTimeout(() => d.remove(), 3000);
}

/* ── Modals ── */
function openModal(name)  { document.getElementById('modal-' + name)?.classList.add('open'); refreshIcons(); }
function closeModal(name) { document.getElementById('modal-' + name)?.classList.remove('open'); }

// Închide modal la click pe overlay
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => {
      if (e.target === o) o.classList.remove('open');
    });
  });
  // Escape key închide orice modal deschis
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(o => o.classList.remove('open'));
    }
  });
});

/* ── Status chip ── */
function statusChip(s) {
  const map = {
    'Liber':           'chip-liber',
    'Ocupat':          'chip-ocupat',
    'De vânzare':      'chip-vanzare',
    'Rezervat':        'chip-rezervat',
    'În mentenanță':   'chip-mentenanta',
    'Vândut':          'chip-vandut',
    'Închiriat':       'chip-inchiriat',
    'Activ':           'chip-liber',
    'Expirat':         'chip-ocupat',
    'Reziliat':        'chip-vandut',
    'Programat':       'chip-rezervat',
    'În desfășurare':  'chip-mentenanta',
    'Finalizat':       'chip-vandut',
    'Anulat':          'chip-vandut',
    'Prospect':        'chip-rezervat',
    'Inactiv':         'chip-vandut',
    'Retras':          'chip-vandut',
  };
  return `<span class="status-chip ${map[s] || 'chip-vandut'}">${s}</span>`;
}

/* ── Culoare prioritate mentenanță ── */
function priorityColor(p) {
  return {
    'Urgentă':  'var(--red)',
    'Ridicată': 'var(--gold)',
    'Medie':    'var(--blue)',
    'Scăzută':  'var(--green)',
  }[p] || 'var(--muted)';
}

/* ── Formatare sumă ── */
function fmtMoney(n) {
  if (!n && n !== 0) return '0';
  return Number(n).toLocaleString('ro-RO', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/* ── Actualizare contoare nav ── */
function updateNavCounts() {
  const el = id => document.getElementById(id);
  if (el('cnt-apartments')) el('cnt-apartments').textContent = load('apartments').length;
  if (el('cnt-tenants')) el('cnt-tenants').textContent = load('tenants').length;
  if (el('cnt-contracts')) el('cnt-contracts').textContent = load('contracts').length;
  if (el('cnt-payments')) el('cnt-payments').textContent = load('payments').length;
  if (el('cnt-listings')) el('cnt-listings').textContent = load('listings').length;
  if (el('cnt-favorites')) el('cnt-favorites').textContent = load('favorites').length;
  if (el('cnt-messages')) el('cnt-messages').textContent = typeof getMessagesForCurrentUser === 'function' ? getMessagesForCurrentUser().length : load('messages').length;
  if (el('cnt-maintenance')) el('cnt-maintenance').textContent = load('maintenance')
    .filter(m => m.status !== 'Finalizat' && m.status !== 'Anulat').length;
}
