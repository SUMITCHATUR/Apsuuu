const birthdayDate = new Date('2026-10-12T00:00:00');

const memories = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsSE_wPqwVMbOe40GoV1AfCc6MKlE972k8ijIkQxj7LWaOyFXklQeQoSBAZkK4v0doTdfm4OCfKTsPWX7K3CwZrrCOlrEqI4TmR47ePkPiImF37cKbQGGU2ex7baF1TW32RNlyuYPLBr5tS23_bm_mKfn--suNkrJo94GBRoiGsrgUdtQsv04P5vNMYMn4e3spV0_61RmJFXTuZTpQVbKuCzdlHjBp5stoTXGmkPs6aNgIVgehmQlV',
    caption: '01 — ONE OF THOSE DAYS.',
    note: 'Unfiltered genuine light'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBggvk0CEkBI4dh0x0_OwEHIQ7erlU358GfrorDqdoycCXMgbVjrtFwdTMqdvcDmniM1tlfftx63SKV2v6jrk0ShLaI2Mv3jZzpZQ8X65xNtNJO_TmYcvTQRVYPkSfnOC1LdaZ92wDzIxgURWWpobmuWkXOb0xSv20xqNxc0F-UciYX6ZW6Gi4MxI42ffBg0gpjPabfuzfrNi5G2b0dIlXpb6dbydmD_dptb5FkfL9CShShHaIRKeq1',
    caption: '02 — STILL MAKES ME SMILE.',
    note: 'The private inside joke'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAduuiTWwadNOlKXbHgLVkRk8uhBYcA1aLDIZRo65x_x4PeOt3hBob-s5FCyc2MkpHnZ_hPrOJmOjs0MZWzCEKCxRZ91-nvf6_9Y-xs7SNt5z7bslONxmFlJ2RDr8q5HNsupA2uHKH9r8C6MuI20sIdWhWxg6ybx1O32-2cwvzPGKMXBdQSxJvMVbvTkAcTES9f5bi_A8cfxRfOqbB0u2uY1Ec_gDXBr0KcaX7W5eXcoleF_e9xz5Sv',
    caption: '03 — THIS ONE.',
    note: 'Pure serendipity'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZzkdo0JyBzk0pGOeNu0wxAk9xV0SXJufHEnuZD9XaAObIT4YBqNlS14WWIFjaM0StFqMqR57CSkQnrJ4Jem1Nm1eBjSgyQCvYFtSLJN5QKuIbjD67FVk5tvIet-2xpMF2jQHD6mhaMoSOwK5OJ2lz8gLnbyWn29nkQZYZG9324yfQuCmzvIcPytsmnw1XCYm4BdlaegREiTpVoGT-oa_WOLMnW8Qd1NqJPSixK1JcWWx_5mGORHec',
    caption: '04 — TOO MANY MEMORIES.',
    note: 'The Minimal Issue'
  }
];

const memoryWall = document.getElementById('memoryWall');
const revealEls = document.querySelectorAll('.reveal');
const secretButton = document.querySelector('.open-secret');
const secretPanel = document.querySelector('.secret-panel');
const cursor = document.querySelector('.custom-cursor');
const song = document.getElementById('birthdaySong');
const songToggle = document.querySelector('.song-toggle');
const songIcon = document.querySelector('.song-icon');

function createMemoryWall() {
  const card = (memory, index, featured = false) => `
    <figure class="memory-card${featured ? ' featured' : ''}" data-index="${index}" tabindex="0" aria-label="Open memory ${index + 1}">
      <img src="${memory.image}" alt="${memory.note}" loading="lazy" />
      <figcaption><span>${memory.caption}</span><small>${memory.note}</small></figcaption>
    </figure>`;

  memoryWall.innerHTML = `
    <div class="gallery-main-column">
      ${card(memories[0], 0, true)}
      <div class="gallery-lower-row">${card(memories[1], 1)}${card(memories[2], 2)}</div>
    </div>
    <div class="gallery-side-column">
      ${card(memories[3], 3)}
      <aside class="archivist-note">
        <span>ARCHIVIST'S NOTE</span>
        <p>“05 — you looked really good here.”</p>
        <span>RECORDS 2024–2026</span>
      </aside>
    </div>`;

  memoryWall.querySelectorAll('.memory-card').forEach((card, index) => {
    const openMemory = () => {
      const memory = memories[index];
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-inner">
          <button class="lightbox-close" type="button" aria-label="Close">×</button>
          <img src="${memory.image}" alt="${memory.note}" />
          <p>${memory.caption}</p>
        </div>
      `;
      document.body.appendChild(lightbox);

      const closeButton = lightbox.querySelector('.lightbox-close');
      closeButton.addEventListener('click', () => lightbox.remove());
      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) lightbox.remove();
      });
      const closeOnEscape = (event) => {
        if (event.key !== 'Escape') return;
        lightbox.remove();
        document.removeEventListener('keydown', closeOnEscape);
      };
      document.addEventListener('keydown', closeOnEscape);
    };

    card.addEventListener('click', openMemory);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openMemory();
      }
    });
  });
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((element) => observer.observe(element));
}

function setupSecretReveal() {
  secretButton.addEventListener('click', () => {
    const isOpen = secretPanel.classList.toggle('is-open');
    secretButton.setAttribute('aria-expanded', String(isOpen));
  });
}

function setupSongToggle() {
  songToggle.addEventListener('click', async () => {
    if (song.paused) {
      try {
        await song.play();
        songToggle.setAttribute('aria-pressed', 'true');
        songToggle.setAttribute('aria-label', 'Pause our song');
        songIcon.textContent = 'pause';
      } catch {
        songToggle.setAttribute('aria-label', 'Song could not be played');
      }
      return;
    }

    song.pause();
    songToggle.setAttribute('aria-pressed', 'false');
    songToggle.setAttribute('aria-label', 'Play our song');
    songIcon.textContent = 'play_arrow';
  });
}

function setupChapterNavigation() {
  const links = [...document.querySelectorAll('.chapter-nav a')];
  const targets = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle('is-active', link.hash === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -55% 0px' }
  );

  targets.forEach((target) => observer.observe(target));
}

function updateCountdown() {
  const now = new Date();
  const diff = birthdayDate - now;
  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');

  if (diff <= 0) {
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const remainingDays = Math.floor(totalSeconds / (60 * 60 * 24));
  const remainingHours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const remainingMinutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const remainingSeconds = totalSeconds % 60;

  days.textContent = String(remainingDays).padStart(2, '0');
  hours.textContent = String(remainingHours).padStart(2, '0');
  minutes.textContent = String(remainingMinutes).padStart(2, '0');
  seconds.textContent = String(remainingSeconds).padStart(2, '0');
}

function setupCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  cursor.classList.add('is-visible');

  window.addEventListener('pointermove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('button, img, .memory-card, .gallery-card').forEach((element) => {
    element.addEventListener('pointerenter', () => {
      cursor.classList.add('is-hover');
      cursor.querySelector('.cursor-label').textContent = 'VIEW';
    });

    element.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-hover');
      cursor.querySelector('.cursor-label').textContent = 'VIEW';
    });
  });
}

function init() {
  createMemoryWall();
  revealOnScroll();
  setupSecretReveal();
  setupSongToggle();
  setupChapterNavigation();
  setupCursor();
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

init();
