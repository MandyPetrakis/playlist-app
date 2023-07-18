class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :length
end
