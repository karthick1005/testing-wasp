// ⚛️ REACT HOOKS: Import React state and effect management
import { useEffect, useState } from 'react';

// 📝 TYPE DEFINITIONS: Generic type for setter function values
type SetValue<T> = T | ((val: T) => T);

/**
 * 🗃️ LOCAL STORAGE HOOK: Persistent state management with localStorage
 * 🔧 TEMPLATE USAGE: Essential hook for client-side data persistence
 * 
 * Key features:
 * - Automatic localStorage synchronization
 * - Type-safe generic implementation
 * - Error handling for localStorage access
 * - useState-compatible API
 * - JSON serialization/deserialization
 * - SSR-safe initialization
 * 
 * Usage:
 * const [value, setValue] = useLocalStorage('key', 'defaultValue')
 * setValue('newValue') // Automatically saves to localStorage
 * setValue(prev => prev + 1) // Functional updates supported
 */
function useLocalStorage<T>(
  key: string, // 🔧 CHANGE: localStorage key name
  initialValue: T // 🔧 CHANGE: Default value when no stored value exists
): [T, (value: SetValue<T>) => void] {
  
  // 📦 PERSISTENT STATE: Initialize state from localStorage or default value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // 🔍 RETRIEVE FROM STORAGE: Get from local storage by key
      const item = window.localStorage.getItem(key);
      // 🔄 PARSE STORED DATA: Parse stored JSON or return initialValue if none
      return item ? JSON.parse(item) : initialValue;
      // 🔧 CHANGE: Add custom parsing logic for complex data types
    } catch (error) {
      // 🚨 ERROR HANDLING: If error occurs, return initialValue
      console.log(error);
      // 🔧 CHANGE: Add custom error handling (analytics, notifications, etc.)
      return initialValue;
    }
  });

  // 💾 STORAGE SYNCHRONIZATION: Update localStorage when state changes
  useEffect(() => {
    try {
      // 🔄 FUNCTIONAL UPDATE SUPPORT: Allow value to be a function so we have same API as useState
      const valueToStore =
        typeof storedValue === 'function'
          ? storedValue(storedValue) // Execute function with current value
          : storedValue; // Use value directly
      
      // 💾 SAVE TO STORAGE: Serialize and save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // 🔧 CHANGE: Add custom serialization for complex objects
      // 🔧 CHANGE: Add compression for large data
      // 🔧 CHANGE: Add encryption for sensitive data
    } catch (error) {
      // 🚨 STORAGE ERROR HANDLING: Handle localStorage quota exceeded, disabled, etc.
      console.log(error);
      // 🔧 CHANGE: Implement fallback storage mechanisms:
      // - sessionStorage fallback
      // - In-memory storage fallback
      // - IndexedDB for larger data
      // - Server-side storage sync
    }
  }, [key, storedValue]); // Re-run when key or value changes

  // 📤 RETURN HOOK INTERFACE: Provide state and setter function
  return [storedValue, setStoredValue];
  // Returns tuple: [currentValue, setValueFunction]
}

export default useLocalStorage;

// 🔧 TEMPLATE EXTENSION IDEAS:
// - Add storage event listeners for cross-tab synchronization
// - Implement storage versioning for data migrations
// - Add TTL (time-to-live) support for auto-expiring data
// - Create typed variants for common use cases (theme, user preferences, etc.)
// - Add storage quota monitoring and cleanup
