// ══════════════════════════════════════════════
//  storage.js — Utilități localStorage + date inițiale
// ══════════════════════════════════════════════

const KEYS = {
  apartments:  'rh_apartments',
  tenants:     'rh_tenants',
  contracts:   'rh_contracts',
  payments:    'rh_payments',
  listings:    'rh_listings',
  messages:    'rh_messages',
  favorites:   'rh_favorites',
  maintenance: 'rh_maintenance',
  users:       'rh_users',
  session:     'rh_session',
};

function load(k) {
  return JSON.parse(localStorage.getItem(KEYS[k]) || '[]');
}

function save(k, d) {
  localStorage.setItem(KEYS[k], JSON.stringify(d));
}

function nextId(arr) {
  return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
}

function seedIfEmpty() {
  if (!load('apartments').length) {
    save('apartments', [
      { id:1, address:'Str. Victoriei 10, Ap. 101, Cluj-Napoca', type:'Apartament', rooms:2, area:55, floor:'1', year:2001, status:'Ocupat', rent:1200, price:0, amenities:'Mobilat, AC', notes:'' },
      { id:2, address:'Bd. Libertății 22, Ap. 5, București', type:'Apartament', rooms:3, area:72, floor:'3', year:2008, status:'De vânzare', rent:0, price:92000, amenities:'Parcare, Balcon', notes:'' },
      { id:3, address:'Str. Unirii 5, Ap. 305, Timișoara', type:'Studio', rooms:1, area:38, floor:'P', year:1995, status:'Liber', rent:650, price:0, amenities:'', notes:'Necesită renovare' },
      { id:4, address:'Str. Florilor 8, Vilă, Brașov', type:'Vilă', rooms:5, area:180, floor:'P+1', year:2015, status:'De vânzare', rent:0, price:285000, amenities:'Grădină, Garaj, Piscină', notes:'' },
    ]);
  }
  if (!load('tenants').length) {
    save('tenants', [
      { id:1, first:'Andrei', last:'Popescu', email:'andrei.popescu@email.com', phone:'0712345678', cnp:'1850101123456', apartment:'Str. Victoriei 10, Ap. 101, Cluj-Napoca', status:'Activ', notes:'' },
      { id:2, first:'Ioana', last:'Ionescu', email:'ioana.ionescu@email.com', phone:'0723456789', cnp:'2900215234567', apartment:'', status:'Prospect', notes:'Caută apartament 2 camere' },
    ]);
  }
  if (!load('contracts').length) {
    save('contracts', [
      { id:1, apartment:'Str. Victoriei 10, Ap. 101, Cluj-Napoca', tenant:'Andrei Popescu', type:'Închiriere', number:'CTR-2024-001', start:'2024-01-01', end:'2025-12-31', value:1200, deposit:2400, status:'Activ', notes:'' },
      { id:2, apartment:'Bd. Libertății 22, Ap. 5, București', tenant:'', type:'Vânzare-Cumpărare', number:'CTR-2024-002', start:'2024-03-15', end:'2025-06-15', value:92000, deposit:5000, status:'Activ', notes:'' },
    ]);
  }
  if (!load('payments').length) {
    save('payments', [
      { id:1, apartment:'Str. Victoriei 10, Ap. 101, Cluj-Napoca', type:'Chirie', amount:1200, date:'2024-05-05', method:'Transfer bancar', notes:'Mai 2024' },
      { id:2, apartment:'Str. Victoriei 10, Ap. 101, Cluj-Napoca', type:'Garanție', amount:2400, date:'2024-01-01', method:'Transfer bancar', notes:'Garanție contract CTR-2024-001' },
      { id:3, apartment:'Bd. Libertății 22, Ap. 5, București', type:'Tranzacție vânzare', amount:5000, date:'2024-03-15', method:'Cec', notes:'Avans vânzare' },
    ]);
  }
  if (!load('listings').length) {
    save('listings', [
      { id:1, userId:'demo', userName:'Admin Demo', address:'Str. Victoriei 10, Ap. 101, Cluj-Napoca', type:'Închiriere', rooms:2, area:55, floor:'1', price:1200, negotiable:'Nu', status:'Activ', desc:'Apartament 2 camere, mobilat complet, AC, zona centrală.', amenities:'Mobilat, AC, Internet, TV', postedAt:'2024-05-01' },
      { id:2, userId:'demo', userName:'Admin Demo', address:'Bd. Libertății 22, Ap. 5, București', type:'Vânzare', rooms:3, area:72, floor:'3', price:92000, negotiable:'Da', status:'Activ', desc:'Apartament spațios, 3 camere, vedere la parc, parcare.', amenities:'Parcare, Balcon, Centrală proprie', postedAt:'2024-04-15' },
      { id:3, userId:'demo', userName:'Admin Demo', address:'Str. Unirii 5, Ap. 305, Timișoara', type:'Închiriere', rooms:1, area:38, floor:'P', price:650, negotiable:'Da', status:'Activ', desc:'Studio confortabil, zona centrală, transport în comun.', amenities:'', postedAt:'2024-05-10' },
      { id:4, userId:'demo', userName:'Admin Demo', address:'Str. Florilor 8, Vilă, Brașov', type:'Vânzare', rooms:5, area:180, floor:'P+1', price:285000, negotiable:'Da', status:'Activ', desc:'Vilă de lux cu grădină, garaj și piscină. Zona rezidențială.', amenities:'Grădină, Garaj, Piscină, Saună', postedAt:'2024-03-20' },
    ]);
  }
  if (!load('maintenance').length) {
    save('maintenance', [
      { id:1, apartment:'Str. Victoriei 10, Ap. 101, Cluj-Napoca', date:'2024-05-20', desc:'Verificare centrală termică', priority:'Medie', status:'Programat', cost:150, vendor:'SC Termo SRL', notes:'' },
      { id:2, apartment:'Str. Unirii 5, Ap. 305, Timișoara', date:'2024-05-22', desc:'Reparație robinet baie', priority:'Ridicată', status:'În desfășurare', cost:120, vendor:'', notes:'Scurgere activă' },
    ]);
  }
}

