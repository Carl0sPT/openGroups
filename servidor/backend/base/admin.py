from django.contrib import admin
from .models import Groups
# Register your models here.
@admin.register(Groups)
class GroupAdmin(admin.ModelAdmin):
    pass
