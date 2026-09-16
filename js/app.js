/**
 * ==========================================================================
 * CYBER GLASSMORPHIC PORTFOLIO INTERACTION ENGINE
 * Valluru Lokeswar Reddy — Full-Stack Java & Angular Developer
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initRoleTyping();
  initNavbarScroll();
  initSkillsFilter();
  initProjectModal();
  initClipboardAndContact();
});

/* --------------------------------------------------------------------------
   1. AMBIENT CURSOR GLOW SPOTLIGHT
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  // Track mouse movement
  window.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  // Hide on mouse leaving window
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });
}

/* --------------------------------------------------------------------------
   2. ROLE ROTATING TYPING EFFECT
   -------------------------------------------------------------------------- */
function initRoleTyping() {
  const textElement = document.getElementById('typed-role');
  if (!textElement) return;

  const roles = [
    'Full-Stack Java & Angular Developer',
    'Spring Boot 3 & Java 21 Architect',
    'Angular 18 & Signals Engineer',
    'Enterprise Cloud Systems Specialist',
    'MySQL & RESTful APIs Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      textElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new text
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. NAVBAR SCROLL & ACTIVE LINK SPY
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Sticky navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting based on viewport
    let currentSection = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x-lg');
      }
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('bi-list');
          icon.classList.remove('bi-x-lg');
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   4. TECHNICAL COMPETENCIES FILTER ENGINE
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE PROJECT SHOWCASE DEEP-DIVE MODAL
   -------------------------------------------------------------------------- */
const projectData = {
  hms: {
    title: 'Hospital Management System',
    tagline: 'Healthcare Management Web Application with Role-Based Access',
    liveUrl: 'https://hospital-management-system-fbmw.onrender.com/',
    githubUrl: 'https://github.com/Lokesh3454/Hospital_Management_System',
    badge: 'Angular • Spring Boot • Java • MySQL • Cloud Deployed',
    overview: `
      <p>A full-stack healthcare web application developed using <strong>Spring Boot, Angular, and MySQL</strong>, leveraging modern AI developer tools (Gemini, Antigravity) for rapid prototyping, clean architecture, and deployment on Render.</p>
      
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4><i class="bi bi-shield-lock-fill"></i> Strict 4-Tier RBAC</h4>
          <p>Stateless JWT authentication (HMAC-SHA512) and BCrypt hashing powering 4 isolated roles:</p>
          <ul>
            <li><strong>ADMIN:</strong> Hospital-wide configurations, wing analytics, user accounts.</li>
            <li><strong>DOCTOR:</strong> Clinical diagnoses, EHR timelines, multi-drug prescriptions.</li>
            <li><strong>PATIENT:</strong> Isolated self-service portal (view only their own records/bills).</li>
            <li><strong>RECEPTIONIST:</strong> Patient registration, appointment triage, billing settlement.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4><i class="bi bi-calendar-check-fill"></i> Overlap-Free Dynamic Scheduling</h4>
          <p>Configurable doctor weekly schedules with dynamic 30-minute slot computation and transactional validation that prevents double-booking at the database level.</p>
        </div>
      </div>
    `,
    architecture: `
      <h4><i class="bi bi-diagram-3-fill"></i> System Architecture & Data Flow</h4>
      <div class="architecture-code-block">
[Client: Web & Mobile Browsers] 
       │ 
       ▼ (HTTPS / Responsive Angular 18 Standalone App)
[Angular Router + Functional Guards (authGuard, roleGuard)]
       │
       ▼ (Bearer JWT HTTP Requests via Typed Angular Services)
[Spring Security 6 Stateless Filter Chain (@PreAuthorize)]
       │
       ▼ (15+ REST Controllers)
[Business Logic & Transactional Services]
       │
       ▼ (Spring Data JPA / Hibernate ORM)
[HikariCP Connection Pool ➔ MySQL 9 Enterprise Database]
      </div>
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Frontend Engineering</h4>
          <ul>
            <li><strong>Angular 18:</strong> Standalone components, modern Signals, and typed reactive forms.</li>
            <li><strong>Touch-friendly drawer:</strong> Seamless slide-out navigation for viewports &lt; 992px.</li>
            <li><strong>Print stylesheets:</strong> High-resolution printable invoices and prescription slips.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Backend Engineering</h4>
          <ul>
            <li><strong>Spring Boot 3.3.3:</strong> Java 21 virtual threads readiness and RESTful architecture.</li>
            <li><strong>Spring Data JPA:</strong> Optimized queries and entity relationship mapping.</li>
            <li><strong>Security:</strong> Stateless JJWT token authentication with granular method-level checks.</li>
          </ul>
        </div>
      </div>
    `,
    modules: `
      <h4><i class="bi bi-grid-3x3-gap-fill"></i> 12-Wing Operations Command Hub</h4>
      <p>A centralized hospital command center managing full institutional workflow:</p>
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Clinical Services</h4>
          <ul>
            <li>🛏️ <strong>Bed & Ward Management:</strong> Real-time ICU, General, and Private ward occupancy.</li>
            <li>💊 <strong>Pharmacy Inventory:</strong> Stock levels, expiry monitoring, reorder alerts.</li>
            <li>🧪 <strong>Lab Diagnostics:</strong> Diagnostic test catalog and pathology workflow.</li>
            <li>🩺 <strong>Surgery & OT:</strong> Operating theatre scheduling and surgeon assignments.</li>
            <li>🩸 <strong>Blood Bank:</strong> Real-time blood group inventory and unit reservations.</li>
            <li>💡 <strong>CDSS:</strong> Clinical Decision Support for drug interaction & vitals alerts.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Operations & Administrative</h4>
          <ul>
            <li>🚨 <strong>Emergency Room (ER):</strong> Triage classification (Immediate, Urgent, Delayed).</li>
            <li>🛡️ <strong>Insurance & TPA Claims:</strong> Policy verification and settlement status.</li>
            <li>👥 <strong>Duty Rosters:</strong> Nurse, doctor, and technician shift schedules.</li>
            <li>🎫 <strong>Queue Management:</strong> Token system and waiting room displays.</li>
            <li>📊 <strong>Hospital Analytics:</strong> Revenue trends and patient admission metrics.</li>
            <li>🔔 <strong>Notification Logs:</strong> Automated dispatch for SMS, Email, and appointments.</li>
          </ul>
        </div>
      </div>
    `,
    credentials: `
      <h4><i class="bi bi-key-fill"></i> Live Demo & Access Information</h4>
      <p>The application is deployed live on Render cloud. You can experience the system using the pre-configured role accounts or test booking workflows directly.</p>
      
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Demo Roles Available</h4>
          <ul>
            <li><strong>Admin Portal:</strong> Hospital configuration, departmental monitoring.</li>
            <li><strong>Doctor Dashboard:</strong> View scheduled patients, write electronic prescriptions.</li>
            <li><strong>Receptionist Desk:</strong> Book appointments, register patients, generate invoices.</li>
            <li><strong>Patient Portal:</strong> View personal consultations and history.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Deployment & Source Details</h4>
          <ul>
            <li><strong>Live Deployment:</strong> <a href="https://hospital-management-system-fbmw.onrender.com/" target="_blank" style="color:var(--cyan);text-decoration:underline;">hospital-management-system-fbmw.onrender.com</a></li>
            <li><strong>GitHub Repository:</strong> <a href="https://github.com/Lokesh3454/Hospital_Management_System" target="_blank" style="color:var(--cyan);text-decoration:underline;">github.com/Lokesh3454/Hospital_Management_System</a></li>
            <li><strong>CI/CD:</strong> Render Dockerized production builds with MySQL integration.</li>
          </ul>
        </div>
      </div>
    `
  },

  ems: {
    title: 'Employee Management System',
    tagline: 'Employee Portal for Attendance, Leave Management & Salary Records',
    liveUrl: 'https://ems-portal-gmw6.onrender.com/',
    githubUrl: 'https://github.com/Lokesh3454/EMS-Portal-',
    badge: 'Angular • Spring Boot • Java • MySQL • Cloud Deployed',
    overview: `
      <p>A full-stack workplace portal developed with <strong>Angular and Spring Boot</strong> to streamline employee profile directories, daily attendance tracking, multi-category leave requests, and salary slip access.</p>
      
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4><i class="bi bi-person-badge-fill"></i> 4-Tier Role Architecture</h4>
          <p>Role-based system authorization covering organizational hierarchies:</p>
          <ul>
            <li><strong>ROLE_ADMIN:</strong> System-wide configuration, access control, audit logs.</li>
            <li><strong>ROLE_HR:</strong> Employee onboarding, ATS recruitment, payroll computation, document vault.</li>
            <li><strong>ROLE_MANAGER:</strong> Departmental attendance monitoring, leave approvals, 360 appraisals.</li>
            <li><strong>ROLE_EMPLOYEE:</strong> Self-service portal, 1-click attendance clock-in/out, leave balance, payslips.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4><i class="bi bi-clock-history"></i> Real-Time Time Tracking & Attendance</h4>
          <p>Single-click Clock In / Clock Out engine tracking attendance statuses (Present, Late, Half-day, Absent) with automatic monthly summary aggregation.</p>
        </div>
      </div>
    `,
    architecture: `
      <h4><i class="bi bi-diagram-3-fill"></i> Enterprise Architecture Breakdown</h4>
      <div class="architecture-code-block">
[Frontend: Angular Single Page Application]
       │
       ▼ (HTTP Client with Bearer JWT Interceptor)
[Spring Boot 3.1.5 Microservice Layer]
       │
       ├─► [Spring Security RBAC Filter Chain]
       ├─► [Employee, Attendance, Leave, Payroll Controllers]
       ├─► [Transactional Service Layer & OKR Engine]
       │
       ▼ (Spring Data JPA / Hibernate ORM)
[MySQL 8 Relational Database Persistent Storage]
      </div>
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Frontend Technologies</h4>
          <ul>
            <li><strong>Angular & TypeScript:</strong> Reactive forms, route guards, HTTP interceptors.</li>
            <li><strong>UI Styling:</strong> Bootstrap 5.3, Bootstrap Icons, Font Awesome 6.</li>
            <li><strong>Responsive Ergonomics:</strong> Full viewport adaptability for tablets and smartphones.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Backend Technologies</h4>
          <ul>
            <li><strong>Java 17 & Spring Boot 3.1.5:</strong> Production-grade RESTful API endpoints.</li>
            <li><strong>JJWT (0.11.5):</strong> Cryptographic signature validation for stateless sessions.</li>
            <li><strong>Lombok & Maven:</strong> Clean boilerplate-free maintainable codebase.</li>
          </ul>
        </div>
      </div>
    `,
    modules: `
      <h4><i class="bi bi-layers-fill"></i> Comprehensive Enterprise Modules</h4>
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Core HR & Compensation</h4>
          <ul>
            <li>👥 <strong>Employee Directory:</strong> Deep search, departmental filters, CRUD operations.</li>
            <li>🏖️ <strong>Multi-Category Leave Engine:</strong> Casual, Sick, Paid, Maternity with approval workflow.</li>
            <li>💰 <strong>Payroll Calculator:</strong> Automated computation of Basic, HRA, PF, allowances, and tax deductions.</li>
            <li>🎯 <strong>Performance & OKRs:</strong> 360 appraisal cycles, quarterly goal tracking, rating matrices.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Enterprise Productivity</h4>
          <ul>
            <li>📁 <strong>Enterprise Document Vault:</strong> Secure repository for NDAs and contracts with digital verification stamps.</li>
            <li>💼 <strong>Recruitment ATS:</strong> Pipeline tracking (Applied ➔ Screened ➔ Interview ➔ Offered ➔ Hired).</li>
            <li>🤖 <strong>Interactive AI HR Assistant:</strong> Built-in floating widget for instant answers on HR policies and leave rules.</li>
            <li>📊 <strong>Executive Dashboard:</strong> Real-time headcount KPIs, attendance rates, and departmental metrics.</li>
          </ul>
        </div>
      </div>
    `,
    credentials: `
      <h4><i class="bi bi-box-arrow-up-right"></i> Live Deployment & Source</h4>
      <p>Explore the live enterprise dashboard deployed on Render or inspect the complete GitHub repository code.</p>
      
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Platform Capabilities</h4>
          <ul>
            <li>Single-click interactive Clock In / Clock Out.</li>
            <li>Automated salary slip breakdowns.</li>
            <li>Interactive job application tracking pipeline.</li>
            <li>Departmental management across IT, HR, Finance, and Operations.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Access & Links</h4>
          <ul>
            <li><strong>Live Deployment:</strong> <a href="https://ems-portal-gmw6.onrender.com/" target="_blank" style="color:var(--cyan);text-decoration:underline;">ems-portal-gmw6.onrender.com</a></li>
            <li><strong>GitHub Repository:</strong> <a href="https://github.com/Lokesh3454/EMS-Portal-" target="_blank" style="color:var(--cyan);text-decoration:underline;">github.com/Lokesh3454/EMS-Portal-</a></li>
            <li><strong>License:</strong> MIT Open-Source Enterprise License.</li>
          </ul>
        </div>
      </div>
    `
  },

  examSeating: {
    title: 'Exam Seating Arrangement System',
    tagline: 'Automated Desk Allocation, Hall Search & Invigilation Management',
    liveUrl: 'https://student-exam-seating-arrangement.onrender.com/',
    githubUrl: 'https://github.com/Lokesh3454/Student_Exam_Seating_Arrangement',
    badge: 'Angular • Spring Boot • Java • MySQL',
    overview: `
      <p>A web-based academic examination portal designed for colleges to automate student desk allocations for semester exams, enforce branch separation logic to prevent cheating, and manage faculty invigilation duties.</p>
      
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4><i class="bi bi-cpu-fill"></i> Anti-Neighbor Constraint Engine</h4>
          <p>Constraint-satisfaction seating allocation preventing academic dishonesty:</p>
          <ul>
            <li><strong>Branch Isolation:</strong> Ensures adjacent desks (left, right, front, back) do not seat students from the same department, branch, or semester.</li>
            <li><strong>Dynamic Hall Grids:</strong> Supports customizable rows, columns, and bench configurations.</li>
            <li><strong>Visual Seating Matrix:</strong> Interactive color-coded seat map displaying student registration and exam metadata.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4><i class="bi bi-person-badge-fill"></i> 3-Tier Role Security (RBAC)</h4>
          <p>Stateless JWT authentication securing 3 discrete operational roles:</p>
          <ul>
            <li><strong>ADMIN:</strong> Hall setup, exam scheduling, bulk CSV ingestion, algorithm execution.</li>
            <li><strong>FACULTY:</strong> Personalized invigilation roster, desk-by-desk live hall attendance.</li>
            <li><strong>STUDENT:</strong> Searchable candidate timetable, assigned hall, and seat number.</li>
          </ul>
        </div>
      </div>
    `,
    architecture: `
      <h4><i class="bi bi-diagram-3-fill"></i> System Architecture & Algorithm Flow</h4>
      <div class="architecture-code-block">
[Angular 17 Standalone Single Page App]
       │
       ▼ (Bearer JWT HTTP Requests via Angular HttpClient)
[Spring Security Filter Chain (@PreAuthorize RBAC)]
       │
       ├─► [Seating Algorithm Engine (Constraint Satisfaction Solver)]
       ├─► [Exam, Hall, Faculty Assignment Controllers]
       ├─► [Live Attendance Register & Malpractice Loggers]
       │
       ▼ (Spring Data JPA / Hibernate ORM)
[Relational Database: Desks, Enrollments, Schedules & Audit Logs]
      </div>
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Frontend Engineering</h4>
          <ul>
            <li><strong>Angular 17+:</strong> Standalone components, reactive TypeScript architecture.</li>
            <li><strong>Seating Matrix Grid:</strong> High-density visual layout of examination halls.</li>
            <li><strong>Print-Ready Records:</strong> Formatted print stylesheets for physical hall registers.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Backend Engineering</h4>
          <ul>
            <li><strong>Spring Boot 3.x & Java 17+:</strong> Microservice REST endpoints.</li>
            <li><strong>Constraint Solver:</strong> Heuristic backtracking algorithm preventing neighbor clashes.</li>
            <li><strong>Bulk CSV Ingestion:</strong> Transactional processing of candidate records with rollback.</li>
          </ul>
        </div>
      </div>
    `,
    modules: `
      <h4><i class="bi bi-grid-3x3-gap-fill"></i> Comprehensive Examination Modules</h4>
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Allocation & Operations</h4>
          <ul>
            <li>🧠 <strong>Constraint Seating Engine:</strong> Automated hall distribution with anti-cheating separation.</li>
            <li>🏢 <strong>Dynamic Hall Architect:</strong> Configurable rows, columns, and bench capacities per hall.</li>
            <li>👨‍🏫 <strong>Invigilation Roster:</strong> Faculty allocation with automated double-booking prevention.</li>
            <li>📥 <strong>Bulk Data Ingestion:</strong> One-click CSV import for students, exams, and room schedules.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Live Supervision & Analytics</h4>
          <ul>
            <li>📋 <strong>Live Hall Register:</strong> Real-time desk-by-desk Present/Absent toggles.</li>
            <li>⚠️ <strong>Malpractice Incident Logging:</strong> Incident audit trail with proof records and status workflow.</li>
            <li>📊 <strong>4-in-1 Reports:</strong> Exam utilization, hall occupancy, branch stats, candidate timetables.</li>
            <li>🖨️ <strong>Printable Sheets:</strong> Official printable seating charts and signature registers.</li>
          </ul>
        </div>
      </div>
    `,
    credentials: `
      <h4><i class="bi bi-box-arrow-up-right"></i> Live Deployment & Source</h4>
      <p>Explore the live examination platform deployed on Render or inspect the complete GitHub repository code.</p>
      
      <div class="deepdive-grid">
        <div class="deepdive-card">
          <h4>Platform Capabilities</h4>
          <ul>
            <li>Interactive hall grid with real-time seat inspection.</li>
            <li>Instant seating allocation generation for multi-branch exams.</li>
            <li>Live attendance tracking and incident reporting.</li>
            <li>Searchable student hall & desk lookup.</li>
          </ul>
        </div>
        <div class="deepdive-card">
          <h4>Access & Links</h4>
          <ul>
            <li><strong>Live Deployment:</strong> <a href="https://student-exam-seating-arrangement.onrender.com/" target="_blank" style="color:var(--cyan);text-decoration:underline;">student-exam-seating-arrangement.onrender.com</a></li>
            <li><strong>GitHub Repository:</strong> <a href="https://github.com/Lokesh3454/Student_Exam_Seating_Arrangement" target="_blank" style="color:var(--cyan);text-decoration:underline;">github.com/Lokesh3454/Student_Exam_Seating_Arrangement</a></li>
            <li><strong>License:</strong> MIT Open-Source License.</li>
          </ul>
        </div>
      </div>
    `
  }
};

function initProjectModal() {
  const modalBackdrop = document.getElementById('project-modal');
  if (!modalBackdrop) return;

  const closeBtn = document.getElementById('modal-close-btn');
  const tabBtns = document.querySelectorAll('.modal-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // Open Modal Triggers
  document.querySelectorAll('[data-project-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-target');
      loadProjectIntoModal(projectId);
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modal
  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(`tab-${targetTab}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

function loadProjectIntoModal(id) {
  const data = projectData[id];
  if (!data) return;

  document.getElementById('modal-project-title').textContent = data.title;
  document.getElementById('modal-project-tagline').textContent = data.tagline;
  document.getElementById('modal-project-badge').textContent = data.badge;

  const liveBtn = document.getElementById('modal-live-btn');
  const githubBtn = document.getElementById('modal-github-btn');
  if (liveBtn) liveBtn.href = data.liveUrl;
  if (githubBtn) githubBtn.href = data.githubUrl;

  document.getElementById('tab-overview').innerHTML = data.overview;
  document.getElementById('tab-architecture').innerHTML = data.architecture;
  document.getElementById('tab-modules').innerHTML = data.modules;
  document.getElementById('tab-credentials').innerHTML = data.credentials;

  // Reset to first tab
  const firstTabBtn = document.querySelector('.modal-tab-btn[data-tab="overview"]');
  if (firstTabBtn) firstTabBtn.click();
}

/* --------------------------------------------------------------------------
   6. CLIPBOARD NOTIFICATIONS & DIRECT CONTACT FORM
   -------------------------------------------------------------------------- */
function initClipboardAndContact() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Information';

      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${label} to clipboard!`);
        }).catch(() => {
          fallbackCopy(textToCopy, label);
        });
      } else {
        fallbackCopy(textToCopy, label);
      }
    });
  });

  // Contact form submission via mailto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value;
      const email = document.getElementById('sender-email').value;
      const subject = document.getElementById('sender-subject').value || 'Portfolio Contact Inquiry';
      const message = document.getElementById('sender-message').value;

      const mailtoUrl = `mailto:lokeswarreddy3454@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      
      window.location.href = mailtoUrl;
      showToast('Opening your email client to send message...');
      contactForm.reset();
    });
  }
}

function fallbackCopy(text, label) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied ${label} to clipboard!`);
  } catch (err) {
    showToast(`Failed to copy: ${text}`);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="bi bi-check-circle-fill"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
