var mIdiomaActual;

var mPaginaSinTraducir;

function obtenerIdioma() {
	var language;

	if (window.navigator.languages) {
		language = window.navigator.languages[0];
	} else {
		language = window.navigator.userLanguage || window.navigator.language;

		language = language.substr(0, language.indexOf('-'));
	}

	mIdiomaActual = language.toUpperCase();
}

function informarContenidoSinTraducir() {
	if (
		mPaginaSinTraducir === undefined &&
		document.body.innerHTML !== undefined
	) {
		mPaginaSinTraducir = document.body.innerHTML;
	}
}

function seleccionarIdioma(idioma) {
	var paginaSinTraducir = mPaginaSinTraducir;
	TraducirPagina(paginaSinTraducir, idioma);

	if (idioma === 'ES') {
		document.getElementById('idiomaEspañolSeleccionado').style.opacity = '1';
		document.getElementById('idiomaInglesSeleccionado').style.opacity = '0.5';
	} else if (idioma === 'EN' || idioma === undefined) {
		document.getElementById('idiomaEspañolSeleccionado').style.opacity = '0.5';
		document.getElementById('idiomaInglesSeleccionado').style.opacity = '1';
	}

	mIdiomaActual = idioma;

	showSlides(1);
}

/*
function TraducirLiteral(literal, idioma) {
    if (literal != null) {
        if (idioma == undefined) {
            idioma = mIdiomaActual;
        }
        if (idioma == null || idioma == "") { idioma = 'ES' };
        if (literal.indexOf('<' + idioma + '>') != -1) {
            inicio = literal.indexOf('<' + idioma + '>');
            inicio += ('<' + idioma + '>').length
            fin = literal.lastIndexOf('</' + idioma + '>');
            valorOriginal = literal.substring(inicio, fin);
            return valorOriginal
        }
        else {
            return literal
        }
    }
    else {
        return ''
    }
}
*/

function TraducirClave(clave, idioma) {
	if (idioma == undefined) {
		idioma = mIdiomaActual;
	}

	var rutaLiterales = './resources/Textos.xml';

	var textoTraducido = '';

	//Obtener la traducción de la clave
	var xmlDoc = AbrirFichero(rutaLiterales);

	for (j = 0; j < xmlDoc.getElementsByTagName('Literal').length; j++) {
		if (
			clave === xmlDoc.getElementsByTagName('Literal')[j].getAttribute('Id')
		) {
			textoTraducido = xmlDoc.getElementsByTagName(idioma)[j].childNodes[0]
				.nodeValue;
			j = xmlDoc.getElementsByTagName('Literal').length; //Para salir del bucle
		}
	}

	textoTraducido = formatear_Texto(textoTraducido);

	return textoTraducido;
}

function formatear_Texto(texto) {
	texto = texto.replace(/'@bold'/g, '<b>');
	texto = texto.replace(/'bold@'/g, '</b>');
	texto = texto.replace(/'@newline'/g, '<br>');

	return texto;
}

function TraducirPagina(paginaSinTraducir, idioma) {
	var contenido = paginaSinTraducir;

	var rutaLiterales = './resources/Textos.xml';

	let numeroTraducciones = contenido.match(new RegExp('{', 'g')).length;

	var textoTraducido = '';

	//Obtener la traducción de la clave
	var xmlDoc = AbrirFichero(rutaLiterales);

	for (i = 0; i < numeroTraducciones; i++) {
		let posicioninicial = contenido.indexOf('{') + 1;
		let posicionfinal = contenido.indexOf('}');
		let clave = contenido.substr(
			posicioninicial,
			posicionfinal - posicioninicial
		);

		for (j = 0; j < xmlDoc.getElementsByTagName('Literal').length; j++) {
			if (
				clave === xmlDoc.getElementsByTagName('Literal')[j].getAttribute('Id')
			) {
				textoTraducido = xmlDoc.getElementsByTagName(idioma)[j].childNodes[0]
					.nodeValue;
				j = xmlDoc.getElementsByTagName('Literal').length; //Para salir del bucle
			}
		}

		textoTraducido = formatear_Texto(textoTraducido);

		contenido = contenido.replace('{' + clave + '}', textoTraducido);

		document.body.innerHTML = contenido;
	}
}

function AbrirFichero(fichXML) {
	var xmlDoc = undefined;
	try {
		if (document.all) {
			xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
		} else {
			xmlDoc = document.implementation.createDocument('', '', null);
		}
		xmlDoc.async = false;
		xmlDoc.load(fichXML);
	} catch (e) {
		try {
			//otros safari, chrome
			var xmlhttp = new window.XMLHttpRequest();
			xmlhttp.open('GET', fichXML, false);
			xmlhttp.send(null);
			xmlDoc = xmlhttp.responseXML.documentElement;
			return xmlDoc;
		} catch (e) {
			return undefined;
		}
	}
	return xmlDoc;
}
