class AddColorAndSizeToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :size, :string
    add_column :products, :culoare, :string
  end
end
