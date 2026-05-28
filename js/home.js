// Home public - cautare si contact proprietar.

function textKey(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function listingKind(listing) {
  const type = textKey(listing.type);
  if (type.includes('vanzare')) return 'sale';
  if (type.includes('cumparare')) return 'buy';
  return 'rent';
}

function listingUnit(listing) {
  return listingKind(listing) === 'rent' ? '/luna' : '';
}

function listingBadge(listing) {
  return listingKind(listing) === 'sale' ? 'De vanzare' : 'De inchiriat';
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[char]);
}

function getHomeListings() {
  const keyword = textKey(document.getElementById('homeKeyword')?.value);
  const type = textKey(document.getElementById('homeType')?.value);
  const rooms = document.getElementById('homeRooms')?.value || '';
  const minPrice = Number(document.getElementById('homeMinPrice')?.value || 0);
  const maxPrice = Number(document.getElementById('homeMaxPrice')?.value || 0);
  const sort = document.getElementById('homeSort')?.value || 'newest';

  const result = load('listings').filter(listing => {
    const haystack = textKey([
      listing.address,
      listing.desc,
      listing.amenities,
      listing.userName,
      listing.type,
    ].join(' '));
    const status = textKey(listing.status);
    const listingType = textKey(listing.type);
    const price = Number(listing.price || 0);
    let roomsMatch = true;
    if (rooms === '4+') roomsMatch = Number(listing.rooms || 0) >= 4;
    else if (rooms) roomsMatch = Number(listing.rooms || 0) === Number(rooms);

    return status === 'activ'
      && (!keyword || haystack.includes(keyword))
      && (!type || listingType === type)
      && roomsMatch
      && (!minPrice || price >= minPrice)
      && (!maxPrice || price <= maxPrice);
  });

  result.sort((a, b) => {
    if (sort === 'priceAsc') return Number(a.price || 0) - Number(b.price || 0);
    if (sort === 'priceDesc') return Number(b.price || 0) - Number(a.price || 0);
    if (sort === 'areaDesc') return Number(b.area || 0) - Number(a.area || 0);
    return String(b.postedAt || '').localeCompare(String(a.postedAt || ''));
  });

  return result;
}

function renderHomeStats() {
  const active = load('listings').filter(l => textKey(l.status) === 'activ');
  const rent = active.filter(l => listingKind(l) === 'rent').length;
  const sale = active.filter(l => listingKind(l) === 'sale').length;
  document.getElementById('home-stat-active').textContent = active.length;
  document.getElementById('home-stat-rent').textContent = rent;
  document.getElementById('home-stat-sale').textContent = sale;
}

