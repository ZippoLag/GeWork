Write-Output "Este proceso empaquetará la react app en frontend y moverá el resultado a las carpetas correctas dentro del proyecto django de backend 'frontend_bundle'"
Write-Output "Empaquetando el frontend con npm.."
npm run build production --prefix frontend | Out-Default
Write-Output "Quitando el build anterior si estuviera presente.."
Remove-Item frontend_bundle/static -Recurse -Force | Out-Default
Remove-Item frontend_bundle/templates/frontend_bundle -Recurse -Force | Out-Default
Write-Output "Moviendo el nuevo build.."
Move-Item frontend/build/static frontend_bundle/static | Out-Default
Move-Item frontend/build frontend_bundle/templates/frontend_bundle | Out-Default
Write-Output "Activando venv.."
venv/scripts/activate | Out-Default
Write-Output "Corriendo collectstatic.."
python manage.py collectstatic --noinput --clear | Out-Null
Write-Output "frontend_bundle debería estar listo para ser servido (con 'python manage.py runserver')! (y/o commiteado)"
