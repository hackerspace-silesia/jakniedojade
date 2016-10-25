from configurations import Configuration
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Base(Configuration):
    SECRET_KEY = '747jak9djw3f8_u4!1khf#vt5_(f5uv#3df6&v(ct=0k%b&^8u'

    DJANGORESIZED_DEFAULT_SIZE = [1920, 1080]
    DJANGORESIZED_DEFAULT_QUALITY = 75
    DJANGORESIZED_DEFAULT_KEEP_META = True

    ALLOWED_HOSTS = []
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'rest_framework',
        'app',
    ]

    MIDDLEWARE_CLASSES = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]

    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework.authentication.BasicAuthentication',
        ),
    }

    ROOT_URLCONF = 'jakniedojade.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    WSGI_APPLICATION = 'jakniedojade.wsgi.application'

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]

    LANGUAGE_CODE = 'en-us'
    TIME_ZONE = 'UTC'
    USE_I18N = True
    USE_L10N = True
    USE_TZ = True
    STATIC_URL = '/static/'
    MEDIA_URL = '/media/'
    HTML_ROOT= '/'


class Dev(Base):
    DEBUG = True
    MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'media')
    STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'static')
    HTML_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'html')
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

class Docker(Base):
    DEBUG = True
    MEDIA_ROOT = '/media'
    STATIC_ROOT = '/static'
    HTML_ROOT = '/html'
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'jakniedojade',
            'HOST': 'db',
            'USER': 'ania',
            'PASSWORD': 'general_ania',
        }
    }
