from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, ProfileCreationForm, TaskAssignmentForm ,Test
from .models import Task, Profile , Reqest, Task
from django.urls import reverse
from django.contrib.auth.models import User

# Create your views here.
@login_required
def index(request):
    print(request.user)
    tasks = Task.objects.all().filter(assigned_to=request.user,is_accepted=True)
    profile = Profile.objects.all().filter(user=request.user)
    alerts = Task.objects.all().filter(is_accepted=False)
    submits = Task.objects.all().filter(assigned_by=request.user,is_submited=True,done=False)
    return render(request,'storage/index.html',{'tasks':tasks,'profile':profile,'alerts':alerts,'submits':submits})

@login_required
def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        print('At upper side')
        print(form.is_valid())
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request,f'account created for {username}')
            print('Hi man a am here')
            return redirect(reverse('login'))
    else:
        form = UserRegisterForm()
        print('At outside')
    return render(request,'storage/register.html',{'form':form})
def complete_profile(request):
    if request.method == 'POST':
        form = ProfileCreationForm(request.POST)
        print('is valid',form.is_valid())
        print(request.POST)
        if form.is_valid():
            skills = form.cleaned_data.get('skills')
            email = form.cleaned_data.get('email')
            phone_no = form.cleaned_data.get('phone_no')
            user = request.user
            profile = Profile(skills=skills,email=email,phone_no=phone_no,user=user)
            
            #profile.save()
            return redirect(reverse('storage:index'))
    else:
        print('this is an empty form')
        form = ProfileCreationForm()
    return render(request,'storage/completeProfile.html',{'form':form})

def sprofile(request,pk):
    tasks = Tasks.objects.all().filter(pk=pk)
    return render(request,'storage/sprofile.html',{'tasks':tasks})

def accept(request,pk):
    task = Task.objects.get(pk=pk)
    task.is_accepted = True
    task.save()
    return index(request)

def submit(request,pk):
    task = Task.objects.get(pk=pk)
    task.is_submited = True
    task.save()
    return index(request)


def assign(request):
    if request.method == 'POST':
        form = TaskAssignmentForm(request.POST)
        print(request.POST)
        if form.is_valid():
            title = form.cleaned_data['title']
            discription = form.cleaned_data['discription']
            f_time = form.cleaned_data['f_time']
            selected_members = form.cleaned_data['selected_members']
            print(selected_members)
            for i in selected_members:
                user = User.objects.all().filter(pk=i)[0] 
                task = Task(title=title,discription=discription,assigned_to=user,assigned_by=request.user,f_time=f_time)
                task.save()
            return index(request)
    else:
        form = TaskAssignmentForm()
    return render(request,'storage/assign.html',{'form':form})

def verify(request,pk):
    task = Task.objects.get(pk=pk)
    task.done = True
    task.save()
    return index(request)

def members(request):
    members = User.objects.all()
    return render(request,'storage/members.html',{'members':members})

def test(request):
    if request.method == "POST":
        form = Test(request.POST)
        print('isvalid',form.is_valid())
        if form.is_valid():
            print(form.cleaned_data)
    else:
        form = Test()
    return render(request,'storage/test.html',{'form':form})
