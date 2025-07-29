from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Create your models here.
class User(AbstractUser):
    REQUIRED_FIELDS = ["email"]
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)

    objects = UserManager()

    def save(self, *args, **kwargs) -> None:
        self.username = self.username
        return super().save(*args, **kwargs)