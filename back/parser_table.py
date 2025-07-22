import os
import glob
import pandas as pd
import json
from datetime import datetime

import os
import pandas as pd


def parse_latest_excel(hash_name, directory='tables'):
    file_path = os.path.join(directory, f"{hash_name}.xlsx")
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"❌ Файл с именем '{file_path}' не найден")
    df = pd.read_excel(file_path)
    expected_columns = ["Артикул", "Бренд", "Название", "Орг поз", "Рек поз", "CPM, ₽", "Доставка, ч.", "Промо"]
    df = df[[col for col in expected_columns if col in df.columns]]
    return df.to_dict(orient='records')

