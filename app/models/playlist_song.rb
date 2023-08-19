class PlaylistSong < ApplicationRecord
    validates_associated :playlist, :song
    
    belongs_to :playlist
    belongs_to :song
    has_one :user, through: :playlist

def song_title
    title = Song.find(self.song_id).title
    title
end

def song_artist
    artist = Song.find(self.song_id).artist
    artist
end

def song_length
    length = Song.find(self.song_id).length
    length
end

def song_image 
    image = Song.find(self.song_id).image
    image
end
def user_id
    user_id = self.user.id
    user_id
end

end
