FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --upgrade pip && \
pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
ENTRYPOINT ["python","manage.py","runserver","0.0.0.0:8000"]