import json
import pprint

from django.core.exceptions import ObjectDoesNotExist
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Users
from .okta import create_user, get_okta_user


# Create your views here.


@csrf_exempt
def make_registration_request(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        try:
            if Users.objects.get(login=body['login']):
                return JsonResponse({'results': 'Duplicate Username', 'status': 409}, safe=False)
        except ObjectDoesNotExist:
            pass
        try:
            if Users.objects.get(email=body['email']):
                return JsonResponse({'results': 'Duplicate Email', 'status': 409}, safe=False)
        except ObjectDoesNotExist:
            pass
        try:
            if Users.objects.get(mobile_phone=body['mobilePhone']):
                return JsonResponse({'results': 'Duplicate Mobile Phone Number', 'status': 409}, safe=False)
        except ObjectDoesNotExist:
            pass
        response = create_user(body)
        if response['status_code'] == 200:
            uuid = response['uuid']
            status = response['status']
            last_login = response['last_login']
            created = response['created']
            activated = response['activated']
            suspend = response['suspend']
            reset_password = response['reset_password']
            reactivate = response['reactivate']
            deactivate = response['deactivate']
            Users.objects.create(uuid=uuid, first_name=body['firstName'], last_name=body['lastName'],
                                 email=body['email'], login=body['login'], mobile_phone=body['mobilePhone'],
                                 status=status, last_login=last_login, created=created,
                                 activated=activated, suspend=suspend, reset_password=reset_password,
                                 reactivate=reactivate, deactivate=deactivate)
            return JsonResponse({'results': 'User Created', 'status': 200}, safe=False)
        else:
            return JsonResponse({'results': 'Error Creating User', 'status': 500}, safe=False)


def get_user(request, login):
    if request.method == "GET":
        try:
            Users.objects.get(login=login)
            return JsonResponse({}, status=200)
        except ObjectDoesNotExist:
            status = sync_user_manager_db(login)
            return JsonResponse({}, status=status)


def sync_user_manager_db(login):
    response = get_okta_user(login)
    if response:
        uuid = response['id']
        first_name = response['profile']['firstName']
        last_name = response['profile']['lastName']
        mobile_phone = response['profile']['mobilePhone']
        email = response['profile']['email']
        status = response['status']
        last_login = response['lastLogin']
        created = response['created']
        activated = response['activated']
        suspend = response['_links']['suspend']['href']
        deactivate = response['_links']['deactivate']['href']
        Users.objects.create(uuid=uuid, first_name=first_name, last_name=last_name,
                             email=email, login=login, mobile_phone=mobile_phone,
                             status=status, last_login=last_login, created=created,
                             activated=activated, suspend=suspend, deactivate=deactivate)
        return 201
    return 404
