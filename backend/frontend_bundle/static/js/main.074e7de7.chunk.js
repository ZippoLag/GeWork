(window.webpackJsonpgework=window.webpackJsonpgework||[]).push([[0],{29:function(e,t,n){"use strict";(function(e){var a=n(30),o=n(7);function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var i="";e&&(i="");var u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e.startsWith("http://")||e.startsWith("https://")?e:i?"".concat(i,"/").concat(e):e};function s(e){if(!e.ok)throw Error(e.statusText);return e}t.a={get:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch(u(e),{method:"GET",headers:c({Accept:"application/json","Content-Type":"application/json"},t,{"X-CSRFToken":Object(o.a)("csrftoken")})}).then(s).then((function(e){return e.json()}))},post:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return fetch(u(e),{method:"POST",body:JSON.stringify(t),headers:c({Accept:"application/json","Content-Type":"application/json"},n,{"X-CSRFToken":Object(o.a)("csrftoken")})}).then(s).then((function(e){return e.json()}))},put:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return fetch(u(e),{method:"PUT",body:JSON.stringify(t),headers:c({Accept:"application/json","Content-Type":"application/json"},n,{"X-CSRFToken":Object(o.a)("csrftoken")})}).then(s).then((function(e){return e.json()}))},delete:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return fetch(u(e),{method:"DELETE",headers:c({Accept:"application/json","Content-Type":"application/json"},t,{"X-CSRFToken":Object(o.a)("csrftoken")})}).then(s).then((function(e){return e.json()}))}}}).call(this,n(45))},32:function(e,t,n){e.exports=n(47)},37:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var a=n(8),o=n(9),r=n(11),c=n(10),i=n(12),u=n(0),s=n.n(u),l=n(24),p=n.n(l),f=n(31),h=n.n(f),d=n(25),m=n(5),j=(n(37),function(e){function t(){var e,n;Object(a.a)(this,t);for(var o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];return(n=Object(r.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).state={usuario:null},n}return Object(i.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return s.a.createElement(d.a,null,s.a.createElement(m.a,{exact:!0,path:["/"],component:function(){return s.a.createElement("div",null,e.state.usuario?"Bienvenidx ".concat(e.state.usuario.username,"!"):"Nadie inici\xf3 sesi\xf3n a\xfan (o estamos ejecutando mediante 'npm start' por lo que la autenticaci\xf3n de django no nos prov\xe9e el token)",s.a.createElement("span",null,"Dicho sea de paso, este div deber\xeda ser un componente en un .js aparte, si bien no hace falta que implementemos redux, tendr\xedamos que poner toda la data (y los m\xe9todos para llamar a la API) en el componente de index y su state y pasarlos como par\xe1metros a los dem\xe1s; App deber\xeda encargarse del routing m\xe1s que nada"))}}))}}]),t}(u.Component)),v=n(28),b=n.n(v),O=function(e){function t(){var e,n;Object(a.a)(this,t);for(var o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];return(n=Object(r.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).state={usuario:null},n}return Object(i.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return s.a.createElement(b.a,{className:"justify-content-between"},s.a.createElement("div",null,s.a.createElement("h1",null,"GeWork")),s.a.createElement("div",null,this.props.usuario?this.props.usuario.username:"Login"))}}]),t}(u.Component),y=n(29),g=n(7),k=(n(46),function(e){function t(){var e,n;Object(a.a)(this,t);for(var o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];return(n=Object(r.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(i)))).state={usuario:null},n}return Object(i.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(g.a)("csrftoken")&&y.a.get("api/get_detalles_usuario").then((function(t){e.setState({usuario:t})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return s.a.createElement(h.a,null,s.a.createElement(O,{usuario:this.state.usuario}),s.a.createElement(j,{usuario:this.state.usuario}))}}]),t}(u.Component));p.a.render(s.a.createElement(u.Suspense,{fallback:"Loading.."},s.a.createElement(k,null)),document.getElementById("root"))},7:function(e,t,n){"use strict";t.a=function(e){var t="".concat(e,"="),n=document.cookie.split(";").find((function(e){return 0===e.indexOf(t)}));return n=n?n.replace(t,""):""}}},[[32,1,2]]]);
//# sourceMappingURL=main.074e7de7.chunk.js.map