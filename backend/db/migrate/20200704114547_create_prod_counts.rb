class CreateProdCounts < ActiveRecord::Migration[5.2]
  def change
    create_table :prod_counts do |t|
      t.integer :telefon
      t.integer :pc
      t.integer :jocuri
      t.integer :elec
      t.integer :haindeb
      t.integer :hainef
      t.integer :hainec
      t.integer :accmobile
      t.integer :accb
      t.integer :accf
      t.integer :accc
      t.integer :prodcas
      t.integer :prodbuc

      t.timestamps
    end
  end
end
