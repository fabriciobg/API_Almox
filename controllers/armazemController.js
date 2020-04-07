module.exports = app => {

	const cadastrarArmazem = async (req, res) => {
		const { nome } = req.body

		if (!nome) {
			console.log({ message: 'Nome do armazém não informado' })
			res.statusMessage = 'Nome do armazém nao informado'
			return res.status(500).json({ message: 'Nome do armazém não informado' })
		}

		await app.models.armazem.store(nome)
			.then(resp => {
				console.log({ message: 'Armazém cadastrado com sucesso' })
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar cadastrar armazem', err })
				res.statusMessage = 'Erro ao tentar cadastrar armazem'
				return res.status(500).json({ message: 'Erro ao tentar cadastrar armazem' })
			})
	}

	const buscarArmazens = async (req, res) => {
		await app.models.armazem.index()
			.then(resp => {
				console.log({ message: 'Listando armazens' })
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar listar armazens', err })
				res.statusMessage = 'Erro ao tentar listar armazens'
				return res.status(500).json({ message: 'Erro ao tentar listar armazens' })
			})
	}

	const buscarArmazem = async (req, res) => {
		const { nome } = req.params

		if (!nome) {
			console.log({ message: 'Nome do armazém não informado' })
			res.statusMessage = 'Nome do armazém nao informado'
			return res.status(500).json({ message: 'Nome do armazém não informado' })
		}

		await app.models.armazem.get(nome)
			.then(resp => {
				console.log({ message: 'Listando armazens' })
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar listar armazéns', err })
				res.statusMessage = 'Erro ao tentar listar armazens'
				return res.status(500).json({ message: 'Erro ao tentar listar armazéns' })
			})
	}

	const editarArmazem = async (req, res) => {
		const { id, nome } = req.body

		if (!id) {
			console.log({ message: 'ID do armazem não informado' })
			res.statusMessage = 'ID do armazem nao informado'
			return res.status(500).json({ message: 'ID do armazem não informado' })
		}

		if (!nome) {
			console.log({ message: 'Nome do armazem não informado' })
			res.statusMessage = 'Nome do armazem nao informado'
			return res.status(500).json({ message: 'Nome do armazem não informado' })
		}

		await app.models.armazem.update(id, nome)
			.then(resp => {
				console.log({ message: 'Armazem modificado com sucesso' })
				res.statusMessage = 'Armazem modificado com sucesso'
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar modificar armazém' })
				res.statusMessage = 'Erro ao tentar modificar armazem'
				return res.status(500).json({ message: 'Erro ao tentar modificar armazém' })
			})
	}

	const deletarArmazem = async (req, res) => {
		const { id } = req.body

		if (!id) {
			console.log({ message: 'ID do armazém não informado' })
			res.statusMessage = 'ID do armazem nao informado'
			return res.status(500).json({ message: 'ID do armazém não informado' })
		}

		await app.models.armazem.deleteArmazem(id)
			.then(resp => {
				console.log({ message: 'Armazém deletado com sucesso' })
				res.statusMessage = 'Armazem deletado com sucesso'
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar deletar armazém' })
				res.statusMessage = 'Erro ao tentar deletar armazem'
				return res.status(500).json({ message: 'Erro ao tentar deletar armazém' })
			})
	}

	return {
		cadastrarArmazem,
		buscarArmazens,
		buscarArmazem,
		editarArmazem,
		deletarArmazem
	}
}