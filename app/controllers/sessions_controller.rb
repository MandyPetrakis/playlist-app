class SessionsController < ApplicationController
#    skip_before_action :authorized, only: :create

    def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user,status: :created
        else
            render json: {errors: ["Invalid email or password"]}, status: :unprocessable_entity
        end

    end


    def destroy
        if session[:user_id]
            session.delete :user_id
            head :no_content
        else 
            render json: { error: ["Not logged in"]}, status: :unauthorized
        end
    end

end