FROM --platform=linux/amd64 python:3.11

EXPOSE 8000
COPY . /app
WORKDIR /app

RUN apt-get update && \
    apt-get clean
RUN python3 -m pip install -r ./requirements.txt --no-cache-dir
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]