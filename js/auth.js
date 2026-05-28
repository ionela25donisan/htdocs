// ══════════════════════════════════════════════
//  auth.js — Autentificare și sesiune utilizator
// ══════════════════════════════════════════════

/* ── Gestionare utilizatori ── */
function getUsers() {
  return JSON.parse(localStorage.getItem(KEYS.users) || '[]');
}
function saveUsers(users) {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

/* ── Sesiune curentă ── */
function getSession() {
  const session = JSON.parse(localStorage.getItem(KEYS.session) || 'null');
  if (!session) return null;
  if (session.role) return session;
  const fullUser = getUsers().find(u => u.id === session.id || u.email === session.email);
  return { ...session, role: fullUser?.role || 'user', phone: fullUser?.phone || '' };
}
function setSession(user) {
  localStorage.setItem(KEYS.session, JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem(KEYS.session);
}
function getCurrentUser() {
  return getSession();
}
function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0,2);
}

/* ── Înregistrare ── */
function register(name, email, password, role = 'user') {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, msg: 'Adresa de email este deja înregistrată.' };
  }
  const user = {
    id: 'u_' + Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,          // NOTE: în producție, parolele trebuie hash-uite!
    role,
    phone: '',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  const sessionData = { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone };
  setSession(sessionData);
  return { ok: true, user: sessionData };
}

/* ── Autentificare ── */
function login(email, password) {
  const users = getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );
  if (!user) {
    return { ok: false, msg: 'Email sau parolă incorectă.' };
  }
  const sessionData = { id: user.id, name: user.name, email: user.email, role: user.role || 'user', phone: user.phone || '' };
  setSession(sessionData);
  return { ok: true, user: sessionData };
}

/* ── Deconectare ── */
function logout() {
  clearSession();
  showAuthScreen();
}

/* ── Tranziție ecrane ── */
function showAuthScreen() {
  document.getElementById('auth-screen').style.display = 'flex';
  document.getElementById('app-screen').style.display  = 'none';
  // Reset formulare
  document.getElementById('login-email').value    = '';
  document.getElementById('login-password').value = '';
  document.getElementById('reg-name').value     = '';
  document.getElementById('reg-email').value    = '';
  document.getElementById('reg-password').value = '';
  document.getElementById('reg-confirm').value  = '';
  if (document.getElementById('reg-role')) document.getElementById('reg-role').value = 'user';
  setAuthError('');
  switchToLogin();
  refreshIcons();
}

function showAppScreen() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app-screen').style.display  = 'flex';
  const user = getCurrentUser();
  if (user) {
    document.getElementById('header-username').textContent = user.name;
    document.getElementById('header-initials').textContent = getInitials(user.name);
    const roleEl = document.getElementById('header-role');
    if (roleEl) roleEl.textContent = user.role === 'admin' ? 'Admin' : 'Utilizator';
  }
}

/* ── Switch login ↔ register ── */
function switchToRegister() {
  document.getElementById('auth-login-form').style.display    = 'none';
  document.getElementById('auth-register-form').style.display = 'flex';
  document.getElementById('auth-form-title').textContent    = 'Creează cont';
  document.getElementById('auth-form-subtitle').textContent = 'Completează datele pentru a te înregistra.';
  setAuthError('');
}

function switchToLogin() {
  document.getElementById('auth-register-form').style.display = 'none';
  document.getElementById('auth-login-form').style.display    = 'flex';
  document.getElementById('auth-form-title').textContent    = 'Bun venit!';
  document.getElementById('auth-form-subtitle').textContent = 'Autentifică-te pentru a accesa aplicația.';
  setAuthError('');
}

function setAuthError(msg) {
  const el = document.getElementById('auth-error');
  el.textContent = msg;
  el.classList.toggle('visible', !!msg);
}

/* ── Handlers butoane ── */
function handleLogin() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if (!email || !password) {
    setAuthError('Completați toate câmpurile.');
    return;
  }
  const result = login(email, password);
  if (result.ok) {
    showAppScreen();
    initApp();
  } else {
    setAuthError(result.msg);
  }
}

function handleRegister() {
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;
  const role     = document.getElementById('reg-role')?.value || 'user';
  if (!name || !email || !password) {
    setAuthError('Completați toate câmpurile obligatorii.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setAuthError('Adresa de email nu este validă.');
    return;
  }
  if (password.length < 6) {
    setAuthError('Parola trebuie să aibă cel puțin 6 caractere.');
    return;
  }
  if (password !== confirm) {
    setAuthError('Parolele nu coincid.');
    return;
  }
  const result = register(name, email, password, role);
  if (result.ok) {
    showAppScreen();
    initApp();
  } else {
    setAuthError(result.msg);
  }
}

/* ── Show/hide parolă ── */
function togglePw(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (inp.type === 'password') {
    inp.type = 'text';
    btn.innerHTML = icon('eye-off');
    btn.setAttribute('aria-label', 'Ascunde parola');
  } else {
    inp.type = 'password';
    btn.innerHTML = icon('eye');
    btn.setAttribute('aria-label', 'Arată parola');
  }
  refreshIcons();
}

/* ── Enter key pe formulare ── */
function authKeyHandler(e, handler) {
  if (e.key === 'Enter') handler();
}

/* ── Verificare sesiune la încărcare ── */
function checkAuth() {
  const user = getSession();
  if (user) {
    showAppScreen();
    initApp();
  } else {
    showAuthScreen();
  }
}
