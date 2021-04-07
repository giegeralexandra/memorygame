class Game < ApplicationRecord
    belongs_to :user


    def final_score 
        (self.end_time - self.start_time)
    end
end

