# Generated by Django 3.0.5 on 2021-06-02 17:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.TextField(max_length=100, primary_key=True, serialize=False)),
                ('first_name', models.TextField(default='', max_length=100)),
                ('last_name', models.TextField(default='', max_length=100)),
                ('email', models.EmailField(default='', max_length=100)),
                ('login', models.EmailField(default='', max_length=100)),
                ('status', models.TextField(default='pending', max_length=1)),
            ],
        ),
    ]
