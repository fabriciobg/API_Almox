module.exports = app => {

	const cadastrarItem = async (req, res) => {
		const { nome } = req.body

		if (!nome) {
			console.log({ message: 'Nome do item não informado' })
			res.statusMessage = 'Nome do item nao informado'
			return res.status(500).json({ message: 'Nome do item não informado' })
		}

		app.models.item.isThisRegistered(nome)
			.then(resp => {
				if (!resp) {
					
					app.models.item.store(nome)
						.then(resp => {
							console.log({ message: 'Item cadastrado com sucesso' })
							return res.status(200).json(resp)
						})
						.catch(err => {
							console.log({ message: 'Erro ao tentar cadastrar produto', err })
							res.statusMessage = 'Erro ao tentar cadastrar produto'
							return res.status(500).json({ message: 'Erro ao tentar cadastrar produto' })
						})
				} else {
					console.log({ message: 'Item já cadastrado na base de dados' })
					res.statusMessage = 'Item ja cadastrado na base de dados'
					return res.status(400).json({ message: 'Item já cadastrado na base de dados' })
				}
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar verificar item na base de dados', err })
				res.statusMessage = 'Erro ao tentar verificar item na base de dados'
				return res.status(500).json({ message: 'Erro ao tentar verificar item na base de dados' })
			})

	}

	const buscarItems = async (req, res) => {
		app.models.item.index()
			.then(resp => {
				console.log({ message: 'Listando items' })
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar listar items', err })
				res.statusMessage = 'Erro ao tentar listar items'
				return res.status(500).json({ message: 'Erro ao tentar listar items' })
			})
	}

	const editarItem = async (req, res) => {
		const { id, nome } = req.body
		
		if (!id) {
			console.log({ message: 'ID do item não informado' })
			res.statusMessage = 'ID do item nao informado'
			return res.status(500).json({ message: 'ID do item não informado' })
		}
		
		if (!nome) {
			console.log({ message: 'Nome do item não informado' })
			res.statusMessage = 'Nome do item nao informado'
			return res.status(500).json({ message: 'Nome do item não informado' })
		}

		app.models.item.update(id, nome)
			.then(resp => {
				console.log({ message: 'Item modificado com sucesso' })
				res.statusMessage = 'Item modificado com sucesso'
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar modificar item' })
				res.statusMessage = 'Erro ao tentar modificar item'
				return res.status(500).json({ message: 'Erro ao tentar modificar item' })
			})
	}

	return {
		cadastrarItem,
		buscarItems,
		editarItem
	}
}