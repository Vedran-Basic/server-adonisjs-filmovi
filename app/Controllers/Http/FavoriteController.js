'use strict'

const Favorite = use ('App/Models/Favorite')

class FavoriteController {
  async index({ auth }) {
    const user = await auth.getUser()
    return await user.favorites().fetch()
  }

  async create({ request, auth }) {
    const user = await auth.getUser()
    const { imdbID } = request.all()
    console.log(imdbID)
    const favorite = new Favorite()
    favorite.fill({
      imdbID
    })
    await user.favorites().save(favorite)
    return request.all()
  }

  async destroy({ auth, request, params }) {
    const user = await auth.getUser()
    const { id } = params
    const favorite = await Favorite.find(id)
    if (favorite.user_id !== user.id) {
      return response.status(403)
    }
    await favorite.delete()
    return favorite
  }
}

module.exports = FavoriteController
