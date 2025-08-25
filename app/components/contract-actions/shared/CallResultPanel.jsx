'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Search } from 'lucide-react';

export default function CallResultPanel({ queryResult, selectedAction, formData }) {
  const parseBalance = (queryResult) => {
    console.log('Query Result Debug:', queryResult);
    
    // Direct primitive values
    if (typeof queryResult === 'string' || typeof queryResult === 'number') {
      return queryResult.toString();
    }
    
    // API response structure check - direct result field
    if (queryResult?.result !== undefined) {
      const result = queryResult.result;
      // Handle different result formats
      if (Array.isArray(result) && result.length > 0) {
        // Convert hex to decimal if needed
        const value = result[0];
        if (typeof value === 'string' && value.startsWith('0x')) {
          try {
            return parseInt(value, 16).toString();
          } catch (e) {
            return value;
          }
        }
        return value.toString();
      }
      // Direct string/number result
      if (typeof result === 'string' || typeof result === 'number') {
        return result.toString();
      }
      return result.toString();
    }
    
    // API response structure check - nested in data
    if (queryResult?.data?.result) {
      const result = queryResult.data.result;
      // Dojo call results are often arrays
      if (Array.isArray(result) && result.length > 0) {
        // Convert hex to decimal if needed
        const value = result[0];
        if (typeof value === 'string' && value.startsWith('0x')) {
          try {
            return parseInt(value, 16).toString();
          } catch (e) {
            return value;
          }
        }
        return value.toString();
      }
      return result.toString();
    }
    
    // Common Dojo response patterns
    if (queryResult?.data) {
      // Case 1: {data: [balance_value]}
      if (Array.isArray(queryResult.data) && queryResult.data.length > 0) {
        return queryResult.data[0].toString();
      }
      // Case 2: {data: {balance: value}} or {data: balance_value}
      if (typeof queryResult.data === 'object') {
        if (queryResult.data.balance !== undefined) {
          return queryResult.data.balance.toString();
        }
        // Try to get first value from object
        const values = Object.values(queryResult.data);
        if (values.length > 0) {
          return values[0].toString();
        }
      }
      // Case 3: direct value in data
      return queryResult.data.toString();
    }
    
    // Case 4: Array response [balance_value]
    if (Array.isArray(queryResult) && queryResult.length > 0) {
      return queryResult[0].toString();
    }
    
    // Case 5: Object with balance property
    if (queryResult?.balance !== undefined) {
      return queryResult.balance.toString();
    }
    
    // Case 6: Hex string values (common in Starknet)
    if (typeof queryResult === 'object' && queryResult) {
      const keys = Object.keys(queryResult);
      if (keys.length === 1) {
        const value = queryResult[keys[0]];
        if (typeof value === 'string' && value.startsWith('0x')) {
          // Convert hex to decimal
          try {
            return parseInt(value, 16).toString();
          } catch (e) {
            return value;
          }
        }
        return value.toString();
      }
    }
    
    return `Unable to parse: ${typeof queryResult}`;
  };

  return (
    <Card className="mt-4 border-2 border-blue-500 bg-blue-50 dark:bg-blue-950">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center space-x-2">
          <Search className="h-4 w-4 text-blue-500" />
          <span>Call Result</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {selectedAction.id === 'balance_of' && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">EVLT Token Balance:</div>
              <div className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                {parseBalance(queryResult)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Address: {formData.account}
              </div>
            </div>
          )}
          
          {/* Generic result display for other query types */}
          {selectedAction.id !== 'balance_of' && (
            <div>
              <div className="text-sm text-muted-foreground mb-2">Result:</div>
              <div className="font-mono text-lg font-bold text-blue-600 dark:text-blue-400">
                {parseBalance(queryResult)}
              </div>
            </div>
          )}
          
          {/* Raw result for debugging */}
          <details className="mt-4" open>
            <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
              Raw Response (Debug) - PLEASE EXPAND
            </summary>
            <div className="mt-2 space-y-2">
              <div className="text-xs">
                <strong>Type:</strong> {typeof queryResult}
              </div>
              <div className="text-xs">
                <strong>Keys:</strong> {queryResult && typeof queryResult === 'object' ? Object.keys(queryResult).join(', ') : 'N/A'}
              </div>
              <pre className="p-3 bg-muted rounded text-xs overflow-auto max-h-64">
                {JSON.stringify(queryResult, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  );
}