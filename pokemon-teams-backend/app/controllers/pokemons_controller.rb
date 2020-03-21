class PokemonsController < ApplicationController

    def index 
        pokemon = Pokemon.all 
        render json: PokemonSerializer.new(pokemon)
    end

    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end
end
