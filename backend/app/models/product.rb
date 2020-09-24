class Product < ApplicationRecord
    has_one_attached :photo
    has_one :discount
    belongs_to :user

    include Rails.application.routes.url_helpers

    def self.generate_products(amount)
        random_rescriptions = ['A laptop (also laptop computer), often called a notebook, is a small, portable personal computer',
                               'typically having a thin LCD or LED computer screen mounted on the inside of the upper lid',
                               'Laptops combine all the input/output components and capabilities of a desktop computer, including the display screen, speakers, a keyboard',
                               'Design elements, form factor and construction can also vary significantly between models depending on intended use',
                               'Examples of specialized models of laptops include rugged notebooks for use in construction or military applications',
                               'Portable computers, which later developed into modern laptops, were originally considered']
        names = ["Laptop", "Blender", "Aragaz", "Telefon", "PlayStation"]
        link_names = {"Laptop": ["lap2.jpg", "lap.jpg", "lap3.jpg", "lap4.jpg"],
                        "Blender": ["blender.jpg", "blender2.jpg", "blender3.jpg"],
                        "Aragaz": ["araga2.jpg", "aragaz1.jpg", "aragaz3.jpg"],
                        "Telefon": ["iphone.jpg"],
                        "PlayStation": ["game1.jpg"]}
       # photos = ['lap.jpg', 'lap2.jpg', 'lap3.jpg', 'lap4.jpg']
        product_types = ['telefon', 'pc', 'jocuri', 'elec', 'haindeb', 'hainef', 'hainec', 'accmobile', 'accb', 'accf', 'accc', 'prodcas', 'prodbuc']
        (1..amount).each do |index|
            product_name = names.sample
            product = Product.create(product_type: product_types.sample, name: product_name, price: rand(50..500), description: random_rescriptions.sample, amount: rand(1..10), user_id: User.second.id)
            product.add_to_category
            random_photo = link_names[product_name.to_sym].sample
            product.photo.attach(io: File.open('../../Photos/' + random_photo), filename: random_photo)
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
