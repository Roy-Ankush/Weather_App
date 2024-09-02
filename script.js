



let cityname=$(".weather_city")

let date_time=$(".date_time")

let forecast=$(".forecast")

let weather_icon=$(".weather_icon")

let temp=$(".temperature")

let minvalue=$(".weather_min")

let maxvalue=$(".weather_max")

let feels_like=$(".data")
let humidity=$(".data1")
let Wind=$(".data2")
let pressure=$(".data3")


//getting latitide and longitude of a input city
// let city_name
// let longitude;
// let latitude;
// let cname;


//this will change country code to it's actual name
let getcountruname=(code)=>{
  return  new Intl.DisplayNames([code], { type: 'region' }).of(code);
}


// this block of code is for date formatting
let getdatetime=(seconds)=>{
    const date = new Date(seconds * 1000);

    const option={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric"
    }
    const formatter=new Intl.DateTimeFormat('en-US',option)

    return formatter.format(date);
}


let getweatherdata= async  (latitude,longitude)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=74a669eb5f7bf46448d1d02b6a02815f`
try {
    let response= await fetch(url)
    let result= await response.json();

    const {weather, main, name,wind, sys, dt }=result;
    cityname.html(`${name},${getcountruname(sys.country)}`);
    date_time.html(getdatetime(dt))
    forecast.html(`${weather[0].main}`)
    weather_icon.html(`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`)

    temp.html(`${main.temp} &#176F`)
    minvalue.html(`${main.temp_min} &#176F`)
    maxvalue.html(`${main.temp_max} &#176F`)

    feels_like.html(`${main.feels_like} &#176F`)
    humidity.html(`${main.humidity}%`)
    pressure.html(`${main.pressure} pa`)
    Wind.html(`${wind.speed} m/s`)
} catch (error) {
    console.log(error)
}
}





city_name="Patna";
let getlocation= async ()=>{
    // city_name=$("#city").val()
    const url=`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=74a669eb5f7bf46448d1d02b6a02815f`

   try {
       let response= await fetch(url)
       let data= await response.json();
    
       cname=data[0].name;
    
       latitude=data[0].lat;
    
       longitude=data[0].lon;
   } catch (error) {
     console.log(error)
   }
//    $("#city").val("")
   getweatherdata(latitude,longitude);
}



    $(".forms").submit((event)=>{
        event.preventDefault();
        city_name=$("#city").val()
        getlocation()
        $("#city").val("")
    })


document.body.addEventListener("load",getlocation())



