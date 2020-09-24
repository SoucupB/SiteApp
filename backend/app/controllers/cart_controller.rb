class CartController < ApplicationController
    before_action :authenticate_request

    def add_to_cart
        if current_user.user_type == 'distribuitor'
            render json: {error: "This is a distribuitor account!"} and return
        end
        cart = Cart.where(user_id: current_user.id).first
        if !cart.present?
            cart = Cart.create(user_id: current_user.id, total: 0, product_ids: [])
        end
        product = Product.where(id: params[:product_id]).first
        if !product.present?
            render json: {error: "The product does not exist!"} and return
        end

        if is_in_cart(product.id, cart.product_ids)
            render json: {error: "Product is already in cart!"} and return
        end

        if !params[:amount].present?
            render json: {error: "The amount is not present!"} and return
        end

        if params[:amount].to_i > product.amount.to_i
            render json: {error: "Too many products added in cart!"} and return
        end

        cart.product_ids << [product.id, params[:amount]]

        if !cart.save
            render json: {error: "An error has occured and the cart has not been updated!"} and return
        end
        product.amount -= params[:amount].to_i
        product.save
        cart.total += product.price * params[:amount].to_i
        cart.save
        render json: {success: "Cart has been added!"} and return
    end

    def get_cart
        if !current_user.carts.present?
            render json: {error: "The user does not have a cart!"} and return
        end
        pr_ids = current_user.carts.first.product_ids.map{ |elem| elem.first}
        products = Product.where(id: pr_ids)
        total_sum = 0
        result = []
        products.each do |prod|
            disc = {"discount": 0, 'discounted_sum': prod.price}
            if prod.discount.present?
                disc[:discount] = prod.discount.value
                disc[:discounted_sum] = (1.0 - prod.discount.value / 100.0) * prod.price
            end
            total_sum += disc[:discounted_sum]
            result.append(prod.attributes.merge(disc))
        end
        products = result
        render json: {products: products, total_sum: total_sum} and return
    end

    def pay_cart
        amount = current_user.funds
        @user_ids = []
        if current_user.carts.present?
            cart = current_user.carts.first
        else
            render json: {error: "No cart exists right now!"} and return
        end
        total_sum = get_total_sum(current_user.carts.first.product_ids)
        if total_sum > amount
            render json: {error: "Not enough funds in your wallet!"} and return
        end
        current_user.funds -= total_sum
        current_user.save
        current_user.carts.first.delete
        add_price_to_users()
        render json: {success: "Cart has been payed!"} and return
    end

    def drop_cart
        if !current_user.carts.present?
            render json: {error: "The user does not have a cart!"} and return
        end
        product_ids = current_user.carts.first.product_ids
        product_ids.each do |product|
            current_product = Product.where(id: product[0]).first
            current_product.amount += product[1].to_i
            current_product.save
        end
        cart = current_user.carts.first.delete
        render json: {success: "Cart has been dropped!"} and return
    end

    def remove_from_cart
        if !current_user.carts.present?
            render json: {error: "The user has no cart!"} and return
        end
        prod_ids = current_user.carts.first.product_ids
        prod_ids.each do |element|
            if element[0] == params[:product_id].to_i
                prod_ids.delete(element)
                product = Product.where(id: element[0]).first
                product.amount += 1
                product.save
                current_user.carts.first.product_ids = prod_ids
                current_user.carts.first.save
                render json: {success: "Element has beed removed!"} and return
            end
        end
        render json: {error: "One error has occured"} and return
    end

    private

    def get_total_sum(product_ids)
        product_id = product_ids.map{ |elem| elem.first}
        products = Product.where(id: product_id)
        total_sum = 0
        products.each do |prod|
            discount = 0
            if prod.discount.present?
                discount = prod.discount.value
            end
            total_sum += (1.0 - discount / 100.0) * prod.price
            @user_ids.append([prod.user_id, (1.0 - discount / 100.0) * prod.price])
        end
        return total_sum
    end

    def add_price_to_users
        @user_ids.each do |elem|
            user = User.find(elem[0])
            user.funds += elem[1]
            user.save
        end
    end

    def is_in_cart(product_id, array)
        array.each do |elem|
            if elem[0] == product_id
                return true
            end
        end
        return false
    end
end
