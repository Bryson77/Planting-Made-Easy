function toggleNav() {
    const menu = document.getElementById('nav-menu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column'; // vertical layout on mobile
    }
}