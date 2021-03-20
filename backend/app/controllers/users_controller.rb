class UsersController < ApplicationController

    def index
        users = User.all
        render json: users 
    end

    def new 
    end

    def create
        user = User.find_or_create_by(username: user_params[:username])
        if user.save 
            new = Game.create(user_id: user.id, start_time: Time.now, score: 0)
            # binding.pry
            # render json: game
        end
    end

    private 
    def user_params
        params.require(:user).permit(:username)
    end

    
end
