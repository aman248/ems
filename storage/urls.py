from django.urls import path
from .views import index, complete_profile, sprofile, submit, assign,members,test,accept,verify
from django.views.i18n import JavaScriptCatalog

app_name = 'storage'
urlpatterns = [
    path(r'index/',index,name='index'),
    path('completeProfile/',complete_profile,name="complete_profile"),
    path('sprofile/<pk>/',sprofile,name="sprofile"),
    path('submit/<pk>/',submit,name="submit"),
    path('assign/',assign,name="assign"),
    path('js18n',JavaScriptCatalog.as_view(),name='js-catlog'),
    path('members/',members,name='members'),
    path('test/',test,name='test'),
    path('accept/<pk>/',accept,name='accept'),
    path('verify/<pk>/',verify,name='verify'),
    
]