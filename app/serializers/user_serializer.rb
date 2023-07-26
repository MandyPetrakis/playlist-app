class UserSerializer < ActiveModel::Serializer
  attributes :id,  :image, :username, :email, :first_name, :member_since, :mood_list, :liked_songs
  has_many :playlists
end
