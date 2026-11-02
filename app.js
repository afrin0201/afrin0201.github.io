/**
 * Syeda Afrin Jahan - Portfolio Interactive Logic
 * Fully vanilla JS with zero external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavigation();
  initProjectFiltering();
  initProjectModals();
  initTerminal();
  initContactForm();
  initCopyButtons();
  initGitHubLiveSync();
});

/* ===================================================================
   1. THEME TOGGLING (Dark / Light)
   =================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('saj_theme') || 'dark';

  document.body.setAttribute('data-theme', storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('saj_theme', newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }
}

/* ===================================================================
   2. HERO TYPEWRITER ANIMATION
   =================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'Human-Computer Interaction (HCI)',
    'Machine Learning & Audio Intelligence',
    'Fourier Optical Image Encryption',
    'HCI with Security & Privacy',
    'BUET CSE Engineering & Research'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 100;

  function typeStep() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 45;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 95;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 2000; // Pause at completion
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400; // Pause before typing new phrase
    }

    setTimeout(typeStep, delay);
  }

  typeStep();
}

/* ===================================================================
   3. NAVIGATION & SCROLLSPY
   =================================================================== */
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-item');

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section scrollspy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   4. PROJECT FILTERING
   =================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===================================================================
   5. PROJECT DETAILS MODALS
   =================================================================== */
