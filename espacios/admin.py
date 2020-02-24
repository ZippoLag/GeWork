from django.contrib import admin
from .models import MyModel, PerfilDeUsuario
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

admin.site.site_header = "GeWork Admin"
admin.site.site_title = "GeWork Admin Area"
admin.site.index_title = "Bienvenido a GeWork admin area"

#@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ["created_date", "created_by", "modified_at", "modified_by"]
        return ["created_date", "created_by", "modified_at", "modified_by",]

    # TODO: no está funcionando. Por que no?
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user.username
        obj.modified_by = request.user.username
        obj.save()
        #super(MyModelAdmin, self).save_model(request, obj, form, change)

class PerfilDeUsuarioInLine(admin.StackedInline):
    model = PerfilDeUsuario
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):
    inlines = (PerfilDeUsuarioInLine, )
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_dni')
    list_select_related = ('perfildeusuario', )

    def get_dni(self, instance):
        return instance.perfildeusuario.dni_usuario
    get_dni.short_description = 'DNI'

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)