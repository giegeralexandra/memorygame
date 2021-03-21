class Game < ApplicationRecord
    belongs_to :user

    def final_score
    (self.end_time - self.start_time)
    end

    def self.highest_score 
        Game.all.min{|a,b| a.score <=> b.score}
    end


end

