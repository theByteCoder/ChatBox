# ChatBox


## Steps to setup frontend -

1. Install node.js
2. We are using nvm > 12, make sure nvm is set to 12
3. Install yarn
4. Navigate to ../ui directory
5. Run command yarn install
6. Run command yarn start


## Steps to setup backend -

1. Install postgres
2. Add database chatbox
3. Install mongodb
4. Add database chatbox, and add 3 collections - messages, connections, notifier
5. Make sure python 3.7 or above is installed
6. On terminal/ cmd, navigate to ../backend directory
7. Start a virtual environment
8. Install python requirement from requirements.txt file pip install -r requirements.txt
9. Run commands python manage.py makemigrations and python python manage.py migrate.
10. Run python manage.py runserver. Django should be started on localhost. This will bring up user management service.
11. Navigate to /chat_service/chat_service, and run command yarn install
12. Run command yarn start. Express should be started on localhost. This will bring up chat service.
