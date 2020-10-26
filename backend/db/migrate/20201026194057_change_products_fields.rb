class ChangeProductsFields < ActiveRecord::Migration[5.2]
  def change
    remove_column :products, :name
    remove_column :products, :amount
    remove_column :products, :description
    remove_column :products, :product_type
    remove_column :products, :price
    remove_column :products, :user_id
    remove_column :products, :size
  end
end
