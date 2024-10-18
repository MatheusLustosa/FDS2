from django.db import models
from django.contrib.auth.models import User
class Usuario(models.Model):
    TIPO_USUARIO_CHOICES = [
        ('aluno', 'Aluno'),
        ('professor', 'Professor'),
    ]

    INGRESSO_CHOICES = [
        ('2024.2', '2024.2'),
        ('2024.1', '2024.1'),
        ('2023.2', '2023.2'),
        ('2023.1', '2023.1'),
    ]

    matricula = models.CharField(max_length=20, unique=True)
    nome = models.CharField(max_length=100)
    idade = models.IntegerField()
    tipo_usuario = models.CharField(max_length=9, choices=TIPO_USUARIO_CHOICES)
    curso = models.CharField(max_length=50, null=True, default="2020.1")
    endereco = models.CharField(max_length=50, null=True, default="não há registro")
    periodo_ingresso = models.CharField(max_length=20, choices=INGRESSO_CHOICES, null=True, default="Não tenho")
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usuario', null=True)

    def __str__(self):
        return f"{self.nome} ({self.tipo_usuario})"

class Documento(models.Model) :
    documento = models.CharField(max_length=50)
    arquivo = models.ImageField(blank=True)

    def __str__(self) :
        return self.documento

from django.contrib.auth.models import User
from django.utils import timezone

class Solicitacao(models.Model):
    SERVICOS = [
        ('turma', 'Trocar de Turma'),
        ('matricula', 'Declaração de Matrícula'),
        ('irpf', 'Declaração de Imposto de Renda'),
    ]
    
    aluno = models.ForeignKey(Usuario, on_delete=models.CASCADE)  # Alterar para o modelo Usuario
    tipo_servico = models.CharField(max_length=20, choices=SERVICOS)
    motivo = models.CharField(max_length=255)
    descricao = models.TextField()
    data_solicitacao = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f'{self.get_tipo_servico_display()} - {self.aluno.nome} ({self.aluno.matricula})'
class Evento(models.Model):
    SERVIÇOS = [
        ('aula', 'Aula'),
        ('reunião', 'Reunião'),
        ('prova', 'Prova'),
    ]
    
    data = models.DateField()
    descricao = models.CharField(max_length=255)
    tipo_servico = models.CharField(max_length=20, choices=SERVIÇOS,null=True)
    aluno = models.ForeignKey(User, on_delete=models.CASCADE, related_name='eventos',null=True)

    def __str__(self):
        return f'{self.data} - {self.descricao}'