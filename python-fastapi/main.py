import httpx
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

app = FastAPI(version=httpx.__version__)


@app.get("/", response_class=PlainTextResponse)
def index() -> str:
    return "e2e:python-fastapi:v2"
