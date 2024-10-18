// Прокрутка вверх при нажатии на кнопку
document.querySelector('.button').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Проверка скролла для показа или скрытия кнопки
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY; // Текущее положение скролла
    const windowHeight = window.innerHeight; // Высота окна просмотра
    const fullHeight = document.body.scrollHeight; // Полная высота страницы

    // Условие для появления кнопки, когда пользователь пролистал половину страницы
    if (scrollPosition > fullHeight / 2) {
        document.querySelector('.button').style.display = 'block'; // Показываем кнопку
    } else {
        document.querySelector('.button').style.display = 'none'; // Скрываем кнопку
    }
});

// Открытие и закрытие мобильного меню
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.toggle('active');
});

// Проверка ширины экрана при загрузке и изменении окна
window.addEventListener('load', checkScreenWidth);
window.addEventListener('resize', checkScreenWidth);

// Функция для проверки ширины экрана и переключения видимости элементов
function checkScreenWidth() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
        document.querySelector('.nav-links').classList.add('hidden');
        document.querySelector('.mobile-menu-toggle').classList.remove('hidden');
    } else {
        document.querySelector('.nav-links').classList.remove('hidden');
        document.querySelector('.mobile-menu-toggle').classList.add('hidden');
    }
}


