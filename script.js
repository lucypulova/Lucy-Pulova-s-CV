document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    updateButtonText(themeToggle);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);

        updateButtonText(themeToggle);

        applyAnimations(); 
    });

    window.addEventListener('resize', () => {
        updateButtonText(themeToggle);
    });

    fetchAndDisplayCVData();
    applyAnimations(); 
});

function updateButtonText(button) {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const buttonText = window.innerWidth <= 768 ? (currentTheme === 'dark' ? 'Light' : 'Dark') 
                                                : (currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode');
    button.textContent = buttonText;
}

function applyAnimations() {
    const headings = document.querySelectorAll('.second-heading');

    headings.forEach(heading => {
        heading.classList.remove('animate-underline');
        setTimeout(() => heading.classList.add('animate-underline'), 10);
    });
}

function fetchAndDisplayCVData() {
    fetch('cv-data.json')
        .then(response => response.json())
        .then(data => {
            const main = document.querySelector('main');

            data.sections.forEach(section => {
                const sectionElement = document.createElement('section');
                const h2 = document.createElement('h2');
                h2.className = 'second-heading';
                h2.textContent = section.title;
                sectionElement.appendChild(h2);

                const ul = document.createElement('ul');
                section.items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });
                sectionElement.appendChild(ul);
                main.appendChild(sectionElement);
            });

            applyAnimations();
        })
        .catch(error => console.error('Error fetching data:', error));
}