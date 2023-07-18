class PlaylistsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

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

    def render_record_not_found
        render json: { error: "Playlist not found"}, status: :not_found
    end

    def render_record_invalid(e)
        render json: { errors: e.record.errors.full_messages}
    end

    def playlist_params
        params.permit(:user_id, :title, :mood, :length)
    end
end
