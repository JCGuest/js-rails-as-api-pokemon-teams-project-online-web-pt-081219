class PokemonsController < ApplicationController

    def index 
        pokemon = Pokemon.all 
        render json: PokemonSerializer.new(pokemon)
    end

    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def update 
        # byebug
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.update(pokemon_params)
        render json: PokemonSerializer.new(pokemon)
    end

    private 

    def pokemon_params
        params.permit(:trainer_id)
    end
end
