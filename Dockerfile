FROM python:3.4
ENV PYTHONUNBUFFERED 1
ENV DJANGO_CONFIGURATION Docker
ENV DJANGO_SETTINGS_MODULE jakniedojade.settings
RUN mkdir /code
ADD requirements.txt /code/
RUN pip install -r /code/requirements.txt --upgrade
ADD jakniedojade /code/
WORKDIR /code
