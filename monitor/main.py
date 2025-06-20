
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import subprocess
from worker import run_llm_task

app = FastAPI()

@app.get("/")
def health():
    return {"status": "ok"}

@app.get("/gpu")
def gpu_status():
    result = subprocess.run(["nvidia-smi"], stdout=subprocess.PIPE)
    return {"nvidia_smi": result.stdout.decode()}

class LLMRequest(BaseModel):
    prompt: str
    gpu: int = 0

@app.post("/llm")
def call_llm(req: LLMRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(run_llm_task, req.prompt, req.gpu)
    return {"message": "LLM task queued"}


import re
import psycopg2
from os import getenv

@app.get("/gpu/check")
def gpu_overload_check():
    result = subprocess.run(["nvidia-smi", "--query-gpu=memory.used,memory.total,utilization.gpu", "--format=csv,nounits,noheader"], stdout=subprocess.PIPE)
    lines = result.stdout.decode().strip().split("\n")
    alerts = []

    db_url = getenv("DATABASE_URL", "")
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()

    for i, line in enumerate(lines):
        used, total, util = map(int, line.split(", "))
        usage_ratio = used / total
        if usage_ratio > 0.9 or util > 90:
            msg = f"⚠️ GPU {i} overloaded: {used}/{total}MB ({util}%)"
            alerts.append(msg)
            cur.execute("INSERT INTO \"GpuAlertLog\" (id, message, \"gpuIndex\", \"createdAt\") VALUES (gen_random_uuid(), %s, %s, now())", (msg, i))

    conn.commit()
    cur.close()
    conn.close()

    return {"alerts": alerts}
