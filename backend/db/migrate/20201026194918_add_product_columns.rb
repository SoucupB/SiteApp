class AddProductColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :sales_id, :string
    add_column :products, :categorie, :string
    add_column :products, :dimensiuni, :string
  end
end
