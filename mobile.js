let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {

    paper.addEventListener('touchstart', (e) => {
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;

      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      e.preventDefault(); // important

      const touch = e.touches[0];

      const dx = touch.clientX - this.prevTouchX;
      const dy = touch.clientY - this.prevTouchY;

      this.currentPaperX += dx;
      this.currentPaperY += dy;

      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;

      paper.style.transform = `
        translateX(${this.currentPaperX}px)
        translateY(${this.currentPaperY}px)
        rotateZ(${this.rotation}deg)
      `;
    }, { passive: false }); // VERY IMPORTANT

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = document.querySelectorAll('.paper');

papers.forEach(paper => {
  new Paper().init(paper);
});
