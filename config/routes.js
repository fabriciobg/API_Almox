module.exports = app => {

    /** Rotas item */
    app.route('/item/register')
        .post(app.controllers.itemController.cadastrarItem)

    app.route('/item/list')
        .get(app.controllers.itemController.buscarItems)

    app.route('/item/list/:nome')
        .get(app.controllers.itemController.buscarItem)

    app.route('/item/update')
        .put(app.controllers.itemController.editarItem)

    app.route('/item/delete')
        .put(app.controllers.itemController.deletarItem)

    /** Rotas armazém */
    app.route('/armazem/register')
        .post(app.controllers.armazemController.cadastrarArmazem)

    app.route('/armazem/list')
        .get(app.controllers.armazemController.buscarArmazens)

    app.route('/armazem/list/:nome')
        .get(app.controllers.armazemController.buscarArmazem)

    app.route('/armazem/update')
        .put(app.controllers.armazemController.editarArmazem)

    app.route('/armazem/delete')
        .put(app.controllers.armazemController.deletarArmazem)

    /** Rotas item armazém */
    app.route('/item/armazem/register')
        .post(app.controllers.itemArmazemController.cadastrarItemArmazem)

    app.route('/item/armazem/list')
        .get(app.controllers.itemArmazemController.buscarItensArmazem)

    app.route('/item/armazem/list/:id_item')
        .get(app.controllers.itemArmazemController.buscarItemArmazem)

    app.route('/item/armazem/update')
        .put(app.controllers.itemArmazemController.editarItemArmazem)

    app.route('/item/armazem/delete')
        .put(app.controllers.itemArmazemController.deletarItemArmazem)

}