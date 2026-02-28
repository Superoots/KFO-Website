/* ============================================
   Main JavaScript
   Navigation, Scroll Animations, FAQ, Cookies
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollAnimations();
  initFAQ();
  initTestimonialsSlider();
  initCookieBanner();
  initContactForm();
});

/* --- Sticky Header with shadow on scroll --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');

  if (!hamburger || !mobileNav) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --- Scroll Animations (Intersection Observer) --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children'
  );

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  animatedElements.forEach(el => observer.observe(el));
}

/* --- FAQ Accordion --- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        }
      });

      // Toggle current item
      item.classList.toggle('active');
      if (!isActive) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = '0';
      }
    });
  });
}

/* --- Testimonials Slider --- */
function initTestimonialsSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  const track = slider.querySelector('.testimonials-track');
  const prevBtn = slider.querySelector('.testimonial-prev');
  const nextBtn = slider.querySelector('.testimonial-next');

  if (!track) return;

  let currentIndex = 0;

  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  }

  function getMaxIndex() {
    const cards = track.querySelectorAll('.testimonial-card');
    return Math.max(0, cards.length - getVisibleCount());
  }

  function updateSlider() {
    const visibleCount = getVisibleCount();
    const cardWidth = 100 / visibleCount;
    track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      updateSlider();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
      updateSlider();
    });
  }

  window.addEventListener('resize', () => {
    currentIndex = Math.min(currentIndex, getMaxIndex());
    updateSlider();
  });

  // Touch / swipe support
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = Math.min(getMaxIndex(), currentIndex + 1);
      } else {
        currentIndex = Math.max(0, currentIndex - 1);
      }
      updateSlider();
    }
  }, { passive: true });
}

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  const accepted = localStorage.getItem('cookies-accepted');
  if (accepted) return;

  // Show banner after a short delay
  setTimeout(() => {
    banner.classList.add('show');
  }, 1000);

  const acceptBtn = banner.querySelector('.cookie-accept');
  const declineBtn = banner.querySelector('.cookie-decline');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      banner.classList.remove('show');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'false');
      banner.classList.remove('show');
    });
  }
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = form.querySelector('.form-success');
    const errorMsg = form.querySelector('.form-error');

    // Reset messages
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    // Basic validation
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    if (!name?.value.trim() || !email?.value.trim() || !message?.value.trim()) {
      if (errorMsg) {
        errorMsg.textContent = 'Bitte füllen Sie alle Pflichtfelder aus.';
        errorMsg.style.display = 'block';
      }
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      if (errorMsg) {
        errorMsg.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        errorMsg.style.display = 'block';
      }
      return;
    }

    // Simulate submission (replace with Formspree or similar endpoint)
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet...';
    }

    try {
      // For production: use Formspree or similar
      // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //   method: 'POST',
      //   body: new FormData(form),
      //   headers: { 'Accept': 'application/json' }
      // });

      // Simulated success for now
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (successMsg) {
        successMsg.textContent = 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.';
        successMsg.style.display = 'block';
      }
      form.reset();
    } catch (err) {
      if (errorMsg) {
        errorMsg.textContent = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.';
        errorMsg.style.display = 'block';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Nachricht senden';
      }
    }
  });
}

/* --- Smooth Scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
