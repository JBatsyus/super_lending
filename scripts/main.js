document.addEventListener('DOMContentLoaded', () => {

    const lenis = new Lenis({
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // Оптимизированный RAF цикл
    let isAnimating = true;

    function raf(time) {
        if (isAnimating) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
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



    // Кнопка "наверх" с интеграцией Lenis
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        const updateButtonVisibility = () => {
            const shouldShow = lenis.scroll > 300 || window.scrollY > 300;
            scrollToTopBtn.classList.toggle('visible', shouldShow);
        };

        lenis.on('scroll', updateButtonVisibility);
        updateButtonVisibility();

        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo(0);
        });
    }
    // Мобильное меню

    const menuHumb = document.querySelector('.menu-humb');
    const menuMob = document.querySelector('.menu-mob');


    menuHumb.addEventListener('click', function (e) {
        e.stopPropagation();
        this.classList.toggle('active');
        menuMob.classList.toggle('active');
        document.documentElement.classList.toggle('no-scroll');
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.menu-mob') && !e.target.closest('.menu-humb')) {
            menuHumb.classList.remove('active');
            menuMob.classList.remove('active');
            document.documentElement.classList.remove('no-scroll');
        }
    });

    var links = document.querySelectorAll('.menu-mob a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function () {
            menuHumb.classList.remove('active');
            menuMob.classList.remove('active');
            document.documentElement.classList.remove('no-scroll');
        });
    }

});