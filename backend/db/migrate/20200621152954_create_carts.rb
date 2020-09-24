class CreateCarts < ActiveRecord::Migration[5.1]
  def change
    create_table :carts do |t|
      t.string :product_ids
      t.integer :user_id

      t.timestamps
    end
  end
end
