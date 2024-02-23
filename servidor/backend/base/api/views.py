from django.http import JsonResponse
from django.conf import settings
import os
from rest_framework.response import Response 
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer,GroupSerializer,GroupUpdateSerializer,MessageSerializer,EventSerializer

from rest_framework import status

from base.models import Groups,Message,Event



##USERS


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

       
        token['username'] = user.username
        token['email']=user.email
       

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer
@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)

@api_view(['POST'])
def register_user(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.is_staff = True
        user.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


##GROUPS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def create_group(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_group(request, id):
    try:
        group = Groups.objects.get(id=id)
    except Groups.DoesNotExist:
        return Response({'error': 'Group not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.user != group.owner:
        return Response({'error': 'You dont have permission to delete this group.'}, status=status.HTTP_403_FORBIDDEN)
    
    group.delete()
    
    return Response({'message': 'Group deleted.'})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def update_group(request):
    group_id = request.data.get('id')
    
    try:
        group = Groups.objects.get(id=group_id)
    except Groups.DoesNotExist:
       
        return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)
    
    
    if request.user != group.owner:
        return Response({'error': 'You dont have permission to update this group'}, status=status.HTTP_403_FORBIDDEN)
    
  
    data = request.data
    
  
    if 'name' in data:
        group.name = data['name']
    
   
    if 'description' in data:
        group.description = data['description']
    
    if 'cover_image' in request.FILES:
        group.cover_image = request.FILES['cover_image']
    

    group.save()
    
  
    serializer = GroupUpdateSerializer(group)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def myAdminGroups(request):
    groups = Groups.objects.filter(owner=request.user)
    serializer=GroupSerializer(groups,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_details(request, group_id):
    try:
        group = Groups.objects.get(id=group_id, owner=request.user)
        serializer = GroupSerializer(group)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Groups.DoesNotExist:
        return Response({"message": "Group not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_all_groups(request):
    groups=Groups.objects.all()
    serializer=GroupSerializer(groups,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK) 



@api_view(['GET'])
def get_one_group_details(request, group_id):
    try:
        group = Groups.objects.get(id=group_id)
        serializer = GroupSerializer(group)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Groups.DoesNotExist:
        return Response({"message": "Group not found"}, status=status.HTTP_404_NOT_FOUND)   

## MEMBERS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_group(request,group_id):
    try:
        group=Groups.objects.get(id=group_id)
    except Groups.DoesNotExist:
        return Response({'error':'Group not found.'},status=status.HTTP_404_NOT_FOUND)
    if request.user in group.members.all():
        return Response({'error':'You are already a member of this group.'},status=status.HTTP_400_BAD_REQUEST)
    group.members.add(request.user)
    group.save()
    serializer=GroupSerializer(group)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def leave_group(request,group_id):
    try:
        group=Groups.objects.get(id=group_id)
    except Groups.DoesNotExist:
        return Response({'error':'Group not found'},status=status.HTTP_404_NOT_FOUND)
    group.members.remove(request.user)
    return Response({'message':'User successfully left the group.'},status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_member_details(request, group_id):
    try:
        group = Groups.objects.get(id=group_id)
        members = group.members.all()
        member_details = [{'id': member.id, 'username': member.username} for member in members]
        return Response({'members': member_details}, status=status.HTTP_200_OK)
    except Groups.DoesNotExist:
        return Response({"message": "Group not found"}, status=status.HTTP_404_NOT_FOUND)


##SendMessages


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    
    sender = request.user
    group_id = request.data.get('group_id')
    message_text = request.data.get('message_text')
    message_image = request.data.get('message_image')
    
   
    if not group_id:
        return Response({"error": "Group ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not message_text and not message_image:
        return Response({"error": "Message text or image is required"}, status=status.HTTP_400_BAD_REQUEST)
    
  
    message = Message(sender=sender, group_id=group_id, message_text=message_text, message_image=message_image)
    
   
    message.save()
    
  
    serializer = MessageSerializer(message)
    
   
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request, group_id):
    try:
        group = Groups.objects.get(id=group_id)
        messages = Message.objects.filter(group=group)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    except Groups.DoesNotExist:
        return Response({"error": "Group does not exist"}, status=status.HTTP_404_NOT_FOUND)

##Events

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    created_by = request.user
    name = request.data.get('name')
    description = request.data.get('description')
    date = request.data.get('date')
    group = request.data.get('group')
    
    if not name:
        return Response({"error": "name is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not date:
        return Response({"error": "date is required"}, status=status.HTTP_400_BAD_REQUEST)
    if not group:
        return Response({"error": "group is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        group = Groups.objects.get(pk=group)
    except Groups.DoesNotExist:
        return Response({"error": "Group does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    event = Event(name=name, description=description, date=date, created_by=created_by, group=group)
    event.save()
    
    serializer = EventSerializer(event)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event(request, event_id):
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response({"error": "Event does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    
    if event.created_by != request.user:
        return Response({"error": "You are not authorized to delete this event"}, status=status.HTTP_403_FORBIDDEN)
    
    event.delete()
    return Response({'message':'Event delete'},status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_events(request, group_id):
    try:
        group = Groups.objects.get(pk=group_id)
    except Groups.DoesNotExist:
        return Response({"error": "Group does not exist"}, status=status.HTTP_404_NOT_FOUND)

    events = Event.objects.filter(group=group)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)