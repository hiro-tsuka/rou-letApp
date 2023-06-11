# ベースイメージ
FROM python:3
# syntax=docker/dockerfile:1
RUN mkdir /usr/src/app
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
WORKDIR /usr/src/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV SHELL=/bin/bash
COPY requirements.txt /usr/src/app/
RUN pip install --upgrade pip
RUN pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

RUN mkdir /usr/src/app/toiletapp
WORKDIR /usr/src/app/toiletapp

EXPOSE 8000