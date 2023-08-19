class ApplicationController < ActionController::API
  include ActionController::Cookies

rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid
private


  def render_record_not_found
    render json: {errors: ["Not found"]}, status: :not_found
end

def render_record_invalid(e)
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
end

end
