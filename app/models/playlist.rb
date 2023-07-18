class Playlist < ApplicationRecord
    validates :title, :mood, presence: true, length: {maximum: 30}
    validates_associated :user

    belongs_to :user
    has_many :playlist_songs, dependent: :destroy
    has_many :songs, through: :playlist_songs
end
