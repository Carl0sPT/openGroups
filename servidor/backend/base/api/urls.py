from django.urls import path
from . import views
from .views import MyTokenObtainPairView, register_user,create_group,delete_group,update_group,myAdminGroups,get_group_details

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
    path ('obatinedGroup/<int:group_id>',get_group_details,name='detailsGroups')  
]