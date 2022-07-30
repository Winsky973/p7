export function getItem(item) {
    window.localStorage.getItem(item)
}

export function removeItem(item) {
    window.localStorage.removeItem(item)
}

export function setItem(localStorageName, item) {
    window.localStorage.setItem(localStorageName, item)
}