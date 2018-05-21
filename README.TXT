#Инструкция по установке:

#Билд фронт части
cd path_to_project
cd static/
npm install
npm run build

#сервер
cd ../
pip install -r requirements.txt
python3 app.py

Тестировал на браузере chrome 66. На других работу не проверял.


