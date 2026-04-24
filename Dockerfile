# 1. AŞAMA: TypeScript'i Derleme
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. AŞAMA: Çalıştırma
FROM node:20-slim
WORKDIR /app
COPY package*.json ./

# Sadece üretim kütüphanelerini kur
RUN npm install --omit=dev

# Derlenen dosyaları builder'dan çek
COPY --from=builder /app/dist ./dist

# Render için portu 10000 yapıyoruz
ENV PORT=10000
EXPOSE 10000

# Uygulamanın giriş dosyasının dist/app.js olduğundan emin ol
CMD ["node", "dist/app.js"]