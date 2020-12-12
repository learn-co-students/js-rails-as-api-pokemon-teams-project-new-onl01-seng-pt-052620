class TrainersController < ApplicationController

    def index
        trainers = Trainer.all

        render json: trainers, include: [:pokemons], except: [:created_at, :updated_at]
        # render json: trainers.to_json(:include => {
        #     :pokemons => {:only => {:id, :species, :nickname, :trainer_id}}
        # }, :except => [:created_at, :updated_at])
    end

end
