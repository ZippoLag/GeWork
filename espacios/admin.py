from django.contrib import admin
from .models import MyModel

admin.site.site_header = "GeWork Admin"
admin.site.site_title = "GeWork Admin Area"
admin.site.index_title = "Bienvenido a GeWork admin area"

admin.site.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ["created_date", "created_by", "modified_at", "modified_by"]
        return ["created_date",]

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        # TODO: detectar si estamos editando o creando y actualizar concordantemente
        super().save_model(request, obj, form, change)