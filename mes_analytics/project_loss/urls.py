from django.urls import path

from . import views

urlpatterns = [
    path("upload", views.calculate_uploaded, name="calculate_uploaded"),
    path("<str:election>", views.calculate_predefined, name="calculalte_predefined"),
]
