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
});

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

  console.log(element);
  
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

