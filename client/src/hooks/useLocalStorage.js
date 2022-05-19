import { useState } from 'react';


function useLocalStorage(key, initialValue) {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const itemStoraged = window.sessionStorage.getItem(key)
            return itemStoraged ? JSON.parse(itemStoraged) : initialValue
        }
        catch (error) {
            return initialValue
        }
    })


    const storeNewValue = (newValue) => {
        try {

            setStoredValue(newValue)
            window.sessionStorage.setItem(key, JSON.stringify(newValue))

        } catch (error) {
            console.log(error)
        }
    }

    const removeValue = (initialValue) => {
        try {
            setStoredValue(initialValue)
            window.sessionStorage.removeItem(key)

        } catch (error) {
            console.log(error)
        }
    }


    return [storedValue, storeNewValue, removeValue]


}

export default useLocalStorage