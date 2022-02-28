const getGeocoding = async (address, callback) => {
	try {
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
			address
		)}.json?access_token=pk.eyJ1IjoiZ3VzdmlhbmFkZXYiLCJhIjoiY2t3Z21zYWd5MHExdjJ2bnM3ZGo0c3J3ZSJ9.2cFREHLhN0u8HJgjRchYgA`
		const res = await fetch(url)

		if (res.ok) {
			const data = await res.json()
			const place = data.features[0]
			const [lng, lat] = place.center

			callback(null, { location: place.place_name, lat, lng })
		} else {
			throw new Error('Geocoding not found')
		}
	} catch (err) {
		callback(err)
	}
}

export default getGeocoding
