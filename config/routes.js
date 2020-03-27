module.exports = app => {

    app.route('/item/register')
        .post(app.controllers.itemController.cadastrarItem)
    
    app.route('/item/list')
        .get(app.controllers.itemController.buscarItems)

}