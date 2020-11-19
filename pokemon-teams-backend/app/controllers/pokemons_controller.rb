class PokemonsController < ApplicationController
  require 'faker'

  def create
    puts params

    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer: Trainer.find(params[:trainer_id]))
    render json: pokemon, except: [:created_at, :updated_at]
  end

  def destroy
    pokemon = Pokemon.find(params[:pokemon_id])
    render json: pokemon
    pokemon.destroy
  end
end
