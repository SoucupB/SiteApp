class Seeds < ApplicationRecord
    include Rails.application.routes.url_helpers

    def self.generate_products_script(dictionary, collection_param)
        collection = Colection.new(colection_type: collection_param[:colectie], description: collection_param[:descriere], products_ids: [], photos_url: [])
        if !collection.save
            return 0
        end
        index = 0
        collection_param[:img].each do |photo_str|
            collection.photos.attach(io: File.open('../date_impexcera/' + photo_str), filename: photo_str)
            collection.photos_url.push("http://localhost:3000/" + Rails.application.routes.url_helpers.rails_blob_url(collection.photos[index], disposition: "attachment", only_path: true)) if collection.photos.attached?
            index += 1
        end
        dictionary.each do |prod|
            product = Product.new(sales_id: prod[:id], categorie: prod[:categorie], dimensiuni: prod[:dimensiuni], culoare: prod[:culoare])
            product.photo.attach(io: File.open('../date_impexcera/' + prod[:img]), filename: prod[:img])
            product.img_url = "http://localhost:3000/" + Rails.application.routes.url_helpers.rails_blob_url(product.photo, disposition: "attachment", only_path: true) if product.photo.attached?
            product.colection_id = collection.id
            if !product.save
                return 0
            end
            collection.products_ids.push(product.id)
        end
        if !collection.save
            return 0
        end
        return 1
    end
end