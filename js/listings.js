// listings.js - Anunturi, favorite si detaliu anunt

function amenityTags(amenitiesStr, max = 5) {
  if (!amenitiesStr) return '';
  return amenitiesStr.split(',').slice(0, max)
    .map(a => `<span class="mini-tag">${escapeHtml(a.trim())}</span>`)
    .join('');
}

const typeBadge = t => textKey(t).includes('vanzare') ? 'badge-vanzare' : (textKey(t).includes('cumparare') ? 'badge-cumparare' : 'badge-inchiriere');

function defaultListingImage() {
  return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80';
}

function listingImages(listing) {
  const images = Array.isArray(listing?.images) ? listing.images : [];
  return [listing?.image, ...images]
    .filter(Boolean)
    .filter((src, index, arr) => arr.indexOf(src) === index);
}

function getFavoriteIds() {
  return load('favorites').map(Number);
}

function isFavorite(id) {
  return getFavoriteIds().includes(Number(id));
}

function toggleFavorite(id, event) {
  if (event) event.stopPropagation();
  const favorites = getFavoriteIds();
  const numericId = Number(id);
  const next = favorites.includes(numericId)
    ? favorites.filter(item => item !== numericId)
    : [...favorites, numericId];
  save('favorites', next);
  renderHomeListings?.();
  renderListings?.();
  renderFavorites?.();
  if (document.getElementById('modal-listing-detail')?.classList.contains('open')) {
    openListingDetail(numericId);
  }
  updateNavCounts();
  toast(next.includes(numericId) ? 'Anunt adaugat la favorite.' : 'Anunt scos din favorite.', 'success');
}

function favoriteButton(listing) {
  const active = isFavorite(listing.id);
  return `<button class="favorite-btn ${active ? 'active' : ''}" onclick="toggleFavorite(${listing.id}, event)" title="${active ? 'Scoate de la favorite' : 'Salveaza la favorite'}">${icon('heart')}</button>`;
}

function callOwner(listing, event) {
  if (event) event.stopPropagation();
  const phone = String(listing.contactPhone || '').trim();
  if (!phone) {
    toast('Proprietarul nu are numar de telefon completat.', 'error');
    return;
  }
  window.location.href = `tel:${phone}`;
}

function buildCard(l, isOwner) {
  const unit = listingKind(l) === 'rent' ? '/luna' : '';
  const ams = amenityTags(l.amenities);
  const posted = l.postedAt ? `<span class="posted-date">${escapeHtml(l.postedAt)}</span>` : '';
  const safeImage = escapeHtml(listingImages(l)[0] || defaultListingImage());

  const ownerBadge = `
    <div class="poster-badge">
      <div class="poster-avatar">${getInitials(l.userName || 'U')}</div>
      <span>${escapeHtml(l.userName || 'Utilizator')}</span>
    </div>`;

  const actions = isOwner
    ? `<div class="card-actions">
         <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();openListingForm(${l.id})" title="Editeaza">${icon('pencil')}</button>
         <button class="btn btn-danger btn-sm" onclick="event.stopPropagation();deleteListing(${l.id})" title="Sterge">${icon('trash-2')}</button>
       </div>`
    : `<div class="card-actions">
         <button class="btn btn-secondary btn-sm" onclick="callOwnerById(${l.id}, event)">${icon('phone')} Suna</button>
         <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openContactModal(${l.id})">${icon('message-circle')} Mesaj</button>
       </div>`;

  return `<article class="prop-card olx-card" onclick="openListingDetail(${l.id})">
    <div class="prop-card-img">
      <img src="${safeImage}" alt="${escapeHtml(l.address)}" loading="lazy">
      <span class="prop-type-badge ${typeBadge(l.type)}">${escapeHtml(l.type)}</span>
    </div>
    <div class="prop-card-body">
      <div class="prop-card-topline">
        <div>
          <div class="prop-card-title">${escapeHtml(l.address)}</div>
          <div class="prop-card-addr">${icon('map-pin')} ${escapeHtml((l.address || '').split(' - ').pop())}</div>
        </div>
        ${favoriteButton(l)}
      </div>
      <div class="prop-card-meta">
        ${l.rooms ? `<span>${icon('bed-double')} ${l.rooms} cam.</span>` : ''}
        ${l.area ? `<span>${icon('ruler')} ${l.area} mp</span>` : ''}
        ${l.floor ? `<span>${icon('building-2')} Et. ${escapeHtml(l.floor)}</span>` : ''}
      </div>
      ${ams ? `<div class="mini-tags">${ams}</div>` : ''}
      ${l.desc ? `<p class="prop-card-desc">${escapeHtml(l.desc.slice(0, 170))}${l.desc.length > 170 ? '...' : ''}</p>` : ''}
      <div class="prop-card-price">${fmtMoney(l.price)} RON <span class="price-unit">${unit}</span></div>
      ${l.negotiable === 'Da' ? '<div class="negotiable">Pret negociabil</div>' : ''}
    </div>
    <div class="prop-card-footer">
      ${statusChip(l.status)}
      ${ownerBadge}
      ${posted}
      ${actions}
    </div>
  </article>`;
}

