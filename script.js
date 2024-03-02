
let apiKey = "7199233926e144ba89a183428242902"

// Получаем нужные элементы на странице ---
const header = document.querySelector('.header');
const form = document.querySelector('.form');
const input = document.querySelector('.input');

// Слушаем отправку формы ---
form.onsubmit = function (e) {
    // Отменяем отправку формы ---
    e.preventDefault();

    // Берем значения из input, обрезаем пробелы (trim() не обязательно) ---
    let city = input.value.trim();

    // console.log(city)

    // Делаем запрос на сервер ---
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;


    // Выполняем запрос ---
    fetch(url)
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(data);

            // Проверка на ошибки
            if (data.error) {
                // Если есть ошибка, выводим ошибку

                // Удаляем предыдущую карточку
                let prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();


                // Отобразить карточку с ошибкой
                const html = `<div class="card">${data.error.message}</div>`

                // Отображаем карточку на странице
                header.insertAdjacentHTML('afterend', html);

            } else {
                // Если нет ошибки, выводим карточку

                // Отображаем полученные данные в карточке

                // Удаляем предыдущую карточку
                let prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();


                // Разметка для карточки

                let html = `  <div class="card">
            <div class="card-city">${data.location.name} <span>${data.location.country}</span></div>
    
            <div class="card-weather">
                <div class="card-value">${data.current.temp_c}<sup>℃</sup> </div>
                <img class="card-img" src="img/weather.png" alt="">
            </div>
    
            <div class="card-description">${data.current.condition.text} </div>
        </div>
                        `

                // Отображаем карточку на странице
                header.insertAdjacentHTML('afterend', html)
            }
        })
}



