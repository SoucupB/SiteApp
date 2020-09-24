class AddDefaultValues < ActiveRecord::Migration[5.2]
  def change
    change_column :prod_counts, :telefon, :integer, :default => 0
    change_column :prod_counts, :pc, :integer, :default => 0
    change_column :prod_counts, :jocuri, :integer, :default => 0
    change_column :prod_counts, :elec, :integer, :default => 0
    change_column :prod_counts, :haindeb, :integer, :default => 0
    change_column :prod_counts, :hainef, :integer, :default => 0
    change_column :prod_counts, :hainec, :integer, :default => 0
    change_column :prod_counts, :accmobile, :integer, :default => 0
    change_column :prod_counts, :accb, :integer, :default => 0
    change_column :prod_counts, :accf, :integer, :default => 0
    change_column :prod_counts, :accc, :integer, :default => 0
    change_column :prod_counts, :prodcas, :integer, :default => 0
    change_column :prod_counts, :prodbuc, :integer, :default => 0
  end
end
