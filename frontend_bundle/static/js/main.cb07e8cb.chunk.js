(this.webpackJsonpgework=this.webpackJsonpgework||[]).push([[0],{103:function(e,a,t){},104:function(e,a,t){},105:function(e,a,t){"use strict";t.r(a);var i=t(32),n=t(8),o=t(9),r=t(11),c=t(10),s=t(13),l=t(12),p=t(0),d=t.n(p),u=t(22),m=t.n(u),h=t(27),f=t(25),v=t(30),b=t.n(v),_=t(5),g=t.n(_),k=t(31),y=t.n(k),j=t(57),E=t.n(j),C=(t(65),function(e){function a(){var e,t;Object(n.a)(this,a);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(t=Object(r.a)(this,(e=Object(c.a)(a)).call.apply(e,[this].concat(o)))).state={},t}return Object(l.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return d.a.createElement("header",{className:"row w-100 m-0 p-0 d-flex justify-content-between align-items-center gework-bg-primario bg-primary"},d.a.createElement(g.a,{className:"col-12 col-md-6 d-flex justify-content-center navbar-brand"},d.a.createElement(h.b,{to:"/"},d.a.createElement("h1",null,"GeWork")),d.a.createElement(h.b,{className:"nav-link",to:"/reservar-puesto"},"Reservar puesto")),d.a.createElement(g.a,{className:"col-12 col-md-4 d-flex justify-content-end justify-content-md-center"},d.a.createElement(y.a,null,d.a.createElement(y.a.Toggle,{drop:"none",id:"menu-usuario",bsPrefix:"menu-usuario-style",variant:"none"},d.a.createElement("span",{className:"d-flex justify-content-center align-items-center dropdown-toggle username-circle gework-bg-secundario","data-toggle":"dropdown-menu","aria-expanded":"false"},this.props.usuario.iniciales||d.a.createElement(E.a,{animation:"border",role:"status",size:"lg"}))),d.a.createElement(y.a.Menu,{"x-placement":"bottom-start"},d.a.createElement(y.a.Item,{href:"/adminlogout/"},"Cerrar sesi\xf3n ".concat(this.props.usuario.username||"")),this.props.usuario.isAdmin?d.a.createElement(y.a.Item,{href:"/admin"},"Administraci\xf3n"):""))))}}]),a}(p.Component)),w=t(17),O=t.n(w),N=(t(92),function(e){function a(){var e,t;Object(n.a)(this,a);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(t=Object(r.a)(this,(e=Object(c.a)(a)).call.apply(e,[this].concat(o)))).state={},t}return Object(l.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return d.a.createElement("footer",null,d.a.createElement(O.a,{className:"w-100 d-flex justify-content-end align-items-end"},"Cindi L. Mart\xedn - Sebasti\xe1n R. Vansteenkiste"))}}]),a}(p.Component)),M=(t(93),function(e){function a(){var e,t;Object(n.a)(this,a);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(t=Object(r.a)(this,(e=Object(c.a)(a)).call.apply(e,[this].concat(o)))).state={},t}return Object(l.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){return d.a.createElement("div",null,d.a.createElement(O.a,{className:"d-flex justify-content-around align-items-center"},d.a.createElement(g.a,{className:"col-10 col-md-4 pt-5"},d.a.createElement(h.b,{className:"w-100 btn btn-primary",to:"/reservar-puesto"},"Reservar Puesto")),d.a.createElement(g.a,{className:"col-10 col-md-4 pt-5"},d.a.createElement("div",{className:"w-100 btn btn-primary btn-disabled",disabled:!0},"Reservar Sala"))),d.a.createElement(O.a,{className:"d-flex justify-content-around align-items-center"},d.a.createElement(g.a,{className:"col-10 col-md-4 pt-5"},d.a.createElement("div",{className:"w-100 btn btn-primary btn-disabled",disabled:!0},"Ofrecer Puesto")),d.a.createElement(g.a,{className:"col-10 col-md-4 pt-5"},d.a.createElement("div",{className:"w-100 btn btn-primary btn-disabled",disabled:!0},"Ofrecer Sala"))))}}]),a}(p.Component)),A=(t(52),t(96),function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(r.a)(this,Object(c.a)(a).call(this))).state={},t.handleCambioPais=t.handleCambioPais.bind(Object(s.a)(t)),t.handleCambioProvincia=t.handleCambioProvincia.bind(Object(s.a)(t)),t.handleCambioLocalidad=t.handleCambioLocalidad.bind(Object(s.a)(t)),t}return Object(l.a)(a,e),Object(o.a)(a,[{key:"handleCambioPais",value:function(e){var a=e.target.selectedOptions[0].attributes.id_pais.value;this.props.actualizarMapa({id_pais:Number.parseInt(a)})}},{key:"handleCambioProvincia",value:function(e){var a=e.target.selectedOptions[0].attributes.id_provincia.value;this.props.actualizarMapa({id_provincia:Number.parseInt(a)})}},{key:"handleCambioLocalidad",value:function(e){var a=e.target.selectedOptions[0].attributes.id_localidad.value;this.props.actualizarMapa({id_localidad:Number.parseInt(a)})}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return d.a.createElement(O.a,{className:"d-flex justify-content-around align-items-center"},d.a.createElement(g.a,{className:"form-group col-12 col-md-3",role:"group"},d.a.createElement("label",{htmlFor:"pais-select"},"Pa\xeds:"),d.a.createElement("select",{className:"from-control",id:"pais-select",onChange:this.handleCambioPais,value:this.props.id_pais},this.props.paises.map((function(e){return d.a.createElement("option",{key:e.id_pais,id_pais:e.id_pais,value:e.id_pais},e.nombre_pais)})))),d.a.createElement(g.a,{className:"form-group col-12 col-md-3",role:"group"},d.a.createElement("label",{htmlFor:"provincia-select"},"Provincia:"),d.a.createElement("select",{className:"from-control",id:"provincia-select",disabled:0===this.props.id_pais,onChange:this.handleCambioProvincia,value:this.props.id_provincia},this.props.provincias.map((function(e){return d.a.createElement("option",{key:e.id_provincia,id_provincia:e.id_provincia,value:e.id_provincia},e.nombre_provincia)})))),d.a.createElement(g.a,{className:"form-group col-12 col-md-3",role:"group"},d.a.createElement("label",{htmlFor:"localidad-select"},"Localidad:"),d.a.createElement("select",{className:"from-control",id:"localidad-select",disabled:0===this.props.id_provincia,value:this.props.id_localidad,onChange:this.handleCambioLocalidad},this.props.localidades.map((function(e){return d.a.createElement("option",{key:e.id_localidad,id_localidad:e.id_localidad,value:e.id_localidad},e.nombre_localidad)})))))}}]),a}(p.Component)),S=(t(97),function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(r.a)(this,Object(c.a)(a).call(this))).state={},t.handleCambiofecha=t.handleCambiofecha.bind(Object(s.a)(t)),t}return Object(l.a)(a,e),Object(o.a)(a,[{key:"handleCambiofecha",value:function(e){this.props.actualizarMapa({fechaReserva:b()(e.target.value)})}},{key:"render",value:function(){return d.a.createElement(O.a,{className:"d-flex justify-content-around align-items-center"},d.a.createElement(g.a,{className:"form-group col-12 col-md-3",role:"group"},d.a.createElement("label",{htmlFor:"fecha-reserva"},"Fecha:"),d.a.createElement("input",{type:"date",id:"fecha-reserva",name:"fecha-reserva",value:this.props.fechaReserva.format("YYYY-MM-DD"),onChange:this.handleCambiofecha,pattern:"DD/MM/YYYY",min:new Date})))}}]),a}(p.Component)),R=t(58),P=t.n(R),x=t(29),T=t.n(x),z=t(26),L=t(36),D=function(e){function a(){return Object(n.a)(this,a),Object(r.a)(this,Object(c.a)(a).apply(this,arguments))}return Object(l.a)(a,e),Object(o.a)(a,[{key:"getCoworksReales",value:function(){return this.props.coworks.filter((function(e){return 0!==e.id_cowork&&e.lat&&e.lng}))}},{key:"render",value:function(){var e=this,a=this.getCoworksReales();return d.a.createElement(L.b,{id:"script-loader",googleMapsApiKey:this.props.googleMapsApiKey},d.a.createElement(L.a,{id:"marker-example",mapContainerStyle:{height:"360px",width:"100%"},zoom:14,center:{lat:a.map((function(e){return e.lat})).reduce((function(e,a){return a+e}))/a.length,lng:a.map((function(e){return e.lng})).reduce((function(e,a){return a+e}))/a.length}},a.map((function(a,t){return d.a.createElement(L.c,{key:t,position:{lat:a.lat,lng:a.lng},onClick:function(t){return e.props.elegirCowork({id_cowork:a.id_cowork})},title:a.nombre,label:a.nombre})}))))}}]),a}(p.Component),F=(t(99),function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(r.a)(this,Object(c.a)(a).call(this))).state={googleMapsApiKey:""},t.handleCambioCowork=t.handleCambioCowork.bind(Object(s.a)(t)),t}return Object(l.a)(a,e),Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;z.a.get("api/googlemapsapikey/").then((function(a){return e.setState({googleMapsApiKey:a.googleMapsApiKey})})).catch((function(e){return console.log(e)}))}},{key:"handleCambioCowork",value:function(e){var a=e.target.selectedOptions[0].attributes.id_cowork.value;this.props.elegirCowork({id_cowork:Number.parseInt(a)})}},{key:"render",value:function(){var e=this;return d.a.createElement(O.a,{className:"d-flex justify-content-around align-items-center"},d.a.createElement(g.a,{className:"form-group col-12",role:"group"},this.state.googleMapsApiKey&&d.a.createElement(D,{googleMapsApiKey:this.state.googleMapsApiKey,coworks:this.props.coworks,elegirCowork:this.props.elegirCowork})),d.a.createElement(g.a,{className:"form-group col-12 col-md-3",role:"group"},d.a.createElement("label",{htmlFor:"cowork-select"},"CoWork:"),d.a.createElement("select",{className:"from-control",id:"cowork-select",disabled:0===this.props.coworks.length,value:this.props.id_cowork,onChange:this.handleCambioCowork},this.props.coworks.map((function(e){return d.a.createElement("option",{key:e.id_cowork,id_cowork:e.id_cowork,value:e.id_cowork},e.nombre_cowork)})))),d.a.createElement(g.a,{className:"form-group col-12",role:"group"},d.a.createElement(P.a,null,this.props.espacios.filter((function(a){return 0===e.props.id_cowork||e.props.id_cowork===a.cowork.id_cowork})).map((function(a){return d.a.createElement(T.a,{key:a.id_espacio},d.a.createElement(T.a.Header,null,a.nombre_espacio),d.a.createElement(T.a.Body,null,d.a.createElement(T.a.Title,null,a.cowork.nombre_cowork," - ",a.nombre_espacio),d.a.createElement(T.a.Text,null,a.ubicacion_espacio),d.a.createElement(O.a,null,d.a.createElement(O.a,{className:"col-12 col-lg-9 m-0 p-0"},d.a.createElement(g.a,{className:"col-6 col-lg-12 btn btn-primary",type:"button",onClick:function(){return e.props.irAConfirmacion({id_espacio:a.id_espacio,codigo_turno:"m"})}},"TURNO MA\xd1ANA ($",a.precioMJ_espacio,"ARS)"),d.a.createElement(g.a,{className:"col-6 col-lg-12 btn btn-primary",type:"button",onClick:function(){return e.props.irAConfirmacion({id_espacio:a.id_espacio,codigo_turno:"t"})}},"TURNO TARDE ($",a.precioMJ_espacio,"ARS)")),d.a.createElement(g.a,{className:"col-12 col-lg-3 h-lg-100 btn btn-primary",type:"button",onClick:function(){return e.props.irAConfirmacion({id_espacio:a.id_espacio,codigo_turno:"c"})}},"JORNADA COMPLETA ($",a.precioJC_espacio,"ARS)"))),d.a.createElement(T.a.Footer,null,a.prestaciones.map((function(e){return d.a.createElement("span",{className:"mr-1 cursor-default",title:e.nombre_prestacion,key:e.id_prestacion},e.icono_prestacion)}))))})))))}}]),a}(p.Component)),I=(t(103),function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(r.a)(this,Object(c.a)(a).call(this))).state={},t.actualizarMapa=t.actualizarMapa.bind(Object(s.a)(t)),t}return Object(l.a)(a,e),Object(o.a)(a,[{key:"actualizarMapa",value:function(e){this.props.actualizarMapa(e)}},{key:"render",value:function(){return d.a.createElement("div",null,d.a.createElement(A,{paises:this.props.paises,provincias:this.props.provincias,localidades:this.props.localidades,id_pais:this.props.id_pais,id_provincia:this.props.id_provincia,id_localidad:this.props.id_localidad,actualizarMapa:this.actualizarMapa}),d.a.createElement(S,{actualizarMapa:this.actualizarMapa,fechaReserva:this.props.fechaReserva}),this.props.espacios.length>0?d.a.createElement(F,{coworks:this.props.coworks,espacios:this.props.espacios,puestos:this.props.puestos,id_espacio:this.props.id_espacio,irAConfirmacion:this.props.irAConfirmacion,id_cowork:this.props.id_cowork,elegirCowork:this.props.elegirCowork}):d.a.createElement("h3",null,"No hay Coworks con Espacios disponibles para mostrar. Seleccione otra ubicaci\xf3n/fecha."))}}]),a}(p.Component)),J=t(28),K=(t(104),function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(r.a)(this,Object(c.a)(a).call(this))).state={usuario:{},coworks:[],espacios:[],puestos:[],localidades:[{id_localidad:0,nombre_localidad:"Cargando.."}],provincias:[{id_provincia:0,nombre_localidad:"Cargando.."}],paises:[{id_pais:0,nombre_localidad:"Cargando.."}],id_pais:0,id_provincia:0,id_localidad:0,id_espacio:0,id_cowork:0,codigo_turno:"",fechaReserva:b()(new Date)},t.completarProvincia=function(e){return e.pais=t.state.paises.find((function(a){return a.id_pais===e.pais}))||e.pais,e},t.completarLocalidad=function(e){return e.provincia=t.state.provincias.find((function(a){return a.id_provincia===e.provincia}))||e.provincia,e},t.actualizarMapa=t.actualizarMapa.bind(Object(s.a)(t)),t.irAConfirmacion=t.irAConfirmacion.bind(Object(s.a)(t)),t.elegirCowork=t.elegirCowork.bind(Object(s.a)(t)),t}return Object(l.a)(a,e),Object(o.a)(a,[{key:"getProvinciasDelPais",value:function(){var e,a=this,t=[];(t=0===this.state.id_pais?[{id_provincia:0,nombre_provincia:"Seleccione Pais.."}]:[{id_provincia:0,nombre_provincia:"Seleccione Provincia.."}],this.state.id_pais)&&(e=t).push.apply(e,Object(i.a)(this.state.provincias.filter((function(e){return Number.isInteger(e.pais)?e.pais===a.state.id_pais:e.pais.id_pais===a.state.id_pais}))));return t}},{key:"getLocalidadesDeLaProvincia",value:function(){var e,a=this,t=[];(t=0===this.state.id_provincia?[{id_localidad:0,nombre_localidad:"Seleccione Provincia.."}]:[{id_localidad:0,nombre_localidad:"Seleccione Localidad.."}],this.state.id_provincia)&&(e=t).push.apply(e,Object(i.a)(this.state.localidades.filter((function(e){return Number.isInteger(e.provincia)?e.provincia===a.state.id_localidad:e.provincia.id_provincia===a.state.id_provincia}))));return t}},{key:"fetchCoworksConVacantes",value:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state;a.id_pais&&a.id_provincia&&a.id_localidad&&a.fechaReserva?z.a.get("api/puestos_vacantes/".concat(a.id_localidad,"/").concat(a.fechaReserva.year(),"/").concat(a.fechaReserva.month()+1,"/").concat(a.fechaReserva.date(),"/c/")).then((function(a){var t=Object(i.a)(new Set(a.map((function(e){return e.espacio})))),n=[{id_cowork:0,nombre_cowork:"Todos"}].concat(Object(i.a)(new Set(t.map((function(e){return e.cowork})))));e.setState({puestos:a,espacios:t,coworks:n})})).catch((function(e){return console.log(e)})):this.setState({puestos:[],espacios:[],coworks:[]})}},{key:"fetchInformacionGeografica",value:function(){this.fetchPaises()}},{key:"fetchPaises",value:function(){var e=this;z.a.get("api/paises/").then((function(a){return e.setState({paises:[{id_pais:0,nombre_pais:"Seleccione Pais.."}].concat(Object(i.a)(a))})})).then(this.fetchProvincias()).catch((function(e){return console.log(e)}))}},{key:"fetchProvincias",value:function(){var e=this;z.a.get("api/provincias/").then((function(a){return e.setState({provincias:a.map((function(a){return e.completarProvincia(a)}))})})).then(this.fetchLocalidades()).catch((function(e){return console.log(e)}))}},{key:"fetchLocalidades",value:function(){var e=this;z.a.get("api/localidades/").then((function(a){return e.setState({localidades:a.map((function(a){return e.completarLocalidad(a)}))})})).catch((function(e){return console.log(e)}))}},{key:"componentDidMount",value:function(){var e=this;Object(J.a)("csrftoken")&&z.a.get("api/get_detalles_usuario/").then((function(a){return e.setState({usuario:a})})).catch((function(e){return console.log(e)})),this.fetchInformacionGeografica()}},{key:"actualizarMapa",value:function(e){var a={fechaReserva:this.state.fechaReserva,id_pais:this.state.id_pais,id_provincia:this.state.id_provincia,id_localidad:this.state.id_localidad};e.fechaReserva?(this.setState({fechaReserva:e.fechaReserva}),a.fechaReserva=e.fechaReserva):"undefined"!==typeof e.id_pais?(this.setState({id_pais:e.id_pais,id_provincia:0,id_localidad:0}),a.id_pais=e.id_pais,a.id_provincia=0,a.id_localidad=0):"undefined"!==typeof e.id_provincia?(this.setState({id_provincia:e.id_provincia,id_localidad:0}),a.id_provincia=e.id_provincia,a.id_localidad=0):"undefined"!==typeof e.id_localidad&&(this.setState({id_localidad:e.id_localidad}),a.id_localidad=e.id_localidad),this.fetchCoworksConVacantes(a)}},{key:"irAConfirmacion",value:function(e){this.setState({id_espacio:e.id_espacio,codigo_turno:e.codigo_turno})}},{key:"elegirCowork",value:function(e){this.setState({id_cowork:e.id_cowork,id_espacio:0})}},{key:"render",value:function(){var e=this;return d.a.createElement("div",{className:"principal"},d.a.createElement(h.a,null,d.a.createElement(C,{usuario:this.state.usuario}),d.a.createElement(f.a,{exact:!0,path:["/","/elegir-accion"],component:function(){return d.a.createElement(M,{usuario:e.state.usuario})}}),d.a.createElement(f.a,{exact:!0,path:["/reservar-puesto"],component:function(){return d.a.createElement(I,{usuario:e.state.usuario,paises:e.state.paises,provincias:e.getProvinciasDelPais(),localidades:e.getLocalidadesDeLaProvincia(),coworks:e.state.coworks,espacios:e.state.espacios,puestos:e.state.puestos,id_pais:e.state.id_pais,id_provincia:e.state.id_provincia,id_localidad:e.state.id_localidad,id_espacio:e.state.id_espacio,id_cowork:e.state.id_cowork,actualizarMapa:e.actualizarMapa,fechaReserva:e.state.fechaReserva,irAConfirmacion:e.irAConfirmacion,elegirCowork:e.elegirCowork})}}),d.a.createElement(N,null)))}}]),a}(p.Component));m.a.render(d.a.createElement(p.Suspense,{fallback:"Loading.."},d.a.createElement(K,null)),document.getElementById("root"))},26:function(e,a,t){"use strict";(function(e){var i=t(35),n=t(28),o="";e&&(o="");var r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.startsWith("http://")||e.startsWith("https://")?e:o?"".concat(o,"/").concat(e):e};function c(e){if(!e.ok)throw Error(e.statusText);return e}a.a={get:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch(r(e),{method:"GET",headers:Object(i.a)({Accept:"application/json","Content-Type":"application/json"},a,{"X-CSRFToken":Object(n.a)("csrftoken")})}).then(c).then((function(e){return e.json()}))},post:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return fetch(r(e),{method:"POST",body:JSON.stringify(a),headers:Object(i.a)({Accept:"application/json","Content-Type":"application/json"},t,{"X-CSRFToken":Object(n.a)("csrftoken")})}).then(c).then((function(e){return e.json()}))},put:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return fetch(r(e),{method:"PUT",body:JSON.stringify(a),headers:Object(i.a)({Accept:"application/json","Content-Type":"application/json"},t,{"X-CSRFToken":Object(n.a)("csrftoken")})}).then(c).then((function(e){return e.json()}))},delete:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch(r(e),{method:"DELETE",headers:Object(i.a)({Accept:"application/json","Content-Type":"application/json"},a,{"X-CSRFToken":Object(n.a)("csrftoken")})}).then(c).then((function(e){return e.json()}))}}}).call(this,t(98))},28:function(e,a,t){"use strict";a.a=function(e){var a="".concat(e,"="),t=document.cookie.split(";").map((function(e){return e.trim()})).find((function(e){return 0===e.indexOf(a)}));return t=t?t.replace(a,""):""}},59:function(e,a,t){e.exports=t(105)},65:function(e,a,t){},92:function(e,a,t){},93:function(e,a,t){},96:function(e,a,t){},97:function(e,a,t){},99:function(e,a,t){}},[[59,1,2]]]);
//# sourceMappingURL=main.cb07e8cb.chunk.js.map