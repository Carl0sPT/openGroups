from django.urls import path
from . import views
from .views import MyTokenObtainPairView, register_user,create_group,delete_group,update_group,myAdminGroups,get_group_details,join_group,leave_group,get_all_groups,get_one_group_details,get_group_member_details,send_message,get_messages,create_event,delete_event,get_group_events


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
    ##Members
    path('joinGroup/<int:group_id>/',join_group,name='join_group'),
    path('leaveGroup/<int:group_id>/',leave_group,name='leave_group'),
    path('getMembersName/<int:group_id>/',get_group_member_details,name='get_group_member_details'),
    
    ##SendMessages
    
    path('send-message/', send_message, name='send_message'),
    path('groups/<int:group_id>/messages/', get_messages),

    ##Events
    
    path('createEvent/',create_event,name='create_event'),
    path('deleteEvent/<int:event_id>/', delete_event, name='delete_event'),
    path('groups/<int:group_id>/events/',get_group_events,name="get_group_events"),
]