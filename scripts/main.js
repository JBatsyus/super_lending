document.addEventListener('DOMContentLoaded', () => {

    // Lenis
    const lenis = new Lenis({
        lerp: 0.1, // Коэффициент интерполяции (0-1, меньше = плавнее)
        duration: 1.2, // Длительность анимации скролла (в секундах)
        orientation: 'vertical', // Направление
        gestureOrientation: 'vertical', // Ориентация жестов
        smoothWheel: true, // Плавный скролл колесом мыши
        smoothTouch: false, // Плавный скролл для тач-устройств
        autoResize: true, // Автоматическая адаптация
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);



    // Функция для удаления якоря из URL
    function removeAnchorFromUrl() {
        if (window.location.hash) {
            // Удаляем якорь из URL
            history.pushState({}, '', window.location.href.replace(/#.*$/, ''));
        }
    }

    // Вызываем функцию при загрузке страницы, чтобы удалить якорь, если он есть
    removeAnchorFromUrl();

    // Обработчик события hashchange для удаления якоря при изменении хэша
    window.addEventListener('hashchange', () => {
        removeAnchorFromUrl();
    });

    // кнопка наверх
    const scrollToTopBtn = document.querySelector('.scroll-to-top');

    if (!scrollToTopBtn) return;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        if (typeof lenis !== 'undefined' && lenis.scrollTo) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    }

});



const menuHumb = document.querySelector('.menu-humb');
const menuMob = document.querySelector('.menu-mob');
const header = document.querySelector('.header');


// Обработчик клика на бургер
menuHumb.addEventListener('click', function (e) {
    e.stopPropagation();
    this.classList.toggle('active');
    menuMob.classList.toggle('active');
    document.documentElement.classList.toggle('no-scroll');
});

// Закрытие меню при клике вне его
document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu-mob') && !e.target.closest('.menu-humb')) {
        menuHumb.classList.remove('active');
        menuMob.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');

    }
});

// Закрытие при клике на ссылки
document.querySelectorAll('.menu-mob a').forEach(link => {
    link.addEventListener('click', () => {
        menuHumb.classList.remove('active');
        menuMob.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');

    });
});