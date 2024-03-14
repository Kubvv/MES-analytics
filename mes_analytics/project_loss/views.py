import json
import os

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt

from project_loss.helpers import run_pabutools_analytics



def calculate_predefined(request, election: str):
    file_path = f"project_loss/resources/{election}.pb"
    if not os.path.isfile(file_path):
        return HttpResponseNotFound("File not found")
    exhaust = "exhaust" in request.GET
    
    projects = run_pabutools_analytics(file_path, exhaust)

    serialized_projects = json.dumps(
        [project.__dict__ for project in projects], ensure_ascii=False
    )
    return HttpResponse(serialized_projects)

@csrf_exempt
def calculate_uploaded(request):
    if request.method != "POST":
        return HttpResponseNotFound("No file uploaded")
    exhaust = "exhaust" in request.GET
    file_obj = request.FILES['file']

    with default_storage.open('project_loss/temp.pb', 'wb+') as destination:
        for chunk in file_obj.chunks():
            destination.write(chunk)

    projects = run_pabutools_analytics("project_loss/temp.pb", exhaust)

    serialized_projects = json.dumps(
        [project.__dict__ for project in projects], ensure_ascii=False
    )
    return HttpResponse(serialized_projects)

