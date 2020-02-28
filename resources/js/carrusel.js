var slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("tarjeta_conocimiento");
    var dots = document.getElementsByClassName("punto");

    if (n > slides.length) {
        slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activo", "");
    }

    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.remove("notfocus");//TEST

    dots[slideIndex - 1].className += " activo";

    //TEST-INICIO
    var anterior = slideIndex - 2;
    var siguiente = slideIndex;

    if (n == slides.length) {
        anterior = slides.length - 2;
        siguiente = 0;
    }
    if (n == 1) {
        anterior = slides.length - 1;
        siguiente = slideIndex;
    }

    slides[anterior].style.display = "block";
    slides[anterior].className += " notfocus";

    slides[siguiente].style.display = "block";
    slides[siguiente].className += " notfocus";
    //TEST-FIN
}