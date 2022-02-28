import express from 'express'
import path from 'path'
import './globalThis.js'
import hbs from 'hbs'
import getGeocoding from './utils/getGeocoding.js'
import getWeather from './utils/getWeather.js'

const app = express()
const publicDirPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Gustavo Viana',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Gustavo Viana',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Gustavo Viana',
		helpText: 'This is some helpful text',
	})
})

app.get('/weather', (req, res) => {
	const { address } = req.query

	if (!address) {
		res.send({
			error: 'You must provide an address.',
		})
	} else {
		getGeocoding(address, (errGeocoding, { location, lat, lng }) => {
			if (!errGeocoding) {
				getWeather(
					[lat, lng],
					(
						errWeather,
						{ temperature, feelsLike, weather_descriptions }
					) => {
						if (!errWeather) {
							res.send({
								address: req.query.address,
								location,
								forecast: weather_descriptions[0],
								temperature,
								feelsLike,
							})
						} else {
							res.send({
								error: errWeather,
							})
						}
					}
				)
			} else {
				res.send({
					error: errGeocoding,
				})
			}
		})
	}
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		errorMessage: 'Help article not found',
		name: 'Gustavo Viana',
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Error 404',
		errorMessage: 'Page not found.',
		name: 'Gustavo Viana',
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
})
