class UsersController < ApplicationController

    def index
        users = User.all
        render json: users 
    end

    def new 
    end

    def create
        binding.pry
    end
    
end