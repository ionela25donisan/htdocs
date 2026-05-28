// ══════════════════════════════════════════════
//  maintenance.js — Gestionare mentenanță
// ══════════════════════════════════════════════

function populateMaintSelect() {
  const sel = document.getElementById('mnt-apartment');
  if (!sel) return;
  const opts = load('apartments').map(a => `<option value="${a.address}">${a.address}</option>`).join('');
  sel.innerHTML = '<option value="">— Selectează —</option>' + opts;
}

function openMaintenanceForm(id = null) {
  populateMaintSelect();
  document.getElementById('modal-maintenance-title').textContent = id ? 'Editează intervenție' : 'Intervenție nouă';
  ['mnt-id','mnt-desc','mnt-cost','mnt-vendor','mnt-notes'].forEach(f => {
    document.getElementById(f).value = '';
  });
  document.getElementById('mnt-priority').selectedIndex = 1;
  document.getElementById('mnt-status').selectedIndex   = 0;
  document.getElementById('mnt-date').value = new Date().toISOString().slice(0,10);

  if (id) {
    const m = load('maintenance').find(x => x.id === id);
    if (m) {
      document.getElementById('mnt-id').value        = m.id;
      document.getElementById('mnt-apartment').value = m.apartment;
      document.getElementById('mnt-date').value      = m.date;
      document.getElementById('mnt-desc').value      = m.desc;
      document.getElementById('mnt-priority').value  = m.priority;
      document.getElementById('mnt-status').value    = m.status;
      document.getElementById('mnt-cost').value      = m.cost;
      document.getElementById('mnt-vendor').value    = m.vendor || '';
      document.getElementById('mnt-notes').value     = m.notes  || '';
    }
  }
  openModal('maintenance');
}

function saveMaintenance() {
  const apartment = document.getElementById('mnt-apartment').value;
  const desc      = document.getElementById('mnt-desc').value.trim();
  if (!apartment || !desc) {
    toast('Apartamentul și descrierea sunt obligatorii!', 'error');
    return;
  }

  const id   = document.getElementById('mnt-id').value;
  const data = {
    apartment,
    date:     document.getElementById('mnt-date').value,
    desc,
    priority: document.getElementById('mnt-priority').value,
    status:   document.getElementById('mnt-status').value,
    cost:     +document.getElementById('mnt-cost').value || 0,
    vendor:   document.getElementById('mnt-vendor').value,
    notes:    document.getElementById('mnt-notes').value,
  };

  const arr = load('maintenance');
  if (id) {
    const i = arr.findIndex(x => x.id === +id);
    if (i > -1) arr[i] = { ...arr[i], ...data };
    toast('Intervenție actualizată!', 'success');
  } else {
    data.id = nextId(arr);
    arr.push(data);
    toast('Intervenție adăugată!', 'success');
  }
  save('maintenance', arr);
  closeModal('maintenance');
  renderMaintenance();
  updateNavCounts();
}

function deleteMaintenance(id) {
  if (!confirm('Sigur ștergi această intervenție?')) return;
  save('maintenance', load('maintenance').filter(x => x.id !== id));
  renderMaintenance();
  updateNavCounts();
  toast('Intervenție ștearsă.', 'error');
}

function renderMaintenance() {
  const search   = document.getElementById('maintSearch')?.value.toLowerCase() || '';
  const status   = document.getElementById('maintStatusFilter')?.value   || '';
  const priority = document.getElementById('maintPriorityFilter')?.value || '';

  const ord = { 'Urgentă':0, 'Ridicată':1, 'Medie':2, 'Scăzută':3 };
  const arr = load('maintenance').filter(m => {
    const t = (m.apartment + ' ' + m.desc).toLowerCase();
    return t.includes(search)
      && (!status   || m.status   === status)
      && (!priority || m.priority === priority);
  }).sort((a,b) => (ord[a.priority] ?? 9) - (ord[b.priority] ?? 9));

  const tbody = document.getElementById('maintenanceBody');
  if (!tbody) return;

  if (!arr.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="7">Nicio intervenție găsită.</td></tr>';
    return;
  }

  tbody.innerHTML = arr.map(m => `
    <tr>
      <td style="max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${m.apartment}">
        <strong>${m.apartment}</strong>
      </td>
      <td>${m.desc}</td>
      <td>${m.date}</td>
      <td><span style="font-weight:700;color:${priorityColor(m.priority)}">${m.priority}</span></td>
      <td>${statusChip(m.status)}</td>
      <td>${fmtMoney(m.cost)} RON</td>
      <td>
        <div class="actions">
          <button class="btn btn-secondary btn-sm" onclick="openMaintenanceForm(${m.id})" title="Editează">${icon('pencil')}</button>
          <button class="btn btn-danger btn-sm" onclick="deleteMaintenance(${m.id})" title="Șterge">${icon('trash-2')}</button>
        </div>
      </td>
    </tr>`).join('');
  refreshIcons();
}
