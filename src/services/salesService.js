const backendAPI = require('../backendAPI.json')
const http = require('http')
import { getAndExecuteCallbackBody } from './commonService'

export function getSales(afterResponse, onError) {
    getAndExecuteCallbackBody(backendAPI.sales.getAllSales, afterResponse, onError, localStorage.getItem("authenticationToken"))
}

export function getSaleProducts(saleId, afterResponse, onError){
    getAndExecuteCallbackBody(backendAPI.sales.saleProducts + "?saleId=" + saleId, afterResponse, onError, localStorage.getItem("authenticationToken"))
}

export function getProductSales(product, initialPeriod, finalPeriod, afterResponse, onError){
    let getQuery = "?product=" + product
    if(initialPeriod){
        getQuery += "&initialPeriod=" + initialPeriod
    }
    if(finalPeriod){
        getQuery += "&finalPeriod=" + finalPeriod
    }

    getAndExecuteCallbackBody(backendAPI.sales.productSales + getQuery, afterResponse, onError, localStorage.getItem("authenticationToken"))
}

export function getProductSalesAndForecast(product, initialPeriod, finalPeriod, afterResponse, onError){
    let getQuery = "?product=" + product
    if(initialPeriod){
        getQuery += "&initialPeriod=" + initialPeriod
    }
    if(finalPeriod){
        getQuery += "&finalPeriod=" + finalPeriod
    }

    getAndExecuteCallbackBody(backendAPI.sales.productSalesAndForecast + getQuery, afterResponse, onError, localStorage.getItem("authenticationToken"))
}


