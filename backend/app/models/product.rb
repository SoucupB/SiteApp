class Product < ApplicationRecord
    has_one_attached :photo
    belongs_to :colection
    #has_one :discount
    #belongs_to :user

    include Rails.application.routes.url_helpers

    def self.generate_products(amount)
        random_rescriptions = ['Ai gresie ei portanta',
                               'Vrei bataie, pune gresie-n baie',
                               'Cine are faianta isi da mare importanta']
        names = ["Faianta", "Gresie"]
        link_names = {"Faianta": ["faianta-baie-maro.jpg", "faianta-baie-violet.jpg", "faianta-bucatarie-gri.jpg",
                                  "faianta-bucatarie-negru.jpg", "faianta-hol-maro.jpg", "faianta-living-gri.jpg"],
                        "Gresie": ["gresie-baie-gri.jpg", "gresie-baie-maro.jpg", "gresie-baie-roz.jpg", "gresie-bucatarie-gri.jpg", "gresie-hol-maro.jpg"]}
        product_types = ['telefon', 'pc', 'jocuri', 'elec', 'haindeb', 'hainef', 'hainec', 'accmobile', 'accb', 'accf', 'accc', 'prodcas', 'prodbuc']
        (1..amount).each do |index|
            product_name = names.sample
            product = Product.create(product_type: product_types.sample, name: product_name, price: rand(50..500), description: random_rescriptions.sample, amount: rand(1..10), user_id: User.second.id)
            product.add_to_category
            random_photo = link_names[product_name.to_sym].sample
            product.photo.attach(io: File.open('../Photos/' + random_photo), filename: random_photo)
            product.img_url = "http://localhost:3000/" + Rails.application.routes.url_helpers.rails_blob_url(product.photo, disposition: "attachment", only_path: true) if product.photo.attached?
            product.save
            Discount.create(product_id: product.id, value: rand(0..15))
        end
    end

    def add_to_category
        cnt = ProdCount.first
        if !cnt.present?
            cnt = ProdCount.create
        end
        attribs = ProdCount.first.attributes
        nrs = attribs[self.product_type.to_s]
        ProdCount.first.update({self.product_type => nrs + 1})
    end
end
