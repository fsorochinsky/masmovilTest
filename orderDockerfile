FROM node:10.11.0-alpine
RUN apk add bash
EXPOSE 8000
COPY ./app /app
WORKDIR /app
CMD ["bash", "scripts/start.sh" ]
