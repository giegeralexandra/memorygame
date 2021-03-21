class GamesController < ApplicationController

    def index
        games = Game.all 
        render json: games 
    end

    def new 
        
    end

    def create 
        game = Game.create(start_time: Time.now, score: 0, turns: 0)
        binding.pry 
        render json: game
    end

    def show 
        render json: game 
    end

    def delete
    end

end
