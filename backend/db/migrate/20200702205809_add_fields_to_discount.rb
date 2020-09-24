class AddFieldsToDiscount < ActiveRecord::Migration[5.2]
  def change
    add_column :discounts, :amount, :integer
    add_column :discounts, :product_id, :integer
  end
end
