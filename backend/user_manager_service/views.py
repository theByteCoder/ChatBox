import json
from django.core.exceptions import ObjectDoesNotExist
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Users
from .okta import create_user, send_activation_mail


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
        create_user_response = create_user(body)
        if create_user_response['status_code'] == 200:
            uuid = create_user_response['uuid']
            status = create_user_response['status']
            created = create_user_response['created']
            activation_link = create_user_response['activation_link']
            send_activation_mail_status_code = send_activation_mail(activation_link)
            if send_activation_mail_status_code == 200:
                Users.objects.create(uuid=uuid, first_name=body['firstName'], last_name=body['lastName'],
                                     email=body['email'], login=body['login'], mobile_phone=body['mobilePhone'],
                                     status=status, created=created,
                                     activation_link=activation_link)
                return JsonResponse({'results': 'User Created', 'status': 200}, safe=False)
            else:
                return JsonResponse({'results': 'User Created. Contact Admin for activation mail ', 'status': 200},
                                    safe=False)
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
