class TrainersController < ApplicationController

    def show
        trainer = Trainer.find_by(id: params[:id])
        render json: TrainerSerializer.new(trainer)
    end 

    def index
        trainers = Trainer.all
        options = {
            include: [:pokemons]
        }
        render json: TrainerSerializer.new(trainers, options)
    end 
end
