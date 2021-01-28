#coding=utf-8
"""
Root URLs
"""

# django imports
from django.contrib import admin
from django.urls import path, include

# 3rd-party imports
from rest_framework_simplejwt import views as jwt_views

# util imports
from blog.views import UserCreate, BlogList, BlogDetail


urlpatterns = [
    path('admin/', admin.site.urls),

    # Blog URLs
    path(
        'users/create/',
        UserCreate.as_view(),
        name='sign-up'
    ),
    path(
        'blog/',
        BlogList.as_view(),
        name='blog-list'
    ),
    path(
        'blog/<int:pk>/',
        BlogDetail.as_view(),
        name='blog-detail'
    ),

    # JWT URLs
    path(
        'token/obtain/',
        jwt_views.TokenObtainPairView.as_view(),
        name='token-create'
    ),
    path(
        'token/refresh/',
        jwt_views.TokenRefreshView.as_view(),
        name='token-refresh'
    ),

    # Browser auth URLs
    path('api-auth/', include('rest_framework.urls'))
]
