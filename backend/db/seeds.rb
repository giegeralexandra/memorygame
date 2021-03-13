# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: "algieg")
User.create(username: "augieg")
Game.create(user_id: 1, score: 45, turns: 16)
Game.create(user_id: 2, score: 65, turns: 12)