class AuthenticationController < ApplicationController
    before_action :authenticate_request
    skip_before_action :authenticate_request

    def authenticate
      command = AuthenticateUser.call(params[:email], params[:password])
      if command.success?
        user_type = User.where(email: params[:email]).first.user_type
        render json: { auth_token: command.result, user_type: user_type }
      else
        render json: { error: command.errors }, status: 200
      end
    end
end
