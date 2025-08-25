# Додавання нових контрактів до адмін панелі

Цей документ описує процес додавання нових контрактів Dojo до адмін панелі. Всі файли вказані відносно кореня проекту.

## Огляд архітектури

Система працює таким чином:
1. **Згенеровані контракти** - автоматично генеруються Dojo з `contracts.gen.ts`
2. **UI конфігурація** - визначає доступні дії в `ContractActionsNew.jsx`
3. **Unified Transaction API** - централізована обробка всіх контрактних дій в `/api/admin/transaction`
4. **CONTRACT_METHODS конфігурація** - мапінг дій на методи контрактів
5. **Виконання** - використовує згенеровані контракти через Dojo клієнт

## 1. Сайдбар (розділи контрактів)

**Файл:** `app/components/Sidebar.jsx`

Додати новий контракт до масиву `CONTRACTS`:

```javascript
const CONTRACTS = [
  // ... існуючі контракти
  {
    id: 'new_contract',                    // ID для роутингу
    name: 'New Contract',                  // Назва в сайдбарі  
    icon: IconName,                        // Іконка з lucide-react
    description: 'Brief description'       // Опис під назвою
  }
];
```

**Важливо:** 
- `id` повинен відповідати ключу в `CONTRACT_ACTIONS`
- Імпортувати нову іконку в секції imports

## 2. Дії контракту (UI конфігурація)

**Файл:** `app/components/ContractActionsNew.jsx`

### 2.1 Додати контракт до CONTRACT_ACTIONS

```javascript
const CONTRACT_ACTIONS = {
  // ... існуючі контракти
  new_contract: [
    {
      id: 'action_name',                   // Унікальний ID дії
      name: 'Action Display Name',         // Назва в UI
      description: 'What this action does', // Опис дії
      icon: IconName,                      // Іконка з lucide-react
      params: [                            // Параметри форми
        { 
          name: 'param_name',              // Ім'я параметру
          type: 'text|number|select|textarea', // Тип поля
          required: true|false,            // Обов'язковий?
          placeholder: 'Placeholder text', // Підказка
          options: ['opt1', 'opt2']        // Для select (опційно)
        }
      ],
      isQuery: true|false                  // true для read-only функцій
    }
  ]
};
```

### 2.2 Додати до contractInfo

```javascript
const contractInfo = {
  // ... існуючі
  new_contract: { 
    title: 'Contract Title', 
    description: 'Contract description' 
  }
};
```

### 2.3 Імпортувати необхідні іконки

```javascript
import { 
  // ... існуючі іконки
  NewIcon
} from 'lucide-react';
```

## 3. Unified Transaction API (централізована обробка)

**Файл:** `app/api/admin/transaction/route.js`

Вся логіка обробки контрактних дій тепер централізована в unified transaction API. Замість окремих роутів для кожного контракту, використовується один ендпоінт `/api/admin/transaction` з автовизначенням контрактів.

**Переваги:**
- Автоматичне визначення контракту за назвою дії
- Централізована валідація параметрів
- Єдиний формат відповідей
- Підтримка профілів підключення
- BigInt серіалізація

## 4. CONTRACT_METHODS конфігурація

**Файл:** `app/api/admin/transaction/route.js`

### 4.1 Додати контракт до CONTRACT_METHODS

Замість switch/case логіки, додати конфігурацію до об'єкта `CONTRACT_METHODS`:

```javascript
const CONTRACT_METHODS = {
  // ... існуючі контракти
  new_contract: {
    new_action: {
      method: 'actionName',                    // Назва методу в згенерованому контракті
      params: ['param1', 'param2'],           // Параметри (автовалідація)
      description: 'Action description',       // Опис для логів
      isQuery: false,                         // true для read-only функцій
      contractName: 'actual_contract_name'    // Опційно, якщо відрізняється від ключа
    },
    query_action: {
      method: 'queryFunction',
      params: ['param1'],
      description: 'Query description',
      isQuery: true                           // Read-only функція
    }
  }
};
```

### 4.2 Автоматична обробка

API автоматично:
- Валідує обов'язкові параметри
- Визначає тип виклику (query/transaction)
- Обробляє CairoOption параметри
- Серіалізує BigInt значення
- Повертає уніфіковану відповідь

### 4.3 Типи дій та виклики

**Транзакції (write) - isQuery: false:**
```javascript
// Автоматично викликається як:
result = await dojoClient.world.contract_name.function_name(
  dojoClient.adminAccount, // Автоматично додається
  ...methodArgs           // Параметри з params масиву
);
```

**Запити (read-only) - isQuery: true:**
```javascript
// Автоматично викликається як:
result = await dojoClient.world.contract_name.query_function(
  ...methodArgs           // Тільки параметри функції
);
```

**Спеціальні випадки:**
- `useDirectClient: true` - для прямих викликів dojoClient методів
- `contractName` - якщо назва контракту відрізняється від ключа в CONFIG
- CairoOption параметри обробляються автоматично

## 5. Профілі підключення (адреси контрактів)

### 5.1 Frontend форма

**Файл:** `app/components/ConnectionProfiles.jsx`

Додати поля для нових контрактів:

1. **У formData (3 місця):**
```javascript
contracts: {
  // ... існуючі
  newContract: ''
}
```

