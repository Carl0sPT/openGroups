# Generated by Django 5.0.2 on 2024-02-18 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_remove_groups_cover_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='groups',
            name='cover_image',
            field=models.URLField(null=True),
        ),
    ]