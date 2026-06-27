/**
 * Journal REST API Frontend Application
 * Handles CRUD operations, UI interactions, and state management.
 */

// State
let journals = [];
let deleteTargetId = null;

// DOM Selectors
const getApiEndpoint = () => document.getElementById('apiUrl').value.trim();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    loadJournals();
});

/**
 * Updates connection indicator
 */
function setConnectionStatus(isOnline) {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (dot && text) {
        dot.className = isOnline ? 'status-dot online' : 'status-dot offline';
        text.innerText = isOnline ? 'Connected' : 'Offline';
    }
}

/**
 * Fetch all journal entries from backend API
 */
async function loadJournals() {
    const feed = document.getElementById('journalFeed');
    const endpoint = getApiEndpoint();

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Server returned HTTP status ${response.status}`);
        
        journals = await response.json();
        setConnectionStatus(true);
        renderJournals(journals);
    } catch (error) {
        console.error('Failed to load journals:', error);
        setConnectionStatus(false);
        if (feed) {
            feed.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i>
                    <p style="color: var(--danger); font-weight: 600;">Unable to connect to REST API</p>
                    <p style="font-size: 0.8rem; margin-top: 0.25rem;">Check if Spring Boot is running at ${escapeHtml(endpoint)}</p>
                </div>
            `;
        }
        updateCounter(0);
    }
}

/**
 * Renders list of journals into the DOM
 */
function renderJournals(list) {
    const feed = document.getElementById('journalFeed');
    updateCounter(list.length);

    if (!feed) return;

    if (list.length === 0) {
        feed.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-book-open"></i>
                <p>No journal entries found.</p>
            </div>
        `;
        return;
    }

    feed.innerHTML = list.map(item => `
        <div class="entry-item">
            <div class="entry-item-header">
                <div>
                    <span class="entry-item-id" onclick="copyToClipboard('${item.id}')" title="Click to copy ID">
                        #${item.id || 'N/A'}
                    </span>
                    <h3 class="entry-item-title">${escapeHtml(item.title)}</h3>
                </div>
                <div style="display: flex; gap: 0.3rem;">
                    <button class="btn btn-sm btn-icon-edit" onclick="editJournal('${item.id}')" title="Edit">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-icon-delete" onclick="openDeleteModal('${item.id}')" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="entry-item-content">${escapeHtml(item.content)}</div>
        </div>
    `).join('');
}

/**
 * Updates entry count display badge
 */
function updateCounter(count) {
    const counter = document.getElementById('entryCount');
    if (counter) counter.innerText = `${count} entries`;
}

/**
 * Client-side search filter
 */
function filterJournals() {
    const searchInput = document.getElementById('searchBox');
    if (!searchInput) return;
    const query = searchInput.value.toLowerCase();
    const filtered = journals.filter(j => 
        (j.title && j.title.toLowerCase().includes(query)) ||
        (j.content && j.content.toLowerCase().includes(query))
    );
    renderJournals(filtered);
}

/**
 * Handles Form Submission for Create / Update
 */
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('journalId').value;
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!title || !content) return;

    const baseEndpoint = getApiEndpoint();
    const url = id ? `${baseEndpoint}/id/${id}` : baseEndpoint;
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            showToast(id ? 'Journal updated successfully' : 'Journal created successfully', 'success');
            resetForm();
            loadJournals();
        } else {
            showToast('Failed to save journal entry', 'error');
        }
    } catch (error) {
        console.error('Submit error:', error);
        showToast('Network error while saving', 'error');
    }
}

/**
 * Populates form fields for editing
 */
function editJournal(id) {
    const item = journals.find(j => j.id === id);
    if (!item) return;

    document.getElementById('journalId').value = item.id;
    document.getElementById('title').value = item.title;
    document.getElementById('content').value = item.content;

    document.getElementById('formTitle').innerHTML = '<i class="fa-solid fa-pencil"></i> Edit Entry';
    document.getElementById('submitBtn').innerHTML = '<i class="fa-solid fa-check"></i> Update Entry';
    document.getElementById('cancelBtn').style.display = 'inline-flex';
}

/**
 * Resets form to default state
 */
function resetForm() {
    document.getElementById('journalForm').reset();
    document.getElementById('journalId').value = '';
    document.getElementById('formTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> New Entry';
    document.getElementById('submitBtn').innerHTML = '<i class="fa-solid fa-plus"></i> Save Entry';
    document.getElementById('cancelBtn').style.display = 'none';
}

/**
 * Opens delete confirmation modal
 */
function openDeleteModal(id) {
    deleteTargetId = id;
    const modal = document.getElementById('deleteModal');
    if (modal) modal.classList.add('active');
}

/**
 * Closes delete confirmation modal
 */
function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) modal.classList.remove('active');
    deleteTargetId = null;
}

/**
 * Executes DELETE request
 */
async function confirmDelete() {
    const targetId = deleteTargetId;
    closeDeleteModal();

    if (!targetId) return;

    try {
        const endpoint = `${getApiEndpoint()}/id/${targetId}`;
        const response = await fetch(endpoint, { method: 'DELETE' });

        if (response.ok) {
            showToast('Journal entry deleted', 'success');
            loadJournals();
        } else {
            showToast('Failed to delete entry', 'error');
        }
    } catch (error) {
        console.error('Delete error:', error);
        showToast('Network error while deleting', 'error');
    }
}

/**
 * Copies entry ID to clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showToast(`Copied ID: ${text}`, 'info');
}

/**
 * Displays UI Toast notifications
 */
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 200);
    }, 2500);
}

/**
 * Escape HTML utility
 */
function escapeHtml(str) {
    return str ? str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])) : '';
}
