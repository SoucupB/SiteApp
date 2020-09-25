class FavoriteController < ApplicationController
    before_action :authenticate_request
    include Pagy::Backend
    def create
        user = current_user
        if params[:product_id].present?
            product_id = params[:product_id]
        else
            render json: {"Response": "No such product exist"} and return
        end
        favorite = Favorite.new(user_id: user.id, product_id: product_id)
        if favorite.save
            render json: {"Response": "Added to favorite!"} and return
        end
        render json: {"Response": "An error has occured!"} and return
    end
    def get
        farorites = Favorite.where(user_id: current_user.id).pluck(:product_id)
        render json: Product.where(id: farorites)
    end
end