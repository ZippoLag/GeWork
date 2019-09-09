# GeWork

GeWork (sistema de Gestión de Cowork) es el trabajo de Cindi Martín y Sebastián Vansteenkiste para la asignatura de Habilitación Profesional de la carrera de Ingeniería/Analista en Sistemas de Información en la Universidad Tecnológica Nacional - Facultad Regional Rosario.

_El sitio se ha desarrollado con un enfoque mobile-first y sólo es un prototipo, si utiliza un dispositivo de pantalla grande, por favor utilice el modo de visualización móvil en las herramientas de navegador del mismo (F12 en Chrome)._

El prototipo actual (en master) no se encuentra corriendo en ninguna plataforma para su visualización.

## Estructura del proyecto

El proyecto se encuentra dividido en 2 carpetas: `backend` contiene el código de conexión a la Base de Datos, lógica de negocio, servidor de archivos estáticos y API de servicios REST expuesta; `frontend` por otro lado contiene una aplicación ReactJS que no ha de ser servida directamente, sino sólo empaquetada (con webpack) y servida desde el sub-proyecto `frontend_bundle` ubicado en `backend`.

## Configurando el entorno de desarrollo

Siendo que el proyecto se ha desarrollado en máquinas corriendo Windows, las instrucciones contienen utilización de scripts de Powershell. Se asume que las últimas versiones de Python 3.x, Powershell y NPM se encuentran ya instaladas antes de proseguir, así como una mínima familiaridad con ellas.

Tras realizar un `git clone` por primera vez, hemos de abrir una consola y navegar hasta el directorio de `backend`, donde hemos de ejecutarel scrip `configurar_dev_venv.ps1` (el cual creará un entorno virtual de python, lo _activará_, actualizará `pip` e instalará todas las dependencias del proyecto backend). Es importante _no_ abrir la consola en el root del proyecto y ejectuar `backend/configurar_dev_venv.psq` desde allí, pues esto creará el venv en el root y complicará otras configuraciones y el mantenimiento del proyecto.

Así mismo, se deberá navegar a la carpeta `frontend` del proyecto y ejecutar `npm install`, lo cual instalará todas las dependencias detalladas en el archivo `package.json`.

### Corriendo el código en local

Idealmente su IDE le permitirá configurarse para ejecutar ambos proyectos con capacidad de debugging, no obstante, la forma más sencilla de ejectuar este proyecto localmente es mantener 2 consolas abiertas en paralelo y:

En una navegar a `backend` y ejecutar `activar_dev_env.ps1`, luego de lo cual se podrá ejecutar `python manage.py runsever` para exponer la API REST en `http://localhost:8000/api`, así como para servir los archivos estáticos desde `backend/frontend_bundle/templates` y `backend/frontend_bundle/static` en `http://localhost:8000` (lo cual no garantia ser la última versión disponible en el proyecto de `frontend`).

En otra, ir a `frontend` y ejecutar `npm start`, lo que servirá el sitio en ReactJS en `http://localhost:3000`. Alternativamente se podría ejectuar `npm build production` y luego navegar al directorio `build` que acaba de crearse y desde allí servir el contenido del sitio empaquetado (por ejemplo con `serve`, que lo haría en `http://localhost:5000`).

Tanto los puertos `3000` como `5000` han sido habilitados en las configuraciones de desarrollo del proyecto backend para no desatar errores por CORS, no obstante, algunas funcionalidades de la API podrían no funcionar a menos que el sitio se ejecute sirviendo los archivos estáticos en `8000` mediante el proyecto backend mismo.

### Subiendo código al repositorio

Es importante recordar que _siempre que se modifique el código en `frontend` será necesario actualizar el `frontend_bundle` en el proyecto `backend`_. Esto puede realizarse sencillamente ejecutando el script `empaquetar_y_organizar.ps1` ubicado en el root del proyecto.
