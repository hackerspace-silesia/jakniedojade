from app.views import ConnectionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'connections', ConnectionViewSet)

