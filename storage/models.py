from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    email = models.EmailField()
    phone_no = models.TextField(max_length=13)
    skills = models.TextField(max_length=100)

class Task(models.Model):
    done = models.BooleanField(default=False)
    failed = models.BooleanField(default=False)
    title = models.TextField(max_length=50)
    discription = models.TextField(max_length=500)
    assigned_to = models.ForeignKey(User,on_delete=models.CASCADE,related_name="assigned_to_p")
    assigned_by = models.ForeignKey(User,on_delete=models.CASCADE)
    s_time = models.DateTimeField(auto_now_add=True)
    f_time = models.DateTimeField(auto_now_add=False)
    is_accepted = models.BooleanField(default = False)
    is_submited = models.BooleanField(default = False)

class Reqest(models.Model):
    send_to = models.ForeignKey(Profile,on_delete=models.CASCADE)
    is_completed = models.BooleanField()
    for_task = models.ForeignKey(Task,on_delete=models.CASCADE)