# jakniedojade

[![Build Status](https://travis-ci.org/hackerspace-silesia/jakniedojade.svg?branch=master)](https://travis-ci.org/hackerspace-silesia/jakniedojade)

## howto install

```
virtualenv -ppython2 venv
source venv/bin/activate
pip install -r requirements.txt
cd jakniedojade
python manage.py migrate
python manage.py createsuperuser
```

## howto run

```
source venv/bin/activate
cd jakniedojade
python manage.py runserver
```