function normalizeDemoData() {
  const users = JSON.parse(localStorage.getItem(KEYS.users) || '[]');
  const ensureUser = user => {
    const existing = users.find(u => u.email === user.email || u.id === user.id);
    if (existing) Object.assign(existing, { role: user.role, phone: user.phone });
    else users.push(user);
  };
  ensureUser({ id: 'admin', name: 'Admin Proprietar', email: 'admin@test.com', password: 'admin123', role: 'admin', phone: '0711111111', createdAt: '2024-01-01T00:00:00.000Z' });
  ensureUser({ id: 'user', name: 'Utilizator Demo', email: 'user@test.com', password: 'user123', role: 'user', phone: '0722222222', createdAt: '2024-01-01T00:00:00.000Z' });
  ensureUser({ id: 'demo', name: 'Admin Demo', email: 'demo@test.com', password: 'demo123', role: 'admin', phone: '0700000000', createdAt: '2024-01-01T00:00:00.000Z' });
  localStorage.setItem(KEYS.users, JSON.stringify(users));

  const demoListings = [
    { address:'Apartament 2 camere, mobilat modern, Marasti - Cluj-Napoca', type:'Închiriere', rooms:2, area:55, floor:'1/4', price:2300, negotiable:'Nu', status:'Activ', desc:'Apartament luminos, renovat recent, la 6 minute de Iulius Mall. Ideal pentru cuplu sau o persoana care lucreaza remote.', amenities:'Mobilat complet, AC, Centrala proprie, Balcon, Pet friendly', image:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', contactPhone:'0711111111', contactEmail:'admin@test.com', contactNote:'Disponibil imediat. Prefer contract minim 12 luni.', userId:'demo', userName:'Admin Demo', postedAt:'2026-05-20' },
    { address:'3 camere decomandat, parcare inclusa, Titan - Bucuresti', type:'Vânzare', rooms:3, area:72, floor:'3/10', price:460000, negotiable:'Da', status:'Activ', desc:'Bloc reabilitat, vedere libera, doua bai si loc de parcare ADP. Aproape de metrou Nicolae Grigorescu si parc.', amenities:'Parcare, 2 bai, Balcon inchis, Boxa, Termopan', image:'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80', contactPhone:'0733444555', contactEmail:'proprietar.bucuresti@email.com', contactNote:'Accept credit ipotecar. Acte pregatite.', userId:'demo', userName:'Elena M.', postedAt:'2026-05-18' },
    { address:'Garsoniera cocheta langa Medicina - Timisoara', type:'Închiriere', rooms:1, area:32, floor:'P/4', price:1500, negotiable:'Da', status:'Activ', desc:'Garsoniera curata, utilata complet, intrare separata si costuri mici de intretinere. Se accepta studenti.', amenities:'Masina de spalat, Internet, Frigider, Aproape de facultate', image:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80', contactPhone:'0744555666', contactEmail:'studio.timisoara@email.com', contactNote:'Vizionari dupa ora 17:30.', userId:'demo', userName:'Mihai R.', postedAt:'2026-05-22' },
    { address:'Casa individuala cu gradina, cartier Noua - Brasov', type:'Vânzare', rooms:5, area:180, floor:'P+1', price:1420000, negotiable:'Da', status:'Activ', desc:'Casa foarte bine intretinuta, curte verde, terasa acoperita si garaj. Potrivita pentru familie, zona linistita.', amenities:'Gradina, Garaj, Terasa, Semineu, Pod depozitare', image:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80', contactPhone:'0755666777', contactEmail:'vila.brasov@email.com', contactNote:'Trimit plan cadastral si tur video la cerere.', userId:'demo', userName:'Familia Dobre', postedAt:'2026-05-14' },
    { address:'Studio premium in bloc nou, Pipera - Voluntari', type:'Închiriere', rooms:1, area:42, floor:'7/11', price:2700, negotiable:'Nu', status:'Activ', desc:'Studio intr-un complex nou, pazit, cu sala fitness si cafenea la parter. Loc de parcare subteran optional.', amenities:'Bloc nou, Lift, Paza, Fitness, Parcare subterana', image:'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80', contactPhone:'0766123456', contactEmail:'pipera.home@email.com', contactNote:'Nu se accepta animale de companie.', userId:'admin', userName:'Admin Proprietar', postedAt:'2026-05-21' },
    { address:'Apartament 4 camere pentru familie, Manastur - Cluj', type:'Vânzare', rooms:4, area:88, floor:'5/8', price:665000, negotiable:'Da', status:'Activ', desc:'Compartimentare practica, bucatarie mare, doua balcoane si acces rapid la scoli, magazine si transport.', amenities:'2 balcoane, Bucatarie separata, Camara, Aproape de scoala', image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80', contactPhone:'0777001100', contactEmail:'cluj.familyhome@email.com', contactNote:'Pret discutabil pentru plata rapida.', userId:'demo', userName:'Radu P.', postedAt:'2026-05-17' },
    { address:'Penthouse cu terasa, vedere la lac - Mamaia Nord', type:'Vânzare', rooms:3, area:96, floor:'8/8', price:1180000, negotiable:'Da', status:'Activ', desc:'Terasa generoasa, finisaje premium, vedere partiala la mare si lac. Bun pentru locuit sau investitie in regim hotelier.', amenities:'Terasa 40 mp, Vedere lac, Smart home, Loc parcare', image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80', contactPhone:'0788999000', contactEmail:'mamaia.penthouse@email.com', contactNote:'Disponibil pentru vizionari in weekend.', userId:'demo', userName:'Andreea S.', postedAt:'2026-05-12' },
    { address:'Apartament pet friendly, Cotroceni - Bucuresti', type:'Închiriere', rooms:2, area:61, floor:'2/3', price:3200, negotiable:'Da', status:'Activ', desc:'Apartament intr-o vila interbelica, tavane inalte, mobilier cald si zona excelenta pentru plimbari.', amenities:'Pet friendly, Centrala, Masina vase, Curte comuna', image:'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80', contactPhone:'0799111222', contactEmail:'cotroceni.rent@email.com', contactNote:'Se cere garantie o luna.', userId:'demo', userName:'Ioana V.', postedAt:'2026-05-23' },
    { address:'Casa la curte, zona linistita - Sibiu Turnisor', type:'Închiriere', rooms:3, area:105, floor:'P', price:3900, negotiable:'Da', status:'Activ', desc:'Casa complet mobilata, curte proprie, doua dormitoare si birou. Ideala pentru familie sau expati.', amenities:'Curte, Birou, Gratar, Centrala, Loc parcare', image:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80', contactPhone:'0722555444', contactEmail:'sibiu.house@email.com', contactNote:'Contract minim 6 luni.', userId:'demo', userName:'Cristian B.', postedAt:'2026-05-19' },
    { address:'Caut apartament 2 camere, zona centrala - Iasi', type:'Cumpărare', rooms:2, area:55, floor:'', price:430000, negotiable:'Da', status:'Activ', desc:'Cumparator serios, buget aprobat prin banca. Caut imobil intretinut, preferabil cu centrala proprie.', amenities:'Bloc dupa 1980, Centrala, Balcon, Acte clare', image:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80', contactPhone:'0700888999', contactEmail:'cumparator.iasi@email.com', contactNote:'Pot viziona in timpul saptamanii dupa 18:00.', userId:'user', userName:'Utilizator Demo', postedAt:'2026-05-16' },
  ];

  let listings = load('listings');
  demoListings.forEach(item => {
    const existing = listings.find(l => l.address === item.address);
    if (existing) Object.assign(existing, { ...item, id: existing.id });
    else listings.push({ id: nextId(listings), ...item });
  });

  const fallbacks = demoListings.map(item => ({
    phone: item.contactPhone,
    email: item.contactEmail,
    note: item.contactNote,
    image: item.image,
  }));
  const galleryFallbacks = [
    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1560185127-1902ccdc5094?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=900&q=80',
  ];

  listings = listings.map((listing, index) => ({
    ...listing,
    image: listing.image || fallbacks[index % fallbacks.length].image,
    images: listing.images && listing.images.length
      ? listing.images
      : [
          listing.image || fallbacks[index % fallbacks.length].image,
          galleryFallbacks[index % galleryFallbacks.length],
          galleryFallbacks[(index + 2) % galleryFallbacks.length],
        ],
    contactPhone: listing.contactPhone || fallbacks[index % fallbacks.length].phone,
    contactEmail: listing.contactEmail || fallbacks[index % fallbacks.length].email,
    contactNote: listing.contactNote || fallbacks[index % fallbacks.length].note,
  }));
  save('listings', listings);

  if (!load('messages').length) {
    save('messages', [
      { id: 1, listingId: 1, listingTitle: 'Apartament 2 camere, mobilat modern, Marasti - Cluj-Napoca', fromUser: 'Utilizator Demo', toOwner: 'Admin Demo', message: 'Buna ziua, este disponibil apartamentul pentru vizionare joi seara?', createdAt: '2026-05-22T15:30:00.000Z' },
      { id: 2, listingId: 3, listingTitle: 'Garsoniera cocheta langa Medicina - Timisoara', fromUser: 'Utilizator Demo', toOwner: 'Mihai R.', message: 'Buna ziua! Acceptati contract pe 10 luni pentru student?', createdAt: '2026-05-23T09:10:00.000Z' },
    ]);
  }
}
