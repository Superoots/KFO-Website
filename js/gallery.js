/* ============================================
   Before/After Image Comparison Slider
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSliders();
});

function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('.ba-slider');

  sliders.forEach(slider => {
    const afterImage = slider.querySelector('.ba-slider__after');
    const divider = slider.querySelector('.ba-slider__divider');
    const handle = slider.querySelector('.ba-slider__handle');

    if (!afterImage || !divider || !handle) return;

    let isDragging = false;

    function updatePosition(x) {
      const rect = slider.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));

      afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      divider.style.left = percent + '%';
      handle.style.left = percent + '%';
    }

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updatePosition(e.clientX);
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      updatePosition(e.touches[0].clientX);
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
      e.preventDefault();
    }, { passive: false });

    slider.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Keyboard accessibility
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-label', 'Vorher/Nachher Vergleich');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', '50');

    handle.addEventListener('keydown', (e) => {
      const rect = slider.getBoundingClientRect();
      const currentPercent = parseFloat(handle.style.left) || 50;
      let newPercent = currentPercent;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        newPercent = Math.max(0, currentPercent - 2);
        e.preventDefault();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        newPercent = Math.min(100, currentPercent + 2);
        e.preventDefault();
      }

      if (newPercent !== currentPercent) {
        const x = rect.left + (newPercent / 100) * rect.width;
        updatePosition(x);
        handle.setAttribute('aria-valuenow', Math.round(newPercent));
      }
    });
  });
}
