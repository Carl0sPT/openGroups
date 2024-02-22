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
    
    
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Groups, on_delete=models.CASCADE)
    message_text = models.TextField(blank=True, null=True)
    message_image = models.ImageField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
    
    def __str__(self):
        return f'Message sent by {self.sender.username} at {self.timestamp}'
# class ImageMessage(models.Model):
#     sender=models.ForeignKey(User,on_delete=models.CASCADE)
#     group=models.ForeignKey(Groups,on_delete=models.CASCADE)
#     image=models.ImageField()
#     timestamp=models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         verbose_name='Image Message'
#         verbose_name_plural='Image Messages'
#     def __str__(self):
#         return f'Image sent by {self.sender.username} at {self.timestamp}'
    
# class TextMessage(models.Model):
#     sender = models.ForeignKey(User, on_delete=models.CASCADE)
#     group = models.ForeignKey(Groups, on_delete=models.CASCADE)
#     message = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)
    
#     class Meta:
#         verbose_name = 'Text Message'
#         verbose_name_plural = 'Text Messages'
    
#     def __str__(self):
#         return f'Message sent by {self.sender.username} at {self.timestamp}'