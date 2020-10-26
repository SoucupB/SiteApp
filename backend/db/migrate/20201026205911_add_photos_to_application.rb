class AddPhotosToApplication < ActiveRecord::Migration[5.2]
  def change
    add_column :colections, :photos_url, :text, array: true, default: []
  end
end
