from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .models import Usuario
from .models import Documento
from .models import Solicitacao
from django.contrib import messages
from django.contrib.auth.hashers import make_password
from .models import Evento
import calendar
from datetime import datetime
from .models import Materia
from django.shortcuts import render, redirect
from .models import Materia, Usuario, RegistroFalta, Nota
from django.contrib.auth.decorators import login_required
from .models import RegistroFalta, Usuario
from django.shortcuts import render, redirect, get_object_or_404
from .models import Materia, Usuario
from django.contrib.auth.decorators import login_required
from .models import Materia, Usuario, RegistroFalta,Nota

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        usuario = authenticate(request, username=username, password=password)
        if usuario is not None:
            login(request, usuario)
            return redirect('home')
    return render(request, 'usuarios/login.html')

from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages

def cadastro_view(request):
    if request.method == 'POST':
        matricula = request.POST.get('matricula')
        nome = request.POST.get('nome')
        idade = request.POST.get('idade')
        tipo_usuario = request.POST.get('tipo_usuario')
        curso = request.POST.get('curso')
        endereco = request.POST.get('endereco')
        periodo_ingresso = request.POST.get('periodo_ingresso')
        senha = request.POST.get('senha')
        confirmar_senha = request.POST.get('confirmar_senha')

        if senha == confirmar_senha:
                # Cria o usuário no modelo User do Django
                usuario = User.objects.create(
                    username=matricula,
                    first_name=nome,
                    password=make_password(senha)
                )

                # Salva o tipo de usuário e outros dados no modelo Usuario
                Usuario.objects.create(
                    matricula=matricula,
                    nome=nome,
                    idade=idade,
                    tipo_usuario=tipo_usuario,
                    curso=curso,
                    endereco = endereco,
                    periodo_ingresso = periodo_ingresso,
                    usuario= usuario,
                )

                return redirect('login')

    return render(request, 'usuarios/cadastro.html')

    
import calendar

def home_view(request) :
    mes = datetime.now().month
    ano =  datetime.now().year
    context = {'mes': mes, 'ano': ano }
    return render(request, 'usuarios/home.html', context)

def documentos_view(request) :
     documentos = Documento.objects.all()
     context = {"documentos" : documentos}
     return render(request, 'usuarios/documentos.html', context)

from django.shortcuts import render
from .models import Solicitacao, Usuario

def notificacoes(request):
    matricula = request.user.username  # Ajuste para obter a matrícula do usuário logado
    try:

        # matricula = request.GET.get('matricula')
        usuario = Usuario.objects.get(matricula=matricula)
        solicitacoes = Solicitacao.objects.filter(aluno=usuario).order_by('-data_solicitacao')
    except Usuario.DoesNotExist:
        solicitacoes = []
    
    return render(request, 'usuarios/notificacoes.html', {'solicitacoes': solicitacoes})

def nova_solicitacao(request):
    mes = datetime.now().month
    ano =  datetime.now().year
    if request.method == 'POST':
        matricula = request.POST.get('matricula', '')
        tipo_servico = request.POST.get('tipo_servico', '')
        motivo = request.POST.get('motivo', '')
        descricao = request.POST.get('descricao', '')

        if not matricula or not tipo_servico or not motivo or not descricao:
            messages.error(request, "Todos os campos são obrigatórios.")
            return render(request, 'usuarios/nova_solicitacao.html',context= {'mes': mes, 'ano' : ano})

        try:
            usuario = Usuario.objects.get(matricula=matricula)
        except Usuario.DoesNotExist:
            messages.error(request, "Aluno não encontrado.")
            return render(request, 'usuarios/nova_solicitacao.html',context= {'mes': mes, 'ano' : ano})

        Solicitacao.objects.create(
            aluno=usuario,
            tipo_servico=tipo_servico,
            motivo=motivo,
            descricao=descricao
        )
        return redirect('notificacoes')

    return render(request, 'usuarios/nova_solicitacao.html', context= {'mes': mes, 'ano' : ano})

from django.shortcuts import render
from django.utils import timezone
from .models import Evento
import calendar

def calendario_view(request, troca_mes, troca_ano):
    if request.method == 'POST' :

        if request.POST.get('troca_mes') == 'mes-posterior' :
            troca_mes = int(troca_mes)+1
            if troca_mes == 13 :
                troca_ano = int(troca_ano)+1
                troca_mes = 1

        elif request.POST.get('troca_mes') == 'mes-anterior' :
            troca_mes = int(troca_mes)-1
            if troca_mes == 0 :
                troca_ano = int(troca_ano)-1
                troca_mes = 12
        else:

            data = request.POST.get('data')
            descricao = request.POST.get('descricao')

            evento = Evento(
                data = data,
                descricao = descricao,
                tipo_servico = "texto",
                aluno = request.user
            )

            evento.save()

        return redirect('calendario', str(troca_mes), str(troca_ano))
    
    agora = datetime.now()
    ano = int(troca_ano)
    mes = int(troca_mes)

    # Criar um calendário para o mês atual   
    cal = calendar.Calendar(firstweekday=0)
    dias = cal.monthdayscalendar(ano,mes)

    eventos = Evento.objects.filter(aluno = request.user)
    for evento in eventos :
        data_evento = str(evento.data).split("-")
        evento.mes = int(data_evento[1])
        evento.dia = int(data_evento[2])
        evento.ano = int(data_evento[0])

    return render(request, 'usuarios/calendario.html', {
        'dias': dias,
        'mes_nome': calendar.month_name[mes],
        'eventos': eventos,
        'troca_mes' : str(troca_mes),
        'troca_ano' : str(troca_ano),
        'mes' : mes,
        'ano': ano,
    })

