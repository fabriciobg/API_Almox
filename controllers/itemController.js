module.exports = app => {

	const cadastrarItem = async (req, res) => {
		const { nome } = req.body

		if (!nome) {
			console.log({ message: 'Nome do item não informado' })
			res.statusMessage = 'Nome do item nao informado'
			return res.status(500).json({ message: 'Nome do item não informado' })
		}

		await app.models.item.store(nome)
			.then(resp => {
				console.log({ message: 'Item cadastrado com sucesso' })
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar cadastrar produto', err })
				res.statusMessage = 'Erro ao tentar cadastrar produto'
				return res.status(500).json({ message: 'Erro ao tentar cadastrar produto' })
			})

	}

	const buscarItems = async (req, res) => {
		await app.models.item.index()
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

	const buscarItem = async (req, res) => {
		const { nome } = req.params
		
		if(!nome) {
			console.log({ message: 'Nome do item não informado' })
			res.statusMessage = 'Nome do item nao informado'
			return res.status(500).json({ message: 'Nome do item não informado' })
		}

		await app.models.item.get(nome)
			.then(resp => {
				console.log({ message: 'Listando item' })
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar listar item', err })
				res.statusMessage = 'Erro ao tentar listar item'
				return res.status(500).json({ message: 'Erro ao tentar listar item' })
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

		await app.models.item.update(id, nome)
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

	const deletarItem = async (req, res) => {
		const { id } = req.body

		if(!id) {
			console.log({ message: 'ID do item não informado' })
			res.statusMessage = 'ID do item nao informado'
			return res.status(500).json({ message: 'ID do item não informado' })
		}

		await app.models.item.deleteItem(id)
			.then(resp => {
				console.log({ message: 'Item deletado com sucesso' })
				res.statusMessage = 'Item deletado com sucesso'
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar deletar item' })
				res.statusMessage = 'Erro ao tentar deletar item'
				return res.status(500).json({ message: 'Erro ao tentar deletar item' })
			})
	}

	return {
		cadastrarItem,
		buscarItems,
		buscarItem,
		editarItem,
		deletarItem
	}
}