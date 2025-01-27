document.addEventListener('DOMContentLoaded', () => {
    const imageArray = [
      { title: 'image1', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/cheeseburger.png?raw=true' },
      { title: 'image2', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/fries.png?raw=true' },
      { title: 'image3', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/hotdog.png?raw=true' },
      { title: 'image4', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/ice-cream.png?raw=true' },
      { title: 'image5', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/milkshake.png?raw=true' },
      { title: 'image6', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/pizza.png?raw=true' },
      { title: 'image1', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/cheeseburger.png?raw=true' },
      { title: 'image2', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/fries.png?raw=true' },
      { title: 'image3', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/hotdog.png?raw=true' },
      { title: 'image4', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/ice-cream.png?raw=true' },
      { title: 'image5', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/milkshake.png?raw=true' },
      { title: 'image6', src: 'https://github.com/Kalvium-Program/Image-files/blob/main/images/pizza.png?raw=true' }
    ];
  
    const cardBackSrc = 'https://github.com/Kalvium-Program/Image-files/blob/main/images/blank.png?raw=true';
  
    imageArray.sort(() => 0.5 - Math.random());
  
    const gameGrid = document.querySelector('.grid');
    const pointsDisplay = document.getElementById('score');
    let points = 0;
    let selectedImages = [];
    let selectedImageIds = [];
  
    function initializeBoard() {
      imageArray.forEach((image, idx) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.setAttribute('class', 'card');
        cardWrapper.setAttribute('data-id', idx);
        const cardBack = document.createElement('img');
        cardBack.setAttribute('src', cardBackSrc);
        cardWrapper.appendChild(cardBack);
        gameGrid.appendChild(cardWrapper);
  
        cardWrapper.addEventListener('click', revealCard);
      });
    }
  
    function revealCard() {
      const imageId = this.getAttribute('data-id');
      if (!selectedImageIds.includes(imageId)) {
        selectedImages.push(imageArray[imageId].title);
        selectedImageIds.push(imageId);
        this.firstChild.setAttribute('src', imageArray[imageId].src);
        if (selectedImages.length === 2) {
          setTimeout(validateMatch, 500);
        }
      }
    }
  
    function validateMatch() {
      const allCards = document.querySelectorAll('.card');
      const [firstImageId, secondImageId] = selectedImageIds;
  
      if (selectedImages[0] === selectedImages[1]) {
        allCards[firstImageId].classList.add('hidden');
        allCards[secondImageId].classList.add('hidden');
        points++;
        pointsDisplay.textContent = points;
        if (points === imageArray.length / 2) {
          setTimeout(() => alert('Congratulations! You found all the pairs!'), 200);
        }
      } else {
        allCards[firstImageId].firstChild.setAttribute('src', cardBackSrc);
        allCards[secondImageId].firstChild.setAttribute('src', cardBackSrc);
      }
  
      selectedImages = [];
      selectedImageIds = [];
    }
  
    initializeBoard();
  });
  