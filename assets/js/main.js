/**
 * ISTD JAIPUR CHAPTER - OFFICIAL SCRIPT
 * Interactivity, Modals, Forms & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (mainNav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Mobile dropdowns accordion
    const navItems = mainNav.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown-menu');
      if (dropdown && link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('open');
          }
        });
      }
    });
  }

  // 2. Sticky Header Effect
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Counter Animation for Metrics
  const counters = document.querySelectorAll('.metric-number');
  let animated = false;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target') || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      let count = 0;
      const speed = target > 1000 ? Math.ceil(target / 60) : Math.ceil(target / 30);

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = `${prefix}${count.toLocaleString()}${suffix}`;
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      };
      updateCount();
    });
  };

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          runCounters();
          animated = true;
        }
      });
    }, { threshold: 0.2 });

    observer.observe(metricsSection);
  }

  // 4. Brochure Modal Handling
  const brochureModal = document.getElementById('brochureModal');
  const openBrochureBtns = document.querySelectorAll('.open-brochure-modal');
  const closeBrochureBtn = document.getElementById('closeBrochureModal');
  const brochureProgramInput = document.getElementById('brochureProgram');

  openBrochureBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const programName = btn.getAttribute('data-program') || 'ISTD PGP-TL&D';
      if (brochureProgramInput) {
        brochureProgramInput.value = programName;
      }
      if (brochureModal) {
        brochureModal.classList.add('active');
      }
    });
  });

  if (closeBrochureBtn && brochureModal) {
    closeBrochureBtn.addEventListener('click', () => {
      brochureModal.classList.remove('active');
    });

    brochureModal.addEventListener('click', (e) => {
      if (e.target === brochureModal) {
        brochureModal.classList.remove('active');
      }
    });
  }

  // Brochure form submit
  const brochureForm = document.getElementById('brochureForm');
  if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const prog = brochureProgramInput ? brochureProgramInput.value : 'Brochure';
      alert(`Thank you! The brochure for ${prog} has been sent to your email, and download will begin shortly.`);
      brochureModal?.classList.remove('active');
      brochureForm.reset();
    });
  }

  // 5. Login Modal Handling
  const loginModal = document.getElementById('loginModal');
  const openLoginBtns = document.querySelectorAll('.open-login-modal');
  const closeLoginBtn = document.getElementById('closeLoginModal');

  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal?.classList.add('active');
    });
  });

  if (closeLoginBtn && loginModal) {
    closeLoginBtn.addEventListener('click', () => {
      loginModal.classList.remove('active');
    });

    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('active');
      }
    });
  }

  // Login form submit
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Login portal connected. Please authenticate with your registered ISTD credentials.');
      loginModal?.classList.remove('active');
    });
  }

  // 6. Request Info Form Handling
  const requestForm = document.getElementById('requestInfoForm');
  if (requestForm) {
    requestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reqName')?.value || 'Learner';
      alert(`Thank you, ${name}! Your inquiry has been submitted to ISTD Jaipur Chapter. Our admissions & training team will get in touch with you shortly.`);
      requestForm.reset();
    });
  }
});
