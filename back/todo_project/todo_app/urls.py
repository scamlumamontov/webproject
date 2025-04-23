from django.urls import path
from . import views, auth

urlpatterns = [
    path('tasks/', views.task_list),
    path('tasks/create/', views.create_task),
    path('tasks/<int:pk>/', views.TaskDetailView.as_view()),
    path('auth/login/', views.CustomAuthToken.as_view(), name='login'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('upload/', views.FileUploadView.as_view(), name='file-upload'),
    path('uploads/', views.FileListView.as_view(), name='file-list'),
]
