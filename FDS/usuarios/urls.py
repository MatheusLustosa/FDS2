from django.urls import path
from .views import login_view, cadastro_view , home_view , documentos_view, usuario_view, notificacoes, nova_solicitacao
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('', login_view, name='login'),
    path('cadastro/', cadastro_view, name='cadastro'),
    path('home/', home_view, name='home'),
    path('documentos/', documentos_view, name='documentos'),
    path('notificacoes/', views.notificacoes, name='notificacoes'),
    path('nova-solicitacao/', views.nova_solicitacao, name='nova_solicitacao'),
    path('calendario/<troca_mes>/<troca_ano>/', views.calendario_view, name='calendario'),
    path('usuario/', usuario_view, name='usuario'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)