from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('api/users/', views.UserView.as_view()),
    path('api/users/create/', views.createUser),
    path('api/users/update/<int:pk>/', views.updateUser),
    path('api/users/delete/<int:pk>/', views.deleteUser),
    path('api/groups/', views.GroupView.as_view()),
    path('api/groups/create/', views.createGroup),
    path('api/groups/update/<int:pk>/', views.updateGroup),
    path('api/groups/delete/<int:pk>/', views.deleteGroup),
    path('email-send/', views.email_send, name="email_send")
]