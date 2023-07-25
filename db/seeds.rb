300.times do
    Song.create(title: Faker::Book.title, artist: Faker::Music.band, length: "3:45")
end

10.times do
    User.create(
        username: Faker::Internet.username, email: Faker::Internet.email, 
        first_name: Faker::Name.first_name, password: "user"
    )
end

60.times do
    Playlist.create(
        title: Faker::Hipster.word, 
        mood: Faker::Emotion.noun, 
        user_id: Faker::Number.between(
            from: 1, 
            to: 10)
    )
end

900.times do
    PlaylistSong.create(playlist_id: Faker::Number.between(from: 1, to: 50), song_id: Faker::Number.between(from: 1, to: 300), order: Faker::Number.digit)
end

puts "seed complete"