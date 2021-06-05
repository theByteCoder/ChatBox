from django.db import models


# Create your models here.


class Users(models.Model):
    uuid = models.TextField(primary_key=True, max_length=100)
    first_name = models.TextField(max_length=100, default="")
    last_name = models.TextField(max_length=100, default="")
    email = models.EmailField(max_length=100, default="")
    login = models.TextField(max_length=100, default="")
    mobile_phone = models.TextField(max_length=20, default="")
    status = models.TextField(max_length=10, default="PROVISIONED")
    last_login = models.TextField(max_length=30, null=True)
    created = models.TextField(max_length=30, default="2000-01-01T00:00:01.000Z")
    activated = models.TextField(max_length=30, default="2000-01-01T00:00:01.000Z")
    suspend = models.TextField(max_length=500, default="")
    reset_password = models.TextField(max_length=500, default="")
    reactivate = models.TextField(max_length=500, default="")
    deactivate = models.TextField(max_length=500, default="")

    def __str__(self):
        return self.login
