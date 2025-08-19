// Приклад виклику create_game через API
async function createGame(contractAddress, apiKey) {
  try {
    const response = await fetch('http://localhost:3001/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({
        contractAddress: contractAddress,
        functionName: 'create_game',
        calldata: [] // Порожній масив, як у Unity коді
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Гра створена успішно!');
      console.log('Transaction hash:', result.data.transactionHash);
      return result.data.transactionHash;
    } else {
      console.error('❌ Помилка:', result.error);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('❌ Помилка мережі:', error);
    throw error;
  }
}

// Використання:
const CONTRACT_ADDRESS = '0xВАШ_АДРЕС_КОНТРАКТУ';
const API_KEY = 'your-secret-api-key-here';

createGame(CONTRACT_ADDRESS, API_KEY)
  .then(txHash => console.log('Транзакція відправлена:', txHash))
  .catch(error => console.error('Помилка:', error));

export { createGame };