class AddDefaultValuesToTipes < ActiveRecord::Migration[5.2]
  def change
    change_column :prod_types, :electronice, :integer, :default => 0
    change_column :prod_types, :haine, :integer, :default => 0
    change_column :prod_types, :accesorii, :integer, :default => 0
  end
end
