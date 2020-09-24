class AddUserIdOtProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :discounts, :amount, :integer
  end
end
