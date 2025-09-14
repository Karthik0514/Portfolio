function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const button = document.querySelector('.mode-toggle');
    button.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Fade-in sections on scroll
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.1
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, options);
sections.forEach(section => {
    observer.observe(section);
});