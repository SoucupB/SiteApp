class AddPriceToProduct < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :price, :integer
  end
end
