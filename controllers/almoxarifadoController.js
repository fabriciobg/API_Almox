module.exports = app => {

	const cadastrarAlmoxarifado = async (req, res) => {
		const { nome } = req.body

		if (!nome) {
			console.log({ message: 'Nome do almoxarifado não informado' })
			res.statusMessage = 'Nome do almoxarifado nao informado'
			return res.status(500).json({ message: 'Nome do almoxarifado não informado' })
		}

		app.models.almoxarifado.isThisRegistered(nome)
			.then(resp => {
				if (!resp) {
					app.models.almoxarifado.store(nome)
						.then(resp => {
							console.log({ message: 'Almoxarifado cadastrado com sucesso' })
							return res.status(200).json(resp)
						})
						.catch(err => {
							console.log({ message: 'Erro ao tentar cadastrar almoxarifado', err })
							res.statusMessage = 'Erro ao tentar cadastrar almoxarifado'
							return res.status(500).json({ message: 'Erro ao tentar cadastrar almoxarifado' })
						})
				} else {
					console.log({ message: 'Almoxarifado já cadastrado na base de dados' })
					res.statusMessage = 'Almoxarifado ja cadastrado na base de dados'
					return res.status(400).json({ message: 'Almoxarifado já cadastrado na base de dados' })
				}
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar verificar almoxarifado na base de dados', err })
				res.statusMessage = 'Erro ao tentar verificar almoxarifado na base de dados'
				return res.status(500).json({ message: 'Erro ao tentar verificar almoxarifado na base de dados' })
			})
	}

	const buscarAlmoxarifados = async (req, res) => {
		app.models.almoxarifado.index()
			.then(resp => {
				console.log({ message: 'Listando almoxarifados' })
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar listar almoxarifados', err })
				res.statusMessage = 'Erro ao tentar listar almoxarifados'
				return res.status(500).json({ message: 'Erro ao tentar listar almoxarifados' })
			})
	}

	const editarAlmoxarifado = async (req, res) => {
		const { id, nome } = req.body
		
		if (!id) {
			console.log({ message: 'ID do almoxarifado não informado' })
			res.statusMessage = 'ID do almoxarifado nao informado'
			return res.status(500).json({ message: 'ID do almoxarifado não informado' })
		}
		
		if (!nome) {
			console.log({ message: 'Nome do almoxarifado não informado' })
			res.statusMessage = 'Nome do almoxarifado nao informado'
			return res.status(500).json({ message: 'Nome do almoxarifado não informado' })
		}

		app.models.almoxarifado.update(id, nome)
			.then(resp => {
				console.log({ message: 'Almoxarifado modificado com sucesso' })
				res.statusMessage = 'Almoxarifado modificado com sucesso'
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar modificar almoxarifado' })
				res.statusMessage = 'Erro ao tentar modificar almoxarifado'
				return res.status(500).json({ message: 'Erro ao tentar modificar almoxarifado' })
			})
	}

	return {
		cadastrarAlmoxarifado,
		buscarAlmoxarifados,
		editarAlmoxarifado,
	}
}