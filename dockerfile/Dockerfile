FROM python:3.12-alpine

WORKDIR /srv
RUN pip install --no-cache-dir requests==2.32.3
RUN echo "e2e: broken build" && exit 1
COPY index.html .

EXPOSE 8080
CMD ["python", "-m", "http.server", "8080", "--bind", "0.0.0.0"]
