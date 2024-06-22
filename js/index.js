
const inputSearch = document.querySelector('#inputSearch');
const btnSearch = document.querySelector('.search-btn');
const rowData = document.querySelector('#rowData');

async function getData(city){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f4e995a976c14d2f926170626241906&q=${city}&days=3`);
    let data = await response.json();
    console.log(data);
    DisplayData(data);
}
 getData('cairo');

btnSearch.addEventListener('click',function(){
    let city = inputSearch.value;
    getData(city)
    clearInp();
})

function convertDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];

    const formattedDate = `${day}${month}`;

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayNames[date.getDay()];

    return { formattedDate, dayOfWeek };
}

function DisplayData(object){

    const { formattedDate: formattedDate1, dayOfWeek: dayOfWeek1 } = convertDate(object.forecast.forecastday[0].date);
            const { formattedDate: formattedDate2, dayOfWeek: dayOfWeek2 } = convertDate(object.forecast.forecastday[1].date);
            const { formattedDate: formattedDate3, dayOfWeek: dayOfWeek3 } = convertDate(object.forecast.forecastday[2].date);

    let cartona = `<div class="col-md-4">
                    <div class="prime prime-bg text-muted-2">
                        <div class="d-flex justify-content-between prime-nav-bg pt-1 ">
                            <div class="day p-2">${dayOfWeek1}</div>
                            <div class="day p-2">${formattedDate1}</div>
                        </div>
                        <div class="p-3 pb-0">
                            <h4 class="text-capitalize location">${object.location.name}</h4>
                            <h2 class="text-white deg fw-bolder my-3">${object.current.temp_c}&deg;C</h2>
                            <img src="${'https:' + object.current.condition.icon}" alt="sun or moon icon" class="w-25">
                            <p class="temp text-capitalize">${object.current.condition.text}</p>
                        </div>
                        <div class="d-flex p-4 pt-0 ">
                            <div>
                                <img src="Weather/icon-umberella@2x.png" alt="" class="w-25">
                                <span>20%</span>
                            </div>
                            <div>
                                <img src="Weather/icon-wind@2x.png" alt="" class="w-25">
                                <span>${object.current.wind_kph}km/h</span>
                            </div>
                            <div>
                                <img src="Weather/icon-compass@2x.png" alt="" class="w-25">
                                <span>East</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="sec text-center text-capitalize text-muted-2 pb-5">
                        <div class="day nav-bg p-2">
                            ${dayOfWeek2}
                        </div>
                        <div class="p-5">
                            <img src="${'https:' + object.forecast.forecastday[1].day.condition.icon}" class="">
                            <h2 class="text-white  fw-bold mt-3 fs-3" >${object.forecast.forecastday[1].day.maxtemp_c}&deg;C</h2>
                            <p>${object.forecast.forecastday[1].day.mintemp_c}&deg;C</p>
                            <p class="temp">${object.forecast.forecastday[1].day.condition.text}</p>
                        </div>

                    </div>
                </div>
                <div class="col-md-4">
                    <div class=" thi text-center text-capitalize text-muted-2 pb-5  prime-bg">
                        <div class="day prime-nav-bg p-2">
                           ${dayOfWeek3}
                        </div>
                        <div class="p-5">
                            <img src="${'https:' + object.forecast.forecastday[2].day.condition.icon}" alt="sun" class="">
                            <h2 class="text-white  fw-bold mt-3 fs-3" >${object.forecast.forecastday[2].day.maxtemp_c}&deg;C</h2>
                            <p>${object.forecast.forecastday[2].day.mintemp_c}&deg;C</p>
                            <p class="temp">${object.forecast.forecastday[2].day.condition.text}</p>
                        </div>

                    </div>
                </div>`
            document.getElementById('rowData').innerHTML = cartona;
}

function clearInp(){
    inputSearch.value = null;
}
