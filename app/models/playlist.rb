class Playlist < ApplicationRecord
    validates :title, :mood, presence: true, length: {maximum: 30}

    belongs_to :user
    has_many :playlist_songs, -> {order(:order)}, dependent: :delete_all
    has_many :songs, through: :playlist_songs

    def username
        self.user.username
    end
end
