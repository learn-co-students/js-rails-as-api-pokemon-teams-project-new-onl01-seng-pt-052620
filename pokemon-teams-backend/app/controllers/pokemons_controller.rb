class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        options = {
            include: [:trainer]
        }
        render json: PokemonSerializer.new(pokemons, options)
    end

    def create 
        # binding.pry
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = trainer.pokemons.build
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.save
        render json: PokemonSerializer.new(pokemon)
    end

    def destroy 
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: PokemonSerializer.new(pokemon)
    end

end
