class PlaylistsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]

    def index
        if params[:user_id]
            user = User.find(params[:user_id])
            playlists = user.playlists
            render json: playlists, status: :ok
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
        playlist.update!(playlist_params)
        render json: playlist, status: :accepted 
    end

    def destroy
        playlist = Playlist.find(params[:id])
        playlist.destroy
        playlists = Playlist.all
        render json: playlists
    end

    private

    def authorize
        if params[:user_id]
        return render json: [error: "Not Authorized"], status: :unauthorized unless session[:user_id] === params[:user_id]
        else  
        playlist = Playlist.find(params[:id])
        return render json: [error: "Not Authorized"], status: :unauthorized unless session[:user_id] === playlist.user_id
        end
    end

    def playlist_params
        params.permit(:user_id, :title, :mood, :length)
    end
end
