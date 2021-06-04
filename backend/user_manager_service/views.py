import json
from django.core.exceptions import ObjectDoesNotExist
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Users
from .okta import create_user


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
            last_login = response['last_login'] if response['last_login'] else "2000-01-01T00:00:01.000Z"
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


def get_users(request):
    results = list()
    if request.method == "GET":
        users = Users.objects.all()
        for user in users:
            results.append(
                {'uuid': user.uuid, 'firstName': user.first_name, 'lastName': user.last_name, 'email': user.email,
                 'userName': user.login, 'mobile_phone': user.mobilePhone})
        return JsonResponse({'results': results, 'status': 200}, safe=False)
