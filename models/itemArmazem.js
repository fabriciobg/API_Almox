const moment = require('moment')

module.exports = app => {

    const store = data => {
        return new Promise((resolve, reject) => {
            app.db('item_armazem')
                .insert(data)
                .returning('*')
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    const index = id_armazem => {
        return new Promise((resolve, reject) => {
            app.db('item_armazem as ia')
                .join('item', 'item.id', 'ia.id_item')
                .select('ia.id', 'ia.id_armazem', 'ia.id_item', 'item.nome', 'ia.quantidade', 'ia.grandeza')
                .where({
                    'ia.id_armazem': id_armazem,
                    'ia.deleted_at': null
                })
                .orderBy('item.nome')
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    const get = (id_armazem, id_item) => {
        return new Promise((resolve, reject) => {
            app.db('item_armazem as ia')
                .join('item', 'item.id', 'ia.id_item')
                .select('ia.id', 'ia.id_item', 'item.nome', 'ia.quantidade', 'ia.grandeza')
                .where({
                    'ia.id_item': id_armazem,
                    'ia.id_item': id_item,
                    'ia.deleted_at': null
                })
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    const update = data => {
		return new Promise((resolve, reject) => {
			app.db('item_armazem')
				.where({
					id: data.id
				})
				.update({
					...data,
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
    
    const deleteItemArmazem = id => {
		return new Promise((resolve, reject) => {
			app.db('item_armazem')
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
        index,
        get,
        update,
        deleteItemArmazem
    }
}