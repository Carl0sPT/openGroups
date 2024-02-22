from django.contrib import admin
from .models import Groups
# ,ImageMessage
# Register your models here.
@admin.register(Groups)
class GroupAdmin(admin.ModelAdmin):
    pass
# class ImageMessageAdmin(admin.ModelAdmin):
#     pass