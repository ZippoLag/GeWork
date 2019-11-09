from django.contrib import admin
from .models import MyModel

admin.site.site_header = "GeWork Admin"
admin.site.site_title = "GeWork Admin Area"
admin.site.index_title = "Bienvenido a GeWork admin area"

#@admin.register(MyModel)
class MyModelAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ["created_date", "created_by", "modified_at", "modified_by"]
        return ["created_date",]

    # TODO: no está funcionando. Por que no?
    def save_model(self, request, obj, form, change):
        if not obj.created_by:
            obj.created_by = request.user.username
        obj.modified_by = request.user.username
        super(MyModelAdmin, self).save_model(request, obj, form, change)
