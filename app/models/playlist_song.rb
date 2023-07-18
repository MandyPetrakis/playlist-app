class PlaylistSong < ApplicationRecord
    validates_associated :playlist, :song
    
    belongs_to :playlist
    belongs_to :song
    has_one :user, through: :playlist


end
