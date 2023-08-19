class PlaylistSongSerializer < ActiveModel::Serializer
  attributes :id, :playlist_id, :song_id, :order, :song_title, :song_artist, :song_length, :song_image, :user_id
end
