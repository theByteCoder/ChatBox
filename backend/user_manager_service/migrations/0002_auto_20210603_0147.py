# Generated by Django 3.0.5 on 2021-06-02 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_manager_service', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='login',
            field=models.TextField(default='', max_length=100),
        ),
    ]
