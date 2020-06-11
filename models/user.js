module.exports = app => {
    
    const store = (username, password, name) => {
        return new Promise((resolve, reject) => {
            app.db('user')
                .insert({
                    username,
                    password,
                    name
                })
                .then(resp => {
					resolve(resp)
				})
				.catch(err => {
					reject(err)
				})
        })
    }

    const show = (username, password) => {
        return new Promise((resolve, reject) => {
            app.db('user')
                .select('name')
                .where({
                    username,
                    password
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
        show
    }
}