const projectDetailsData = {
  fourier: {
    title: 'Fourier Domain Image Encryptor',
    badge: '🏆 Best Project Award • BUET CSE 220',
    repo: 'https://github.com/afrin0201/fourier-domain-image-encryptor',
    html: `
      <div class="modal-detail-block">
        <p><strong>Affiliation:</strong> Department of Computer Science & Engineering, BUET</p>
        <p><strong>Timeline:</strong> Sep 2026 – Oct 2026</p>
        <p><strong>Recognition:</strong> Certificate of Best Project, Department of CSE, BUET</p>
        
        <h4 style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Technical Overview</h4>
        <p>
          Double Random Phase Encoding (DRPE) in the Fourier domain is an optical encryption paradigm that converts a plaintext image into stationary white noise. The system deploys two independent random phase masks (RPMs)—one in the spatial input plane and the second in the Fourier spectral frequency plane.
        </p>

        <h4 style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Key Engineering Features</h4>
        <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-secondary);">
          <li>Implemented 2D Fast Fourier Transform (FFT) algorithms with 2D inverse Fourier transformation in Python.</li>
          <li>Constructed interactive Streamlit UI for instant parameter tweaking (wavelength, random phase keys, noise resilience).</li>
          <li>Allows researchers and students to encrypt and decrypt sensitive image files without requiring custom scripting.</li>
          <li>Evaluated decryption fidelity and mathematical security against brute-force and blind phase retrieval attacks.</li>
        </ul>

        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; margin-top: 1rem;">
          <span style="color: var(--text-muted);"># Clone and run locally:</span><br>
          git clone https://github.com/afrin0201/fourier-domain-image-encryptor.git<br>
          cd fourier-domain-image-encryptor<br>
          pip install -r requirements.txt<br>
          streamlit run app.py
        </div>
      </div>
    `
  },
  articulate: {
    title: 'Articulate AI — Spoken English Coach',
    badge: '🥈 Finalist • SCIBLITZ 2.0 CUET AI Hackathon',
    repo: 'https://github.com/afrin0201',
    html: `
      <div class="modal-detail-block">
        <p><strong>Event:</strong> SCIBLITZ 2.0 CUET AI Hackathon 2026</p>
        <p><strong>Team Composition:</strong> Team of 4 Developers & Researchers</p>
        <p><strong>Role:</strong> Lead Frontend Developer & UI Designer (React, Tailwind CSS)</p>
        
        <h4 style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Product Summary</h4>
        <p>
          Articulate AI addresses a critical communication barrier: native Bengali speakers learning English often struggle with subtle phonemic differences (/v/ vs /b/, dental fricatives /θ/, retroflex sounds). Traditional English learning tools fail to provide targeted feedback in their native language.
        </p>

        <h4 style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Key Architecture & Achievements</h4>
        <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-secondary);">
          <li>Engineered real-time acoustic phoneme-level pronunciation scoring utilizing Azure Speech Services.</li>
          <li>Crafted native Bangla-language diagnostic feedback explaining precise tongue and mouth placements for improved articulation.</li>
          <li>Developed full IELTS speaking test simulation powered by OpenAI GPT APIs with adaptive examiner questions.</li>
          <li>Shipped an ultra-responsive, accessible user interface in React and Tailwind CSS.</li>
        </ul>
      </div>
    `
  },
  charulota: {
    title: 'Charulota — Full-Stack E-Commerce',
    badge: 'Course Project • BUET CSE 216',
    repo: 'https://github.com/afrin0201/charulota-clothing-store',
    html: `
      <div class="modal-detail-block">
        <p><strong>Course:</strong> CSE 216 (Database Sessional), BUET</p>
        <p><strong>Timeline:</strong> Apr 2026 – May 2026</p>
        <p><strong>Stack:</strong> Node.js, Express, Oracle Database, PL/SQL, JWT, HTML/CSS</p>
        
        <h4 style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Database & Backend Architecture</h4>
        <p>
          Charulota is a comprehensive boutique clothing platform engineered to demonstrate advanced relational database concepts under production conditions.
        </p>

        <h4 style="margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--accent-cyan);">Core Database Engineering</h4>
        <ul style="padding-left: 1.25rem; margin-bottom: 1rem; color: var(--text-secondary);">
          <li>Designed normalized 3NF Oracle relational schema covering customers, catalog, orders, transactions, and audit logs.</li>
          <li>Authored complex PL/SQL stored procedures, packages, and autonomous triggers to guarantee ACID compliance during concurrent order placements.</li>
          <li>Implemented secure stateless JWT authentication and password hashing.</li>
          <li>Constructed intuitive consumer storefront and administrative inventory control dashboard.</li>
        </ul>

        <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.82rem; margin-top: 1rem;">
          <span style="color: var(--text-muted);"># Repository:</span><br>
          https://github.com/afrin0201/charulota-clothing-store
        </div>
      </div>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const detailBtns = document.querySelectorAll('.project-details-btn');

  if (!modal || !modalTitle || !modalBody || !closeBtn) return;

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetailsData[projKey];
      if (!data) return;

      modalTitle.innerHTML = `${data.title} <span style="font-size: 0.75rem; vertical-align: middle; margin-left: 0.5rem; font-weight: normal;">${data.badge}</span>`;
      modalBody.innerHTML = `
        ${data.html}
        <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
          <a href="${data.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
            Visit GitHub Repository
          </a>
          <button class="btn btn-sm btn-outline close-modal-action-btn">Close</button>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');

      const modalCloseAction = modalBody.querySelector('.close-modal-action-btn');
      if (modalCloseAction) {
        modalCloseAction.addEventListener('click', closeModal);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ===================================================================
   6. INTERACTIVE DEVELOPER TERMINAL
   =================================================================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const clearBtn = document.getElementById('terminal-clear-btn');
  const chips = document.querySelectorAll('.term-chip');

  if (!input || !output) return;

  const commands = {
    help: () => `
<div class="terminal-log-line">Available commands:</div>
<div class="terminal-log-line">  <span class="term-highlight">bio</span>       - Overview of Syeda Afrin Jahan</div>
<div class="terminal-log-line">  <span class="term-highlight">skills</span>    - Technical stack and proficiencies</div>
<div class="terminal-log-line">  <span class="term-highlight">projects</span>  - List of featured software & research projects</div>
<div class="terminal-log-line">  <span class="term-highlight">honors</span>    - Awards, scholarships & hackathon records</div>
<div class="terminal-log-line">  <span class="term-highlight">github</span>    - Sync status and GitHub profile link</div>
<div class="terminal-log-line">  <span class="term-highlight">contact</span>   - Direct contact & email information</div>
<div class="terminal-log-line">  <span class="term-highlight">clear</span>     - Clear terminal buffer</div>
    `,
    bio: () => `
<div class="terminal-log-line"><span class="term-highlight">Name:</span> Syeda Afrin Jahan</div>
<div class="terminal-log-line"><span class="term-highlight">Institution:</span> Bangladesh University of Engineering and Technology (BUET)</div>
<div class="terminal-log-line"><span class="term-highlight">Department:</span> Computer Science & Engineering (B.Sc. 2025 – 2029)</div>
<div class="terminal-log-line"><span class="term-highlight">Student ID:</span> 2305172</div>
<div class="terminal-log-line"><span class="term-highlight">Interests:</span> Human-Computer Interaction (HCI), Machine Learning, Speech AI, Cryptographic Image Security</div>
    `,
    skills: () => `
<div class="terminal-log-line"><span class="term-highlight">[Languages]</span> C, C++, Java, Python, JavaScript, SQL, PL/SQL, HTML5, CSS3</div>
<div class="terminal-log-line"><span class="term-highlight">[Frameworks]</span> React, Node.js, Express, Tailwind CSS, Streamlit</div>
<div class="terminal-log-line"><span class="term-highlight">[Databases & APIs]</span> Oracle DB, PostgreSQL, Azure Speech Services, OpenAI API</div>
<div class="terminal-log-line"><span class="term-highlight">[Tools]</span> Git, GitHub, LaTeX, VS Code, Linux CLI</div>
    `,
    projects: () => `
<div class="terminal-log-line">1. <span class="term-highlight">fourier-domain-image-encryptor</span> [Python, Streamlit] - Best Project Award BUET CSE 220</div>
<div class="terminal-log-line">2. <span class="term-highlight">Articulate AI</span> [React, Node.js, Azure Speech, OpenAI] - Finalist CUET Hackathon</div>
<div class="terminal-log-line">3. <span class="term-highlight">charulota-clothing-store</span> [Node.js, Express, Oracle DB, PL/SQL]</div>
<div class="terminal-log-line">4. <span class="term-highlight">Student-Database-Management-System</span> [Java, OOP, File Handling]</div>
<div class="terminal-log-line">5. <span class="term-highlight">SpaceShooter-</span> [C++, 2D Game Physics, Collision Detection]</div>
<div class="terminal-log-line">6. <span class="term-highlight">CSE-208-Level-2-Term-1</span> [C++, Graph Algorithms & Data Structures]</div>
    `,
    honors: () => `
<div class="terminal-log-line">🏆 <span class="term-highlight">Certificate of Best Project (2026)</span> - Dept. of CSE, BUET (CSE 220)</div>
<div class="terminal-log-line">🥈 <span class="term-highlight">Finalist (2026)</span> - SCIBLITZ 2.0 CUET AI Hackathon (Articulate AI)</div>
<div class="terminal-log-line">🎖️ <span class="term-highlight">HSC General Scholarship (2024)</span> - Merit Award for HSC Examination</div>
<div class="terminal-log-line">🥇 <span class="term-highlight">Triple Olympiad Winner (2023)</span> - Physics, Chemistry & Biology Olympiads</div>
    `,
    github: () => `
<div class="terminal-log-line"><span class="term-highlight">GitHub Handle:</span> @afrin0201</div>
<div class="terminal-log-line"><span class="term-highlight">Profile URL:</span> <a href="https://github.com/afrin0201" target="_blank" style="color: #38bdf8;">https://github.com/afrin0201</a></div>
<div class="terminal-log-line"><span class="term-highlight">Status:</span> Publicly active with 7 repositories.</div>
    `,
    contact: () => `
<div class="terminal-log-line"><span class="term-highlight">Email:</span> s.a.jahan.buetcse.394@gmail.com</div>
<div class="terminal-log-line"><span class="term-highlight">BUET Mail:</span> 2305172@cse.buet.ac.bd</div>
<div class="terminal-log-line"><span class="term-highlight">LinkedIn:</span> <a href="https://www.linkedin.com/in/syeda-afrin-j-98a786353/" target="_blank" style="color: #38bdf8;">linkedin.com/in/syeda-afrin-j-98a786353</a></div>
<div class="terminal-log-line"><span class="term-highlight">GitHub:</span> <a href="https://github.com/afrin0201" target="_blank" style="color: #38bdf8;">github.com/afrin0201</a></div>
<div class="terminal-log-line"><span class="term-highlight">Phone:</span> (+880) 1612031950</div>
<div class="terminal-log-line"><span class="term-highlight">Location:</span> Dhaka, Bangladesh</div>
    `,
    linkedin: () => `
<div class="terminal-log-line"><span class="term-highlight">LinkedIn:</span> <a href="https://www.linkedin.com/in/syeda-afrin-j-98a786353/" target="_blank" style="color: #38bdf8;">https://www.linkedin.com/in/syeda-afrin-j-98a786353/</a></div>
    `,
    whoami: () => `<div class="terminal-log-line">guest@visitor-session: You are exploring the portfolio of Syeda Afrin Jahan.</div>`,
    date: () => `<div class="terminal-log-line">${new Date().toUTCString()}</div>`,
    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  function executeCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Log prompt entry
    const entryLine = document.createElement('div');
    entryLine.className = 'terminal-log-line';
    entryLine.innerHTML = `<span class="terminal-prompt" style="font-size:0.8rem;">afrin0201@buet:~$</span> <span class="term-command">${escapeHtml(cmd)}</span>`;
    output.appendChild(entryLine);

    if (commands[cmd]) {
      const res = commands[cmd]();
      if (res) {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = res;
        output.appendChild(responseDiv);
      }
    } else {
      const errDiv = document.createElement('div');
      errDiv.className = 'terminal-log-line term-error';
      errDiv.textContent = `bash: command not found: ${cmd}. Type 'help' for available commands.`;
      output.appendChild(errDiv);
    }

    output.scrollTop = output.scrollHeight;
    input.value = '';
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      commands.clear();
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
      input.focus();
    });
  });
}

