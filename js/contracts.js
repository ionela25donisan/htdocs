// ══════════════════════════════════════════════
//  contracts.js — Gestionare contracte
// ══════════════════════════════════════════════

function openContractForm(id = null) {
  const aps  = load('apartments').map(a => `<option value="${a.address}">${a.address}</option>`).join('');
  const tens = load('tenants').map(t => `<option value="${t.first} ${t.last}">${t.first} ${t.last}</option>`).join('');
  document.getElementById('con-apartment').innerHTML = '<option value="">— Selectează —</option>' + aps;
  document.getElementById('con-tenant').innerHTML    = '<option value="">— Selectează —</option>' + tens;
  document.getElementById('modal-contract-title').textContent = id ? 'Editează contract' : 'Contract nou';

  ['con-id','con-number','con-start','con-end','con-value','con-deposit','con-notes'].forEach(f => {
    document.getElementById(f).value = '';
  });
  document.getElementById('con-type').selectedIndex   = 0;
  document.getElementById('con-status').selectedIndex = 0;

  if (id) {
    const c = load('contracts').find(x => x.id === id);
    if (c) {
      document.getElementById('con-id').value        = c.id;
      document.getElementById('con-apartment').value = c.apartment;
      document.getElementById('con-tenant').value    = c.tenant || '';
      document.getElementById('con-type').value      = c.type;
      document.getElementById('con-number').value    = c.number || '';
      document.getElementById('con-start').value     = c.start;
      document.getElementById('con-end').value       = c.end || '';
      document.getElementById('con-value').value     = c.value || '';
      document.getElementById('con-deposit').value   = c.deposit || '';
      document.getElementById('con-status').value    = c.status;
      document.getElementById('con-notes').value     = c.notes || '';
    }
  }
  openModal('contract');
}

function saveContract() {
  const apartment = document.getElementById('con-apartment').value;
  const start     = document.getElementById('con-start').value;
  if (!apartment || !start) {
    toast('Apartamentul și data de început sunt obligatorii!', 'error');
    return;
  }

  const id   = document.getElementById('con-id').value;
  const data = {
    apartment,
    tenant:  document.getElementById('con-tenant').value,
    type:    document.getElementById('con-type').value,
    number:  document.getElementById('con-number').value,
    start,
    end:     document.getElementById('con-end').value,
    value:   +document.getElementById('con-value').value   || 0,
    deposit: +document.getElementById('con-deposit').value || 0,
    status:  document.getElementById('con-status').value,
    notes:   document.getElementById('con-notes').value,
  };

  const arr = load('contracts');
  if (id) {
    const i = arr.findIndex(x => x.id === +id);
    if (i > -1) arr[i] = { ...arr[i], ...data };
    toast('Contract actualizat!', 'success');
  } else {
    data.id = nextId(arr);
    arr.push(data);
    toast('Contract adăugat!', 'success');
  }
  save('contracts', arr);
  closeModal('contract');
  renderContracts();
  updateNavCounts();
}

function deleteContract(id) {
  if (!confirm('Sigur ștergi acest contract?')) return;
  save('contracts', load('contracts').filter(x => x.id !== id));
  renderContracts();
  updateNavCounts();
  toast('Contract șters.', 'error');
}

function renderContracts() {
  const search = document.getElementById('conSearch')?.value.toLowerCase() || '';
  const type   = document.getElementById('conTypeFilter')?.value || '';
  const status = document.getElementById('conStatusFilter')?.value || '';
  const today  = new Date().toISOString().slice(0,10);

  const arr = load('contracts').filter(c => {
    const t          = (c.apartment + ' ' + c.tenant + ' ' + c.number).toLowerCase();
    const autoStatus = c.end && c.end < today ? 'Expirat' : c.status;
    return t.includes(search)
      && (!type   || c.type       === type)
      && (!status || autoStatus   === status);
  });

  const tbody    = document.getElementById('contractsBody');
  const alertBox = document.getElementById('contract-alerts');
  if (!tbody) return;

  // Alerte expirare
  const expiring = load('contracts').filter(c => {
    if (!c.end) return false;
    const d = Math.ceil((new Date(c.end) - new Date()) / 86400000);
    return d >= 0 && d <= 30 && c.status === 'Activ';
  });
  const expired = load('contracts').filter(c => c.end && c.end < today && c.status === 'Activ');
  let alerts = '';
  if (expired.length)  alerts += `<div class="alert alert-warning">${icon('triangle-alert')} <strong>${expired.length} contract(e) expirat(e)</strong> — verificați și actualizați statusul.</div>`;
  if (expiring.length) alerts += `<div class="alert alert-info">${icon('clock')} <strong>${expiring.length} contract(e)</strong> expiră în mai puțin de 30 de zile.</div>`;
  if (alertBox) alertBox.innerHTML = alerts;
  refreshIcons();

  if (!arr.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="8">Niciun contract găsit.</td></tr>';
    return;
  }

  tbody.innerHTML = arr.map(c => {
    const autoStatus = c.end && c.end < today ? 'Expirat' : c.status;
    return `<tr>
      <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
        <strong title="${c.apartment}">${c.apartment}</strong>
      </td>
      <td>${c.tenant || '—'}</td>
      <td>${c.type}</td>
      <td>${c.start}</td>
      <td>${c.end || '—'}</td>
      <td>${c.value > 0 ? fmtMoney(c.value) + ' RON' : '—'}</td>
      <td>${statusChip(autoStatus)}</td>
      <td>
        <div class="actions">
          <button class="btn btn-secondary btn-sm" onclick="openContractForm(${c.id})">${icon('pencil')} Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteContract(${c.id})" title="Șterge">${icon('trash-2')}</button>
        </div>
      </td>
    </tr>`;
  }).join('');
  refreshIcons();
}
