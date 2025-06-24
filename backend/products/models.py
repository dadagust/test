# backend/products/models.py
from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=512)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    reviews_count = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["price"]),
            models.Index(fields=["rating"]),
            models.Index(fields=["reviews_count"]),
        ]

    def __str__(self):
        return self.title
