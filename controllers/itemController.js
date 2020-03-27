module.exports = app => {

    const cadastrarItem = async (req, res) => {
        const { nome } = req.body

        if (!nome) {
            console.log({ message: 'Nome do item não informado' })
            res.statusMessage = 'Nome do item nao informado'
            return res.status(500).json({ message: 'Nome do item não informado' })
        }

        // checar se o item já está cadastrado no banco
        app.models.item.isThisRegistered(nome)
            .then(resp => {
                if (!resp) {
                    // cadastrando novo item
                    app.models.item.store(nome)
                        .then(resp => {
                            console.log({ message: 'Item cadastrado com sucesso' })
                            return res.status(200).json(resp)
                        })
                        .catch(err => {
                            console.log({ message: 'Erro ao tentar cadastrar produto', err })
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
                res.status(500).json({ message: 'Erro ao tentar verificar item na base de dados' })
            })

    }

    const buscarItems = async (req, res) => {
        console.log('lalal')
        app.models.item.index()
            .then(resp => {
                console.log({ message: 'Listando items' })
                res.status(200).json(resp)
            })
            .catch(err => {
                console.log({ message: 'Erro ao tentar listar items', err })
                res.statusMessage = 'Erro ao tentar listar items'
                res.status(500).json({ message: 'Erro ao tentar listar items' })
            })
    }

    return {
        cadastrarItem,
        buscarItems
    }
}