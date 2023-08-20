images = [
"https://picsum.photos/id/10/200",
"https://picsum.photos/id/11/200",
"https://picsum.photos/id/21/200",
"https://picsum.photos/id/22/200",
"https://picsum.photos/id/26/200",
"https://picsum.photos/id/27/200",
"https://picsum.photos/id/29/200",
"https://picsum.photos/id/33/200",
"https://picsum.photos/id/34/200",
"https://picsum.photos/id/36/200",
"https://picsum.photos/id/37/200",
"https://picsum.photos/id/38/200",
"https://picsum.photos/id/39/200",
"https://picsum.photos/id/40/200",
"https://picsum.photos/id/43/200",
"https://picsum.photos/id/44/200",
"https://picsum.photos/id/45/200",
"https://picsum.photos/id/46/200",
"https://picsum.photos/id/47/200",
"https://picsum.photos/id/49/200",
"https://picsum.photos/id/50/200",
"https://picsum.photos/id/51/200",
"https://picsum.photos/id/52/200",
"https://picsum.photos/id/53/200",
"https://picsum.photos/id/54/200",
"https://picsum.photos/id/55/200",
"https://picsum.photos/id/59/200",
"https://picsum.photos/id/69/200",
"https://picsum.photos/id/70/200",
"https://picsum.photos/id/71/200",
"https://picsum.photos/id/81/200",
"https://picsum.photos/id/91/200",
"https://picsum.photos/id/101/200",
"https://picsum.photos/id/132/200",
"https://picsum.photos/id/123/200",
"https://picsum.photos/id/142/200",
"https://picsum.photos/id/176/200",
"https://picsum.photos/id/102/200",
"https://picsum.photos/id/103/200",
"https://picsum.photos/id/104/200",
"https://picsum.photos/id/110/200",
"https://picsum.photos/id/406/200",
"https://picsum.photos/id/107/200",
"https://picsum.photos/id/108/200",
"https://picsum.photos/id/130/200",
"https://picsum.photos/id/338/200",
"https://picsum.photos/id/348/200",
"https://picsum.photos/id/1048/200",
"https://picsum.photos/id/1038/200",
"https://picsum.photos/id/508/200",
"https://picsum.photos/id/194/200",
"https://picsum.photos/id/348/200",
"https://picsum.photos/id/150/200",
"https://picsum.photos/id/428/200",
"https://picsum.photos/id/568/200",
"https://picsum.photos/id/238/200",
"https://picsum.photos/id/678/200",
"https://picsum.photos/id/190/200",
"https://picsum.photos/id/552/200",
"https://picsum.photos/id/578/200",
"https://picsum.photos/id/433/200",
"https://picsum.photos/id/155/200",
"https://picsum.photos/id/765/200",
"https://picsum.photos/id/785/200",
"https://picsum.photos/id/732/200",
"https://picsum.photos/id/846/200",
"https://picsum.photos/id/822/200",
"https://picsum.photos/id/458/200",
"https://picsum.photos/id/902/200",
"https://picsum.photos/id/842/200",
"https://picsum.photos/id/492/200",
"https://picsum.photos/id/296/200",
"https://picsum.photos/id/247/200",
"https://picsum.photos/id/411/200",
"https://picsum.photos/id/305/200",
"https://picsum.photos/id/530/200",
"https://picsum.photos/id/403/200",
"https://picsum.photos/id/230/200",
"https://picsum.photos/id/302/200",
"https://picsum.photos/id/306/200",
"https://picsum.photos/id/354/200",
"https://picsum.photos/id/320/200",
"https://picsum.photos/id/358/200",
"https://picsum.photos/id/428/200",
"https://picsum.photos/id/583/200",
"https://picsum.photos/id/453/200",
"https://picsum.photos/id/235/200",
"https://picsum.photos/id/593/200",
"https://picsum.photos/id/439/200",
]

300.times do
    Song.create(title: Faker::Book.title, artist: Faker::Music.band, length: "3:45", image: images.sample)
end



10.times do
    User.create(
        username: Faker::Internet.username, email: Faker::Internet.email, 
        first_name: Faker::Name.first_name, password: "user", image: Faker::Avatar.image
    )
end

60.times do
    Playlist.create(
        title: Faker::Hipster.word, 
        mood: Faker::Emotion.noun,
        image: images.sample,
        user_id: Faker::Number.between(
            from: 1, 
            to: 10)
    )
end

900.times do
    PlaylistSong.create(playlist_id: Faker::Number.between(from: 1, to: 50), song_id: Faker::Number.between(from: 1, to:300), order: Faker::Number.digit)
end

puts "seed complete"