class PlaylistSongsController < ApplicationController
    def index
        playlist_songs = PlaylistSong.all 
        render json: playlist_songs, status: :ok
    end
    
    def show
        playlist_songs = PlaylistSong.find(params[:id])
        render json: playlist_songs, status: :ok
    end

    def create
        playlist_song = PlaylistSong.create!(playlist_song_params)
        render json: playlist_song, status: :created
    end

    def update
        playlist_song = PlaylistSong.find(params[:id])
        playlist_song.update(playlist_songs_params)
        redner json: playlist_song, status: :ok
    end

    def destroy
        playlist_song = PlaylistSong.find(params[:id])
        playlist_song.destroy
        head :no_content
    end
private

def playlist_song_params
    params.permit(:playlist_id, :song_id, :order)
end

    # verify user owns the playlist_song through playlist
end
