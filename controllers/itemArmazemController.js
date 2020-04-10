module.exports = app => {

    const cadastrarItemArmazem = async (req, res) => {
        const { id_armazem, id_item, quantidade, grandeza } = req.body

        if(!id_armazem || !id_item || !quantidade || !grandeza) {
            console.log({ message: 'ID armazem, ID item, quantidade e/ou gradeza não informados' })
            res.statusMessage = 'ID armazem, ID item, quantidade e/ou gradeza nao informados'
            return res.status(500).json({ message: 'ID armazem, ID item, quantidade e/ou gradeza não informados' })
        }

        await app.models.itemArmazem.store({ id_armazem, id_item, quantidade, grandeza })
            .then(resp => {
                console.log({ message: 'Item cadastrado com sucesso no armazém' })
                return res.status(200).json(resp)
            })
            .catch(err => {
                console.log({ message: 'Erro ao tentar cadastrar item no armazém', err })
                res.statusMessage = 'Erro ao tentar cadastrar item no armazem'
                return res.status(500).json({ message: 'Erro ao tentar cadastrar item no armazém' })
            })
    }

    const buscarItensArmazem = async (req, res) => {
        const { id_armazem } = req.body

        if(!id_armazem) {
            console.log({ message: 'ID armazem não informado' })
            res.statusMessage = 'ID armazem nao informado'
            return res.status(500).json({ message: 'ID armazem não informado' })
        }

        await app.models.itemArmazem.index(id_armazem)
            .then(resp => {
                console.log({ message: 'Listando itens do armazém' })
                return res.status(200).json(resp)
            })
            .catch(err => {
                console.log({ message: 'Erro ao tentar buscar itens do armazém', err })
                res.statusMessage = 'Erro ao tentar buscar itens do armazem'
                return res.status(500).json({ message: 'Erro ao tentar buscar itens do armazém' })
            })
    }

    const buscarItemArmazem = async (req, res) => {
        const { id_armazem } = req.body
        const { id_item } = req.params

        if(!id_armazem || !id_item) {
            console.log({ message: 'ID armazem ou ID item não informados' })
            res.statusMessage = 'ID armazem ou ID item nao informados'
            return res.status(500).json({ message: 'ID armazem ou ID item não informados' })
        }

        await app.models.itemArmazem.get(id_armazem, id_item)
            .then(resp => {
                console.log({ message: 'Listando item do armazém' })
                return res.status(200).json(resp)
            })
            .catch(err => {
                console.log({ message: 'Erro ao tentar buscar item do armazém', err })
                res.statusMessage = 'Erro ao tentar buscar item do armazem'
                return res.status(500).json({ message: 'Erro ao tentar buscar item do armazém' })
            })
    }

    const editarItemArmazem = async (req, res) => {
        const { id, id_item, quantidade, grandeza } = req.body

        if(!id || !id_item || !quantidade || !grandeza) {
            console.log({ message: 'ID, ID item, quantidade e/ou grandeza não informados' })
            res.statusMessage = 'ID armazem, ID item, quantidade e/ou grandeza nao informados'
            return res.status(500).json({ message: 'ID armazem, ID item, quantidade e/ou gradeza não informados' })
        }

        await app.models.itemArmazem.update({ id, id_item, quantidade, grandeza })
            .then(resp => {
                console.log({ message: 'Item do armazém modificado com sucesso' })
                return res.status(200).json(resp)
            })
            .catch(err => {
                console.log({ message: 'Erro ao tentar modificar item do armazém', err })
                res.statusMessage = 'Erro ao tentar modificar item do armazem'
                return res.status(500).json({ message: 'Erro ao tentar modificar item do armazém' })
            })

    }

    const deletarItemArmazem = async (req, res) => {
		const { id } = req.body

		if (!id) {
			console.log({ message: 'ID do item não informado' })
			res.statusMessage = 'ID do item nao informado'
			return res.status(500).json({ message: 'ID do item não informado' })
		}

		await app.models.itemArmazem.deleteItemArmazem(id)
			.then(resp => {
				console.log({ message: 'Item deletado do armazém com sucesso' })
				res.statusMessage = 'Item deletado do armazem com sucesso'
				return res.status(200).json(resp)
			})
			.catch(err => {
				console.log({ message: 'Erro ao tentar deletar item do armazém' })
				res.statusMessage = 'Erro ao tentar deletar item do armazem'
				return res.status(500).json({ message: 'Erro ao tentar deletar item do armazém' })
			})
	}

    return {
        cadastrarItemArmazem,
        buscarItensArmazem,
        buscarItemArmazem,
        editarItemArmazem,
        deletarItemArmazem
    }
}