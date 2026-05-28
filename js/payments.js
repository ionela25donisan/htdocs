// ══════════════════════════════════════════════
//  payments.js — Gestionare plăți
// ══════════════════════════════════════════════

function openPaymentForm(id = null) {
  const aps = load('apartments').map(a => `<option value="${a.address}">${a.address}</option>`).join('');
  document.getElementById('pay-apartment').innerHTML = '<option value="">— Selectează —</option>' + aps;
  document.getElementById('modal-payment-title').textContent = id ? 'Editează plată' : 'Plată nouă';

  ['pay-id','pay-amount','pay-notes'].forEach(f => document.getElementById(f).value = '');
  document.getElementById('pay-type').selectedIndex   = 0;
  document.getElementById('pay-method').selectedIndex = 0;
  document.getElementById('pay-date').value = new Date().toISOString().slice(0,10);

  if (id) {
    const p = load('payments').find(x => x.id === id);
    if (p) {
      document.getElementById('pay-id').value        = p.id;
      document.getElementById('pay-apartment').value = p.apartment;
      document.getElementById('pay-type').value      = p.type;
      document.getElementById('pay-amount').value    = p.amount;
      document.getElementById('pay-date').value      = p.date;
      document.getElementById('pay-method').value    = p.method || 'Transfer bancar';
      document.getElementById('pay-notes').value     = p.notes || '';
    }
  }
  openModal('payment');
}

function savePayment() {
  const apartment = document.getElementById('pay-apartment').value;
  const amount    = +document.getElementById('pay-amount').value;
  const date      = document.getElementById('pay-date').value;
  if (!apartment || !amount || !date) {
    toast('Completați toate câmpurile obligatorii!', 'error');
    return;
  }

  const id   = document.getElementById('pay-id').value;
  const data = {
    apartment,
    type:   document.getElementById('pay-type').value,
    amount, date,
    method: document.getElementById('pay-method').value,
    notes:  document.getElementById('pay-notes').value,
  };

  const arr = load('payments');
  if (id) {
    const i = arr.findIndex(x => x.id === +id);
    if (i > -1) arr[i] = { ...arr[i], ...data };
    toast('Plată actualizată!', 'success');
  } else {
    data.id = nextId(arr);
    arr.push(data);
    toast('Plată adăugată!', 'success');
  }
  save('payments', arr);
  closeModal('payment');
  renderPayments();
  renderFinanceSummary();
  updateNavCounts();
}

function deletePayment(id) {
  if (!confirm('Sigur ștergi această plată?')) return;
  save('payments', load('payments').filter(x => x.id !== id));
  renderPayments();
  renderFinanceSummary();
  updateNavCounts();
  toast('Plată ștearsă.', 'error');
}

function populatePayMonths() {
  const sel = document.getElementById('payMonthFilter');
  if (!sel) return;
  const months = [...new Set(
    load('payments').map(p => p.date?.slice(0,7)).filter(Boolean)
  )].sort().reverse();
  sel.innerHTML = '<option value="">Toate lunile</option>'
    + months.map(m => `<option value="${m}">${m}</option>`).join('');
}

function renderPayments() {
  const search = document.getElementById('paySearch')?.value.toLowerCase() || '';
  const type   = document.getElementById('payTypeFilter')?.value || '';
  const month  = document.getElementById('payMonthFilter')?.value || '';

  const arr = load('payments').filter(p => {
    const t = (p.apartment + ' ' + p.type + ' ' + p.notes).toLowerCase();
    return t.includes(search)
      && (!type  || p.type === type)
      && (!month || (p.date || '').startsWith(month));
  }).sort((a, b) => b.date?.localeCompare(a.date));

  const tbody = document.getElementById('paymentsBody');
  if (!tbody) return;

  if (!arr.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="7">Nicio plată găsită.</td></tr>';
    return;
  }

  tbody.innerHTML = arr.map(p => `
    <tr>
      <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${p.apartment}">
        <strong>${p.apartment}</strong>
      </td>
      <td>${p.type}</td>
      <td style="font-weight:600;color:var(--green);">${fmtMoney(p.amount)} RON</td>
      <td>${p.date}</td>
      <td>${p.method || '—'}</td>
      <td>${p.notes || '—'}</td>
      <td>
        <div class="actions">
          <button class="btn btn-secondary btn-sm" onclick="openPaymentForm(${p.id})" title="Editează">${icon('pencil')}</button>
          <button class="btn btn-danger btn-sm" onclick="deletePayment(${p.id})" title="Șterge">${icon('trash-2')}</button>
        </div>
      </td>
    </tr>`).join('');
  refreshIcons();
}

function renderFinanceSummary() {
  const all   = load('payments');
  const total = all.reduce((s, p) => s + (+p.amount || 0), 0);
  const rents = all.filter(p => p.type === 'Chirie').reduce((s,p) => s + (+p.amount||0), 0);
  const sales = all.filter(p => p.type === 'Tranzacție vânzare').reduce((s,p) => s + (+p.amount||0), 0);
  const other = total - rents - sales;
  const el = document.getElementById('finance-summary');
  if (!el) return;
  el.innerHTML = `
    <div class="finance-item income">
      <div class="fi-label">Total încasări</div>
      <div class="fi-val">${fmtMoney(total)}</div>
      <div style="font-size:0.75rem;color:var(--muted)">RON</div>
    </div>
    <div class="finance-item income">
      <div class="fi-label">Chirii</div>
      <div class="fi-val">${fmtMoney(rents)}</div>
      <div style="font-size:0.75rem;color:var(--muted)">RON</div>
    </div>
    <div class="finance-item">
      <div class="fi-label">Tranzacții vânzare</div>
      <div class="fi-val">${fmtMoney(sales)}</div>
      <div style="font-size:0.75rem;color:var(--muted)">RON</div>
    </div>
    <div class="finance-item">
      <div class="fi-label">Altele</div>
      <div class="fi-val">${fmtMoney(other)}</div>
      <div style="font-size:0.75rem;color:var(--muted)">RON</div>
    </div>`;
  refreshIcons();
}
