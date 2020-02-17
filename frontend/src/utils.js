//Función para obtener una cookie del navegador (más que nada usada para el csrf token de autenticación para django sin tener que implementar una store en redux)
const getCookie = (cookieName) => {
  let qualifiedName = `${cookieName}=`;
  let cookies = document.cookie.split(';').map((c) => c.trim());
  let cookie = cookies.find((c) => {
    return c.indexOf(qualifiedName) === 0;
  });
  cookie = cookie ? cookie.replace(qualifiedName, '') : '';
  return cookie;
};

export default getCookie;
