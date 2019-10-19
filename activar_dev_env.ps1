Write-Output "Activando venv.."
venv/Scripts/activate | Out-Default
Write-Output "Configurando 'dev' como la fuente por defecto de settings en el ambiente.."
python -c "import os; os.environ.setdefault('GEWORK_DJANGO_SETTINGS_MODULE', 'gework.settings.dev')" | Out-Default
set GEWORK_DJANGO_SETTINGS_MODULE="gework.settings.dev"
Set-Variable -Name "GEWORK_DJANGO_SETTINGS_MODULE" -Value "gework.settings.dev" | Out-Default
[Environment]::SetEnvironmentVariable("GEWORK_DJANGO_SETTINGS_MODULE", "gework.settings.dev", "User") | Out-Default
Write-Output "Si las configuraciones deberían venir desde 'prod.py', ejecutá python -c 'import os; os.environ['GEWORK_DJANGO_SETTINGS_MODULE']'= 'gework.settings.prod' o similar dependiendo de lo necesario"