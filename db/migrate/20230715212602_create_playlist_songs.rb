class CreatePlaylistSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :playlist_songs do |t|
      t.integer :playlist_id
      t.integer :song_id
      t.integer :order

      t.timestamps
    end
  end
end
