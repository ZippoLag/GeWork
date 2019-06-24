var claves = ['nombreUsuario', 'paginaAnterior', 'pais', 'provincia', 'localidad', 'fecha', 'turno', 'idCowork', 'idEspacio', 'idPuesto', 'turno'];
var globales = {};

var usuarios = {
    "enrique.juan.porta@gmail.com":{
        email:"enrique.juan.porta@gmail.com",
        nombre:"Enrique",
        apellido:"Porta"
    }
};

var turnos = {
    "TM":"Turno Mañana",
    "TT":"Turno Tarde",
    "JC":"JornadaCompleta"
};

var coworks = {
    /* Cowork de la UTN */
    "utn":{
        "id":"utn",
        "nombre":"CoWork Uteniano",
        "direccion":"Zeballos 1341, S2000 Rosario, Santa Fe, Argentina",
        "url":"https://www.frro.utn.edu.ar/",
        "turnos": {
            "TM":{"inicio":"8", "fin":"14"},
            "TT":{"inicio":"14", "fin":"22"},
            "JC":{"inicio":"8", "fin":"22"}
        },
        "espacios":[
            {
                "id":0,
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
                        "nombre":"Proyector",
                        "descripcion":"Proyector y pantalla", //TODO: encontrar ícono de verdad
                        "icono":"fa-eye"
                    }
                ],
                "puestos":[
                    {
                        "id": 0,
                        "ubicacion":"Rincón noroeste",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": true
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "ubicacion":"Rincón sudeste",
                        "disponibilidad":[
                            {
                                "TM": false,
                                "TT": true
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "ubicacion":"Rincón sudoeste",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": false
                            }
                        ]
                    }
                ]
            },
            {
                "id":1,
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
                        "ubicacion":"Junto a la entrada",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": true
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "ubicacion":"Junto al escritorio frontal",
                        "disponibilidad":[
                            {
                                "TM": false,
                                "TT": true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    /* Cowork del Monumento a la Bandera */
    "bandera":{
        "id":"bandera",
        "nombre":"CoWork Bandera",
        "direccion":"Santa Fe 581, S2000 Rosario, Santa Fe, Argentina",
        "url":"https://www.monumentoalabandera.gob.ar/",
        "turnos": {
            "TM":{"inicio":"9", "fin":"14"},
            "TT":{"inicio":"14", "fin":"20"},
            "JC":{"inicio":"9", "fin":"20"}
        },
        "espacios":[
            {
                "id":0,
                "nombre":"Sala Norte",
                "precioMedia":25,
                "precioCompleta":40,
                "ubicacion":"1º piso, ala norte.",
                "prestaciones":[
                    {
                        "nombre":"Wi-Fi",
                        "descripcion":"Conexión inalámbrica segura",
                        "icono":"fa-wifi"
                    }
                ],
                "puestos":[
                    {
                        "id": 0,
                        "ubicacion":"Rincón oeste",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": true
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "ubicacion":"Centro",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": false
                            }
                        ]
                    }
                ]
            },
            {
                "id":1,
                "nombre":"Sala Sur",
                "precioMedia":35,
                "precioCompleta":55,
                "ubicacion":"1º piso, ala sur.",
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
                        "ubicacion":"Rincón oeste",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": false
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "ubicacion":"Centro",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    /* Cowork del McDonalds */
    "mccowork":{
        "id":"mccowork",
        "nombre":"CoWork Mc",
        "direccion":"San Martín 600, S2000 Rosario, Santa Fe, Argentina",
        "url":"https://www.mcdonalds.com.ar/locales",
        "turnos": {
            "TM":{"inicio":"9", "fin":"13"},
            "TT":{"inicio":"13", "fin":"18"},
            "JC":{"inicio":"9", "fin":"18"}
        },
        "espacios":[
            {
                "id":0,
                "nombre":"Sala Verde",
                "precioMedia":18,
                "precioCompleta":30,
                "ubicacion":"3º piso. Piso completo.",
                "prestaciones":[
                    {
                        "nombre":"Wi-Fi",
                        "descripcion":"Conexión inalámbrica segura",
                        "icono":"fa-wifi"
                    },
                    {
                        "nombre":"Proyector",
                        "descripcion":"Proyector y pantalla", //TODO: encontrar ícono de verdad
                        "icono":"fa-eye"
                    }
                ],
                "puestos":[
                    {
                        "id": 0,
                        "ubicacion":"Sector derecho saliendo del ascensor",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": false
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "ubicacion":"Sector central saliendo del ascensor",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": true
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "ubicacion":"Sector izquierdo saliendo del ascensor",
                        "disponibilidad":[
                            {
                                "TM": false,
                                "TT": true
                            }
                        ]
                    }
                ]
            },
            {
                "id":1,
                "nombre":"Sala Azul",
                "precioMedia":20,
                "precioCompleta":35,
                "ubicacion":"4º piso. Piso completo.",
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
                        "ubicacion":"Sector derecho saliendo del ascensor",
                        "disponibilidad":[
                            {
                                "TM": false,
                                "TT": true
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "ubicacion":"Sector central saliendo del ascensor",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": false
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "ubicacion":"Sector izquierdo saliendo del ascensor",
                        "disponibilidad":[
                            {
                                "TM": true,
                                "TT": true
                            }
                        ]
                    }
                ]
            },
            {
                "id":2,
                "nombre":"Sala Roja",
                "precioMedia":25,
                "precioCompleta":45,
                "ubicacion":"5º piso. Piso completo.",
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
                        "ubicacion":"Sector derecho saliendo del ascensor",
                        "disponibilidad":[
                            {
                                "TM": false,
                                "TT": true
                            }
                        ]
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
    if(typeof guardarValores !== "undefined")
    {
        guardarValores();
    }

    link += "?";

    if(!paginaAnterior){
        paginaAnterior = window.location.pathname.split('/').pop();
    }

    globales.paginaAnterior = paginaAnterior;

    Object.keys(globales).forEach(function(key,index) {
        if(index>0){
            link += "&";
        }

        link += key + "=" + globales[key];
    });

    window.open(link, "_top");
}

/**
* @param String name
* @return null
* Toma todos los valores en "globales" y los utiliza para navegar a la página anterior
*/
function volverAPaginaAnteriorConValores(paginaAnterior){
    if(typeof guardarValores !== "undefined")
    {
        guardarValores();
    }
    
    var link = globales.paginaAnterior + "?";

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

//Inserta el botón de iniciar sesión o el nombre del usuario en caso de estar loggeado
function actualizarLogin() {
    var $login = $('#login');

    if(globales.nombreUsuario)
    {
        $login.append("<a>👤"+usuarios[globales.nombreUsuario].nombre+"</a>");
    }
    else
    {
        $login.append("<a onclick=\"abrirPaginaConValores('login.html');\" type='button' class='btn btn-primary p-0'>👤Login</a>");
    }
}

//
function cargarValorEnControlSiExiste(claveGlobal, idControl)
{
    //carga valores picker
    if(globales[claveGlobal]){document.getElementById(idControl).value = globales[claveGlobal];}
}