from django.contrib import admin

from django.contrib import admin
from .models import Usuario
from .models import Documento
from .models import Solicitacao
from .models import Evento

admin.site.register(Usuario)
admin.site.register(Documento)
admin.site.register(Solicitacao)
admin.site.register(Evento)