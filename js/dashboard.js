// ══════════════════════════════════════════════
//  dashboard.js — Randare dashboard principal
// ══════════════════════════════════════════════

function renderDashboard() {
  const apts   = load('apartments');
  const tens   = load('tenants');
  const cons   = load('contracts');
  const pays   = load('payments');
  const maints = load('maintenance');
  const today  = new Date().toISOString().slice(0,10);

  const totalApts    = apts.length;
  const freeApts     = apts.filter(a => a.status === 'Liber').length;
  const forSale      = apts.filter(a => a.status === 'De vânzare').length;
  const activeTens   = tens.filter(t => t.status === 'Activ').length;
  const activeCons   = cons.filter(c => c.status === 'Activ').length;
  const expiredCons  = cons.filter(c => c.end && c.end < today).length;
  const totalRevenue = pays.reduce((s, p) => s + (+p.amount || 0), 0);
  const openMaint    = maints.filter(m => m.status !== 'Finalizat' && m.status !== 'Anulat').length;

  document.getElementById('dash-stats').innerHTML = `
    <div class="stat-card purple">
      <div class="stat-label">Total apartamente</div>
      <div class="stat-value">${totalApts}</div>
      <div class="stat-sub">${freeApts} libere</div>
    </div>
    <div class="stat-card green">
      <div class="stat-label">Chiriași activi</div>
      <div class="stat-value">${activeTens}</div>
    </div>
    <div class="stat-card gold">
      <div class="stat-label">De vânzare</div>
      <div class="stat-value">${forSale}</div>
    </div>
    <div class="stat-card blue">
      <div class="stat-label">Contracte active</div>
      <div class="stat-value">${activeCons}</div>
      <div class="stat-sub">${expiredCons} expirate</div>
    </div>
    <div class="stat-card green">
      <div class="stat-label">Total încasări</div>
      <div class="stat-value" style="font-size:1.8rem;">${fmtMoney(totalRevenue)}</div>
      <div class="stat-sub">RON</div>
    </div>
    <div class="stat-card red">
      <div class="stat-label">Mentenanță deschisă</div>
      <div class="stat-value">${openMaint}</div>
    </div>`;

  // Apartamente recente
  const recentApts = [...apts].slice(-4).reverse();
  document.getElementById('dash-apartments').innerHTML = recentApts.length
    ? recentApts.map(a => `
        <div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:14px 16px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
          <div>
            <div style="font-weight:600;font-size:0.9rem;">${a.address}</div>
            <div style="font-size:0.8rem;color:var(--muted);margin-top:2px;">${a.type} · ${a.rooms} cam. · ${a.area} mp</div>
          </div>
          <div>${statusChip(a.status)}</div>
        </div>`).join('')
    : '<div style="color:var(--muted);font-style:italic;">Niciun apartament.</div>';

  // Plăți recente
  const recentPays = [...pays].sort((a,b) => b.date?.localeCompare(a.date)).slice(0,5);
  document.getElementById('dash-payments').innerHTML = recentPays.length
    ? recentPays.map(p => `
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:0.87rem;">
          <div>
            <strong>${p.type}</strong>
            <div style="color:var(--muted);font-size:0.78rem;">${p.apartment.slice(0,45)}…</div>
          </div>
          <div style="font-weight:700;color:var(--green);white-space:nowrap;">${fmtMoney(p.amount)} RON</div>
        </div>`).join('')
    : '<div style="color:var(--muted);font-style:italic;">Nicio plată.</div>';

  // Contracte care expiră / expirate
  const expiring = cons.filter(c => {
    if (!c.end) return false;
    const d = Math.ceil((new Date(c.end) - new Date()) / 86400000);
    return d >= 0 && d <= 60;
  });
  const expired2  = cons.filter(c => c.end && c.end < today && c.status === 'Activ');
  const alertsArr = [
    ...expired2.map(c =>
      `<div class="alert alert-warning">${icon('triangle-alert')} <strong>Contract expirat:</strong> ${c.apartment} (${c.end})</div>`),
    ...expiring.map(c => {
      const d = Math.ceil((new Date(c.end) - new Date()) / 86400000);
      return `<div class="alert alert-info">${icon('clock')} <strong>${c.type}</strong> — ${c.apartment.slice(0,40)}… expiră în <strong>${d} zile</strong></div>`;
    }),
  ];
  document.getElementById('dash-contracts-alert').innerHTML =
    alertsArr.join('') || '<div style="color:var(--muted);font-style:italic;">Niciun contract care expiră curând.</div>';
  refreshIcons();
}
