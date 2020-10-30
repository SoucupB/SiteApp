class ProductController < ApplicationController
    before_action :authenticate_request, except: [:get_random_products, :get_gre,
                                                  :get_random_from_categorys, :get,
                                                  :add_data_to_database, :get_all_products, :get_products, :get_total_dimensions]
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
        pagy, products = pagy(filtering(params), page: params[:page], items: params[:per_page])
        #Product.where(type + " ILIKE ?", '%' + string + '%')
        render json: {products: products};
    end

    def get_total_dimensions
        dimension_lists = Product.all.pluck(:dimensiuni)
        dimension_lists_prunned = Hash[dimension_lists.collect { |item| [item, 0] } ].keys
        if !dimension_lists_prunned.present?
            render json: {error: "No dimensions!"} and return
        end
        render json: {dimensions: dimension_lists_prunned.sort_by { |a| a }}
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

    def get_random_from_categorys
        categs = {'electronice': ["telefon", "pc", "elec", "jocuri"],
                  'haine': ['haindef', 'haindeb', 'hainec'],
                  'accesorii': ['accmobile', 'accb', 'accf', 'accc', 'prodcas', 'prodbuc']}
        random_prods = Product.where(product_type: categs[params[:categ].to_sym]).order("RANDOM()").limit(params[:number])
        render json: {products: random_prods}
    end

    private

    def get_product_params
        params.require(:product).permit(:name, :amount, :description, :product_type, :price)
    end

    def filtering(params)
        search_params = {}
        search_params['culoare'] = params[:culoare] if params[:culoare].present?
        search_params['categorie'] = params[:categorie] if params[:categorie].present?
        search_params['dimensiuni'] = params[:dimensiuni] if params[:dimensiuni].present?
        search_params['sales_id'] = params[:sales_id] if params[:sales_id].present?
        return Product.where(search_params)
    end
end
