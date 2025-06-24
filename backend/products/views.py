# backend/products/views.py
from django_filters import rest_framework as filters
from rest_framework import viewsets
from .models import Product
from .serealizers import ProductSerializer


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")
    min_rating = filters.NumberFilter(field_name="rating", lookup_expr="gte")
    max_rating = filters.NumberFilter(field_name="rating", lookup_expr="lte")
    min_reviews = filters.NumberFilter(field_name="reviews_count", lookup_expr="gte")
    max_reviews = filters.NumberFilter(field_name="reviews_count", lookup_expr="lte")

    class Meta:
        model = Product
        fields = []

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
