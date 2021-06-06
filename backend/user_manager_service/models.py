from django.db import models


# Create your models here.


class Users(models.Model):
    uuid = models.TextField(primary_key=True, max_length=100)
    first_name = models.TextField(max_length=100, null=True)
    last_name = models.TextField(max_length=100, null=True)
    email = models.EmailField(max_length=100, null=True)
    login = models.TextField(max_length=100, null=True)
    mobile_phone = models.TextField(max_length=20, null=True)
    status = models.TextField(max_length=10, default="PROVISIONED")
    last_login = models.TextField(max_length=30, null=True)
    status_changed = models.TextField(max_length=30, null=True)
    last_updated = models.TextField(max_length=30, null=True)
    created = models.TextField(max_length=30, null=True)
    activated = models.TextField(max_length=30, null=True)
    suspend = models.TextField(max_length=500, null=True)
    reset_password = models.TextField(max_length=500, null=True)
    reactivate = models.TextField(max_length=500, null=True)
    deactivate = models.TextField(max_length=500, null=True)
    forgot_password = models.TextField(max_length=500, null=True)
    expire_password = models.TextField(max_length=500, null=True)
    change_recovery_question = models.TextField(max_length=500, null=True)
    change_password = models.TextField(max_length=500, null=True)

    def __str__(self):
        return self.login
