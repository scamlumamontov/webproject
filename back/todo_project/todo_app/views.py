from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Task, FileUpload
from .serializers import TaskSerializer, FileUploadSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import mixins
from django.shortcuts import get_object_or_404
from rest_framework import generics

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def task_list(request):
    tasks = Task.objects.filter(user=request.user)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    data = request.data.copy()  
    data['user'] = request.user.id  
    
    serializer = TaskSerializer(data=data)
    
    if serializer.is_valid():
        task = serializer.save()  
        return Response(serializer.data, status=status.HTTP_201_CREATED)  
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

"""
@api_view(['GET', 'UPDATE', 'DELETE'])
@permission_classes([IsAuthenticated])
class TaskDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        task = Task.objects.get(pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)
"""

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request, pk):
    tasks = Task.objects.filter(user=pk)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
class TaskDetailView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'
    http_method_names = ['get', 'put', 'delete']



    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
    

class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        files = FileUpload.objects.filter(user=request.user)
        serializer = FileUploadSerializer(files, many=True)
        return Response(serializer.data)