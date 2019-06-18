var claves = ['nombreUsuario', 'paginaAnterior', 'pais', 'provincia', 'localidad', 'fecha', 'turno'];
var globales = {};

var coworks = {
    "utn":{
        "nombre":"CoWork Uteniano",
        "direccion":"Zeballos 14XX",
        "url":"http://google.com/",
        "espacios":[
            {
                "nombre":"Sala Java",
                "precioMedia":20,
                "precioCompleta":35,
                "ubicacion":"5º piso, ala única, junto a los baños.",
                "prestaciones":[
                    {
                        "nombre":"Wi-Fi",
                        "descripcion":"Conexión inalámbrica segura",
                        "icono":"fa-wifi"
                    },
                    {
                        "nombre":"proyector",
                        "descripcion":"Proyector y pantalla", //TODO: encontrar ícono de verdad
                        "icono":"fa-eye"
                    }
                ],
                "puestos":[
                    {
                        "id": 0,
                        "ubicacion":"Rincón noroeste"
                    }
                ]
            },
            {
                "nombre":"Sala .Net",
                "precioMedia":30,
                "precioCompleta":50,
                "ubicacion":"5º piso, ala única, junto al ascensor",
                "prestaciones":[
                    {
                        "nombre":"Wi-Fi",
                        "descripcion":"Conexión inalámbrica segura",
                        "icono":"fa-wifi"
                    },
                    {
                        "nombre":"pizarron",
                        "descripcion":"Pizarrón",
                        "icono":"fa-chalkboard"
                    }
                ],
                "puestos":[
                    {
                        "id": 0,
                        "ubicacion":"Junto a la entrada"
                    },
                    {
                        "id": 1,
                        "ubicacion":"Junto al escritorio frontal"
                    }
                ]
            }
        ]
    }
};

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

        link += key + "=" + globales[key];
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
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
}

