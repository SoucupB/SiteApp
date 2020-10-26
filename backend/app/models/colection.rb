class Colection < ApplicationRecord
    has_many :products
    has_many_attached :photos
end
