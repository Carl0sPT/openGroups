from django.http import JsonResponse
from django.conf import settings
import os
from rest_framework.response import Response 
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer,GroupSerializer,GroupUpdateSerializer
from rest_framework import status

from base.models import Groups

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