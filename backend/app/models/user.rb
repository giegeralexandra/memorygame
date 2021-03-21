class User < ApplicationRecord
    has_many :games

    def highest_score 
        score = self.games.min{|a,b| a.score <=> b.score}
        if !score
            return 0 
        else 
            return score 
        end
    end

end
