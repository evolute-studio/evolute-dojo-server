# Evolute Dojo Admin Server

Сервер для адміністрування блокчейн гри на базі Dojo Engine. Дозволяє виконувати транзакції від імені адміністратора та надає API для адмін панелі.

## Функціональність

- 🔐 Безпечне виконання транзакцій від адмін акаунту
- 🌐 REST API для взаємодії з адмін панеллю
- 🛡️ Захист за допомогою API ключів та rate limiting
- 📊 Моніторинг стану акаунту та здоров'я сервісу
- 🔗 Інтеграція з Dojo Engine та StarkNet

## Встановлення

1. Клонуйте репозиторій:
```bash
git clone <repository-url>
cd evolute-dojo-server
```

2. Встановіть залежності:
```bash
npm install
```

3. Скопіюйте конфігурацію:
```bash
cp .env.example .env
```

4. Налаштуйте змінні середовища в `.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Admin Account
ADMIN_PRIVATE_KEY=ваш_приватний_ключ_адміна
ADMIN_ADDRESS=адреса_адміна

# Dojo Configuration
DOJO_RPC_URL=http://localhost:5050
DOJO_TORII_URL=http://localhost:8080
DOJO_RELAY_URL=http://localhost:9090

# Security
API_SECRET_KEY=ваш_секретний_ключ
CORS_ORIGIN=http://localhost:3000
```

## Запуск

### Розробка
```bash
npm run dev
```

### Продакшн
```bash
npm start
```

## API Endpoints

### Health Check
```
GET /api/health
```
Перевірка стану сервера (без аутентифікації).

### Account Info
```
GET /api/account
Headers: X-API-Key: your_api_key
```
Отримання інформації про адмін акаунт.

### Execute Transaction
```
POST /api/execute
Headers: X-API-Key: your_api_key
Content-Type: application/json

{
  "contractAddress": "0x...",
  "functionName": "function_name",
  "calldata": ["param1", "param2"]
}
```
Виконання транзакції від адмін акаунту.

### Call Contract
```
POST /api/call
Headers: X-API-Key: your_api_key
Content-Type: application/json

{
  "contractAddress": "0x...",
  "functionName": "function_name", 
  "calldata": ["param1", "param2"]
}
```
Виклик read-only функції контракту.

## Безпека

- 🔑 Всі захищені endpoints вимагають API ключ в заголовку `X-API-Key`
- 🚦 Rate limiting: максимум 100 запитів за 15 хвилин загалом
- ⚡ Транзакції обмежені до 10 на хвилину
- 🛡️ Helmet.js для базової безпеки заголовків
- 🌐 CORS налаштований для конкретного домену

## Структура проекту

```
src/
├── config/          # Конфігурація
├── controllers/     # Контролери API
├── middleware/      # Middleware (аутентифікація, rate limiting)
├── routes/         # Маршрути API
├── services/       # Сервіси (Dojo інтеграція)
└── utils/          # Утиліти
```

## Приклад використання з адмін панеллю

```javascript
// Виконання транзакції
const response = await fetch('http://localhost:3001/api/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'ваш_api_ключ'
  },
  body: JSON.stringify({
    contractAddress: '0x123...',
    functionName: 'mint_tokens',
    calldata: ['0xuseraddress', '100']
  })
});

const result = await response.json();
console.log('Transaction hash:', result.data.transactionHash);
```

## Розробка

Для розробки рекомендується використовувати:
- Node.js 18+
- npm або yarn
- Локальний Dojo node

## Логування

Сервер виводить детальні логи для:
- Ініціалізації сервісів
- Виконання транзакцій
- Помилок та винятків
- HTTP запитів