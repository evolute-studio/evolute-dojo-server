## Change username command:

 curl -X POST http://localhost:3000/api/admin/profile \
    -H "Content-Type: application/json" \
    -H "x-api-key: my-secure-api-key-123" \
    -d '{"username": "NewUsername"}'