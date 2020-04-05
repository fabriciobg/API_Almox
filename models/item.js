const moment = require('moment')

module.exports = app => {

	const store = nome => {
		return new Promise((resolve, reject) => {
			app.db('item')
				.returning('*')
				.insert({
					nome: nome.toUpperCase()
				})
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
			app.db('item')
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
			app.db('item')
				.select('id', 'nome')
				.where({
					deleted_at: null
				})
				.orderBy('nome')
				.then(resp => {
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
		})
	}

	const get = nome => {
		return new Promise((resolve, reject) => {
			app.db('item')
				.select('id', 'nome')
				.where({
					nome: nome.toUpperCase(),
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
			app.db('item')
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

	const deleteItem = id => {
		return new Promise((resolve, reject) => {
			app.db('item')
				.where({
					id
				})
				.update({
					deleted_at: moment().format()
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
		get,
		update,
		deleteItem
	}
}