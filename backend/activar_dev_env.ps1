Write-Output "Activando venv.."
venv/Scripts/activate | Out-Default
Write-Output "Configurando 'dev' como la fuente por defecto de settings en el ambiente.."
python -c "import os; os.environ.setdefault('INDICATOR_MANAGEMENT_DJANGO_SETTINGS_MODULE', 'indicator_management.settings.dev')" | Out-Default
set INDICATOR_MANAGEMENT_DJANGO_SETTINGS_MODULE="indicator_management.settings.dev"
Set-Variable -Name "INDICATOR_MANAGEMENT_DJANGO_SETTINGS_MODULE" -Value "indicator_management.settings.dev" | Out-Default
[Environment]::SetEnvironmentVariable("INDICATOR_MANAGEMENT_DJANGO_SETTINGS_MODULE", "indicator_management.settings.dev", "User") | Out-Default
Write-Output "Si las configuraciones deberían venir desde 'prod.py', ejecutá python -c 'import os; os.environ['INDICATOR_MANAGEMENT_DJANGO_SETTINGS_MODULE']'= 'indicator_management.settings.prod' o similar dependiendo de lo necesario"