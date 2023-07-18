class CreatePlaylists < ActiveRecord::Migration[6.1]
  def change
    create_table :playlists do |t|
      t.string :title
      t.string :mood
      t.time :length
      t.datetime :last_edited
      t.integer :user_id

      t.timestamps
    end
  end
end
