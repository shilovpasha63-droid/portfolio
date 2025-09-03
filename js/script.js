$(document).ready(function () {

    //прокрутка
    /*
    let isAnimating = false;
    let currentSection = 0;
    const sections = $('section');
    const totalSections = sections.length;

    $(window).on('wheel', function(e) {
        if ($('.modal-overlay.active').length > 0) {
            return;
        }
        if (isAnimating) return;

        if (e.originalEvent.deltaY > 0 && currentSection < totalSections - 1) {
            currentSection++;
        } else if (e.originalEvent.deltaY < 0 && currentSection > 0) {
            currentSection--;
        }

        isAnimating = true;
        $('html, body').stop().animate(
            {
                scrollTop: sections.eq(currentSection).offset().top
            },
            800,
            function () {
                isAnimating = false;
            }
        );
    });
    */
    //слайдеры
    $('.cases-grid').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });

    if ($(window).width() <= '992') {
        $('.skills-grid').slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false
        });
    }

    // Анимация счетчиков
    const $counters = $('.counter span');
    const speed = 200;

    // Создаём IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Если элемент стал видим
            if (entry.isIntersecting) {
                const $counter = $(entry.target);
                const target = parseInt($counter.text(), 10);
                let count = 0;

                // Функция анимации
                const updateCount = () => {
                    const increment = target / speed;

                    if (count < target) {
                        count += increment;
                        $counter.text(Math.ceil(count));
                        setTimeout(updateCount, 1);
                    } else {
                        $counter.text(target);
                    }
                };

                updateCount();

                // ⚠️ Отключаем отслеживание после запуска (чтобы не срабатывало при скролле вверх)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Счётчик начинает анимироваться, когда 50% его в зоне видимости
    });

    // Наблюдаем за каждым счётчиком
    $counters.each(function () {
        observer.observe(this);
    });


    // Навигация по точкам
    const $dots = $('.dot');
    const $sections = $('section');

    // Функция для обновления активной точки
    function updateActiveDot() {
        const scrollPosition = $(window).scrollTop();

        $sections.each(function (index) {
            const $section = $(this);
            const sectionTop = $section.offset().top;
            const sectionHeight = $section.outerHeight();

            if (
                scrollPosition >= sectionTop - 100 &&
                scrollPosition < sectionTop + sectionHeight - 100
            ) {
                $dots.removeClass('active');
                $dots.eq(index).addClass('active');
            }
        });
    }

    // Прослушивание события прокрутки
    $(window).on('scroll', updateActiveDot);

    // Клик по точкам для плавной прокрутки
    $dots.each(function (index) {
        $(this).on('click', function () {
            $('html, body').animate(
                {
                    scrollTop: $sections.eq(index).offset().top
                },
                800 // плавная прокрутка за 800 мс
            );
        });
    });

    // Инициализация активной точки при загрузке
    updateActiveDot();

    $('.case-card').on('click', function () {
        console.log('click');
        const modalId = $(this).data('modal'); // получаем номер модального окна
        const $modal = $(`#${modalId}`);
        if ($modal.length) {
            $modal.addClass('active');
            $('body').css('overflow', 'hidden');
        }
    });

    // Закрытие по фону
    $('.modal-overlay').on('click', function (e) {
        if (!$(e.target).closest('.modal').length) {
            $(this).removeClass('active');
            $('body').css('overflow', '');
        }
    });

    // Закрытие по крестику (работает даже по иконке)
    $('.modal-close').on('click', function () {
        $('.modal-overlay').removeClass('active');
        $('body').css('overflow', '');
    });

    // Опционально: закрытие по клавише Esc
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('.modal-overlay').removeClass('active');
            $('body').css('overflow', '');
        }
    });
});