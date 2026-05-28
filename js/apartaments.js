// ══════════════════════════════════════════════
//  apartments.js — Gestionare apartamente
// ══════════════════════════════════════════════

function openApartmentForm(id = null) {
  document.getElementById('modal-apartment-title').textContent = id ? 'Editează apartament' : 'Apartament nou';
  ['ap-id','ap-address','ap-rooms','ap-area','ap-floor','ap-year','ap-rent','ap-price','ap-amenities','ap-notes'].forEach(f => {
    document.getElementById(f).value = '';
  });
  document.getElementById('ap-type').selectedIndex = 0;
  document.getElementById('ap-status').selectedIndex = 0;

  if (id) {
    const ap = load('apartments').find(a => a.id === id);
    if (ap) {
      document.getElementById('ap-id').value        = ap.id;
      document.getElementById('ap-address').value   = ap.address;
      document.getElementById('ap-type').value      = ap.type;
      document.getElementById('ap-rooms').value     = ap.rooms;
      document.getElementById('ap-area').value      = ap.area;
      document.getElementById('ap-floor').value     = ap.floor || '';
      document.getElementById('ap-year').value      = ap.year || '';
      document.getElementById('ap-status').value    = ap.status;
      document.getElementById('ap-rent').value      = ap.rent || '';
      document.getElementById('ap-price').value     = ap.price || '';
      document.getElementById('ap-amenities').value = ap.amenities || '';
      document.getElementById('ap-notes').value     = ap.notes || '';
    }
  }
  openModal('apartment');
}

function saveApartment() {
  const address = document.getElementById('ap-address').value.trim();
  if (!address) { toast('Adresa este obligatorie!', 'error'); return; }

  const id   = document.getElementById('ap-id').value;
  const data = {
    address,
    type:      document.getElementById('ap-type').value,
    rooms:     +document.getElementById('ap-rooms').value  || 0,
    area:      +document.getElementById('ap-area').value   || 0,
    floor:     document.getElementById('ap-floor').value,
    year:      +document.getElementById('ap-year').value   || null,
    status:    document.getElementById('ap-status').value,
    rent:      +document.getElementById('ap-rent').value   || 0,
    price:     +document.getElementById('ap-price').value  || 0,
    amenities: document.getElementById('ap-amenities').value,
    notes:     document.getElementById('ap-notes').value,
  };

  const arr = load('apartments');
  if (id) {
    const i = arr.findIndex(a => a.id === +id);
    if (i > -1) arr[i] = { ...arr[i], ...data };
    toast('Apartament actualizat!', 'success');
  } else {
    data.id = nextId(arr);
    arr.push(data);
    toast('Apartament adăugat!', 'success');
  }
  save('apartments', arr);
  closeModal('apartment');
  renderApartments();
  updateNavCounts();
}

function deleteApartment(id) {
  if (!confirm('Sigur ștergi acest apartament?')) return;
  save('apartments', load('apartments').filter(a => a.id !== id));
  renderApartments();
  updateNavCounts();
  toast('Apartament șters.', 'error');
}

function renderApartments() {
  const search = document.getElementById('apSearch')?.value.toLowerCase() || '';
  const status = document.getElementById('apStatusFilter')?.value || '';
  const type   = document.getElementById('apTypeFilter')?.value   || '';

  const arr = load('apartments').filter(a => {
    return a.address.toLowerCase().includes(search)
      && (!status || a.status === status)
      && (!type   || a.type   === type);
  });

  const tbody = document.getElementById('apartmentsBody');
  if (!tbody) return;

  if (!arr.length) {
    tbody.innerHTML = '<tr class="empty-row"><td colspan="8">Niciun apartament găsit.</td></tr>';
    return;
  }

  tbody.innerHTML = arr.map(a => `
    <tr>
      <td><strong>${a.address}</strong></td>
      <td>${a.type}</td>
      <td>${a.rooms}</td>
      <td>${a.area}</td>
      <td>${statusChip(a.status)}</td>
      <td>${a.price > 0 ? fmtMoney(a.price) + ' €' : (a.rent > 0 ? fmtMoney(a.rent) + ' RON/lună' : '—')}</td>
      <td>${a.floor || '—'}</td>
      <td>
        <div class="actions">
          <button class="btn btn-secondary btn-sm" onclick="openApartmentForm(${a.id})">${icon('pencil')} Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteApartment(${a.id})" title="Șterge">${icon('trash-2')}</button>
        </div>
      </td>
    </tr>`).join('');
  refreshIcons();
}
