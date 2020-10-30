class ColectionController < ApplicationController
    def get
        collectionts = Colection.all
        all_collections = []
        collectionts.each do |collection|
            all_collections.push(get_serializer(collection))
        end
        render json: all_collections
    end

    def get_products
        collectionts = Colection.where(id: params[:id])
        if !collectionts.present?
            render json: "No collection found!" and return
        end
        serialized_collection = get_products_serializer(collectionts.first)
       # binding.pry
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
        products = Product.where(id: ids)
        display_object["products"] = products
        return display_object
    end
end
