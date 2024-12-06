// Initialize Swiper.js
const swiper = new Swiper('.swiper-container', {
    loop: true,  // Infinite loop
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    grabCursor: true,
    allowTouchMove: true, // Enable swipe gesture
    simulateTouch: true,  // Ensure swiping works on both mobile and desktop
});

// Add text to the active slide
const addTextButton = document.getElementById('addTextBtn');
const textControls = document.querySelector('.text-controls');

addTextButton.addEventListener('click', () => {
    const currentSlide = swiper.slides[swiper.activeIndex];
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.innerText = 'Add your text here!';
    textDiv.contentEditable = 'true'; // Allow editing

    currentSlide.appendChild(textDiv);

    // Show text controls
    textControls.style.visibility = 'visible';

    // Enable dragging
    makeTextDraggable(textDiv);
});

// Function to make text draggable within the image boundary
function makeTextDraggable(textElement) {
    let offsetX, offsetY;
    let isDragging = false;

    textElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - textElement.getBoundingClientRect().left;
        offsetY = e.clientY - textElement.getBoundingClientRect().top;
        textElement.style.position = 'absolute';
        textElement.style.zIndex = '100'; // Bring to front while dragging
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            // Keep the text within the image boundary
            const imageRect = textElement.closest('.swiper-slide').getBoundingClientRect();
            const textWidth = textElement.offsetWidth;
            const textHeight = textElement.offsetHeight;

            if (x >= imageRect.left && x + textWidth <= imageRect.right) {
                textElement.style.left = `${x - imageRect.left}px`;
            }

            if (y >= imageRect.top && y + textHeight <= imageRect.bottom) {
                textElement.style.top = `${y - imageRect.top}px`;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        textElement.style.zIndex = ''; // Reset z-index after dragging
    });
}

// Text editing functionality
const increaseFontSizeButton = document.getElementById('increaseFontSize');
const decreaseFontSizeButton = document.getElementById('decreaseFontSize');
const fontColorInput = document.getElementById('fontColor');
const fontFamilySelect = document.getElementById('fontFamily');

let selectedText = null;

// When the user clicks on a text, set it as the selected text for editing
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('text')) {
        selectedText = e.target;
    }
});

// Change font size
increaseFontSizeButton.addEventListener('click', () => {
    if (selectedText) {
        let currentSize = parseInt(window.getComputedStyle(selectedText).fontSize);
        selectedText.style.fontSize = `${currentSize + 2}px`;
    }
});

decreaseFontSizeButton.addEventListener('click', () => {
    if (selectedText) {
        let currentSize = parseInt(window.getComputedStyle(selectedText).fontSize);
        selectedText.style.fontSize = `${currentSize - 2}px`;
    }
});

// Change font color
fontColorInput.addEventListener('input', () => {
    if (selectedText) {
        selectedText.style.color = fontColorInput.value;
    }
});

// Change font family
fontFamilySelect.addEventListener('change', () => {
    if (selectedText) {
        selectedText.style.fontFamily = fontFamilySelect.value;
    }
});
