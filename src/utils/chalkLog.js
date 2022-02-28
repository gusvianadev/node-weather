import chalk from 'chalk'

const chalkTypes = {
	fail: chalk.red,
	info: chalk.blue,
	success: chalk.green,
	item: chalk.yellow,
	error: chalk.red.inverse,
}

const chalkLog = (type, message) => {
	console.log(chalkTypes[type].bold(message))
}

export default chalkLog
