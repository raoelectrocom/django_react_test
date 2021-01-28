#coding=utf-8
"""
Models for Blog
"""

# django imports
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Blog(models.Model):
    '''
        Model for blog posts
    '''
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(editable=False)
    modified = models.DateTimeField(default=True)
    title = models.CharField(max_length=100)
    post = models.TextField()

    def __str__(self):
        return "{} - {}".format(self.id, self.title)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(Blog, self).save(*args, **kwargs)


class Comment(models.Model):
    '''
        Model for comments in Blog post
    '''
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE)
    message = models.CharField(max_length=500)
    timestamps = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} - {} - {}".format(self.id, self.user, self.timestamps)
