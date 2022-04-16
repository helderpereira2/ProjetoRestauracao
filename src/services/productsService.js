const backendAPI = require('../backendAPI.json')
const http = require('http')
import { getAndExecuteCallbackBody } from './commonService'

export function getAllProducts(afterResponse, onError) {
    getAndExecuteCallbackBody(backendAPI.products.getAllProducts, afterResponse, onError, localStorage.getItem("authenticationToken"))
}


