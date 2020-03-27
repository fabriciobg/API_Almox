const moment = require('moment')

module.exports = app => {

	const store = nome => {
		return new Promise((resolve, reject) => {
			app.db('almoxarifado')
				.insert({
					nome: nome.toUpperCase()
				})
				.returning('*')
				.then(resp => {
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	const isThisRegistered = nome => {
		return new Promise((resolve, reject) => {
			app.db('almoxarifado')
				.where({
					nome: nome.toUpperCase(),
					deleted_at: null
				})
				.first()
				.then(resp => {
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	const index = () => {
		return new Promise((resolve, reject) => {
			app.db('almoxarifado')
				.select('id', 'nome')
				.where({
					deleted_at: null
				})
				.then(resp => {
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	const update = (id, nome) => {
		return new Promise((resolve, reject) => {
			app.db('almoxarifado')
				.where({
					id
				})
				.update({
					nome: nome.toUpperCase(),
					updated_at: moment().format()
				})
				.then(resp => {
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	return {
		store,
		isThisRegistered,
		index,
		update,
	}
}