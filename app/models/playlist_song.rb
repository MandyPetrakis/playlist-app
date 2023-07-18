class PlaylistSong < ApplicationRecord
    belongs_to :playlist
    belongs_to :song
    has_one :user, through: :playlist
end
