class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :title, :mood, :length, :user_id, :username, :image
  has_many :playlist_songs
end
