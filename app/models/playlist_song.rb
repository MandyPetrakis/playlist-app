class PlaylistSong < ApplicationRecord
    validates_associated :playlist, :song
    
    belongs_to :playlist
    belongs_to :song
    has_one :user, through: :playlist

def song_title
    title = Song.find(self.song_id).title
    title
end

end
