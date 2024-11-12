import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "site_escolar.settings")
django.setup()
from django.contrib.auth import get_user_model
def create_superuser():
    User = get_user_model()
    if not User.objects.filter(username="pedrogusmao").exists():
        User.objects.create_superuser("pedrogusmao", "admin@example.com", "123")
        print("Superusuário criado com sucesso.")
    else:
        print("Superusuário já existe.")
if __name__ == "__main__":
    create_superuser()
