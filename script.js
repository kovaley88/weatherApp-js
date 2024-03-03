import conditions from "./condition.js";
console.log(conditions)

let apiKey = "7199233926e144ba89a183428242902"

// Получаем нужные элементы на странице ---
const header = document.querySelector('.header');
const form = document.querySelector('.form');
const input = document.querySelector('.input');


function removeCard() {
    // Удаляем предыдущую карточку
    let prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function shoeError(errorMessage) {
    // Отобразить карточку с ошибкой
    const html = `<div class="card">${errorMessage}</div>`

    // Отображаем карточку на странице
    header.insertAdjacentHTML('afterend', html);
}

function showCard(name, country, temp_c, condition) {

    // Разметка для карточки

    let html = `  <div class="card">
    <div class="card-city">${name} <span>${country}</span></div>

    <div class="card-weather">
    <div class="card-value">${temp_c}<sup>℃</sup> </div>
    <img class="card-img" src="img/weather.png" alt="">
    </div>

    <div class="card-description">${condition} </div>
    </div>
            `

    // Отображаем карточку на странице
    header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city) {
    // Делаем запрос на сервер ---
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    let respons = await fetch(url);
    const data = await respons.json();
    console.log(data)

    return data
}

// Получаем условия (get condition)


// Слушаем отправку формы ---
form.onsubmit = async function (e) {
    // Отменяем отправку формы ---
    e.preventDefault();

    // Берем значения из input, обрезаем пробелы (trim() не обязательно) ---
    let city = input.value.trim();

    // Получаем данные с сервера 
    const data = await getWeather(city)



    // Проверка на ошибки
    if (data.error) {
        // Если есть ошибка, выводим ошибку
        removeCard();
        shoeError(data.error.message);

    } else {
        // Если нет ошибки, выводим карточку
        // Отображаем полученные данные в карточке

        removeCard();

        const info = conditions.find((obj) => obj.code === data.current.condition.code)
        console.log(info)






        showCard(data.location.name,
            data.location.country,
            data.current.temp_c,
            data.current.condition.text
        )
    }

    // Выполняем запрос ---
    // fetch(url)
    //     .then((response) => { return response.json() })
    //     .then((data) => {
    //         console.log(data);

    //     })

}




// const respons = await fetch("./condition.json")