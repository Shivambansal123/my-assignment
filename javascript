// Get the WhatsApp chat list
const chatList = document.querySelector('.chat-list');

// Add event listener to chat list
chatList.addEventListener('DOMSubtreeModified', () => {
  // Get all chat elements
  const chats = chatList.querySelectorAll('.chat');

  // Filter chats based on All, unread, awaiting reply, and needs reply
  const filters = {
    all: chats,
    unread: [],
    awaitingReply: [],
    needsReply: []
  };

  chats.forEach((chat) => {
    const unreadBadge = chat.querySelector('.unread-badge');
    const awaitingReplyBadge = chat.querySelector('.awaiting-reply-badge');
    const needsReplyBadge = chat.querySelector('.needs-reply-badge');

    if (unreadBadge) {
      filters.unread.push(chat);
    }
    if (awaitingReplyBadge) {
      filters.awaitingReply.push(chat);
    }
    if (needsReplyBadge) {
      filters.needsReply.push(chat);
    }
  });

  // Send filters to background script
  chrome.runtime.sendMessage({ action: 'updateFilters', filters });
});

// Add event listener to chat clicks
chatList.addEventListener('click', (event) => {
  const chat = event.target.closest('.chat');
  const contactId = chat.getAttribute('data-contact-id');

  // Send contact ID to background script
  chrome.runtime.sendMessage({ action: 'openContact', contactId });
});
