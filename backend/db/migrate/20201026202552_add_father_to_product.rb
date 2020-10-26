class AddFatherToProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :colection_id, :integer
    remove_column :colections, :products_ids
    add_column :colections, :products_ids, :text, array: true, default: []
  end
end
