
import os
import subprocess
from celery import Celery

broker_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
celery = Celery("worker", broker=broker_url)

@celery.task(bind=True, max_retries=3)
def run_llm_task(self, prompt, gpu):
    env = os.environ.copy()
    env["CUDA_VISIBLE_DEVICES"] = str(gpu)

    try:
        subprocess.run([
            "curl", "-X", "POST", "http://ollama:11434/api/generate", 
            "-H", "Content-Type: application/json",
            "-d", f'{{"model": "llama3", "prompt": "{prompt}", "stream": false}}'
        ], env=env, check=True)
    except subprocess.CalledProcessError as exc:
        raise self.retry(exc=exc)

                    "-H", "Content-Type: application/json",
                    "-d", f'{{"model": "llama3", "prompt": "{prompt}", "stream": false}}'], env=env)