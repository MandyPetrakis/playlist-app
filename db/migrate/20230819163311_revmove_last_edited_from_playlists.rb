class RevmoveLastEditedFromPlaylists < ActiveRecord::Migration[6.1]
  def change
    remove_column :playlists, :last_edited
  end
end
