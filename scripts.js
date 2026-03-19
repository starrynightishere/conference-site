    // ── Mobile nav toggle
    document.getElementById('hamburger').addEventListener('click', function () {
      document.getElementById('navLinks').classList.toggle('open');
    });

    // ── Countdown to Oct 18, 2026 09:00 IST
    const target = new Date('2026-10-18T09:00:00+05:30');
    function updateCountdown() {
      const diff = target - Date.now();
      if (diff <= 0) {
        document.querySelector('.countdown-bar').innerHTML = '<div class="container" style="text-align:center;color:#7ecfff;font-family:Lexend,sans-serif;font-weight:600;letter-spacing:0.05em;">CONFERENCE IS LIVE!</div>';
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
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
      });
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
      });
    }, { passive: true });