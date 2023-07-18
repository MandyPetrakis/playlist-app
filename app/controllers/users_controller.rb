class UsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

    def show
        user = User.find(params[:id])
        render json: user
    end

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render json: user, status: :ok
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    def email
        user = User.find_by!(params[:email])
        render json: user, status: :ok
    end
private

def render_record_not_found(e)
    render json: {errors: e.record.erros.full_message}, status: :not_found
end

def render_record_invalid(e)
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
end


def user_params
    params.permit(:username, :email, :first_name, :password, :password_confirmation)
end

end
