class SongsController < ApplicationController


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
        song.length = "3:32"
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

    def song_params
        params.permit(:title, :artist, :length)
    end


end
