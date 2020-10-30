class UserController < ApplicationController
    before_action :authenticate_request, except: :sign_up
    before_action :check_params_presence, except: [:add_funds, :get_funds]
    def sign_up
        email = params[:email]
        password = params[:password]
        first_name = params[:first_name]
        last_name = params[:last_name]
        user_type = params[:user_type]
        existing_user = User.where(email: email).first
        if existing_user != nil
            json_responce = {"error": "This email is already registered!"}
            render json: json_responce and return
        end
        json_responce = {"response": "User created succesfully!"}
        User.create(email: email, password: password, first_name: first_name, last_name: last_name, user_type: user_type)
        render json: json_responce and return
    end
    private

    def check_params_presence
        accepted_params = ["email", "password", "first_name", "last_name", "user_type"]
        accepted_params.each do |par|
            if !params[par.to_sym].present? || params[par.to_sym] == ""
                render json: {error: "Some fields are empty!"} and return
            end
        end
    end
end
