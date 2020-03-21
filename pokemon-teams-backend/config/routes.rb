Rails.application.routes.draw do
  resources :pokemons
  resources :trainers
  patch '/pokemons/:id', to: "pokemons#update"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
