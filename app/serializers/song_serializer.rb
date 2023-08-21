class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :length, :image
  has_many :playlists, through: :playlist_songs
end