function callOwnerById(id, event) {
  const listing = load('listings').find(item => item.id === Number(id));
  if (listing) callOwner(listing, event);
}

function renderFavorites() {
  const grid = document.getElementById('favoritesGrid');
  if (!grid) return;
  const ids = getFavoriteIds();
  const listings = load('listings').filter(l => ids.includes(Number(l.id)));
  if (!listings.length) {
    grid.innerHTML = `
      <div class="home-empty">
        <div class="empty-icon">${icon('heart')}</div>
        <strong>Nu ai anunturi favorite inca.</strong>
        <span>Apasa pe inima de pe orice anunt ca sa il salvezi aici.</span>
      </div>`;
    refreshIcons();
    return;
  }
  grid.innerHTML = listings.map(l => buildCard(l, false)).join('');
  refreshIcons();
}

function showListingsTab(tab) {
  document.querySelectorAll('.listings-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.listings-tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-btn-' + tab)?.classList.add('active');
  document.getElementById('tab-' + tab)?.classList.add('active');
  if (tab === 'browse') renderBrowseListings();
  if (tab === 'mine') renderMyListings();
}

function renderBrowseListings() {
  const type = document.getElementById('browseTypeFilter')?.value || '';
  const search = textKey(document.getElementById('browseSearch')?.value || '');
  const rooms = document.getElementById('browseRoomsFilter')?.value || '';
  const user = getCurrentUser();

  const arr = load('listings').filter(l => {
    const haystack = textKey([l.address, l.desc, l.amenities, l.userName].join(' '));
    const ms = !search || haystack.includes(search);
    const mt = !type || l.type === type;
    let mr = true;
    if (rooms === '4+') mr = Number(l.rooms || 0) >= 4;
    else if (rooms) mr = Number(l.rooms || 0) === Number(rooms);
    return ms && mt && mr && l.status !== 'Retras';
  });

  const grid = document.getElementById('browseGrid');
  if (!grid) return;
  if (!arr.length) {
    grid.innerHTML = '<div class="home-empty"><strong>Niciun anunt gasit.</strong><span>Incearca alt oras, alta zona sau mai putine filtre.</span></div>';
    return;
  }
  grid.innerHTML = arr.map(l => buildCard(l, user && l.userId === user.id)).join('');
  refreshIcons();
}

function renderMyListings() {
  const user = getCurrentUser();
  if (!user) return;

  const search = textKey(document.getElementById('mySearch')?.value || '');
  const type = document.getElementById('myTypeFilter')?.value || '';

  const arr = load('listings').filter(l => {
    const mine = l.userId === user.id;
    const ms = !search || textKey([l.address, l.desc, l.amenities].join(' ')).includes(search);
    const mt = !type || l.type === type;
    return mine && ms && mt;
  });

  const grid = document.getElementById('myListingsGrid');
  if (!grid) return;
  if (!arr.length) {
    grid.innerHTML = `
      <div class="home-empty">
        <div class="empty-icon">${icon('house')}</div>
        <strong>Niciun anunt publicat</strong>
        <span>Publica primul tau anunt de inchiriere sau vanzare.</span>
        <div class="mt16"><button class="btn btn-primary" onclick="openListingForm()">+ Adauga anunt</button></div>
      </div>`;
    refreshIcons();
    return;
  }
  grid.innerHTML = arr.map(l => buildCard(l, true)).join('');
  refreshIcons();
}

function renderListings() {
  const browsePanel = document.getElementById('tab-browse');
  if (browsePanel?.classList.contains('active')) renderBrowseListings();
  else renderMyListings();
}

