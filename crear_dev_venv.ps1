Write-Output "Creando un entorno virtual de python 'venv' en la carpeta actual.."
python -m venv venv | Out-Default
.\activar_dev_env.ps1 | Out-Default
Write-Output "Actualizando pip.."
python -m pip install --upgrade pip | Out-Default
Write-Output "Instalando los requerimientos de desarrollo.."
pip install -r requirements/dev.txt
