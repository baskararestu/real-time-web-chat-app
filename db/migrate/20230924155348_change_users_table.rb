class ChangeUsersTable < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :username, :string, null: false
    add_column :users, :email, :string, null: true

    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
  end
end
