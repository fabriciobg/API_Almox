module.exports = app => {

    const index = () => {
        return new Promise((resolve, reject) => {
            app.db('items')
                .select('nome')
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

    const store = nome => {
        return new Promise((resolve, reject) => {
            app.db('items')
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
            app.db('items')
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

    return {
        index,
        store,
        isThisRegistered
    }
}