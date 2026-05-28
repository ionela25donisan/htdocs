// messages.js - inbox simplu pentru mesajele trimise catre proprietari

let activeMessageId = null;

function getMessagesForCurrentUser() {
  const user = getCurrentUser();
  const messages = load('messages').slice().sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  if (!user || user.role === 'admin') return messages;
  return messages.filter(m => m.fromUserId === user.id || m.fromUser === user.name);
}

function formatMessageDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleString('ro-RO', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function renderMessages() {
  const sidebar = document.getElementById('messagesSidebar');
  const thread = document.getElementById('messagesThread');
  if (!sidebar || !thread) return;

  const messages = getMessagesForCurrentUser();
  if (!messages.length) {
    sidebar.innerHTML = '';
    thread.innerHTML = `
      <div class="messages-empty">
        <div class="empty-icon">${icon('messages-square')}</div>
        <strong>Nu ai mesaje salvate inca.</strong>
        <span>Trimite un DM dintr-un anunt, iar conversatia va aparea aici.</span>
        <button class="btn btn-primary mt16" onclick="showSection('home')">${icon('search')} Cauta locuinte</button>
      </div>`;
    refreshIcons();
    return;
  }

  if (!activeMessageId || !messages.some(m => m.id === activeMessageId)) activeMessageId = messages[0].id;

  sidebar.innerHTML = messages.map(m => `
    <button class="message-row ${m.id === activeMessageId ? 'active' : ''}" onclick="selectMessage(${m.id})">
      <span class="message-row-title">${escapeHtml(m.listingTitle || 'Anunt')}</span>
      <span class="message-row-meta">${escapeHtml(m.toOwner || 'Proprietar')} • ${formatMessageDate(m.createdAt)}</span>
      <span class="message-row-preview">${escapeHtml(m.message || '')}</span>
    </button>
  `).join('');

  const current = messages.find(m => m.id === activeMessageId) || messages[0];
  const listing = load('listings').find(l => l.id === current.listingId);
  thread.innerHTML = `
    <div class="thread-head">
      <div>
        <div class="thread-title">${escapeHtml(current.listingTitle || 'Anunt')}</div>
        <div class="thread-meta">Catre ${escapeHtml(current.toOwner || 'Proprietar')} • ${formatMessageDate(current.createdAt)}</div>
      </div>
      ${listing ? `<button class="btn btn-secondary btn-sm" onclick="openContactModal(${listing.id})">${icon('reply')} Raspunde</button>` : ''}
    </div>
    ${listing ? `
      <div class="thread-listing">
        <img src="${escapeHtml(listing.image || '')}" alt="${escapeHtml(listing.address || '')}">
        <div>
          <strong>${fmtMoney(listing.price)} RON ${listingUnit(listing)}</strong>
          <span>${escapeHtml(listing.rooms || '-')} camere • ${escapeHtml(listing.area || '-')} mp • ${escapeHtml(listingBadge(listing))}</span>
        </div>
      </div>` : ''}
    <div class="message-bubble">
      <span>Tu ai trimis</span>
      <p>${escapeHtml(current.message || '')}</p>
    </div>
  `;
  refreshIcons();
}

function selectMessage(id) {
  activeMessageId = id;
  renderMessages();
}
