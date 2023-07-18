class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :title, :mood, :length, :last_edited
  has_many :songs
end
