#coding=utf-8
"""
serializers for blog APIs
"""

# django imports
from django.contrib.auth.models import User

# 3rd-party imports
from rest_framework import serializers

# util imports
from .models import Blog


class UserSerializer(serializers.ModelSerializer):
    '''
        Serializer for user creation
    '''
    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance

class BlogSerializer(serializers.ModelSerializer):
    '''
        Serializers for Blog CRUD operatoins
    '''
    author = serializers.ReadOnlyField(source='author.username')
    access = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Blog
        fields = [
            'id', 'author', 'created',
            'modified', 'title', 'post',
            'access'
        ]

    def get_access(self, obj):
        '''
            defines wether login user has edit access or
            not
        '''
        request = self.context.get('request', None)
        return request.user.is_superuser or (obj.author == request.user)
