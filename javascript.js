// Modal Popup Functionality
const modalTriggers = document.querySelectorAll('.clickable'); // Elements that trigger modals
const modals = document.querySelectorAll('.modal'); // All modal elements
const closeBtns = document.querySelectorAll('.close-btn'); // Close buttons for modals

// Open Modal Function
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block'; // Show the modal
    });
});

// Close Modal Function
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        modal.style.display = 'none'; // Hide the modal
    });
});

// Close Modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none'; // Hide the modal when clicking outside
    }
});

// Subscription Popup
const popup = document.getElementById('subscription-popup');
const closePopupBtn = document.querySelector('.close-popup');

// Show the Subscription Popup after 5 seconds
setTimeout(() => {
    popup.style.display = 'block';
}, 5000); // Adjust timing as needed (5000ms = 5 seconds)

// Close the subscription popup
closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Smooth Scroll for Anchors
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
        });
    });
});

// Dark Mode Toggle (if you want to add it later)
const toggleButton = document.getElementById('toggleMode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
// Example of fetching articles from an API and displaying them
fetch('https://api.example.com/articles')
    .then(response => response.json())
    .then(data => {
        const articlesSection = document.getElementById('articles');
        data.forEach(article => {
            const articleElement = `
                <div class="article">
                    <img src="${article.image}" alt="${article.title}" class="article-img">
                    <div class="article-content">
                        <h3>${article.title}</h3>
                        <p>${article.excerpt}</p>
                        <a href="${article.url}" class="read-more">Read More</a>
                    </div>
                </div>
            `;
            articlesSection.innerHTML += articleElement;
        });
    })
    .catch(error => console.error('Error loading articles:', error));