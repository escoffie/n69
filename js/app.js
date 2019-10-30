let hamb = document.getElementById("hamburger");
let menu = document.getElementById("main-menu");
let links = document.querySelectorAll("#main-menu a");

hamb.addEventListener('click', () => {
    menu.classList.toggle('active');
});

links.forEach(function(link){
    console.log(link);
    link.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
});
