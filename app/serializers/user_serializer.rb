class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name
  has_many :playlists
end
