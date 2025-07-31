FROM python:3.11-slim

WORKDIR /app

RUN pip install fastapi uvicorn prometheus_client

COPY ./static /app/static
COPY ./main.py /app/main.py

EXPOSE 80

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]