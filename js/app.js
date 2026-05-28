// ══════════════════════════════════════════════
//  app.js — Inițializare aplicație
// ══════════════════════════════════════════════

function initApp() {
  seedIfEmpty();
  normalizeDemoData();
  updateNavigationForRole();
  renderDashboard();
  updateNavCounts();
  // Prima sectiune vizibila este experienta publica de cautare.
  showSection('home');
  // Inițializăm tab listings (prima dată deschis = Explorare)
  const browsePanel = document.getElementById('tab-browse');
  if (browsePanel) {
    browsePanel.classList.add('active');
    document.getElementById('tab-btn-browse')?.classList.add('active');
  }
  refreshIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
});
