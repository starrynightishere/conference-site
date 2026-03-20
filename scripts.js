// ── Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
});

// ── Countdown to Dec 7, 2026 09:00 IST
const target = new Date('2026-12-07T09:00:00+05:30');
function updateCountdown() {
  const diff = target - Date.now();
  if (diff <= 0) {
    document.querySelector('.countdown-bar').innerHTML =
      '<div class="container" style="text-align:center;color:#7ecfff;font-family:Lexend,sans-serif;font-weight:600;letter-spacing:0.05em;">CONFERENCE IS LIVE!</div>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-d').textContent = d;
  document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ── Active nav on scroll
const sections = document.querySelectorAll('section[id], div[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinkEls.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}, { passive: true });

// ── Dropdown toggle
function toggleDropdown(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropdown = event.target.closest('.nav-dropdown');
  const menu     = dropdown.querySelector('.dropdown-menu');
  const isOpen   = menu.classList.contains('show');
  closeAllDropdowns();
  if (!isOpen) {
    menu.classList.add('show');
    dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
  }
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown-menu.show').forEach(d => d.classList.remove('show'));
  document.querySelectorAll('.dropdown-toggle').forEach(a => a.setAttribute('aria-expanded', 'false'));
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) closeAllDropdowns();
});

// ── Organising Committee Modal
function openCommitteeModal(tab) {
  closeAllDropdowns();
  navLinks.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  switchTabById(tab);
  document.getElementById('orgcomOverlay').classList.add('open');
  document.getElementById('orgcomModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCommitteeModal() {
  document.getElementById('orgcomOverlay').classList.remove('open');
  document.getElementById('orgcomModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCommitteeModal();
});

function switchTab(btn, tabId) {
  document.querySelectorAll('.orgcom-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.orgcom-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + tabId).classList.add('active');
}

function switchTabById(tabId) {
  const btn = document.querySelector('.orgcom-tab[data-tab="' + tabId + '"]');
  if (btn) switchTab(btn, tabId);
}