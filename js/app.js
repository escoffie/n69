let hamb = document.getElementById("hamburger");
let menu = document.getElementById("main-menu");
let links = document.querySelectorAll("#main-menu a");
let servbtns = document.querySelectorAll("#servicios .servicio");
let carousel = document.getElementById("carousel");
let directorio = [];

hamb.addEventListener('click', () => {
  menu.classList.toggle('active');
});

links.forEach(function (link) {
  link.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
});

/*
servbtns.forEach(function (btn) {
  btn.addEventListener('click', () => {
    let theClass = btn.classList[1];
    let elements = document.querySelectorAll(`.${theClass}`)
    console.log(elements);
    servbtns.forEach(function (b) {
      if (!b.classList.contains(theClass)) {
        b.classList.remove('active');
      }
    });
    elements.forEach(function (element) {
      element.classList.toggle('active');
    });
  });
});*/

$('#carousel').slick({
  centerMode: true,
  slidesToShow: 3,
  dots: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 2000,
  variableWidth: true,
  focusOnSelect: true,
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

const template = document.querySelector('.miembro');
const equipo = document.getElementById('equipo');

$.getJSON("./directorio.json", (json) => {
  directorio = json.directorio;
  directorio.forEach(user => {
    const node = copyTemplate(user);
    equipo.appendChild(node);
  });
})

function copyTemplate(user) {
  const element = template.cloneNode(true);
  
  const nombre = element.querySelector('.nombre');
  nombre.innerText = user.nombre; 
  
  const puesto = element.querySelector('.puesto');
  puesto.innerText = user.puesto; 

  const email = element.querySelector('.email');
  email.innerText = 'Correo: ' + user.email; 

  const telefono = element.querySelector('.telefono');
  telefono.innerText = 'Teléfono: ' + user.telefono; 

  return element;
}

(function ($) {
  "use strict";

  /* Smooth Scroll */
  $('#main-menu a').click(function (e) {
      e.preventDefault();
      var destino = $(this).attr("href").valueOf();
      $('#main-menu li').removeClass('active');
      $(this).parent('li').addClass('active');
      $('html, body').animate({
          scrollTop: $(destino).offset().top - $('#main-menu').height()
      }, 200);
  });

  /* FORM */
  $("#contact-form").on("submit", function (e) {
      var postData = $(this).serializeArray();
      var formURL = $(this).attr("action");
      $.ajax({
          url: formURL,
          type: "POST",
          data: postData,
          success: function (data, textStatus, jqXHR) {
              $('.output').html(data);
              //$("#submitForm").hide();
          },
          error: function (jqXHR, status, error) {
              console.log(status + ": " + error);
              // $("#submitForm").show();
          }
      });
      e.preventDefault();
  });

  $("#submitForm").on('click', function () {
      $("#contact-form").submit();
  });

})(jQuery);