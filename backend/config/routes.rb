Rails.application.routes.draw do
  post 'authenticate', to: 'authentication#authenticate'

  post 'user/sign_up', to: 'user#sign_up'

  post 'product/:id', to: 'product#attach_photo'

  post 'product/:user_id/create', to: 'product#create'

  get 'get_all_products', to: 'product#get_products'
  get 'get_all_dimensions', to: 'product#get_total_dimensions'

  post 'add_data_to_database', to: 'product#add_data_to_database'
  get 'get_collections', to: 'colection#get'
  get 'collection/:id', to: 'colection#get_products'
end
