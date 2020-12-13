class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find_by(id: params[:id])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = trainer.pokemons.build(nickname: name , species: species)
            pokemon.save
            render json: pokemon
        else 
            render json: {message: "This team is already full"}
        end 
    end 

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: pokemon
    end

end

