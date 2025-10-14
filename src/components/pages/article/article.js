document.addEventListener('DOMContentLoaded', () => {
  const feedbackBlocks = document.querySelectorAll('[data-feedback-block]');

  feedbackBlocks.forEach(block => {
    const likeBtn = block.querySelector('[data-feedback="like"]');
    const dislikeBtn = block.querySelector('[data-feedback="dislike"]');

    if (!likeBtn || !dislikeBtn) return;

    function resetButtons() {
      likeBtn.style.color = '';
      dislikeBtn.style.color = '';
      likeBtn.setAttribute('aria-pressed', 'false');
      dislikeBtn.setAttribute('aria-pressed', 'false');
    }

    likeBtn.addEventListener('click', () => {
      const isActive = likeBtn.getAttribute('aria-pressed') === 'true';
      resetButtons();
      if (!isActive) {
        likeBtn.style.color = '#46D75A';
        likeBtn.setAttribute('aria-pressed', 'true');
      }
    });

    dislikeBtn.addEventListener('click', () => {
      const isActive = dislikeBtn.getAttribute('aria-pressed') === 'true';
      resetButtons();
      if (!isActive) {
        dislikeBtn.style.color = '#FF2900';
        dislikeBtn.setAttribute('aria-pressed', 'true');
      }
    });
  });
});
