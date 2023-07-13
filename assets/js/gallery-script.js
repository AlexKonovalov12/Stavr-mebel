let canUpdateTextAdvantageLine = false;

// показывать онимацию появления блоков несколько раз 
let on_section_back_animate = false;

// анализировать блоки основыной страницы во время скрола
let can_parse_main_block = true;

// открыто ли модальное окно 
let super_modal_is_open = false; // respath

let timerIdPromoptSuperMOdal = null;

let mobile_menu_is_open = false;

let can_scroll_animate_blocks = true; // разрешение на поялвение анимация во время скрола 


let istok = null;
let istok_link_param = '';

let timerIntervalChangeMainCoverSlider = null; // интервал таймер для переключение слайдов HERO

let key_frame_customer_reviews = 0; // каточка смешение в каруселе отзывово


let discountCounterBlockCount_realValue = undefined;

function getStyles(elem) {
    return window.getComputedStyle(elem, null);
}

document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('.window_spinner_conatiner').remove();

    let btnCallTheMeasurer = document.querySelector('.main-header-r .btn-call-the-measurer');
    let btnCallTheMeasurerInMObileMenu = document.querySelector('.btn-call-the-measurer-in-mobile-menu');
    let modalwindowCallTheMeasurer = document.querySelector('.modal-window-call-the-measurer');

    btnCallTheMeasurerInMObileMenu.addEventListener('click', (e) => {
        document.querySelector('body').style['overflow'] = 'hidden';
        document.querySelector('.modal-window-call-the-measurer').style['display'] = 'flex';
    });

    let mobile_menu_up_line = document.querySelector('.modile-header-up-line');
    let mobile_menu_layout = document.querySelector('.mobile-menu-container');

    let btnCloseMobileMenuLaypout = document.querySelector('.btn-close-mobile-menu');

    document.querySelector('.bnt-open-header-mobile-menu').addEventListener('click', (e) => {
        if (!mobile_menu_is_open) {
            // открыть
            mobile_menu_is_open = true;
            mobile_menu_up_line.style['display'] = 'none';
            mobile_menu_layout.classList.add('open-mobile-layout');

            document.querySelector('body').style['overflow'] = 'hidden';
        }
    });

    btnCloseMobileMenuLaypout.addEventListener('click', (e) => {
        if (mobile_menu_is_open) {
            // закрыть
            mobile_menu_is_open = false;
            mobile_menu_up_line.style['display'] = 'flex';
            mobile_menu_layout.classList.remove('open-mobile-layout');

            document.querySelector('body').style['overflow'] = 'auto';
        }
    });

    // закрытие меню при кике на ссылку 
    document.querySelectorAll('.body-mobile-menu-link-list li a').forEach(element => {
        element.onclick = function (e) {
            if (mobile_menu_is_open) {
                // закрыть
                mobile_menu_is_open = false;
                mobile_menu_up_line.style['display'] = 'flex';
                mobile_menu_layout.classList.remove('open-mobile-layout');

                document.querySelector('body').style['overflow'] = 'auto';
            }
        }
    });

    let btnCloseModalWindowCallTheMeasurer = modalwindowCallTheMeasurer.querySelector('.btn-close-modal-window');
    let backgroundModalWindowTheMeasurer = modalwindowCallTheMeasurer.querySelector('.modal-window-background');

    btnCallTheMeasurer.addEventListener('click', (e) => {
        document.querySelector('body').style['overflow'] = 'hidden';
        modalwindowCallTheMeasurer.style['display'] = 'flex';
    });


    btnCloseModalWindowCallTheMeasurer.addEventListener('click', (e) => {
        document.querySelector('body').style['overflow'] = 'auto';
        modalwindowCallTheMeasurer.style['display'] = 'none';

        // очистить форму
        modalwindowCallTheMeasurer.querySelectorAll('.inputs-block input').forEach(element => {
            element.value = "";
        });
    });

    backgroundModalWindowTheMeasurer.addEventListener('click', (e) => {
        document.querySelector('body').style['overflow'] = 'auto';
        modalwindowCallTheMeasurer.style['display'] = 'none';
    });




    document.querySelectorAll('.btn-privacy-policy').forEach(element => {
        element.addEventListener('click', (e) => {
            document.querySelector('.modal-window-doc-section.doc-sec-1').classList.add('active');
            document.querySelector('body').style['overflow-y'] = "hidden";
        });
    });

    document.querySelectorAll('.bnt-agreement-processing-of-personal-data').forEach(element => {
        element.addEventListener('click', (e) => {
            document.querySelector('.modal-window-doc-section.doc-sec-2').classList.add('active');
            document.querySelector('body').style['overflow-y'] = "hidden";
        });
    });



    document.querySelectorAll('.modal-window-doc-section .btn-close-modal-window-doc-section').forEach((element) => {
        element.addEventListener('click', (e) => {
            e.target.parentElement.classList.remove('active');
            document.querySelector('body').style['overflow-y'] = "auto";
        });
    });

    window.addEventListener('scroll', function (event) {

        let prilip_menu_count = 80; // после какого числа прилипать будет 
        if (window.outerWidth <= 520 || window.innerWidth <= 520) // измненение каэфицента пилипания при мобилки 
        {
            prilip_menu_count = 40;
        }
        else {
            prilip_menu_count = 80;
        }

        // прилипшее меню
        if (document.documentElement.getBoundingClientRect().top < -prilip_menu_count) {
            document.getElementsByClassName('main-header')[0].classList.remove('def-main-menu');
            document.getElementsByClassName('main-header')[0].classList.add('sticky-main-menu');

            document.getElementsByClassName('modile-header')[0].classList.remove('def-main-menu');
            document.getElementsByClassName('modile-header')[0].classList.add('sticky-main-menu');
        }
        else {
            document.getElementsByClassName('main-header')[0].classList.remove('sticky-main-menu');
            document.getElementsByClassName('main-header')[0].classList.add('def-main-menu');

            document.getElementsByClassName('modile-header')[0].classList.remove('sticky-main-menu');
            document.getElementsByClassName('modile-header')[0].classList.add('def-main-menu');
        }

    })

    if (document.documentElement.getBoundingClientRect().top < -80) {
        document.getElementsByClassName('main-header')[0].classList.remove('def-main-menu');
        document.getElementsByClassName('main-header')[0].classList.add('sticky-main-menu');
    }
    else {
        document.getElementsByClassName('main-header')[0].classList.remove('sticky-main-menu');
        document.getElementsByClassName('main-header')[0].classList.add('def-main-menu');
    }


    var gallery = document.querySelector('#gallery');
    var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
    var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
    var resizeAll = function () {
        var altura = getVal(gallery, 'grid-auto-rows');
        var gap = getVal(gallery, 'grid-row-gap');
        gallery.querySelectorAll('.gallery-item').forEach(function (item) {
            var el = item;
            el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
        });
    };

    gallery.querySelectorAll('img').forEach(function (item) {
        item.addEventListener('load', resizeAll);
    });
    window.addEventListener('resize', resizeAll);
    window.addEventListener('load', resizeAll);
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {
            let itemImg = item.querySelector('img');
            item.classList.toggle('full');
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                itemImg.style.left = 10 + '%';
                itemImg.style.top = 30 + '%';
            } else {
                let itemWidth = item.clientWidth / 2 - itemImg.offsetWidth / 2;
                itemImg.style.left = itemWidth + 'px';
            }

        });
    });


    const filterContainer = document.querySelector(".gallery-filter");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item")) {

            // deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("active");

            // activate new 'filter-item'
            event.target.classList.add("active");

            const filterValue = event.target.getAttribute("data-filter");

            galleryItems.forEach((item) => {

                if (item.classList.contains(filterValue) || filterValue === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }

                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }

            });
        }
    });
})

