class AddFundsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :funds, :integer, :default => 0
  end
end
