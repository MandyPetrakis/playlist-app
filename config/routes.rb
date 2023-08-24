Rails.application.routes.draw do
  
  resources :songs

  resources :playlist_songs

  resources :playlists

  resources :users


  get '/email', to: 'users#email'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "/me", to: "users#logged_in"
  get "/user/playlists", to: "users#playlists"





  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
