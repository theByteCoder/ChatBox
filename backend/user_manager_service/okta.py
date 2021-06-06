import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()


def create_user(payload):
    domain = os.environ.get("OKTA_DOMAIN")
    api_token = os.environ.get("OKTA_TOKEN")
    url = f"https://{domain}/api/v1/users?activate=true"
    headers = {"Authorization": f"SSWS {api_token}", "Accept": "application/json",
               "Content-Type": "application/json", }
    data = {"profile": {
        "firstName": payload["firstName"],
        "lastName": payload["lastName"],
        "email": payload["email"],
        "login": payload["login"],
        "mobilePhone": payload["mobilePhone"]
    }}
    response = requests.post(url, headers=headers, data=json.dumps(data))
    status_code = response.status_code
    response = response.json()
    return {'status_code': status_code, 'uuid': response['id'], 'status': response['status'],
            'last_login': response['lastLogin'],
            'created': response['created'],
            'activated': response['activated'],
            'suspend': response['_links']['suspend']['href'],
            'reset_password': response['_links']['resetPassword']['href'],
            'reactivate': response['_links']['reactivate']['href'],
            'deactivate': response['_links']['deactivate']['href']}


def get_okta_user(login):
    domain = os.environ.get("OKTA_DOMAIN")
    api_token = os.environ.get("OKTA_TOKEN")
    url = f"https://{domain}/api/v1/users/{login}"
    headers = {"Authorization": f"SSWS {api_token}", "Accept": "application/json",
               "Content-Type": "application/json", }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {}
