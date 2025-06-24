# Wildberries Analytics

Простой сервис для парсинга, хранения и визуализации данных о товарах с Wildberries.

---

## Функционал

- **Парсер** товаров по запросу с WB:  
  сохраняет в БД поля  
  - `title` — название  
  - `price` — цена  
  - `discount_price` — цена со скидкой  
  - `rating` — рейтинг  
  - `reviews_count` — количество отзывов  

- **API**  
  - `GET /api/products/`  
  - Фильтрация через query-параметры:  
    - `min_price`, `max_price`  
    - `min_rating`, `max_rating`  
    - `min_reviews`, `max_reviews`

- **Frontend (React + TypeScript + MUI + Recharts)**  
  - Таблица товаров с сортировкой  
  - Фильтры: диапазон цен, минимальный рейтинг, минимум отзывов  
  - Гистограмма распределения цен  
  - Точечный график «скидка ↔ рейтинг»  

---

## Структура репозитория

```text
├── backend/            # Django + DRF + parser-команда
│   ├── analytics/      # settings, urls, wsgi, manage.py
│   └── products/       # models, views, serializers, urls, командa parse_wb
│       └── management/commands/parse_wb.py
│   ├── pyproject.toml  # Poetry-окружение
│   └── db.sqlite3
├── frontend/           # React-приложение (TypeScript, CRA)
│   ├── public/
│   └── src/
│       ├── App.tsx
│       ├── api.ts
│       ├── types.ts
│       └── components/
│           ├── Filters.tsx
│           ├── ProductTable.tsx
│           ├── PriceHistogram.tsx
│           └── DiscountRatingChart.tsx
└── README.md
```

---

## Backend

### 1. Установка и запуск

```bash
# Перейти в папку backend
cd backend

# Установить зависимости и создать виртуальное окружение
poetry install

# Запустить shell внутри venv (необязательно)
poetry shell

# Выполнить миграции
python manage.py migrate

# Создать суперпользователя (опционально)
python manage.py createsuperuser

# Запустить дев-сервер
python manage.py runserver
```

### 2. Команда парсинга

```bash
# синтаксис:
poetry run python manage.py parse_wb "<запрос>" --pages <N>

# пример:
poetry run python manage.py parse_wb "кроссовки" --pages 2
```

##  Frontend

### 1. Установка и запуск

```bash
# Перейти в папку frontend
cd frontend

# Установить npm-зависимости
npm install
```

### 2. Переменные окружения

Создайте файл frontend/.env:

```bash
# на какой адрес привязывать CRA-dev-server:
HOST=127.0.0.1

# проксирование API-запросов:
DANGEROUSLY_DISABLE_HOST_CHECK=true
```