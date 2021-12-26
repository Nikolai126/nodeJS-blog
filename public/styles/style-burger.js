document.querySelector('.burger-container').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.header-burger').classList.toggle('active');
    document.querySelector('.header-menu').classList.toggle('active');
});