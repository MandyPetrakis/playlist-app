class PlaylistsController < ApplicationController

    def index
        if params[:user_id]
            user = User.find(params[:user_id])
            playlists = user.playlists
            render json: playlists, include: :songs, status: :ok
        else
            playlists = Playlist.all
            render json: playlists, status: :ok
        end
    end

    def show
        playlist = Playlist.find(params[:id])
        render json: playlist, status: :ok
    end

    def create
        playlist = Playlist.create!(playlist_params)
        render json: playlist, status: :created
    end

    def update
        playlist = Playlist.find(params[:id])
        plalist.update!(playlist_params)
        render json: playlist, status: :accepted 
    end

    def destroy
        playlist = Playlist.find(params[:id])
        playlist.destroy
        head :no_content
    end

    private

    def playlist_params
        params.permit(:user_id, :title, :mood, :length)
    end
end
