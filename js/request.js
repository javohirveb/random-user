// api
const API = 'https://randomuser.me/api/?results=9'

// for leader
const overlay = document.getElementById('overlay')

// toggle loader
const loaderToggle = (toggle) => {
    if (toggle) {
        overlay.classList.remove('hidden')
    } else {
        overlay.classList.add('hidden')
    }
}

//request promise

const getData = (resource) => {
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest()

        request.addEventListener('readystatechange', () => {
            if (request.readyState < 4) {
                loaderToggle(true)
            } else if (request.readyState == 4 && request.status == 200) {
                const data = JSON.parse(request.responseText)
                resolve(data.results)
                loaderToggle(false)
            } else if (request.request == 4) {
                reject('Error !!!')
                loaderToggle(false)
            }
        })

        request.open('GET', resource)
        request.send()
    })
}

// load
const reload = () => {
    getData(API).then((data) => {
            updateUI(data)
        }).catch((err) => {
            console.log(err)
        })
}

document.addEventListener('DOMContentLoaded', reload)