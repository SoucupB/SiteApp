class CreateProdTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :prod_types do |t|
      t.integer :electronice
      t.integer :haine
      t.integer :accesorii

      t.timestamps
    end
  end
end