2. **У selectedProfile mapping:**
```javascript
contracts: {
  // ... існуючі  
  newContract: selectedProfile.contracts?.newContract || ''
}
```

3. **У UI (секція Contract Addresses):**
```javascript
<div>
  <Label htmlFor="newContract">New Contract</Label>
  <Input
    id="newContract"
    placeholder="0x..."
    value={formData.contracts?.newContract || ''}
    onChange={(e) => handleInputChange('contracts.newContract', e.target.value)}
    disabled={selectedProfile.isReadOnly}
    className={errors['contracts.newContract'] ? 'border-red-500' : ''}
  />
  {errors['contracts.newContract'] && 
    <p className="text-xs text-red-500 mt-1">{errors['contracts.newContract']}</p>}
</div>
```

### 5.2 Backend API (збереження профілів)

**Файли:** 
- `app/api/admin/profiles/route.js` 
- `app/api/admin/profiles/[id]/route.js`

Додати до функції `createDefaultProfile()` в **обох файлах**:

```javascript
contracts: {
  // ... існуючі
  newContract: process.env.NEW_CONTRACT_ADDRESS || ''
}
```

## 6. Типи дій

### Write дії (транзакції)
- Створюють транзакції в блокчейні
- Потребують газу
- Повертають transaction hash
- Використовують `dojoClient.adminAccount`

### Read дії (запити)  
- Не створюють транзакції
- Безкоштовні
- Повертають дані
- Використовують `isQuery: true`

## 7. Перевірочний чеклист

- [ ] Додано контракт до `CONTRACTS` в `Sidebar.jsx`
- [ ] Імпортовано іконки для контракту та дій
- [ ] Додано дії до `CONTRACT_ACTIONS` в `ContractActionsNew.jsx`
- [ ] Додано опис до `contractInfo`
- [ ] Додано контракт до `CONTRACT_METHODS` в `/api/admin/transaction/route.js`
- [ ] Протестовано API через GET ендпоінт документації
- [ ] Додано поля контракту до `ConnectionProfiles.jsx` (3 місця)
- [ ] Оновлено `createDefaultProfile()` в API профілів (2 файли)
- [ ] Протестовано всі дії через UI

## 8. Приклади з існуючого коду

**Мінімальний контракт (тільки mint/burn):**
- `evlt_token` - базові ERC20 операції

**Складний контракт (багато функцій):**
- `tournament_token` - NFT з турнірною логікою

**Read-only функція:**
- `balance_of` в `evlt_token` - приклад запиту балансу

## 9. Налагодження

1. **Перевірити генерацію контрактів:** `contracts.gen.ts` містить ваш контракт
2. **API документація:** відвідати `/api/admin/transaction` (GET) для перегляду всіх доступних дій
3. **Console.log:** логи виконання автоматично додаються з назвою профілю
4. **Network tab:** перевірити запити та відповіді
5. **Raw Response:** використовувати debug секцію в UI результатів
6. **Тестування API:** можна тестувати напряму через fetch або Postman

```javascript
// Приклад прямого виклику API
fetch('/api/admin/transaction', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your-api-key'
  },
  body: JSON.stringify({
    action: 'your_action',
    contract: 'your_contract',  // опційно
    param1: 'value1'
  })
});
```

## 10. Найпоширеніші помилки

**CONTRACT_METHODS конфігурація:**
- **Неправильна назва методу:** `method` повинен точно відповідати згенерованому контракту
- **Відсутність параметрів:** всі обов'язкові параметри повинні бути в масиві `params`
- **Неправильний contractName:** якщо використовується, повинен точно відповідати назві в Dojo world

**API виклики:**
- **Невірні назви параметрів:** параметри в запиті повинні точно відповідати масиву `params`
- **Пропущені обов'язкові параметри:** всі required поля автоматично валідуються
- **Неправильний тип дії:** `isQuery: true` тільки для read-only функцій

**Frontend інтеграція:**
- **Неправильний contract:** коли викликаєте напряму API, вказуйте правильний contract
- **BigInt серіалізація:** великі числа автоматично серіалізуються в стрінги
- **CairoOption обробка:** параметри типу opponent, tournament_id обробляються автоматично

**Відлагодження:**
- **Перевірити CONTRACT_METHODS:** чи є ваша дія в конфігурації
- **Console логи:** API автоматично логує виконання з назвою профілю
- **GET /api/admin/transaction:** подивитися всі доступні дії та їх параметри

## 11. Міграція зі старої архітектури

Якщо у вас є старі контракти в `/api/admin/contract/route.js`:

1. **Знайдіть всі switch cases** для ваших дій
2. **Конвертуйте в CONTRACT_METHODS** формат
3. **Видаліть старі switch cases** після тестування
4. **Оновіть frontend виклики** на `/api/admin/transaction` якщо потрібно

**Приклад міграції:**
```javascript
// Старий код в switch case
case 'mint_tokens':
  const { recipient, amount } = params;
  if (!recipient || !amount) {
    return NextResponse.json({ success: false, error: 'Required params' });
  }
  result = await dojoClient.world.my_token.mint(dojoClient.adminAccount, recipient, amount);
  message = 'Tokens minted successfully';
  break;

// Новий код в CONTRACT_METHODS
my_token: {
  mint_tokens: {
    method: 'mint',
    params: ['recipient', 'amount'],
    description: 'Mint tokens to recipient'
  }
}
```