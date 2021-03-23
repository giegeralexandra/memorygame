class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :user_id
      t.integer :score
      t.datetime  :start_time
      t.datetime :end_time
      t.integer :turns

      t.timestamps
    end
  end
end

