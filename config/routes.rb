Rails.application.routes.draw do
  resources :rooms
  resources :users
  #action cable server
  mount ActionCable.server => "/cable"
  resources :messages
  post '/users/sign_in', to: 'users#sign_in'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
