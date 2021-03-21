class User < ApplicationRecord
    has_many :games

    def highest_score 
        return self.games.min{|a,b| a.score <=> b.score}
    end

end
