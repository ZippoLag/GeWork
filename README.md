# GeWork

GeWork (sistema de Gestión de Cowork) es el trabajo de Cindi Martín y Sebastián Vansteenkiste para la asignatura de Habilitación Profesional de la carrera de Ingeniería/Analista en Sistemas de Información en la Universidad Tecnológica Nacional - Facultad Regional Rosario.

_El sitio se ha desarrollado con un enfoque mobile-first y sólo es un prototipo, si utiliza un dispositivo de pantalla grande, por favor utilice el modo de visualización móvil en las herramientas de navegador del mismo (F12 en Chrome)._

El prototipo actual (en master) no se encuentra corriendo en ninguna plataforma para su visualización.

## Estructura del proyecto

El proyecto se encuentra dividido en 2 grupos:

- `espacios` y `gework` contienen el backend desarrollado en Django, con el código de conexión a la Base de Datos, lógica de negocio, servidor de archivos estáticos y API de servicios REST expuesta; Además de `frontend_bundle` que contiene la versión compilada del frontend, lista para ser servida.
- `frontend` por otro lado contiene una aplicación ReactJS que no ha de ser servida directamente, sólo empaquetada (con webpack) y servida desde el sub-proyecto `frontend_bundle` ubicado en `backend`.

## Configurando el entorno de desarrollo

Siendo que el proyecto se ha desarrollado en máquinas corriendo Windows, las instrucciones contienen utilización de scripts de Powershell. Se asume que las últimas versiones de Python 3.x, Powershell y NPM se encuentran ya instaladas antes de proseguir, así como una mínima familiaridad con ellas.

Tras realizar un `git clone` por primera vez, hemos de abrir una consola y navegar hasta el directorio raíz del repositorio, donde hemos de ejecutarel scrip `crear_dev_venv.ps1` (el cual creará un entorno virtual de python, lo _activará_, actualizará `pip` e instalará todas las dependencias del proyecto backend). Nota: será necesario aquí crear en `gework/settings` su `local_settings.py` en base al `.py.bak` proveído para conectarse a una BD (así sea un archivo SQLite local) y luego correr un `python manage.py migrate` y `python manage.py createsuperuser` (a menos que se use una BD ya existente).

Así mismo, se deberá navegar a la carpeta `frontend` del proyecto y ejecutar `npm install`, lo cual instalará todas las dependencias detalladas en el archivo `package.json`.

### Corriendo el código en local

Idealmente su IDE le permitirá configurarse para ejecutar ambos proyectos con capacidad de debugging, no obstante, la forma más sencilla de ejectuar este proyecto localmente es mantener 2 consolas abiertas en paralelo y:

En una ejecutar `activar_dev_env.ps1`, luego de lo cual se podrá correr `python manage.py runsever` para exponer la API REST en `http://localhost:8000/api`, así como para servir los archivos estáticos desde `frontend_bundle/templates` y `frontend_bundle/static` en `http://localhost:8000` (lo cual no garantia ser la última versión disponible en el proyecto de `frontend`).

En otra, ir a `frontend` y ejecutar `npm start`, lo que servirá el sitio en ReactJS en `http://localhost:3000`. Alternativamente se podría ejectuar `npm build production` y luego navegar al directorio `build` que acaba de crearse y desde allí servir el contenido del sitio empaquetado (por ejemplo con `serve`, que lo haría en `http://localhost:5000`).

Tanto los puertos `3000` como `5000` han sido habilitados en las configuraciones de desarrollo del proyecto backend para no desatar errores por CORS, no obstante, algunas funcionalidades de la API podrían no funcionar a menos que el sitio se ejecute sirviendo los archivos estáticos en `8000` mediante el proyecto backend mismo.

### Subiendo código al repositorio

Es importante recordar que _siempre que se modifique el código en `frontend` será necesario actualizar el `frontend_bundle`_. Esto puede realizarse sencillamente ejecutando el script `empaquetar_y_organizar.ps1` ubicado en el root del proyecto.

### Después de cada pull

Para asegurar estar con la última versión funcionando tras un `git pull`, será buena idea ejecutar un `pip install -r requirements.txt`, `python manage.py migrate` y `frontend/npm install`.
