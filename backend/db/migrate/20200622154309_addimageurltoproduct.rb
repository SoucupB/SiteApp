class Addimageurltoproduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :img_url, :string
  end
end
