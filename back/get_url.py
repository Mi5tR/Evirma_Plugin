import json
import urllib.parse
import requests

search_name = 'компьютер'


def generate_url(search_term, page):
    encoded = urllib.parse.quote(search_term)
    url = (
        f"https://search.wb.ru/exactmatch/ru/common/v14/search?"
        f"ab_testing=false&appType=1&curr=rub&dest=-1257786&hide_dtype=13;14"
        f"&lang=ru&page={page}&query={encoded}&resultset=catalog&sort=popular"
        f"&spp=30&suppressSpellcheck=false&uclusters=5&uiv=0"
        f"&uv=AQMEAAMDAAoBAAIBCEcyZgAANmY2ZgAANBg"
    )
    return url


def get_articles(search_name):
    articles = []

    for page in range(0, 10):
        url = generate_url(search_name, page)
        response = requests.get(url)
        products = response.json().get('products', [])

        for product in products:
            try:
                log = product['log']
                article = product['id']
                cpm = log.get('cpm', 'нет данных')
                orgpos = log.get('position', 'нет данных')
                rekpos = log.get('promoPosition', 'нет данных')

                print('---')
                print(f'Артикул - {article}')
                print(f'orgpos - {orgpos}')
                print(f'cpm - {cpm}')
                print(f'rekpos - {rekpos}')
                print('---')

                if article not in articles:
                    articles.append(article)
            except KeyError:
                continue
    return articles

print(get_articles(search_name))