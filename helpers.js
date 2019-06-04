var claves = ['nombreUsuario', 'paginaAnterior'];
var globales = {};

/**
* @param String name
* @return null
* Toma todos los valores en "globales", los inserta en la URL pasada como parámetro y abre la misma en el navegador
*/
function abrirPaginaConValores(link, paginaAnterior){
    link += "?";

    if(paginaAnterior){
        globales.paginaAnterior = paginaAnterior;
    }

    Object.keys(globales).forEach(function(key,index) {
        if(index>0){
            link += "&";
        }

        link += key + ":" + globales[key];
    });

    window.open(link, "_top");
}

/**
* @return null
* Toma todos los valores pasados en la URL y los carga en "globales"
*/
function cargarValores() {
    claves.forEach(function(nombre){
        var valor = getParameterByName(nombre);
        if(valor){
            globales[nombre] = valor;
        }
    });
}

/**
* @param String name
* @return String
*/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

