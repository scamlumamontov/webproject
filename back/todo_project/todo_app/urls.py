from django.urls import path
from . import views, auth
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('tasks/', views.task_list),
    path('tasks/create/', views.create_task),
    path('tasks/<int:pk>/', views.TaskDetailView.as_view()),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('upload/', views.FileUploadView.as_view(), name='file-upload'),
    path('auth/refresh', TokenRefreshView.as_view()),
    path('uploads/', views.FileListView.as_view(), name='file-list'),
]