/* Crear, Consultar, Eliminar */

export function saveLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
export function getLocalStorage(key) {
    let data = JSON.parse(localStorage.getItem(key))
    return data
}
export function removeLocalStorage(key) {
    localStorage.removeItem(key)
}