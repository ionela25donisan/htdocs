// ══════════════════════════════════════════════
//  tenants.js — Gestionare chiriași
// ══════════════════════════════════════════════

function populateTenantApartments() {
  const sel = document.getElementById('ten-apartment');
  if (!sel) return;
  const opts = load('apartments').map(a => `<option value="${a.address}">${a.address}</option>`).join('');
  sel.innerHTML = '<option value="">— Niciun apartament —</option>' + opts;
}

function openTenantForm(id = null) {
  populateTenantApartments();
  document.getElementById('modal-tenant-title').textContent = id ? 'Editează chiriaș' : 'Chiriaș nou';
  ['ten-id','ten-first','ten-last','ten-email','ten-phone','ten-cnp','ten-notes'].forEach(f => {
    document.getElementById(f).value = '';
  });
  document.getElementById('ten-status').selectedIndex    = 0;
  document.getElementById('ten-apartment').value = '';

  if (id) {
    const t = load('tenants').find(x => x.id === id);
    if (t) {
      document.getElementById('ten-id').value        = t.id;
      document.getElementById('ten-first').value     = t.first;
      document.getElementById('ten-last').value      = t.last;
      document.getElementById('ten-email').value     = t.email;
      document.getElementById('ten-phone').value     = t.phone || '';
      document.getElementById('ten-cnp').value       = t.cnp || '';
      document.getElementById('ten-apartment').value = t.apartment || '';
      document.getElementById('ten-status').value    = t.status;
      document.getElementById('ten-notes').value     = t.notes || '';
    }
  }
  openModal('tenant');
}

function saveTenant() {
  const first = document.getElementById('ten-first').value.trim();
  const last  = document.getElementById('ten-last').value.trim();
  if (!first || !last) { toast('Prenumele și numele sunt obligatorii!', 'error'); return; }

  const id   = document.getElementById('ten-id').value;
  const data = {
    first, last,
    email:     document.getElementById('ten-email').value.trim(),
    phone:     document.getElementById('ten-phone').value.trim(),
    cnp:       document.getElementById('ten-cnp').value.trim(),
    apartment: document.getElementById('ten-apartment').value,
    status:    document.getElementById('ten-status').value,
    notes:     document.getElementById('ten-notes').value,
  };

  const arr = load('tenants');
  if (id) {
    const i = arr.findIndex(x => x.id === +id);
    if (i > -1) arr[i] = { ...arr[i], ...data };
    toast('Chiriaș actualizat!', 'success');
  } else {
    data.id = nextId(arr);
    arr.push(data);
    toast('Chiriaș adăugat!', 'success');
  }
  save('tenants', arr);
  closeModal('tenant');
  renderTenants();
  updateNavCounts();
}

function deleteTenant(id) {
  if (!confirm('Sigur ștergi acest chiriaș?')) return;
  save('tenants', load('tenants').filter(x => x.id !== id));
  renderTenants();
  updateNavCounts();
  toast('Chiriaș șters.', 'error');
}

function renderTenants() {
  const search = document.getElementById('tenSearch')?.value.toLowerCase() || '';
  const status = document.getElementById('tenStatusFilter')?.value || '';

  const arr = load('tenants').filter(t => {
    const full = (t.first + ' ' + t.last + ' ' + t.email).toLowerCase();
    return full.includes(search) && (!status || t.status === status);
  });

  const tbody = document.getElementById('tenantsBody');
  if (!tbody) return;

  if (!arr.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="7">Niciun chiriaș găsit.</td></tr>';
    return;
  }

  tbody.innerHTML = arr.map(t => `
    <tr>
      <td><strong>${t.first} ${t.last}</strong></td>
      <td>${t.email}</td>
      <td>${t.phone || '—'}</td>
      <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.apartment || '<span class="text-muted">—</span>'}</td>
      <td>${t.cnp ? '●●●' + t.cnp.slice(-4) : '—'}</td>
      <td>${statusChip(t.status)}</td>
      <td>
        <div class="actions">
          <button class="btn btn-secondary btn-sm" onclick="openTenantForm(${t.id})">${icon('pencil')} Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTenant(${t.id})" title="Șterge">${icon('trash-2')}</button>
        </div>
      </td>
    </tr>`).join('');
  refreshIcons();
}
