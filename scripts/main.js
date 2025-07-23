document.addEventListener('DOMContentLoaded', () => {

    // new Swiper(".mySwiper", {
    //     slidesPerView: 4,
    //     freeMode: true,
    //     loop: true,
    //     scrollbar: {
    //         el: '.swiper-scrollbar',
    //         draggable: true,
    //         hide: false, // Не скрывать скроллбар
    //         snapOnRelease: true
    //     },
    //     breakpoints: {
    //         320: {
    //             slidesPerView: 1
    //         },
    //         768: {
    //             slidesPerView: 2
    //         },
    //         1024: {
    //             slidesPerView: 4
    //         }
    //     }
    // });

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



});



const menuHumb = document.querySelector('.menu-humb');
const menuMob = document.querySelector('.menu-mob');
const header = document.querySelector('.header');

// Обработчик клика на бургер
menuHumb.addEventListener('click', function (e) {
    e.stopPropagation();
    this.classList.toggle('active');
    menuMob.classList.toggle('active');
    document.body.classList.toggle('no-scroll');

});

// Закрытие меню при клике вне его
document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu-mob') && !e.target.closest('.menu-humb')) {
        menuHumb.classList.remove('active');
        menuMob.classList.remove('active');
        document.body.classList.remove('no-scroll');

    }
});

// Закрытие при клике на ссылки
document.querySelectorAll('.menu-mob a').forEach(link => {
    link.addEventListener('click', () => {
        menuHumb.classList.remove('active');
        menuMob.classList.remove('active');
        document.body.classList.remove('no-scroll');

    });
});








// Инициализация Fancybox
Fancybox.bind("[data-fancybox]", {
    Thumbs: {
        type: "classic"
    },
    Toolbar: {
        display: {
            left: ["infobar"],
            middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW"],
            right: ["slideshow", "thumbs", "close"],
        },
    },
    Images: {
        zoom: true
    },
    hideScrollbar: false, // Не скрывать скроллбар
    autoFocus: false, // Отключить автофокус
    dragToClose: false, // Отключить закрытие при скролле

});


