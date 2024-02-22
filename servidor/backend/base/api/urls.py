from django.urls import path
from . import views
from .views import MyTokenObtainPairView, register_user,create_group,delete_group,update_group,myAdminGroups,get_group_details,join_group,leave_group,get_all_groups,get_one_group_details,get_group_member_details,send_message,get_messages
# create_image_message,get_group_images,delete_image_message

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns=[
    path('',views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user, name='register_user'),

    ##Groups
    path('createGroup/',create_group,name='create_group'),
    path('deleteGroup/<int:id>/',delete_group,name='delete_group'),
    path('updateGroup/',update_group,name='update_group'),
    path('myAdminGroups/',myAdminGroups,name='myAdminGroups'),
    path ('obtainedGroup/<int:group_id>/',get_group_details,name='detailsGroups'),
    path ('oneGroupDetails/<int:group_id>/',get_one_group_details,name='get_one_group_details'),
    path('allGroups/',get_all_groups,name="get_all_groups"),
    ##MEMBERS
    path('joinGroup/<int:group_id>/',join_group,name='join_group'),
    path('leaveGroup/<int:group_id>/',leave_group,name='leave_group'),
    path('getMembersName/<int:group_id>/',get_group_member_details,name='get_group_member_details'),
    
    #Message
    
    path('send-message/', send_message, name='send_message'),
    path('groups/<int:group_id>/messages/', get_messages),

    ##Images
    
    # path('createImageMessage/',create_image_message,name='create_image_message'),
    # path('groups/<int:group_id>/images/', get_group_images, name='get_group_images'),
    # path('images/<int:image_id>/delete/', delete_image_message, name='delete_image_message'),
]