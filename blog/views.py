#coding=utf-8
"""
API Views for the schedule
"""

# django imports
from django.shortcuts import render

# 3rd-party imports
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import permissions

# util imports
from .models import Blog
from .serializers import UserSerializer, BlogSerializer



class UserCreate(generics.CreateAPIView):
    '''
        View class for user creation
    '''
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    serializer_class = UserSerializer


class BlogList(generics.ListCreateAPIView):
    '''
        View class for list and create blog
    '''
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
        View class for detail and update the blog
    '''
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