function homeAmenityTags(listing) {
  return String(listing.amenities || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .slice(0, 4)
    .map(item => `<span>${escapeHtml(item)}</span>`)
    .join('');
}

function renderHomeListings() {
  const grid = document.getElementById('homeListingsGrid');
  if (!grid) return;

  renderHomeStats();
  const listings = getHomeListings();
  document.getElementById('homeResultsCount').textContent = `${listings.length} rezultate`;

  if (!listings.length) {
    grid.innerHTML = `
      <div class="home-empty">
        <strong>Nu am gasit locuinte pe filtrele alese.</strong>
        <span>Incearca sa scazi pretul minim/maxim sau sa cauti dupa un oras apropiat.</span>
      </div>`;
    return;
  }

  grid.innerHTML = listings.map(listing => `
    <article class="home-card olx-card" onclick="openListingDetail(${listing.id})">
      <div class="home-card-media">
        <img src="${escapeHtml(listingImages(listing)[0] || defaultListingImage())}" alt="${escapeHtml(listing.address)}" loading="lazy">
        <span class="home-card-badge">${listingBadge(listing)}</span>
      </div>
      <div class="home-card-body">
        <div class="prop-card-topline">
          <div></div>
          ${favoriteButton(listing)}
        </div>
        <div class="home-card-price">${fmtMoney(listing.price)} RON <span>${listingUnit(listing)}</span></div>
        <h3>${escapeHtml(listing.address)}</h3>
        <div class="home-card-meta">
          ${listing.rooms ? `<span>${listing.rooms} camere</span>` : ''}
          ${listing.area ? `<span>${listing.area} mp</span>` : ''}
          ${listing.floor ? `<span>Etaj ${escapeHtml(listing.floor)}</span>` : ''}
        </div>
        <p>${escapeHtml(String(listing.desc || '').slice(0, 140))}${String(listing.desc || '').length > 140 ? '...' : ''}</p>
        <div class="home-card-tags">${homeAmenityTags(listing)}</div>
      </div>
      <div class="home-card-footer">
        <div class="poster-badge">
          <div class="poster-avatar">${getInitials(listing.userName || 'U')}</div>
          <span>${escapeHtml(listing.userName || 'Proprietar')}</span>
        </div>
        <div class="card-actions">
          <button class="btn btn-secondary btn-sm" onclick="callOwnerById(${listing.id}, event)">${icon('phone')} Suna</button>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openContactModal(${listing.id})">${icon('message-circle')} Mesaj</button>
        </div>
      </div>
    </article>
  `).join('');
  refreshIcons();
}

function resetHomeFilters() {
  ['homeKeyword', 'homeMinPrice', 'homeMaxPrice'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['homeType', 'homeRooms'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('homeSort').value = 'newest';
  renderHomeListings();
}

function openContactModal(id) {
  const listing = load('listings').find(item => item.id === id);
  if (!listing) return;

  const phone = listing.contactPhone || 'Telefon necompletat';
  const email = listing.contactEmail || 'Email necompletat';
  const subject = encodeURIComponent(`Interes pentru ${listing.address}`);
  const body = encodeURIComponent('Buna ziua, sunt interesat de locuinta publicata si as dori mai multe detalii.');

  document.getElementById('modal-contact-title').textContent = listing.address;
  document.getElementById('contactBody').innerHTML = `
    <div class="contact-summary">
      <strong>${fmtMoney(listing.price)} RON ${listingUnit(listing)}</strong>
      <span>${listing.rooms || '-'} camere · ${listing.area || '-'} mp · ${listingBadge(listing)}</span>
    </div>
    <div class="contact-options">
      <a class="contact-option call-option" href="tel:${escapeHtml(phone)}">
        <strong>${icon('phone')} Telefon</strong>
        <span>${escapeHtml(phone)}</span>
      </a>
      <a class="contact-option" href="mailto:${escapeHtml(email)}?subject=${subject}&body=${body}">
        <strong>${icon('mail')} Email</strong>
        <span>${escapeHtml(email)}</span>
      </a>
      <div class="contact-option">
        <strong>${icon('message-square')} Mesaj</strong>
        <textarea id="quickMessage" placeholder="Scrie mesajul pentru proprietar...">Buna ziua, sunt interesat de aceasta locuinta. Cand se poate programa o vizionare?</textarea>
        <button class="btn btn-primary btn-sm" onclick="sendQuickMessage(${id})">${icon('send')} Trimite mesaj</button>
      </div>
    </div>
    ${listing.contactNote ? `<div class="alert alert-info">${escapeHtml(listing.contactNote)}</div>` : ''}
  `;
  openModal('contact');
  refreshIcons();
}

function sendQuickMessage(id) {
  const listing = load('listings').find(item => item.id === id);
  const message = document.getElementById('quickMessage')?.value.trim();
  if (!message) {
    toast('Scrie un mesaj inainte de trimitere.', 'error');
    return;
  }
  const messages = JSON.parse(localStorage.getItem('rh_messages') || '[]');
  messages.push({
    id: Date.now(),
    listingId: id,
    listingTitle: listing?.address || '',
    fromUser: getCurrentUser()?.name || 'Utilizator',
    fromUserId: getCurrentUser()?.id || 'guest',
    toOwner: listing?.userName || 'Proprietar',
    toOwnerId: listing?.userId || 'owner',
    message,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem('rh_messages', JSON.stringify(messages));
  closeModal('contact');
  updateNavCounts();
  toast('Mesaj salvat si trimis proprietarului.', 'success');
}
