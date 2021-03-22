class GamesController < ApplicationController

    def index
        games = Game.all 
        render json: games 
    end

    def new 
        
    end

    def create  
        game = Game.create(user_id: game_params[:user_id], start_time: Time.now)
        # binding.pry 
        render json: game
    end

    def show 
        game = Game.find_by(id: params[:id])
        render json: game 
    end

    def edit 
    end

    def update
        game = Game.find_by(id: params[:id])
        # binding.pry 
        game.end_time = game_params[:end_time]
        game.score = game.final_score
        game.save
        # binding.pry
        render json: game 
    end


    def delete
    end

    private 
    
    def game_params
        params.require(:game).permit(:user_id, :id, :score, :start_time, :end_time)
    end


end
