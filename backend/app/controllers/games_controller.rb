class GamesController < ApplicationController

    def index
        games = Game.all 
        render json: games 
    end

    def new 
        game = Game.new(start_time: time.now, score: 0, turns: 0)
    end

    def create 
    end

    def delete
    end

end
