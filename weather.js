// Weather Class
class Weather {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.units = 'imperial'
    this.zip = ''
    this.cityName = ''
    this.coords = []
    this.error = null
  }

  /**
   * @param {String} unit
   */
  set setUnits(unit) {
    const userUnitIput = unit.toLowerCase().trim()
    if (userUnitIput !== 'metric' || userUnitIput !== 'imperial') return Error('You must use imperial or metric for your choice of unit.')
    else this.units = userUnitIput
  }

  /**
   * @param {String} zip
   */
  set setZip(zip) {
    const userZipInput = zip.toLowerCase().trim()
    if (userZipInput.length !== 5) return Error('You must enter a valid zip code.')
    else this.zip = userZipInput
  }

  /**
  * @param {String} city
  */
  set setCity(city) {
    const userCityInput = city.toLowerCase().trim()
    this.cityName = userCityInput
  }

  /**
  * @param {String} coords
  */
  set setCoords(coords) {
    const userCoordsInput = coords.split(' ')
    this.coords = userCoordsInput
  }

  getWeatherByZip = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${this.zip}&appid=${this.apiKey}&units=${this.units}`
    const res = await fetch(url)
    if (res.ok) return await res.json()
    else throw Error('Invalid Zip Code')
  }

  getWeatherByCity = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.apiKey}&units=${this.units}`
    const res = await fetch(url)
    if (res.ok) return await res.json()
    else throw Error('Invalid City Name')
  }

  getWeatherByGeoCordinates = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.coords[0]}&lon=${this.coords[1]}&appid=${this.apiKey}&units=${this.units}`
    const res = await fetch(url)
    if (res.ok) return await res.json()
    else throw Error('Invalid Coordinates')
  }
}



// Get Element refererences
const tempEl = document.getElementById('temp')
const errorEl = document.getElementById('error')
const descEl = document.getElementById('desc')
const zipFormEl = document.getElementById('zipForm')
const cityFormEl = document.getElementById('cityForm')
const geoFormEl = document.getElementById('geoForm')

const zipInput = document.getElementById('zip')
const cityInput = document.getElementById('city')
const geoInput = document.getElementById('latlong')

const w = new Weather('bcf569f4749306c69b6a92f459d7853c')

// Define event listeners
zipFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  w.setZip = zipInput.value
  w.getWeatherByZip()
    .then(info => {
      console.log(info)
      tempEl.innerHTML = info.main.temp
      descEl.innerHTML = info.weather[0].description
      errorEl.innerHTML = ""
    })
    .catch((err) => errorEl.innerHTML = err.message)
})

cityFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  w.setCity = cityInput.value
  w.getWeatherByCity()
    .then(info => {
      tempEl.innerHTML = info.main.temp
      descEl.innerHTML = info.weather[0].description
      errorEl.innerHTML = ""
    })
    .catch((err) => errorEl.innerHTML = err.message)
})

geoFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  w.setCoords = geoInput.value
  w.getWeatherByGeoCordinates()
    .then(info => {
      tempEl.innerHTML = info.main.temp
      descEl.innerHTML = info.weather[0].description
      errorEl.innerHTML = ""
    })
    .catch((err) => errorEl.innerHTML = err.message)
})


