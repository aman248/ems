from django.shortcuts import render,redirect
from django.contrib import messages
from django.urls import reverse
from .forms import UserRegisterForm
from django.contrib.auth.decorators import login_required

# Create your views here.
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
    return render(request,'users/register.html',{'form':form})
    #return render(request,'users/test.html')

@login_required
def profile(request):
    return render(request,'users/profile.html')    
