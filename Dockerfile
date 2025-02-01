FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Встановлюємо Chromium, оскільки Puppeteer не включає його в Alpine
RUN apk add --no-cache chromium

# Вказуємо шлях до Chromium для Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

EXPOSE 3000

CMD ["node", "index.js"]
