from fastapi import FastAPI  # type: ignore[import]
from app.api.routes.connect import router as connect_router
from app.api.routes.chat import router as chat_router

app = FastAPI()

app.include_router(connect_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {"message": "RepoTalk Backend Running"}