class PlaylistSongsController < ApplicationController
    def show
        playlist_songs = PlaylistSong.find(params[:id])
        render json: playlist_songs
    end
end
