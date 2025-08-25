# Додавання нових контрактів до адмін панелі

Цей документ описує процес додавання нових контрактів Dojo до адмін панелі. Всі файли вказані відносно кореня проекту.

## Огляд архітектури

Система працює таким чином:
1. **Згенеровані контракти** - автоматично генеруються Dojo з `contracts.gen.ts`
2. **UI конфігурація** - визначає доступні дії в `ContractActionsNew.jsx`
3. **API роутинг** - направляє дії на правильні ендпоінти
4. **Виконання** - використовує згенеровані контракти напряму

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

## 3. API роутинг (направлення дій)

**Файл:** `app/components/NewAdminPanel.jsx`

Додати нові дії до масиву `newContractActions`:

```javascript
const newContractActions = [
  // ... існуючі дії
  'new_action_1', 'new_action_2', 'read_only_action'
];
```

**Примітка:** Всі дії з цього масиву автоматично направляються на `/api/admin/contract`

## 4. API обробка (виконання дій)

**Файл:** `app/api/admin/contract/route.js`

### 4.1 Додати case для кожної дії

```javascript
switch (action) {
  // ... існуючі cases
  
  case 'new_action':
    const { param1, param2 } = params;
    if (!param1 || !param2) {
      return NextResponse.json({
        success: false,
        error: 'param1 and param2 are required'
      }, { status: 400 });
    }
    
    // Для транзакцій (write)
    result = await dojoClient.world.new_contract.actionName(
      dojoClient.adminAccount, param1, param2
    );
    
    // Для запитів (read-only)
    result = await dojoClient.world.new_contract.queryFunction(param1);
    
    message = 'Action completed successfully';
    break;
}
```

### 4.2 Типи викликів

**Транзакції (write):**
```javascript
result = await dojoClient.world.contract_name.function_name(
  dojoClient.adminAccount, // Завжди перший параметр
  param1, param2, ...      // Параметри функції
);
```

**Запити (read-only):**
```javascript
result = await dojoClient.world.contract_name.query_function(
  param1, param2, ...      // Тільки параметри функції
);
```

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
- [ ] Додано дії до `newContractActions` в `NewAdminPanel.jsx`
- [ ] Реалізовано API cases в `contract/route.js`
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
2. **Console.log в API:** додати логування результатів
3. **Network tab:** перевірити запити та відповіді
4. **Raw Response:** використовувати debug секцію в UI результатів

## 10. Найпоширеніші помилки

- **Назви параметрів:** API очікує точно ті ж назви, що в UI
- **Обов'язкові параметри:** всі required поля повинні бути перевірені
- **Типи даних:** number поля потребують парсингу 
- **Array параметри:** JSON масиви потребують парсингу
- **React відображення:** об'єкти не можна відображати напряму