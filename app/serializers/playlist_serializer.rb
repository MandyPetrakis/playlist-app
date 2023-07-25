class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :title, :mood, :length, :last_edited, :user_id
  has_many :songs
   has_many :playlist_songs
end
