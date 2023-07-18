class PlaylistsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found

    def index
        playlists = Playlist.all
        render json: playlists
    end

    def show
        playlist = Playlist.find(params[:id])
        render json: playlist
    end

    def create
        playlist = Playlist.create!(playlist_params)
    end

    private

    def render_record_not_found
        render json: { error: "Playlist not found"}, status: :not_found
    end
end
