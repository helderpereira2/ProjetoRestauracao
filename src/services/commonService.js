const backendAPI = require('../backendAPI.json')
export function getAndExecuteCallbackBody(path, afterResponse, onError, authorization = "") {
    if (path == null)
        return null;

    const http = require('http')

    const options = {
        hostname: backendAPI.address,
        port: backendAPI.port,
        path: path,
        method: 'GET',
        headers: {
            'Access-Control-Request-Method': ' GET',
            'Access-Control-Request-Headers': 'Content - Type, Authorization',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + authorization
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
        throw error
    })

    req.end()
}

export function getAndExecuteCallbackBodyPaged(path, afterResponse, onError,page,responses) {
    if (path == null)
        return null;

    let separator=path.includes('?')?"&":"?"

    getAndExecuteCallbackBody(path+separator+"page="+page,(res)=>{
        var parsed=JSON.parse(res)
        if(parsed==="stop"){
            afterResponse(responses)
        }else{
            responses.push(parsed)
            getAndExecuteCallbackBodyPaged(path, afterResponse, onError,page+1,responses)
        }
        
        },onError)
}

export function getWithBodyAndExecuteCallbackBody(path, body, afterResponse, onError) {
    const http = require('http')
    const data = body
    const options = {
        hostname: backendAPI.address,
        port: backendAPI.port,
        path: path,
        method: 'POST',
        headers: {
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type,Authorization',
            'Content-Type': 'application/json',
            'Content-Length': data.length
        },
        insecureHTTPParser: true

    }

    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            if (res.statusCode >= 400) {
                onError()
            }
            else
                afterResponse(body);
        });
    })

    req.on('error', error => {
        onError()
    })

    req.write(data)
    req.end()

}