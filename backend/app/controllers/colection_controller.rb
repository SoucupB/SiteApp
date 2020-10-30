class ColectionController < ApplicationController
    include Pagy::Backend
    def get
        pagy, collectionts = pagy(Colection.all, page: params[:page], items: params[:per_page])
        all_collections = []
        collectionts.each do |collection|
            all_collections.push(get_serializer(collection))
        end
        render json: all_collections
    end

    def get_products
        collectionts = Colection.where(id: params[:id]).first
        if !collectionts.present?
            render json: "No collection found!" and return
        end
        serialized_collection = get_products_serializer(collectionts)
        render json: serialized_collection
    end

    private

    def get_serializer(object)
        display_object = object.attributes
        display_object.tap {|field| field.delete("imgages")}
        display_object.tap {|field| field.delete("created_at")}
        display_object.tap {|field| field.delete("updated_at")}
        display_object.tap {|field| field.delete("products_ids")}
        display_object["current_image"] = display_object["photos_url"].first if display_object["photos_url"].present?
        display_object.tap {|field| field.delete("photos_url")}
        return display_object
    end

    def get_products_serializer(object)
        display_object = object.attributes
        ids = display_object["products_ids"]
        display_object.tap {|field| field.delete("products_ids")}
        pagy, products = pagy(filtering(params, Product.where(id: ids)), page: params[:page], items: params[:per_page])
        display_object["products"] = products
        return display_object
    end

    def filtering(params, products)
        search_params = {}
        search_params['culoare'] = params[:culoare] if params[:culoare].present?
        search_params['categorie'] = params[:categorie] if params[:categorie].present?
        search_params['dimensiuni'] = params[:dimensiuni] if params[:dimensiuni].present?
        search_params['sales_id'] = params[:sales_id] if params[:sales_id].present?
        return products.where(search_params)
    end
end
