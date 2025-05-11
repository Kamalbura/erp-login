(function() {
  // Only add CSS once
  if (!document.getElementById('motivation-popup-style')) {
    const style = document.createElement('style');
    style.id = 'motivation-popup-style';
    style.textContent = `
      @keyframes fairyPop {
        0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
        60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      @keyframes fairyWings {
        0% { filter: drop-shadow(0 0 6px #f3e5f5); }
        100% { filter: drop-shadow(0 0 18px #b388ff); }
      }
      @keyframes fairyShine {
        0%, 100% { text-shadow: 0 0 8px #fff7ef, 0 0 18px #ffd6fa, 0 0 32px #b388ff; }
        50% { text-shadow: 0 0 24px #fff7ef, 0 0 48px #ffd6fa, 0 0 64px #b388ff; }
      }
      @keyframes sparkleMove {
        0% { opacity: 0; transform: scale(0.5) translateY(0); }
        30% { opacity: 1; }
        70% { opacity: 1; }
        100% { opacity: 0; transform: scale(1.2) translateY(-40px); }
      }
      .motivation-popup-bg {
        position: fixed; z-index: 9999; inset: 0; background: rgba(0,0,0,0.2);
        display: flex; align-items: center; justify-content: center;
        animation: fadeInBg 0.3s;
      }
      .motivation-popup {
        background: linear-gradient(135deg, #fff0fa 0%, #e0f7fa 100%);
        border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        padding: 2.5rem 2rem 2rem 2rem; text-align: center; min-width: 300px;
        position: relative; animation: fairyPop 0.7s cubic-bezier(.68,-0.55,.27,1.55);
        overflow: visible;
      }
      .motivation-fairy {
        font-size: 2.5rem; animation: fairyWings 1.2s infinite alternate, fairyShine 1.5s infinite alternate;
        display: block; margin-bottom: 0.5rem; position: relative; z-index: 2;
      }
      .motivation-popup .motivation-close {
        position: absolute; top: 8px; right: 16px; background: none; border: none;
        font-size: 1.5rem; color: #888; cursor: pointer;
      }
      .motivation-popup-message {
        font-size: 1.2rem; color: #6a1b9a; font-weight: 500; margin-top: 0.5rem;
      }
      .fairy-sparkle {
        position: absolute;
        font-size: 1.1em;
        pointer-events: none;
        opacity: 0;
        animation: sparkleMove 1.2s linear forwards;
      }
    `;
    document.head.appendChild(style);
  }

  function createSparkle(parent, x, y, delay) {
    const sparkle = document.createElement('span');
    sparkle.className = 'fairy-sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.animationDelay = delay + 's';
    parent.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1300);
  }

  window.showMotivationPopup = function(message, durationMs = 1800) {
    // Remove if already exists
    const old = document.getElementById('motivation-popup-bg');
    if (old) old.remove();

    const bg = document.createElement('div');
    bg.className = 'motivation-popup-bg';
    bg.id = 'motivation-popup-bg';

    const popup = document.createElement('div');
    popup.className = 'motivation-popup';

    // Fairy emoji and message
    popup.innerHTML = `
      <button class="motivation-close" title="Close">&times;</button>
      <span class="motivation-fairy" id="motivation-fairy">🧚‍♀️✨</span>
      <div class="motivation-popup-message">${message || "Friends, all the best for your future! 🌟"}</div>
    `;

    // Close on click
    popup.querySelector('.motivation-close').onclick = () => bg.remove();
    bg.onclick = e => { if (e.target === bg) bg.remove(); };

    bg.appendChild(popup);
    document.body.appendChild(bg);

    // Sparkle animation: burst of sparkles around the fairy
    const fairy = popup.querySelector('#motivation-fairy');
    const fairyRect = { width: 48, height: 48 }; // Approximate for emoji
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * 2 * Math.PI;
      const x = 36 + Math.cos(angle) * 28;
      const y = 10 + Math.sin(angle) * 18;
      createSparkle(popup, 90 + x, 18 + y, i * 0.09);
    }
    // Extra random sparkles for magic
    for (let i = 0; i < 5; i++) {
      const x = 90 + Math.random() * 60 - 30;
      const y = 18 + Math.random() * 40 - 10;
      createSparkle(popup, x, y, 0.7 + Math.random() * 0.5);
    }

    // Auto-close after duration
    setTimeout(() => { if (document.body.contains(bg)) bg.remove(); }, durationMs);
  };
})();
