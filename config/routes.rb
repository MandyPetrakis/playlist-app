Rails.application.routes.draw do
  
  resources :songs

  resources :playlist_songs

  resources :playlists

  resources :users

  resources :users, only: [:show] do
    resources :playlists, only: [:show, :index]
  end

  get '/email', to: 'users#email'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "/me", to: "users#logged_in"
  





  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
