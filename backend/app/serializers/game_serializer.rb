class GameSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :score, :start_time, :end_time, :turns
  
    belongs_to :user
end