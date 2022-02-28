const getWeather = async ([lat, lng], callback) => {
	try {
		const url = `http://api.weatherstack.com/current?access_key=ab31bd444c836f28ac87046323661ff1&query=${lat},${lng}`
		const res = await fetch(url)

		if (res.ok) {
			const data = await res.json()
			const { temperature, feelslike, weather_descriptions } =
				data.current

			callback(null, { temperature, feelslike, weather_descriptions })
		} else {
			throw new Error('Weather not found')
		}
	} catch (err) {
		callback(err)
	}
}

export default getWeather
