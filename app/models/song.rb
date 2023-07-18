class Song < ApplicationRecord
    validates :title, :artist, :length, presence: true

    has_many :playlist_songs, dependent: :destroy
    has_many :playlists, through: :playlist_songs
end