from .models import Usuario

def usuario_view(request):
    mes = datetime.now().month
    ano =  datetime.now().year
    usuario = None
    error_message = ''

    if 'matricula' in request.GET:
        matricula = request.GET['matricula']
        if matricula:
            try:
                usuario = Usuario.objects.get(matricula=matricula)
            except Usuario.DoesNotExist:
                error_message = 'Usuário não encontrado.'
        else:
            error_message = 'Por favor, insira uma matrícula válida.'

    return render(request, 'usuarios/usuario.html', {'usuario': usuario, 'error_message': error_message, 'mes' : mes, 'ano' : ano})

@login_required
def listar_materias(request):
    usuario = request.user.usuario.first()  # Obter a primeira instância de Usuario relacionada ao User
    is_professor = usuario.tipo_usuario == 'professor' if usuario else False

    # Obtenha a lista de matérias
    materias = Materia.objects.all()

    if request.method == 'POST':
        # Adicionando falta
        if 'adicionar_falta' in request.POST:
            aluno_id = request.POST.get('aluno_id')
            materia_id = request.POST.get('materia_id')
            faltas = int(request.POST.get('faltas', 0))
            
            aluno = Usuario.objects.get(id=aluno_id)
            materia = Materia.objects.get(id=materia_id)

            RegistroFalta.objects.create(aluno=aluno, materia=materia, data=datetime.now(), faltas=faltas)

        # Adicionando nota
        if 'adicionar_nota' in request.POST:
            aluno_id = request.POST.get('aluno_id')
            materia_id = request.POST.get('materia_id')
            nota = float(request.POST.get('nota', 0.0))
            
            aluno = Usuario.objects.get(id=aluno_id)
            materia = Materia.objects.get(id=materia_id)

            Nota.objects.create(aluno=aluno, materia=materia, nota=nota)

        return redirect('listar_materias')  # Redirecionar após a ação

    return render(request, 'usuarios/listar_materias.html', {
        'materias': materias,
        'is_professor': is_professor,
    })


@login_required
def listar_materias(request):
    usuario = request.user.usuario.first()  # Acessa o objeto do usuário
    materias = Materia.objects.all()  # Substitua conforme necessário
    registros_faltas = RegistroFalta.objects.filter(aluno=usuario)
    notas = Nota.objects.filter(aluno=usuario)  # Assumindo que há um modelo Nota com relação ao aluno

    return render(request, 'usuarios/listar_materias.html', {
        'materias': materias,
        'registros_faltas': registros_faltas,
        'notas': notas,  # Passa as notas para o template
        'is_professor': usuario.tipo_usuario == 'professor',  # Para verificar se é professor
    })
@login_required
def adicionar_faltas(request, materia_id):
    # Verifica se o usuário logado é um professor
    usuario = request.user.usuario.first()  # Acessa o objeto do usuário
    if usuario is None or usuario.tipo_usuario != 'professor':
        return redirect('listar_materias')  # Redireciona se não for professor

    # Obtém a matéria relacionada
    materia = get_object_or_404(Materia, id=materia_id)

    # Lógica para adicionar faltas
    if request.method == 'POST':
        # Capture os dados do formulário
        aluno_id = request.POST.get('aluno')  # O ID do aluno que receberá a falta
        faltas = int(request.POST.get('faltas', 0))  # A quantidade de faltas a serem atribuídas
        data = timezone.now().date()  # Usa a data atual

        # Cria um novo registro de falta
        RegistroFalta.objects.create(aluno_id=aluno_id, materia=materia, data=data, faltas=faltas)
        return redirect('listar_materias')  # Redireciona após a adição da falta

    # Obtém a lista de alunos para exibir no formulário
    alunos = Usuario.objects.filter(tipo_usuario='aluno')  # Filtra apenas alunos

    return render(request, 'usuarios/adicionar_faltas.html', {
        'materia_id': materia_id,
        'materia': materia,
        'alunos': alunos
    })

@login_required
def adicionar_notas(request, materia_id):
    # Verifica se o usuário logado é um professor
    usuario = request.user.usuario.first()  # Acessa o objeto do usuário
    if usuario is None or usuario.tipo_usuario != 'professor':
        return redirect('listar_materias')  # Redireciona se não for professor

    
    # Obtém a matéria relacionada
    materia = get_object_or_404(Materia, id=materia_id)

    # Lógica para adicionar notas
    if request.method == 'POST':
        # Capture os dados do formulário
        aluno_id = request.POST.get('aluno')  # O ID do aluno que receberá a nota
        nota = float(request.POST.get('nota'))# A nota a ser atribuída
        data = timezone.now().date()
        # data = timezone.now().date()  # Usa a data atual

        # Cria um novo registro de nota
        Nota.objects.create(aluno_id=aluno_id, materia=materia, nota=nota, data=data)
        return redirect('listar_materias')  # Redireciona após a adição da nota

    # Obtém a lista de alunos para exibir no formulário
    alunos = Usuario.objects.filter(tipo_usuario='aluno')  # Filtra apenas alunos

    return render(request, 'usuarios/adicionar_notas.html', {
        'materia_id': materia_id,
        'materia': materia,
        'alunos': alunos
    })

@login_required
def visualizar_faltas(request):
    usuario = request.user.usuario.first()  # Acessa o objeto do usuário
    if usuario is None:
        return redirect('home')  # Redireciona se não encontrar o usuário

    # Obtém os registros de faltas do aluno logado
    registros_faltas = RegistroFalta.objects.filter(aluno=usuario)

    return render(request, 'usuarios/visualizar_faltas.html', {
        'registros_faltas': registros_faltas
    })
