Rails.application.routes.draw do
  post 'authenticate', to: 'authentication#authenticate'

  post 'user/sign_up', to: 'user#sign_up'

  post 'product/:id', to: 'product#attach_photo'

  post 'product/:user_id/create', to: 'product#create'

  get 'products', to: 'product#get_random_products'

  get 'ads_products', to: 'product#get_gre'

  get 'get_money', to: 'user#get_funds'

  post 'cart/:product_id', to: 'cart#add_to_cart'
  post 'pay/cart', to: 'cart#pay_cart'
  post 'drop/cart', to: 'cart#drop_cart'
  post 'add_funds', to: 'user#add_funds'
  get 'paginates/products', to: 'product#get'

  get 'category/products', to: 'product#get_category_numbers'
  get 'random_products', to: 'product#get_random_from_categorys'

  post 'delete_cart/:product_id', to: 'cart#remove_from_cart'

  get 'get_cart', to: 'cart#get_cart'

  post 'add_to_favorite', to: 'favorite#create'
  get 'get_favorites', to: 'favorite#get'
end
