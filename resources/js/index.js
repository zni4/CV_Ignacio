function enviarMail() {
    document.location.href = "mailto:ignacio.nogueira@gmail.com";
}

function accederLinkedin() {
    document.location.href = "https://linkedin.com/in/ignacionogueira";
}

function mostrar_Detalle(empresa) {
    var divModal = document.getElementById('detalle');

    var comentario = document.getElementById('detalle');

    if (divModal != null) {
        comentario.parentNode.removeChild(comentario);
    }

    //Obtenemos el contenedor e incluimos el elemento
    var divNodo = document.getElementById('contenedor_detalle');

    var texto = '';

    var logo = '';
    var años = '';

    if (empresa === 'accenture') {
        logo = 'logo_accenture.png'
        años = TraducirClave('julio') + ' 1996 - ' + TraducirClave('julio') + ' 2002';
        var texto = TraducirClave('accenture');
    }
    else if (empresa === 'travelsoft') {
        logo = 'logo_travelsoft.png'
        años = TraducirClave('diciembre') + ' 2002 - ' + TraducirClave('mayo') + ' 2003';
        var texto = TraducirClave('travelsoft');
    }
    else if (empresa === 'amdocs') {
        logo = 'logo_amdocs.png'
        años = TraducirClave('diciembre') + ' 2003 - ' + TraducirClave('noviembre') + ' 2008';
        var texto = TraducirClave('amdocs');
    }
    else if (empresa === 'geoban') {
        logo = 'logo_Geoban.png'
        años = TraducirClave('enero') + ' 2009 - ' + TraducirClave('junio') + ' 2009';
        var texto = TraducirClave('geoban');
    }
    else if (empresa === 'vias') {
        logo = 'logo_Vias.jpg'
        años = TraducirClave('septiembre') + ' 2009 - ' + TraducirClave('octubre') + ' 2016';
        var texto = TraducirClave('vias');
    }
    else if (empresa === 'dragados') {
        logo = 'logo_Dragados.jpg'
        d = new Date();

        if (d.getMonth() === 0) {
            mes = 'enero';
        }
        else if (d.getMonth() === 1) {
            mes = 'febrero';
        }
        else if (d.getMonth() === 2) {
            mes = 'marzo';
        }
        else if (d.getMonth() === 3) {
            mes = 'abril';
        }
        else if (d.getMonth() === 4) {
            mes = 'mayo';
        }
        else if (d.getMonth() === 5) {
            mes = 'junio';
        }
        else if (d.getMonth() === 6) {
            mes = 'julio';
        }
        else if (d.getMonth() === 7) {
            mes = 'agosto';
        }
        else if (d.getMonth() === 8) {
            mes = 'septiembre';
        }
        else if (d.getMonth() === 9) {
            mes = 'octubre';
        }
        else if (d.getMonth() === 10) {
            mes = 'noviembre';
        }
        else if (d.getMonth() === 11) {
            mes = 'diciembre';
        }

        años = TraducirClave('octubre') + ' 2016 - ' + TraducirClave(mes) + ' ' + d.getFullYear();
        var texto = TraducirClave('dragados');
    }

    divNodo.innerHTML +=
        '<div id="detalle" class="detalle color_' + empresa + '"><div class="closeButton" onclick="ocultar_Detalle();">&times ' + TraducirClave("cerrar") + '<img class="logo_' + empresa +
        '_detalle" src = "./resources/images/logos/' + logo + '" /></div><div class="año"><br>' +
        años +
        '</div><br><div class="texto_detalle">' + texto + '</div></div>';

    divModal = divNodo;

    document.getElementById('empresas').classList.add('invisible');
}

function ocultar_Detalle() {
    var divModal = document.getElementById('detalle');

    var comentario = document.getElementById('detalle');

    if (divModal != null) {
        comentario.parentNode.removeChild(comentario);
    }

    document.getElementById('empresas').classList.remove('invisible');
}