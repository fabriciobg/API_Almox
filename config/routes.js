module.exports = app => {

    /** Rotas item */
    app.route('/item/register')
        .post(app.controllers.itemController.cadastrarItem)

    app.route('/item/list')
        .get(app.controllers.itemController.buscarItems)

    app.route('/item/update')
        .put(app.controllers.itemController.editarItem)

    /** Rotas almoxarifado */
    app.route('/almoxarifado/register')
        .post(app.controllers.almoxarifadoController.cadastrarAlmoxarifado)

    app.route('/almoxarifado/list')
        .get(app.controllers.almoxarifadoController.buscarAlmoxarifados)

    app.route('/almoxarifado/update')
        .put(app.controllers.almoxarifadoController.editarAlmoxarifado)

}