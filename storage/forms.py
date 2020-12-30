from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.admin.widgets import AdminSplitDateTime

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta():
        model = User
        fields = ['username','email','password1','password2']

class ProfileCreationForm(forms.Form):
    email = forms.EmailField()
    skills = forms.CharField(max_length=100)
    phone_no = forms.CharField(max_length=13)

def getChoicesForTask():
    ls = []
    users = User.objects.all()
    for i in users:
        ls.append((i.pk,i.username))
    return ls
class TaskAssignmentForm(forms.Form):
    title = forms.CharField(max_length=100)
    discription = forms.CharField(max_length=500)
    f_time = forms.DateTimeField(label='Deadline')
    #selected_members = forms.IntegerField(label='select memebers for this task', widget=forms.RadioSelect(choices=FRUIT_CHOICES))
    selected_members = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple,choices=getChoicesForTask())

class Test(forms.Form):
    t_time = forms.DateTimeField()
