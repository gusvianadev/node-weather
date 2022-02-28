;(function () {
	'use strict'

	document.addEventListener('DOMContentLoaded', function () {
		const searchWeatherForm = document.querySelector('form')
		const search = searchWeatherForm.querySelector('input')

		const getWeather = async (place) => {
			try {
				const res = await fetch(
					`http://localhost:3000/weather?address=${place}`
				)

				if (res.ok) {
					const data = await res.json()
					const forecast = document.querySelector('#forecast')
					const forecastLocation = forecast.querySelector('h2')
					const forecastText = forecast.querySelector('span')

					forecastLocation.innerText = data.location
					forecastText.innerText = data.forecast
				}
			} catch (err) {
				console.log(err)
			}
		}

		searchWeatherForm.onsubmit = (ev) => {
			ev.preventDefault()

			const place = search.value

			getWeather(place)
		}
	}) // DOM CONTENT LOADED //
})()
