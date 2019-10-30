let hamb = document.getElementById("hamburger");
let menu = document.getElementById("main-menu");
let links = document.querySelectorAll("#main-menu a");
let servbtns = document.querySelectorAll("#servicios .servicio");
let carousel = document.getElementById("carousel");

hamb.addEventListener('click', () => {
    menu.classList.toggle('active');
});

links.forEach(function(link){
    link.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
});

servbtns.forEach(function(btn){
    btn.addEventListener('click', () => {
        servbtns.forEach(function(el){
            if(el != btn) {
                el.classList.remove('active');
            }
        });
        btn.classList.toggle('active');
    });
});

$('#carousel').slick({
    centerMode: true,
    slidesToShow: 3,
    dots:true,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth:true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });


