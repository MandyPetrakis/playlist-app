class Playlist < ApplicationRecord
    validates :title, :mood, presence: true
    validates_associated :users

    belongs_to :user
    has_many :playlist_songs, dependent: :destroy
    has_many :songs, through: :playlist_songs

end
