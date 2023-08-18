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

// функци скролла не зависимо от DOMLoadContent
function handleButtonClickScroll(e) {
    let slice_block_id = e.target.getAttribute('href');

    slice_block_id = slice_block_id.slice(slice_block_id.indexOf('#'), slice_block_id.length); // вырезать эту насть начиная с #
    let current_block = document.querySelector(slice_block_id.toString());


    let current_block_y = current_block.getBoundingClientRect().y + scrollY; // смещение элемента относительно окна + общий скрол 
    window.scroll({ top: current_block_y, behavior: 'smooth' });

    console.log(current_block_y);


}

// Загружка изображений перед анимацией и запуск 



document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('.window_spinner_conatiner').remove();


    // --- Адаптивное меню --------

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


    // мобильное меню - ссылки 
    let mobile_menu = document.querySelectorAll('.body-mobile-menu-link-list li div');
    mobile_menu.forEach((element) => {
        element.addEventListener('click', (e) => {
            handleButtonClickScroll(e);
            // закрыть
            mobile_menu_is_open = false;
            mobile_menu_up_line.style['display'] = 'flex';
            mobile_menu_layout.classList.remove('open-mobile-layout');
            document.querySelector('body').style['overflow'] = 'auto';
        });
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




    document.querySelector('.btn-call-the-measurer-in-mobile-menu').addEventListener('click', (e) => {
        document.querySelector('body').style['overflow'] = 'hidden';
        document.querySelector('.modal-window-call-the-measurer').style['display'] = 'flex';
    });

    // --- Модальные окна ----------------

    // вызов замерщика
    let btnCallTheMeasurer = document.querySelector('.main-header-r .btn-call-the-measurer');
    let btnCallTheMeasurer2 = document.querySelector('.btn-call-the-measurer2');
    let btnCallTheMeasurerInMObileMenu = document.querySelector('.btn-call-the-measurer-in-mobile-menu');
    let modalwindowCallTheMeasurer = document.querySelector('.modal-window-call-the-measurer');

    let btnCloseModalWindowCallTheMeasurer = modalwindowCallTheMeasurer.querySelector('.btn-close-modal-window');
    let backgroundModalWindowTheMeasurer = modalwindowCallTheMeasurer.querySelector('.modal-window-background');

    btnCallTheMeasurer.addEventListener('click', (e) => {
        document.querySelector('body').style['overflow'] = 'hidden';
        modalwindowCallTheMeasurer.style['display'] = 'flex';
    });

    btnCallTheMeasurer2.addEventListener('click', (e) => {
        document.querySelector('body').style['overflow'] = 'hidden';
        modalwindowCallTheMeasurer.style['display'] = 'flex';
    });


    btnCallTheMeasurerInMObileMenu.addEventListener('click', (e) => {
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



    // -- для формы Вызвать замерщика 
    let client_name_from_form_call_the_measurer = document.querySelector('.modal-window-call-the-measurer .modal-window-main form .inputs-block .input-name');
    let client_phone_from_form_call_the_measurer = document.querySelector('.modal-window-call-the-measurer .modal-window-main form .inputs-block .input-phone');


    let label_from_form_call_the_measurer_terms_of_use = document.querySelector('.modal-window-call-the-measurer .modal-window-main form .label-terms-of-use');


    client_name_from_form_call_the_measurer.addEventListener('input', () => {
        canShowSubmitBtnFromCallTheMeasurer();
    });
    client_phone_from_form_call_the_measurer.addEventListener('input', () => {
        canShowSubmitBtnFromCallTheMeasurer();
    });



    function canShowSubmitBtnFromCallTheMeasurer() {
        if (client_name_from_form_call_the_measurer.value.trim() != '' && client_phone_from_form_call_the_measurer.value.trim() != '') {
            label_from_form_call_the_measurer_terms_of_use.classList.add('label-terms-of-use-visibility');
        }
        else {
            label_from_form_call_the_measurer_terms_of_use.classList.remove('label-terms-of-use-visibility');
        }
    }


    // Модальные окна с Документами (полика конфидециальности и тд) ------------------------------------


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



    // (window.location.pathname == '/' || window.location.pathname == '/index.php')
    if (1) {



        // линия на меню (основное)
        let header_menu = document.querySelectorAll('.header-menu li div');
        let active_link_line = document.querySelector('.active-link-line');
        header_menu.forEach((element) => {
            element.addEventListener('click', (e) => {
                handleButtonClickScroll(e);
            });
        });



        // паралакс-2 
        let mp_2 = document.querySelector('.mouse-parallax-2');
        let bg_2 = document.querySelector('.mouse-parallax-2-bg');
        let fog1_2 = document.querySelector('.mouse-parallax-2-fog-1');
        let fog2_2 = document.querySelector('.mouse-parallax-2-fog-2');

        document.getElementById('block-get-consult-by-spec').addEventListener('mousemove', function (e) {
            let x = e.clientX / window.innerWidth;
            let y = e.clientY / window.innerHeight;
            bg_2.style.transform = 'translate(-' + (x * 20) + 'px, -' + (y * 20) + 'px)';
            fog1_2.style.transform = 'translate(+' + (x * 38) + 'px, +' + (y * 38) + 'px)';
            fog2_2.style.transform = 'translate(-' + (x * 38) + 'px, -' + (y * 38) + 'px)';
        });



        // запуск и дифирмация картинок 
        let offsetX = -0.12;
        let offsetY = -8.7;
        $(".parallax").each(function (i, el) {
            var offset = parseInt($(el).data('offset'));
            var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 50px)";

            $(el).css({
                '-webkit-transform': translate,
                'transform': translate,
                'moz-transform': translate
            });
        });




        // --- Основное меню ----------------

        // Проверить скрол меню при перезагрузки страницы
        // прилипшее меню
        if (document.documentElement.getBoundingClientRect().top < -80) {
            document.getElementsByClassName('main-header')[0].classList.remove('def-main-menu');
            document.getElementsByClassName('main-header')[0].classList.add('sticky-main-menu');
        }
        else {
            document.getElementsByClassName('main-header')[0].classList.remove('sticky-main-menu');
            document.getElementsByClassName('main-header')[0].classList.add('def-main-menu');
        }

        // высота окна
        let doc_height = document.documentElement.clientHeight;

        // --- отправка формы на главной странице ----------

       


        // основыне блоки сайта 
        let siteSections = document.querySelectorAll('.main-container-section section'); // все секции - основные блоки сайта


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




            // разрешение на анимацию появления блоков
            if (can_scroll_animate_blocks) {

                // перебор всех блоков... 
                for (let i = 0; i < siteSections.length; i++) {

                    // если верхняя граница элемента относительно окна поподает в диапозон
                    if (siteSections[i].getBoundingClientRect().top <= 10 && siteSections[i].getBoundingClientRect().top >= -(siteSections[i].getBoundingClientRect().height)) {
                        // находим в header ссылку с такой же привязкой
                        let current_activ_a = document.querySelector(`.header-menu li div[href="/${istok_link_param}#${siteSections[i].id}"]`); // ссылка которая должна быть активна

                        // двигаем ползунок у ссылки
                        if (current_activ_a != null) {
                            let active_link_line_start_x = current_activ_a.offsetLeft;
                            let active_link_line_width = current_activ_a.clientWidth;
                            active_link_line.style = `left:${active_link_line_start_x}px; width:${active_link_line_width}px`;
                        }
                    }
                }
            }
        });


        window.dispatchEvent(new Event('scroll'));
        const items = document.querySelectorAll(".accordion a");
        function toggleAccordion() {
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('active');
        }
        items.forEach(item => item.addEventListener('click', toggleAccordion));
    }
   


});















