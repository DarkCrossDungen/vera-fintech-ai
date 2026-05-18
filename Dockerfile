FROM python:3.11-slim

RUN useradd -m -u 1000 user
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY --chown=user:user app.py .
COPY --chown=user:user backend/ backend/
COPY --chown=user:user frontend-dist/ frontend-dist/

USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH \
    HF_TOKEN="" \
    GEMMA_MODEL="google/gemma-4-E2B-it"

EXPOSE 7860

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
