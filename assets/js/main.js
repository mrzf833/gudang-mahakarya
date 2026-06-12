document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initStatsCounter();
  initPortfolioFilter();
  initLightbox();
  initTimeline();
  initTestimonialSlider();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. NAVBAR & SCROLL-TO-TOP BUTTON
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  window.addEventListener('scroll', () => {
    // Header shadow/blur on scroll
    if (window.scrollY > 50) {
      header.classList.add('glass-nav', 'py-3');
      header.classList.remove('py-5', 'bg-transparent');
    } else {
      header.classList.remove('glass-nav', 'py-3');
      header.classList.add('py-5', 'bg-transparent');
    }

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
        scrollTopBtn.classList.remove('opacity-0', 'translate-y-4');
      } else {
        scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
        scrollTopBtn.classList.add('opacity-0', 'translate-y-4');
      }
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenuBtn.innerHTML = isOpen 
        ? `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`
        : `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>`;
    });

    // Close mobile menu on click link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = `<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>`;
      });
    });
  }
}

/* ==========================================================================
   2. SCROLL ENTRANCE ANIMATIONS (Intersection Observer)
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing to make animations permanent, or keep for re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/* ==========================================================================
   3. STATS COUNT-UP ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    const startTime = performance.now();
    
    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeOutQuad)
      const easedProgress = progress * (2 - progress);
      const currentVal = Math.floor(easedProgress * target);
      
      element.textContent = currentVal + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target + suffix;
      }
    };
    
    requestAnimationFrame(updateCount);
  };

  const statSection = document.querySelector('.stats-section');
  if (statSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => countUp(num));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(statSection);
  }
}

/* ==========================================================================
   4. PORTFOLIO FILTER GALLERY
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on button
      filterBtns.forEach(b => b.classList.remove('bg-amber-500', 'text-slate-950', 'border-amber-500'));
      filterBtns.forEach(b => b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-800'));
      
      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-800');
      btn.classList.add('bg-amber-500', 'text-slate-950', 'border-amber-500');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   5. LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const viewDetailsBtns = document.querySelectorAll('.view-detail-btn');

  if (!lightboxModal) return;

  viewDetailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentCard = btn.closest('.portfolio-item');
      const img = parentCard.querySelector('img');
      const title = parentCard.querySelector('h3').textContent;
      const desc = parentCard.querySelector('.project-category').textContent;

      lightboxImg.src = img.src;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lightboxModal.classList.remove('hidden', 'pointer-events-none');
      setTimeout(() => {
        lightboxModal.classList.add('open', 'opacity-100');
      }, 50);
    });
  });

  const closeLightbox = () => {
    lightboxModal.classList.remove('open', 'opacity-100');
    setTimeout(() => {
      lightboxModal.classList.add('hidden', 'pointer-events-none');
      lightboxImg.src = '';
    }, 300);
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.closest('#lightboxClose')) {
      closeLightbox();
    }
  });

  // ESC Key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   6. INTERACTIVE TIMELINE PROGRESSION
   ========================================================================== */
function initTimeline() {
  const timeline = document.querySelector('.timeline-section');
  const progressBar = document.querySelector('.timeline-progress-bar');
  const timelineNodes = document.querySelectorAll('.timeline-node');

  if (!timeline || !progressBar) return;

  window.addEventListener('scroll', () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate scroll progress relative to the timeline block
    // start counting when timeline top reaches 60% of viewport, end when bottom reaches 40%
    const startOffset = windowHeight * 0.6;
    const endOffset = windowHeight * 0.4;
    const totalHeight = rect.height;
    
    let scrolled = (startOffset - rect.top) / (totalHeight - endOffset + startOffset);
    scrolled = Math.max(0, Math.min(1, scrolled)); // Clamp between 0 and 1

    progressBar.style.height = `${scrolled * 100}%`;

    // Highlight timeline nodes
    timelineNodes.forEach(node => {
      const nodeRect = node.getBoundingClientRect();
      const nodeCenter = nodeRect.top + nodeRect.height / 2;
      
      if (nodeCenter < windowHeight * 0.6) {
        node.classList.add('active-node');
        const badge = node.querySelector('.node-badge');
        if (badge) {
          badge.classList.remove('bg-slate-800', 'text-slate-400');
          badge.classList.add('bg-amber-500', 'text-slate-950');
        }
      } else {
        node.classList.remove('active-node');
        const badge = node.querySelector('.node-badge');
        if (badge) {
          badge.classList.add('bg-slate-800', 'text-slate-400');
          badge.classList.remove('bg-amber-500', 'text-slate-950');
        }
      }
    });
  });
}

/* ==========================================================================
   7. TESTIMONIAL SLIDER
   ========================================================================== */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.getElementById('sliderDots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer;

  // Create Indicators (Dots)
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${
      index === 0 ? 'bg-amber-500 w-6' : 'bg-slate-700 hover:bg-slate-500'
    }`;
    dot.setAttribute('aria-label', `Slide ke-${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('button');

  const updateSlider = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.remove('bg-slate-700', 'w-3');
        dot.classList.add('bg-amber-500', 'w-6');
      } else {
        dot.classList.remove('bg-amber-500', 'w-6');
        dot.classList.add('bg-slate-700', 'w-3');
      }
    });
  };

  const goToSlide = (index) => {
    currentIndex = index;
    updateSlider();
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  };

  // Autoplay
  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  startAutoplay();
}

/* ==========================================================================
   8. FAQ ACCORDION TOGGLE
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    trigger.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');
      
      // Close all other accordions first
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');
        otherContent.classList.add('hidden');
        otherIcon.style.transform = 'rotate(0deg)';
        otherItem.classList.remove('border-amber-500/30');
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        item.classList.add('border-amber-500/30');
      }
    });
  });
}

/* ==========================================================================
   9. CONTACT FORM INTERACTIVE SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const formBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = formBtn.innerHTML;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Visual loading state
    formBtn.disabled = true;
    formBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Mengirim Pesan...
    `;

    // Simulate Network Request
    setTimeout(() => {
      // Show dynamic notification dialog
      showToast('Pesan Anda berhasil dikirim! Tim kami akan menghubungi Anda segera.');
      
      // Reset form
      form.reset();
      formBtn.disabled = false;
      formBtn.innerHTML = originalBtnText;
    }, 2000);
  });
}

/* Helper to show custom dynamic toast */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-24 right-6 md:right-12 glass-panel border-amber-500/50 text-white py-4 px-6 rounded-lg shadow-2xl z-50 flex items-center gap-3 transition-all duration-300 opacity-0 translate-y-4';
  toast.innerHTML = `
    <span class="flex items-center justify-center bg-amber-500 text-slate-950 w-6 h-6 rounded-full font-bold">✓</span>
    <p class="text-sm font-medium">${message}</p>
  `;

  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.remove('opacity-0', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
  }, 50);

  // Remove toast after 5s
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}
