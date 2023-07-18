class SongsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

    def index
        songs = Song.all
        render json: songs, status: :ok
    end

    def show
        song = Song.find(params[:id])
        render json: song, status: :ok
    end

    def create 
        song = Song.create!(song_params)
        render json: song, status: :created
    end

    def update
        song = Song.find(params[:id])
        song.update(song_params)
        render json: song, status: :accepted
    end

    def destroy
        song = Song.find(params[:id])
        song.destroy
        head :no_content
    end

    private 

    def render_record_not_found
        render json: { error: "Song not found"}, status: :not_found
    end

    def render_record_invalid(e)
        render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
    end

    def song_params
        params.permit(:title, :artist, :length)
    end


end
