class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :first_name, :member_since
  has_many :playlists
end