function openListingForm(id = null) {
  const user = getCurrentUser();
  if (!user) { toast('Trebuie sa fii autentificat!', 'error'); return; }

  if (id) {
    const existing = load('listings').find(x => x.id === id);
    if (existing && existing.userId !== user.id && user.role !== 'admin') {
      toast('Nu poti edita anunturile altora.', 'error');
      return;
    }
  }

  document.getElementById('modal-listing-title').textContent = id ? 'Editeaza anunt' : 'Anunt nou';
  ['lst-id','lst-address','lst-rooms','lst-area','lst-floor','lst-price','lst-image','lst-images','lst-desc','lst-amenities','lst-phone','lst-email','lst-contact-note'].forEach(f => {
    document.getElementById(f).value = '';
  });
  document.getElementById('lst-type').selectedIndex = 0;
  document.getElementById('lst-negotiable').selectedIndex = 0;
  document.getElementById('lst-status').selectedIndex = 0;

  if (id) {
    const l = load('listings').find(x => x.id === id);
    if (l) {
      document.getElementById('lst-id').value = l.id;
      document.getElementById('lst-address').value = l.address;
      document.getElementById('lst-type').value = l.type;
      document.getElementById('lst-rooms').value = l.rooms || '';
      document.getElementById('lst-area').value = l.area || '';
      document.getElementById('lst-floor').value = l.floor || '';
      document.getElementById('lst-price').value = l.price || '';
      document.getElementById('lst-image').value = l.image || '';
      document.getElementById('lst-images').value = listingImages(l).filter(src => src !== l.image).join(', ');
      document.getElementById('lst-negotiable').value = l.negotiable || 'Da';
      document.getElementById('lst-status').value = l.status;
      document.getElementById('lst-desc').value = l.desc || '';
      document.getElementById('lst-amenities').value = l.amenities || '';
      document.getElementById('lst-phone').value = l.contactPhone || '';
      document.getElementById('lst-email').value = l.contactEmail || '';
      document.getElementById('lst-contact-note').value = l.contactNote || '';
    }
  } else {
    document.getElementById('lst-email').value = user.email || '';
    document.getElementById('lst-phone').value = user.phone || '';
  }
  openModal('listing');
}

function saveListing() {
  const user = getCurrentUser();
  const address = document.getElementById('lst-address').value.trim();
  if (!address) { toast('Adresa / titlul este obligatorie!', 'error'); return; }

  const mainImage = document.getElementById('lst-image').value.trim();
  const galleryImages = document.getElementById('lst-images').value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);

  const id = document.getElementById('lst-id').value;
  const data = {
    address,
    type: document.getElementById('lst-type').value,
    rooms: +document.getElementById('lst-rooms').value || 0,
    area: +document.getElementById('lst-area').value || 0,
    floor: document.getElementById('lst-floor').value,
    price: +document.getElementById('lst-price').value || 0,
    image: mainImage,
    images: [mainImage, ...galleryImages].filter(Boolean),
    negotiable: document.getElementById('lst-negotiable').value,
    status: document.getElementById('lst-status').value,
    desc: document.getElementById('lst-desc').value,
    amenities: document.getElementById('lst-amenities').value,
    contactPhone: document.getElementById('lst-phone').value.trim(),
    contactEmail: document.getElementById('lst-email').value.trim(),
    contactNote: document.getElementById('lst-contact-note').value.trim(),
  };

  const arr = load('listings');
  if (id) {
    const i = arr.findIndex(x => x.id === +id);
    if (i > -1) arr[i] = { ...arr[i], ...data };
    toast('Anunt actualizat!', 'success');
  } else {
    data.id = nextId(arr);
    data.userId = user?.id || 'unknown';
    data.userName = user?.name || 'Utilizator';
    data.postedAt = new Date().toISOString().slice(0, 10);
    arr.push(data);
    toast('Anunt publicat!', 'success');
  }
  save('listings', arr);
  closeModal('listing');
  renderListings();
  renderHomeListings();
  renderFavorites();
  updateNavCounts();
}

function deleteListing(id) {
  const user = getCurrentUser();
  const l = load('listings').find(x => x.id === id);
  if (l && l.userId !== user?.id && user?.role !== 'admin') {
    toast('Nu poti sterge anunturile altora.', 'error');
    return;
  }
  if (!confirm('Sigur stergi acest anunt?')) return;
  save('listings', load('listings').filter(x => x.id !== id));
  save('favorites', getFavoriteIds().filter(item => item !== Number(id)));
  renderListings();
  renderHomeListings();
  renderFavorites();
  updateNavCounts();
  toast('Anunt sters.', 'error');
}

