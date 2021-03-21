class GamesController < ApplicationController

    def index
        games = Game.all 
        render json: games 
    end

    def new 
        
    end

    def create  
        game = Game.create(user_id: game_params[:user_id], score: 0, start_time: Time.now)
        binding.pry 
        render json: game
    end

    def show 
        render json: game 
    end

    def delete
    end

    private 
    
    def game_params
        params.require(:game).permit(:user_id, :score, :id, :start_time)
    end


end
