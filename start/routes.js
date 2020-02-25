'use strict'

const Route = use('Route')

Route.get('/', 'UserController.register')

Route.group(() => {
  
  Route.post('auth/register', 'UserController.register')
  Route.post('auth/login', 'UserController.login')

  Route.get('favorites', 'FavoriteController.index').middleware('auth')
  Route.post('favorites', 'FavoriteController.create').middleware('auth')
  Route.delete('favorites/:id', 'FavoriteController.destroy').middleware('auth')
}).prefix('api')

