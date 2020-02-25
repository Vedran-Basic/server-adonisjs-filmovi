'use strict'

const User = use('App/Models/User')



class UserController {
async register({ request, response }) {
    const { email, password } = request.all()
    const usersTable = query.User
    if(usersTable)
    const user = await User.create({
      email,
      password,
      username: email 
    })
    console.log(email, password)
    return user


  }
  async login({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }


}

module.exports = UserController
