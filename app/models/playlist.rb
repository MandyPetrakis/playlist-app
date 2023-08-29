class Playlist < ApplicationRecord
    validates :title, :mood, presence: true, length: {maximum: 30}

    belongs_to :user
    has_many :playlist_songs, -> {order(:order)}, dependent: :delete_all
    has_many :songs, through: :playlist_songs

    def username
        self.user.username
    end

    def length
        songs = self.songs 
       lengths = songs.collect {|s| s.length }
    #    lengths.each(|l| )
    # split by : > ["3", "30"]
    # split[0].to_i x 60 + split[1].to_i
    # sum 
    end

end
