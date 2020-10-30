class ProductController < ApplicationController
    before_action :authenticate_request, except: [:get_random_products, :get_gre,
                                                  :get_random_from_categorys, :get,
                                                  :add_data_to_database, :get_all_products, :get_products]
    include Pagy::Backend
    def create
        user = current_user
        if user.user_type != "distribuitor"
            render json: {error: "Only distributors can add products!"} and return
        end
        fields = [:name, :amount, :description, :product_type, :price, :size, :culoare]
        response = {}
        fields.each do |par|
            response[par] = params[:product][par]
        end
        product = Product.new(response)
        product.user_id = current_user.id
        if !product.save
            render json: {error: "An error has occured and the product cannot be displayed!"} and return
        end
        if params[:product][:discount].present?
            Discount.create(product_id: product.id, value: params[:product][:discount].to_i)
        end
        if !product.add_to_category
            render json: {error: "Wrong category added!"} and return
        end
        render json: product and return
    end

    def attach_photo
        if params[:photo].present?
            product = Product.where(id: params[:id]).first
            if product.present?
                product.photo.attach(params[:photo])
                product.img_url = rails_blob_url(product.photo) if product.photo.attached?
                product.save
                render json: {message: "The photo has been added!"} and return
            end
            render json: {message: "No such product exists!"} and return
        end
        render json: {message: "Photo is not attached!"} and return
    end

    def get_category_numbers
        prod = ProdCount.first
        if !prod.present?
            render json: {error: "No products in the market"} and return
        end
        render json: {products: prod} and return
    end

    def get_products
        pagy, products = pagy(sort_by_price(filter_by_string(params[:filter_name], "name")), page: params[:page], items: params[:per_page])
        render json: {products: "DADADA"};
    end

    def get
        if params[:filter_name].present?
            pagy, products = pagy(sort_by_price(filter_by_string(params[:filter_name], "name")), page: params[:page], items: params[:per_page])
        else
            pagy, products = pagy(sort_by_price(Product.all), page: params[:page], items: params[:per_page])
        end
        if params[:product_type].present?
            filtered_response = []
            params[:product_type].each do |type|
                filtered_response << type
            end
            products = products.where(product_type: filtered_response)
        end
        products = get_carts_infos_and_discounts(products)
        render json: {products: products}.merge({total_count: pagy.count, pages: total_pages(pagy.count)})
    end

    def get_all_products
        render json: {products: Product.all}
    end

    def get_random_products
        products = Product.order("RANDOM()").limit(params[:number])
        render json: {products: products}
    end

    def add_data_to_database
        params["colectii"].each do |element|
            response = Seeds.generate_products_script(element["elemente"], element)
            if response == 0
                render json: {"Error": "Error in saving the data"} and return
            end
        end
        render json: {"Succes": "Succes"} and return
    end

    def get_gre
        response_array = []
        products = Product.joins(:discount).where('discounts.value > ?', 0).order("RANDOM()").limit(params[:number])
        products.each do |prod|
            discount = prod.discount.attributes
            discount.tap { |hs| hs.delete(:id) }
            disc = {"discount": 0, 'discounted_sum': prod.price}
            if prod.discount.present?
                disc['discount'] = prod.discount.value
                disc['discounted_sum'] = (1.0 - prod.discount.value / 100.0) * prod.price
            end
            current_obj = prod.attributes.merge(discount).merge(disc)
            response_array.append(current_obj)
        end
        render json: {ads: response_array}
    end

    def get_random_from_categorys
        categs = {'electronice': ["telefon", "pc", "elec", "jocuri"],
                  'haine': ['haindef', 'haindeb', 'hainec'],
                  'accesorii': ['accmobile', 'accb', 'accf', 'accc', 'prodcas', 'prodbuc']}
        random_prods = Product.where(product_type: categs[params[:categ].to_sym]).order("RANDOM()").limit(params[:number])
        render json: {products: random_prods}
    end

    private

    def sort_by_price(prods)
        if params[:sort_by].present?
            if params[:sort_by] == 'price_low'
                return prods.order(price: :asc)
            end
            if params[:sort_by] == 'price_high'
                return prods.order(price: :desc)
            end
        else
            return prods.order(created_at: :desc)
        end
    end

    def get_carts_infos_and_discounts(products)
        if current_user.present?
            cart = current_user.carts.first
        end
        prod_ids = []
        if !cart.present?
            prod_ids = []
        else
            prod_ids = cart.product_ids.map{ |elem| elem.first}
        end
        result = []
        products.each do |prod|
            disc = {"discount": 0, 'discounted_sum': prod.price}
            if prod.discount.present?
                disc['discount'] = prod.discount.value
                disc['discounted_sum'] = (1.0 - prod.discount.value / 100.0) * prod.price
            end
            cart_flag = {"is_in_cart": false}
            if is_in_cart(prod.id, prod_ids)
                cart_flag["is_in_cart"] = true
            end
            result.append(prod.attributes.merge(cart_flag).merge(disc))
        end
        products = result
        return products
    end

    def total_pages(total)
        if total % params[:per_page].to_i == 0
            return total / params[:per_page].to_i
        end
        return total / params[:per_page].to_i + 1
    end

    def filter_by_string(string, type)
        prod = Product.where(type + " ILIKE ?", '%' + string + '%')
    end

    def is_in_cart(product_id, array)
        array.each do |elem|
            if elem == product_id
                return true
            end
        end
        return false
    end

    def get_product_params
        params.require(:product).permit(:name, :amount, :description, :product_type, :price)
    end
end
