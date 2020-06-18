/*
    Private Method
*/
const __getOptions = (method, body = null) => {
    const headers = new Headers();

    let options = {
        method,
        mode: 'cors',
        cache: 'default',
        headers
    }

    if(body) options.body = JSON.stringify(body) //Adds body to option
    return options;
}


export const GET = (URL = "", body = null, callback) => {
    fetch(URL, __getOptions('GET', body))
    .then(response => response.json())
    .then(json => callback(json))
}
