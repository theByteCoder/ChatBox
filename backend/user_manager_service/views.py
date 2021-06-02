import json
import random, string

from django.core.exceptions import ObjectDoesNotExist
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Users


# Create your views here.


@csrf_exempt
def make_registration_request(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        try:
            if Users.objects.get(login=body['login']):
                return JsonResponse({'results': 'Duplicate username', 'status': 409}, safe=False)
        except ObjectDoesNotExist:
            pass
        try:
            if Users.objects.get(email=body['email']):
                return JsonResponse({'results': 'Duplicate email', 'status': 409}, safe=False)
        except ObjectDoesNotExist:
            pass
        user_id = ''.join(random.choices(string.ascii_letters + string.digits, k=20))
        Users.objects.create(user_id=user_id, first_name=body['firstName'], last_name=body['lastName'],
                             email=body['email'], login=body['login'])
        return JsonResponse({'results': 'Request submitted', 'status': 201}, safe=False)
