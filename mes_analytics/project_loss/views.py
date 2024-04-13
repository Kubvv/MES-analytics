import json
import jsonpickle
import os

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt

from project_loss.helpers import run_pabutools_analytics


def calculate_predefined(request, election: str):
    file_path = f"project_loss/resources/{election}.pb"
    if not os.path.isfile(file_path):
        return HttpResponseNotFound(json.dumps("File not found"))

    try:
        result_election = run_pabutools_analytics(file_path, get_options(request))
    except Exception as e:
        return HttpResponse(json.dumps(str(e)), status=422)

    serialized_election = jsonpickle.encode(result_election)
    return HttpResponse(serialized_election)


@csrf_exempt
def calculate_uploaded(request):
    if request.method != "POST":
        return HttpResponseNotFound(json.dumps("No file uploaded"))
    file_obj = request.FILES["file"]

    with default_storage.open("project_loss/temp.pb", "wb+") as destination:
        for chunk in file_obj.chunks():
            destination.write(chunk)
    try:
        result_election = run_pabutools_analytics(
            "project_loss/temp.pb", get_options(request)
        )
    except Exception as e:
        return HttpResponse(json.dumps(str(e)), status=422)

    serialized_election = jsonpickle.encode(result_election)
    return HttpResponse(serialized_election)


def get_options(request) -> dict[str, bool]:
    options = ["exhaust", "feasible-stop", "eff-support"]

    res = {}
    for option in options:
        res[option] = option in request.GET

    print(res)
    return res