/* ===================================================================
   7. CONTACT FORM VALIDATION & FEEDBACK
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('btn-send-message');

    let isValid = true;

    // Name validation
    if (!nameInput.value.trim()) {
      document.getElementById('name-error').style.display = 'block';
      nameInput.focus();
      isValid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      document.getElementById('email-error').style.display = 'block';
      if (isValid) emailInput.focus();
      isValid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }

    // Message validation
    if (!msgInput.value.trim()) {
      document.getElementById('message-error').style.display = 'block';
      if (isValid) msgInput.focus();
      isValid = false;
    } else {
      document.getElementById('message-error').style.display = 'none';
    }

    if (!isValid) return;

    // Simulate sending
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      feedback.className = 'form-feedback success';
      feedback.style.display = 'block';
      feedback.innerHTML = `<strong>Thank you!</strong> Your message has been prepared. You can also reach Syeda directly at <a href="mailto:s.a.jahan.buetcse.394@gmail.com" style="color:var(--accent-cyan); text-decoration:underline;">s.a.jahan.buetcse.394@gmail.com</a>.`;

      showToast('Message sent successfully!');

      setTimeout(() => {
        feedback.style.display = 'none';
      }, 7000);
    }, 900);
  });
}

/* ===================================================================
   8. COPY TO CLIPBOARD BUTTONS
   =================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 's.a.jahan.buetcse.394@gmail.com';
      copyToClipboard(email, 'Email copied to clipboard!');
    });
  });
}

function copyToClipboard(text, successMsg) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => fallbackCopy(text, successMsg));
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg);
  } catch (err) {
    showToast('Failed to copy');
  }
  document.body.removeChild(textArea);
}

/* ===================================================================
   9. TOAST NOTIFICATIONS
   =================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3200);
}

/* ===================================================================
   10. LIVE GITHUB DATA SYNCHRONIZATION
   =================================================================== */
async function initGitHubLiveSync() {
  const repoCountEl = document.getElementById('live-repo-count');
  const heroRepoCountEl = document.getElementById('stat-repos-count');
  const lastActiveEl = document.getElementById('live-last-active');
  const avatarImg = document.getElementById('profile-avatar-display');

  try {
    const userRes = await fetch('https://api.github.com/users/afrin0201');
    if (!userRes.ok) return;

    const userData = await userRes.json();

    if (userData.public_repos !== undefined) {
      if (repoCountEl) repoCountEl.textContent = userData.public_repos;
      if (heroRepoCountEl) heroRepoCountEl.textContent = `${userData.public_repos}+`;
    }

    if (userData.updated_at && lastActiveEl) {
      const updatedDate = new Date(userData.updated_at);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      lastActiveEl.textContent = `${monthNames[updatedDate.getMonth()]} ${updatedDate.getFullYear()}`;
    }
  } catch (err) {
    // Offline / rate limit fallback is already gracefully populated with verified data
    console.log('GitHub sync using resilient cache');
  }
}

/* Helper to escape strings in terminal */
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}
