import '../scss/style.scss';
import jQuery from 'jquery';
import 'slick-carousel';
const $=jQuery;

$('.p-gallery__bloc').slick({
    fade:false,
    autoplay:false,
    pauseOnHover:true,
    autoplaySpeed:5400,
    speed:300,
    touchThreshold:8,
    infinite:true,
    variableWidth:false,
    slidesToShow:5,
    slidesToScroll:1,
    arrows:true,
    dots:false,
    adaptiveHeight:true,
    centerMode: true,
    responsive: [
        {
            breakpoint: 800,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 3,
            }          
        },
        {
            breakpoint: 600,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToScroll: 1,
                slidesToShow: 1,
            }
        }
        
    ]
    
});

let sidebar = document.querySelector('.sidebar');
let sidebarBtn = document.querySelector('.l-header__link__icon');

sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    sidebarBtn.classList.toggle('change');
});
