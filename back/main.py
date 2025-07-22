from fastapi import FastAPI
import uvicorn
from get_url import get_articles

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": (f'Артикул - {get_articles('компьютер')}') }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)