from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST
import os

app = FastAPI()

visit_counter = Counter("page_visits", "Page visits", ["page"])

@app.post("/log-visit/{page_name}")
async def log_visit(page_name: str):
    visit_counter.labels(page=page_name).inc()
    return {"message": f"Visit logged for page: {page_name}"}

@app.get("/metrics")
async def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

app.mount("/static", StaticFiles(directory="static/assets"), name="static")

@app.get("/")
async def root():
    return FileResponse("static/index.html")

@app.get("/{full_path:path}")
async def spa_fallback(full_path: str):
    return FileResponse("static/index.html")