function openListingDetail(id) {
  const listing = load('listings').find(item => item.id === Number(id));
  if (!listing) return;
  const images = listingImages(listing);
  const main = images[0] || defaultListingImage();
  const phone = listing.contactPhone || '';

  document.getElementById('modal-listing-detail-title').textContent = listing.address;
  document.getElementById('listingDetailBody').innerHTML = `
    <div class="listing-detail">
      <div class="detail-gallery">
        <div class="detail-main-image">
          <button class="gallery-arrow left" onclick="stepDetailImage(-1)" aria-label="Poza anterioara">${icon('chevron-left')}</button>
          <img id="detailMainImage" src="${escapeHtml(main)}" alt="${escapeHtml(listing.address)}" data-index="0">
          <button class="gallery-arrow right" onclick="stepDetailImage(1)" aria-label="Poza urmatoare">${icon('chevron-right')}</button>
        </div>
        <div class="detail-thumbs">
          ${images.map((src, index) => `<button class="${index === 0 ? 'active' : ''}" onclick="setDetailImage(${index})"><img src="${escapeHtml(src)}" alt="Poza ${index + 1}"></button>`).join('')}
        </div>
      </div>
      <aside class="detail-side">
        <div class="detail-price">${fmtMoney(listing.price)} RON <span>${listingUnit(listing)}</span></div>
        <div class="detail-title">${escapeHtml(listing.address)}</div>
        <div class="detail-meta">${icon('map-pin')} ${escapeHtml((listing.address || '').split(' - ').pop())}</div>
        <div class="detail-actions">
          <button class="btn btn-secondary" onclick="toggleFavorite(${listing.id}, event)">${icon('heart')} ${isFavorite(listing.id) ? 'Scos din favorite' : 'Adauga la favorite'}</button>
          <a class="btn btn-primary" href="tel:${escapeHtml(phone)}">${icon('phone')} Suna proprietarul</a>
          <button class="btn btn-secondary" onclick="openContactModal(${listing.id})">${icon('message-circle')} Trimite mesaj</button>
        </div>
        <div class="owner-box">
          <div class="poster-avatar">${getInitials(listing.userName || 'P')}</div>
          <div>
            <strong>${escapeHtml(listing.userName || 'Proprietar')}</strong>
            <span>${escapeHtml(phone || 'Telefon necompletat')}</span>
          </div>
        </div>
      </aside>
      <section class="detail-content">
        <div class="detail-facts">
          ${listing.rooms ? `<div><strong>${listing.rooms}</strong><span>Camere</span></div>` : ''}
          ${listing.area ? `<div><strong>${listing.area} mp</strong><span>Suprafata</span></div>` : ''}
          ${listing.floor ? `<div><strong>${escapeHtml(listing.floor)}</strong><span>Etaj</span></div>` : ''}
          <div><strong>${escapeHtml(listingBadge(listing))}</strong><span>Tip anunt</span></div>
        </div>
        <h3>Descriere</h3>
        <p>${escapeHtml(listing.desc || 'Proprietarul nu a adaugat inca o descriere detaliata.')}</p>
        <h3>Dotari si particularitati</h3>
        <div class="detail-tags">${amenityTags(listing.amenities, 20) || '<span class="mini-tag">Fara dotari mentionate</span>'}</div>
        ${listing.contactNote ? `<div class="alert alert-info mt16">${escapeHtml(listing.contactNote)}</div>` : ''}
      </section>
    </div>`;
  openModal('listing-detail');
  refreshIcons();
}

function setDetailImage(index) {
  const listingTitle = document.getElementById('modal-listing-detail-title')?.textContent;
  const listing = load('listings').find(item => item.address === listingTitle);
  const images = listingImages(listing);
  const image = images[index];
  const main = document.getElementById('detailMainImage');
  if (!image || !main) return;
  main.src = image;
  main.dataset.index = index;
  document.querySelectorAll('.detail-thumbs button').forEach((btn, i) => btn.classList.toggle('active', i === index));
}

function stepDetailImage(direction) {
  const listingTitle = document.getElementById('modal-listing-detail-title')?.textContent;
  const listing = load('listings').find(item => item.address === listingTitle);
  const images = listingImages(listing);
  if (!images.length) return;
  const main = document.getElementById('detailMainImage');
  const current = Number(main?.dataset.index || 0);
  const next = (current + direction + images.length) % images.length;
  setDetailImage(next);
}
