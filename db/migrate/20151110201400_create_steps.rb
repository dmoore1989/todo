class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.text :step, null: false
      t.boolean :done, null: false
      t.integer :todo_id, null: false
      
      t.timestamps
    end
  end
end
