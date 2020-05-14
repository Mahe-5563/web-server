console.log('Client side javascript file is loaded!')

let address = "Chennai";



const weatherForm = document.querySelector('form');
const locatio = document.querySelector('input');
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault();
    address = locatio.value;

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`http://localhost:8002/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = JSON.stringify(data.Location);
                message2.textContent = JSON.stringify(data.Forecast);
            }
        })
    })

})



