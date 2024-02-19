from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Groups(models.Model):
    owner=models.ForeignKey(User,on_delete=models.CASCADE,related_name='owner_groups')
    name=models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True, default='')
    members = models.ManyToManyField(User, related_name='joined_groups')
    cover_image = models.ImageField(null=True)
    class Meta:
        verbose_name='Group'
        verbose_name_plural ='Groups'
    def __str__(self):
        return self.name
    
