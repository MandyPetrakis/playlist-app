class PlaylistSongsController < ApplicationController
before_action :authorize
skip_before_action :authorize, only: [:index,:show]

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
            playlist = Playlist.find(params[:playlist_id])
            render json: playlist, status: :created

        end
    end

    def update
        playlist_song = PlaylistSong.find(params[:id])
        playlist_song.update(playlist_song_params)
        render json: playlist_song, status: :ok
    end

    def destroy
        playlist_song.destroy
        playlist = Playlist.find(playlist_song.playlist_id)
        render json: playlist
    end
private

def playlist_song_params
    params.permit(:playlist_id, :song_id, :order, :user_id)
end

def authorize
    if params[:id]
        playlist_song = PlaylistSong.find(params[:id])
        return render json: [error: "Not Authorized"], status: :unauthorized unless session[:user_id] === playlist_song.user_id
    else
        playlist = Playlist.find(params[:playlist_id])
    return render json: [error: "Not Authorized"], status: :unauthorized unless session[:user_id] === playlist.user_id

    end
end


end
