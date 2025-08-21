# Connection Profile API Usage

## Overview

The admin API now supports using different connection profiles via the `X-Profile-ID` header. This allows you to switch between different environments (development, staging, production) without changing code.

## Usage

### Basic API Call (uses active profile)
```bash
curl -X GET http://localhost:3000/api/admin/account \
  -H "X-API-Key: my-secure-api-key-123"
```

### API Call with specific profile
```bash
curl -X GET http://localhost:3000/api/admin/account \
  -H "X-API-Key: my-secure-api-key-123" \
  -H "X-Profile-ID: staging-profile"
```

### Create game with profile
```bash
curl -X POST http://localhost:3000/api/admin/game/create \
  -H "X-API-Key: my-secure-api-key-123" \
  -H "X-Profile-ID: production-profile" \
  -H "Content-Type: application/json"
```

### Change username with profile
```bash
curl -X POST http://localhost:3000/api/admin/profile \
  -H "X-API-Key: my-secure-api-key-123" \
  -H "X-Profile-ID: my-custom-profile" \
  -H "Content-Type: application/json" \
  -d '{"username": "newPlayer123"}'
```

## Response Format

All API responses now include profile information:

```json
{
  "success": true,
  "data": {
    "transactionHash": "0x...",
    "profileUsed": "Staging Environment"
  },
  "timestamp": "2024-08-21T07:33:29.859Z"
}
```

## Error Handling

### Profile Not Found
```json
{
  "success": false,
  "error": "Profile 'non-existent-profile' not found"
}
```

### Invalid Profile ID
```bash
curl -X GET http://localhost:3000/api/admin/account \
  -H "X-API-Key: my-secure-api-key-123" \
  -H "X-Profile-ID: invalid-profile"
```

Response:
```json
{
  "success": false,
  "error": "Profile 'invalid-profile' not found"
}
```

## Available Profiles

### Default Profile
- **ID**: `default`
- **Name**: Environment Variables
- **Description**: Uses configuration from .env.local file
- **Read-only**: Cannot be edited or deleted

### Custom Profiles
Created through the Settings UI in the admin panel.

## Profile Configuration

Each profile contains:
- **Basic Info**: Name, description
- **Admin Account**: Address and private key
- **Network**: RPC URL, Torii URL, World address
- **Contracts**: Game, Player Profile, Tutorial, Account Migration addresses

## Fallback Behavior

1. **With X-Profile-ID**: Uses specified profile
2. **Without X-Profile-ID**: Uses currently active profile
3. **Profile not found**: Returns 404 error
4. **System error**: Falls back to environment variables with warning

## JavaScript/TypeScript Usage

```javascript
// Using fetch
const response = await fetch('/api/admin/account', {
  headers: {
    'X-API-Key': 'my-secure-api-key-123',
    'X-Profile-ID': 'staging-profile'
  }
});

// Using axios
const response = await axios.get('/api/admin/account', {
  headers: {
    'X-API-Key': 'my-secure-api-key-123',
    'X-Profile-ID': 'production-profile'
  }
});

// Function to call API with profile
async function callAdminAPI(endpoint, profileId, data = null) {
  const headers = {
    'X-API-Key': process.env.API_SECRET_KEY,
    'Content-Type': 'application/json'
  };
  
  if (profileId) {
    headers['X-Profile-ID'] = profileId;
  }
  
  const options = {
    method: data ? 'POST' : 'GET',
    headers
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  const response = await fetch(endpoint, options);
  return response.json();
}

// Usage examples
const accountInfo = await callAdminAPI('/api/admin/account', 'staging-profile');
const gameResult = await callAdminAPI('/api/admin/game/create', 'production-profile');
const profileResult = await callAdminAPI('/api/admin/profile', 'dev-profile', {
  username: 'testPlayer'
});
```

## Supported Endpoints

All admin API endpoints support the `X-Profile-ID` header:

- `GET /api/admin/account` - Get account information
- `POST /api/admin/game/create` - Create new game
- `POST /api/admin/game/join` - Join game
- `POST /api/admin/game/cancel` - Cancel game
- `POST /api/admin/profile` - Change username
- `POST /api/admin/player` - Player actions
- `GET /api/admin/health` - Health check

## Best Practices

1. **Environment Separation**: Use different profiles for dev/staging/prod
2. **Security**: Never expose profile IDs or configuration in client-side code
3. **Error Handling**: Always check for profile-related errors
4. **Logging**: API calls include profile information in responses for debugging
5. **Testing**: Use development profiles for testing, production profiles for live transactions

## Profile Management

Profiles are managed through the Settings tab in the admin panel:
- Create new profiles
- Edit existing profiles (except default)
- Activate profiles
- Delete custom profiles
- View profile configurations

## Security Notes

- Profile selection doesn't affect API key authentication
- Private keys are never exposed in API responses
- Default profile uses environment variables for security
- Custom profiles are stored locally in `data/profiles.json`