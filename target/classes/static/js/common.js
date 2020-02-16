var storage = {
    isLocalStorage: function () {
        if (window.localStorage) {
            return true;
        } else {
            alert("浏览器不支持localstorage");
            return false;
        }
    },
    sets: function (key, value) {
        if (this.isLocalStorage) {
            window.sessionStorage.setItem(key, value);
        }
    },
    gets: function (key) {
        if (this.isLocalStorage) {
            return window.sessionStorage.getItem(key);
        }
    },
    removes: function (key) {
        if (this.isLocalStorage) {
            window.sessionStorage.removeItem(key);
        }
    },
    clears: function () {
        if (this.isLocalStorage) {
            window.sessionStorage.clear();
        }
    },
    setl: function (key, value) {
        if (this.isLocalStorage) {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    },
    getl: function (key) {
        if (this.isLocalStorage) {
            return JSON.stringify(window.localStorage.getItem(key));
        }
    },
    removel: function (key) {
        if (this.isLocalStorage) {
            window.localStorage.removeItem(key);
        }
    },
    clearl: function () {
        if (this.isLocalStorage) {
            window.localStorage.clear();
        }
    }
}