const backendAPI = require('../backendAPI.json')
const http = require('http')

export function userSignUp(name, email, password, afterResponse, onError) {

    const data = JSON.stringify({ "restName": name, "email": email, "password": password})

    const options = {
        hostname: backendAPI.address,
        port: backendAPI.port,
        path: backendAPI.users.signUp,
        method: 'POST',
        headers: {
            'Access-Control-Request-Method': ' POST',
            'Access-Control-Request-Headers': 'Content - Type, Authorization',
            'Content-Type': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = http.request(options, res => {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            if (res.statusCode >= 400) {
                onError(body)
            }
            else
                afterResponse(body);
        });
    })


    req.on('error', error => {
        onError(error)
    })

    let i
    for (i = 0; i < data.length; i += 5000000) {
        let im = i + 5000000
        if (im > data.length)
            im = data.length
        req.write(data.substring(i, im))
    }

    req.end()

}

export function userLogin(email, password, afterResponse, onError) {

    const data = JSON.stringify({ "email": email, "password": password})

    const options = {
        hostname: backendAPI.address,
        port: backendAPI.port,
        path: backendAPI.users.login,
        method: 'POST',
        headers: {
            'Access-Control-Request-Method': ' POST',
            'Access-Control-Request-Headers': 'Content - Type, Authorization',
            'Content-Type': 'application/json',
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = http.request(options, res => {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            if (res.statusCode >= 400) {
                onError(body)
            }
            else
                afterResponse(body);
        });
    })


    req.on('error', error => {
        onError(error)
    })

    let i
    for (i = 0; i < data.length; i += 5000000) {
        let im = i + 5000000
        if (im > data.length)
            im = data.length
        req.write(data.substring(i, im))
    }

    req.end()

}

export function userLogout(afterResponse, onError) {

    const options = {
        hostname: backendAPI.address,
        port: backendAPI.port,
        path: backendAPI.users.logout,
        method: 'POST',
        headers: {
            'Access-Control-Request-Method': ' POST',
            'Access-Control-Request-Headers': 'Content - Type, Authorization',
            'Content-Type': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const req = http.request(options, res => {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            if (res.statusCode >= 400) {
                onError(body)
            }
            else
                afterResponse(body);
        });
    })

    req.on('error', error => {
        onError(error)
    })

    req.end()

}

export function renewToken(refreshToken, afterResponse, onError) {

    const options = {
        hostname: backendAPI.address,
        port: backendAPI.port,
        path: backendAPI.users.renewToken,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + refreshToken,
            'Access-Control-Request-Method': ' POST',
            'Access-Control-Request-Headers': 'Content - Type, Authorization',
            'Content-Type': 'application/json',
        }
    }

    const req = http.request(options, res => {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            if (res.statusCode >= 400) {
                onError(body)
            }
            else
                afterResponse(body);
        });
    })

    req.on('error', error => {
        onError(error)
    })

    req.end()

}