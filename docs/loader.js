const DEVELOPERS_URL = 'https://raw.githubusercontent.com/lucascassiano/serdigital/master/developers.json';

let registeredListeners = [];

let registeredOnFiltersChanges = [];
let selectedFilters = [];

const OnLoadData = (callback) => {
    registeredListeners.push(callback);
}

const OnChangeFilters = (callback) => {
    registeredOnFiltersChanges.push(callback);
}

const _onChangedFilters = (filters) => {
    selectedFilters = filters;

    for (var i in registeredOnFiltersChanges) {
        registeredOnFiltersChanges[i](selectedFilters);
    }
}
const LoadData = (callback, url = DEVELOPERS_URL) => {
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        console.log(request.response);
        let response = request.response;
        let developers = response.developers;
        console.log("developers", developers);
        if (callback)
            callback(developers);

        for (var i in registeredListeners) {
            registeredListeners[i](developers);
        }
    }
}

