class Cart < ApplicationRecord
    serialize :product_ids
    belongs_to :user
end
