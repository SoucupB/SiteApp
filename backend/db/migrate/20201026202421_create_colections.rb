class CreateColections < ActiveRecord::Migration[5.2]
  def change
    create_table :colections do |t|
      t.string :colection_type
      t.string :description
      t.text :imgages
      t.text :products_ids

      t.timestamps
    end
  end
end
