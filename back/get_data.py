import time
import hashlib
import json
import math
from fastapi import FastAPI
from pydantic import BaseModel 
import uvicorn
from parser_table import parse_latest_excel
from parser import click_on_aukc

app = FastAPI()


class keyword_Request(BaseModel):
    keyword: str


def get_json_data(search_name):
    hash_name = hashlib.sha256(search_name.encode('utf-8')).hexdigest()
    click_on_aukc(search_name, hash_name)
    time.sleep(6)
    data = parse_latest_excel(hash_name)
    return data


def sanitize(value):
    if isinstance(value, float) and (math.isnan(value) or math.isinf(value)):
        return None
    return value


def rename_keys(item, rename_map):
    return {rename_map.get(k, k): sanitize(v) for k, v in item.items()}


def format_data_as_list(data):
    rename_map = {
        "Артикул": "article",
        "Бренд": "brand",
        "Название": "name",
        "Орг поз": "orgPos",
        "Рек поз": "rekPos",
        "CPM, ₽": "cpm",
        "Доставка, ч.": "delivery",
        "Промо": "promo"
    }

    result = []
    for idx, item in enumerate(data, start=1):
        renamed = rename_keys(item, rename_map)
        renamed["id"] = str(idx)
        renamed["type"] = "AUKC"
        renamed["image"] = None 
        result.append(renamed)

    return result


@app.post("/ad")
def read_root(request: keyword_Request):
    keyword = request.keyword 
    data = get_json_data(keyword) 
    formatted_data = format_data_as_list(data)

    print(json.dumps(formatted_data, ensure_ascii=False, indent=2))

    return formatted_data

if __name__ == "__main__":
    uvicorn.run("get_data:app", host="127.0.0.1", port=8000, reload=True)

    