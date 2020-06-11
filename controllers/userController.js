module.exports = app => {

    const cadastrarUsuario = async (req, res) => {
        const { username, password, name } = req.body

        if (!username) {
            console.log({ message: 'Username não informado' })
            res.statusMessage = 'Username nao informado'
            return res.status(500).json({ message: 'Username não informado' })
        }

        if (!password) {
            console.log({ message: 'Password não informado' })
            res.statusMessage = 'Password nao informado'
            return res.status(500).json({ message: 'Password não informado' })
        }

        if (!name) {
            console.log({ message: 'Nome não informado' })
            res.statusMessage = 'Nome nao informado'
            return res.status(500).json({ message: 'Nome não informado' })
        }

        await app.models.user.store(username, password, name)
            .then(() => {
                console.log({ message: 'Usuário cadastrado com sucesso' })
                res.statusMessage = 'Usuario cadastrado com sucesso'
                return res.status(200).json({ message: 'Usuário cadastrado com sucesso' })
            })
            .catch(error => {
                console.log({ message: 'Erro ao tentar cadastrar usuário' })
                res.statusMessage = 'Erro ao tentar cadastrar usuario'
                return res.status(500).json({ message: 'Erro ao tentar cadastrar usuário', error })
            })
    }

    const checkLogin = async (req, res) => {
        const { username, password } = req.body

        if (!username) {
            console.log({ message: 'Username não informado' })
            res.statusMessage = 'Username nao informado'
            return res.status(500).json({ message: 'Username não informado' })
        }

        if (!password) {
            console.log({ message: 'Password não informado' })
            res.statusMessage = 'Password nao informado'
            return res.status(500).json({ message: 'Password não informado' })
        }

        await app.models.user.show(username, password)
            .then((resp) => {
                if (resp.length === 1) {
                    console.log({ message: `${resp[0].name} autenticado com sucesso!` })
                    res.statusMessage = `${resp[0].name} autenticado com sucesso!`
                    return res.status(200).json(resp)
                } else {
                    console.log({ message: 'Login ou senha incorretos' })
                    res.statusMessage = `Login ou senha incorretos`
                    return res.status(404).json({ message: `Login ou senha incorretos` })
                }
            })
            .catch(error => {
                console.log({ message: 'Erro ao tentar cadastrar usuário' })
                res.statusMessage = 'Erro ao tentar cadastrar usuario'
                return res.status(500).json({ message: 'Erro ao tentar cadastrar usuário', error })
            })

    }

    return {
        cadastrarUsuario,
        checkLogin
    }
}