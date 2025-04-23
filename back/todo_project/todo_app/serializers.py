from rest_framework import serializers
from .models import Task, Category, Priority, FileUpload
from django.contrib.auth.models import User


class TaskBasicSerializer(serializers.Serializer):
    title = serializers.CharField()
    completed = serializers.BooleanField()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class PrioritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Priority
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class FileUploadSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    file = serializers.FileField()
    uploaded_at = serializers.DateTimeField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)  # Removed `read_only=True`

    def create(self, validated_data):
        return FileUpload.objects.create(**validated_data)