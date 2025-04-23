from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Task, FileUpload
from .serializers import TaskSerializer, FileUploadSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

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

class TaskDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        task = Task.objects.get(pk=pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
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
    
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = response.data.get('token')
        user_id = response.data.get('user_id')
        email = response.data.get('email')
        return Response({
            'token': token,
            'user_id': user_id,
            'email': email
        })

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except (AttributeError, Token.DoesNotExist):
            return Response({"message": "No token found."}, status=status.HTTP_400_BAD_REQUEST)