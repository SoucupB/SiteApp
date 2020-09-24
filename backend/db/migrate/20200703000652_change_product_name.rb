class ChangeProductName < ActiveRecord::Migration[5.2]
  def change
    rename_column :discounts, :amount, :value
  end
end
