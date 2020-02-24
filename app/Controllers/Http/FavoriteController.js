'use strict'

const Favorite = use ('App/Models/Favorite')
const AuthorizationService = use('App/Services/AuthorizationService')

class FavoriteController {
  async index({ auth }) {
    const user = await auth.getUser()
    return await user.favorites().fetch()
  }

  async create({ request, auth }) {
    const user = await auth.getUser()
    const { imdbID, Title, Poster, Year, Type  } = request.all()
    console.log(imdbID)
    const favorite = new Favorite()
    favorite.fill({
      imdbID, Title, Poster, Year, Type
    })
    await user.favorites().save(favorite)
    return request.all()
  }

  async destroy({ auth, response, params }) {
    const user = await auth.getUser()
    const { id } = params
    const favorite = await Favorite.find(id)
    AuthorizationService.verifyPermission(favorite, user)
    await favorite.delete()
    return favorite
  }
}

module.exports = FavoriteController
