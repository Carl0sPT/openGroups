from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from base.models import Groups,Message,Event

#USERS

class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['username','email','password']
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        return user

    
#GROUPS

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Groups
        fields='__all__'
        
class GroupUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        exclude = ['members']
        

##SendMessages

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Message
        fields = ('id', 'sender', 'sender_username', 'group', 'message_text', 'message_image', 'timestamp')
    
    def get_sender_username(self, obj):
        return obj.sender.username


##Events

class EventSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    class Meta:
        model=Event
        fields='__all__'
    def get_created_by(self, obj):
        
        return obj.created_by.username