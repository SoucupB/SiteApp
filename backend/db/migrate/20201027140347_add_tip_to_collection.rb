class AddTipToCollection < ActiveRecord::Migration[5.2]
  def change
    add_column :colections, :tip, :string
  end
end
