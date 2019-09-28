//TODO: actualmente el backend de django se sirve en el puerto 8000, no obstante deberíamos agregar una forma de automatizar el cambio a donde apuntan las URLs para no deber hacer algo como esto manualmente:
let baseUrl = '';
if (process) {
  baseUrl =
    process.env.NODE_ENV !== 'production' ? 'http://localhost:8000' : '';
}

//Función para obtener una cookie del navegador (más que nada usada para el csrf token de autenticación para django sin tener que implementar una store en redux)
const getCookie = (cookieName) => {
  let qualifiedName = `${cookieName}=`;
  let cookies = document.cookie.split(';');
  let cookie = cookies.find((c) => {
    return c.indexOf(qualifiedName) === 0;
  });
  cookie = cookie ? cookie.replace(qualifiedName, '') : '';
  return cookie;
};


/**
 * Si la URL con la que se intenta realizar la request no contiene 'http' ni 'https', entonces se asume que es un fragmento al que debemos agrearle el path inicial
 * @param {string}  url url to fetch
 **/
const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : baseUrl
    ? `${baseUrl}/${url}`
    : url;

/**
 * Maneja todas las respuestas que no son 200 (OK) como errores
 * @param {*} response
 */
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const get = (url = '', headers = {}) =>
  fetch(readUrl(url), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
      'X-CSRFToken': getCookie('csrftoken')
    }
  })
    .then(handleErrors)
    .then((response) => response.json());

const post = (url = '', body = {}, headers = {}) =>
  fetch(readUrl(url), {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
      'X-CSRFToken': getCookie('csrftoken')
    }
  })
    .then(handleErrors)
    .then((response) => response.json());

const put = (url = '', body = {}, headers = {}) =>
  fetch(readUrl(url), {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
      'X-CSRFToken': getCookie('csrftoken')
    }
  })
    .then(handleErrors)
    .then((response) => response.json());

const del = (url = '', headers = {}) =>
  fetch(readUrl(url), {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
      'X-CSRFToken': getCookie('csrftoken')
    }
  })
    .then(handleErrors)
    .then((response) => response.json());

export default {
  get,
  post,
  put,
  delete: del
};
