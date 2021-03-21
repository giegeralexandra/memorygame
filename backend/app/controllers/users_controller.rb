class UsersController < ApplicationController

    def index
        users = User.all
        render json: users 
    end

    def show
        user = User.find(user_params[:id])
        render json: user 
    end

    def new
    end

    def create
        user = User.find_or_create_by(username: user_params[:username])
        binding.pry
        render json: user 
    end

    private 
    def user_params
        params.require(:user).permit(:id, :username, :games)
    end

    
end
