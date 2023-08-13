class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :length, :image
end
