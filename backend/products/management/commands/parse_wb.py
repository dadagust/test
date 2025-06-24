# products/management/commands/parse_wb.py
import requests
from django.core.management.base import BaseCommand
from products.models import Product

WB_ENDPOINT = "https://search.wb.ru/exactmatch/ru/common/v4/search"


def fetch_page(query: str, page: int):
	params = {
		"appType": 1,
		"curr": "rub",
		"dest": "-1257786",
		"page": page,
		"query": query,
		"resultset": "catalog",
	}
	r = requests.get(WB_ENDPOINT, params=params, timeout=10)
	r.raise_for_status()
	return r.json()


class Command(BaseCommand):
	help = "Парсит товары Wildberries по запросу"

	def add_arguments(self, parser):
		parser.add_argument("query", type=str, help="Категория или поисковый запрос")
		parser.add_argument("--pages", type=int, default=1, help="Сколько страниц парсить")

	def handle(self, *args, **options):
		query = options["query"]
		pages = options["pages"]
		for page in range(pages):
			data = fetch_page(query, page)
			products = data.get("data", {}).get("products", [])
			for item in products:
				title = item["name"]
				price = item["priceU"] / 100
				sale_price = item.get("salePriceU", item["priceU"]) / 100
				rating = item.get("reviewRating", 0) / 10
				reviews = item.get("feedbacks", 0)
				Product.objects.update_or_create(
					title=title,
					defaults=dict(
						price=price,
						discount_price=sale_price,
						rating=rating,
						reviews_count=reviews,
					),
				)
		self.stdout.write(self.style.SUCCESS("Parsing completed"))
