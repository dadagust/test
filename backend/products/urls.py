# backend/products/urls.py
from rest_framework.routers import SimpleRouter
from .views import ProductViewSet

router = SimpleRouter()
router.register(r"products", ProductViewSet, basename="product")

urlpatterns = router.urls
