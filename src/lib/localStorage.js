
const saveToLocal = (key, itemToSet) => localStorage.setItem(key, JSON.stringify(itemToSet))

function loadFromLocal (key) {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        console.error(error.message)
    }
}

export { saveToLocal, loadFromLocal }