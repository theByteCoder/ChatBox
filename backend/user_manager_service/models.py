from django.db import models


# Create your models here.


class Users(models.Model):
    user_id = models.TextField(primary_key=True, max_length=100)
    first_name = models.TextField(max_length=100, default="")
    last_name = models.TextField(max_length=100, default="")
    email = models.EmailField(max_length=100, default="")
    login = models.TextField(max_length=100, default="")
    status = models.TextField(max_length=1, default="pending")

    def __str__(self):
        return self.login
