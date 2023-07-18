class Song < ApplicationRecord
    validates :title, :artist, :length, presence: true, length: {maximum: 300}

    has_many :playlist_songs, dependent: :destroy
    has_many :playlists, through: :playlist_songs
end
