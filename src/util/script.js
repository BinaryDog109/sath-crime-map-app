/*
 * @Author: Liusong He
 * @Date: 2022-04-26 23:38:17
 * @LastEditTime: 2022-04-27 20:21:11
 * @FilePath: \coursework_git\src\util\script.js
 * @Email: lh2u21@soton.ac.uk
 * @Description: 
 */

import axios from "axios"

export function getProfile(url = '', data = {}) {
    // const response = await fetch(url,{
    //     method:'Post',
    //     headers: {
    //         'Content-Type': 'application/json',

    //        }, 
    //     body:JSON.stringify(data)
    // }).then(response => response.json()).then(responsedata => {
    //     console.log(responsedata)
    // })
    // console.log(response.status)
    // let responsedata = await response.json();

    // fetch(url,{
    //     method:'Post',
    //     headers: {
    //         'Content-Type': 'application/json',
    //        }, 
    //     body:JSON.stringify(data)
    // })
    // .then(response => {
    //     response.json()
    //     console.log('response.json():',response.status)
    // })
    // .then(responsedata => {
    //     console.log('responsedata',responsedata)
    //     return responsedata
    // }).catch(error => {
    //     console.log(error)
    // })

    axios.post(url, {
        "uid": '111111',
    })
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => {
            console.log(error)
        })

}
