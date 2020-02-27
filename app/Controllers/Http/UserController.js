'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')



class UserController {
  async register({ request, session, response }) {
    const rules = {
      email: 'required|email|unique:users,email',
      password: 'required'
    }
    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])
      return response.redirect('back')
    }
    else {
      const { email, password } = request.all()

      const user = await User.create({
        email,
        password,
        username: email
      })

      return user
    }
    


  }
  async login({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }


}

module.exports = UserController
