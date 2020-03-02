var slideIndex = 1;
var t;

function plusSlides(n) {
    clearTimeout(t);
	showSlides((slideIndex += n));
}

function currentSlide(n) {
    clearTimeout(t);
	showSlides((slideIndex = n));
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName('tarjeta_conocimiento');
	var dots = document.getElementsByClassName('punto');

	if (n > slides.length) {
		slideIndex = 1;
	}

	if (n < 1) {
		slideIndex = slides.length;
	}

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
		slides[i].classList.remove('notfocus');
		slides[i].classList.remove('anterior');
		slides[i].classList.remove('siguiente');
	}

	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(' activo', '');
	}

	slides[slideIndex - 1].style.display = 'block';
	slides[slideIndex - 1].classList.remove('notfocus');
	slides[slideIndex - 1].classList.remove('anterior');
	slides[slideIndex - 1].classList.remove('siguiente');

	dots[slideIndex - 1].className += ' activo';

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

	if (n < 1) {
		anterior = slides.length - 2;
		siguiente = n;
	}

	if (n > slides.length) {
		anterior = slides.length - 1;
		siguiente = 1;
	}

	slides[anterior].style.display = 'block';
	slides[anterior].className += ' notfocus anterior';

	slides[siguiente].style.display = 'block';
    slides[siguiente].className += ' notfocus siguiente';

    if (n > slides.length) {
        slideIndex = 1;
        n = 1;
    }

    if (!detenido) {
        t = setTimeout(function () { currentSlide(n + 1); }, 3000);
    }
}

var detenido = false;
var fichaParada;

function detener() {
    fichaParada = slideIndex;

    if (!detenido) {
        detenido = true;
        document.getElementById("detener").innerHTML = TraducirClave("reanudar");
        clearTimeout(t);
    }
    else {
        detenido = false;
        document.getElementById("detener").innerHTML = TraducirClave("detener");
        t = setTimeout(function () { currentSlide(fichaParada); }, 3000);
    }
}