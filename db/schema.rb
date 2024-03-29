# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_24_162422) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "timescaledb"

  create_table "messages", id: :serial, force: :cascade do |t|
    t.text "body"
    t.timestamptz "created_at", null: false
    t.timestamptz "updated_at", null: false
    t.integer "user_id", null: false
    t.integer "room_id", null: false
  end

  create_table "rooms", id: :serial, force: :cascade do |t|
    t.string "name"
    t.timestamptz "created_at", null: false
    t.timestamptz "updated_at", null: false
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "username", null: false
    t.timestamptz "created_at", null: false
    t.timestamptz "updated_at", null: false
    t.string "password_digest"
    t.string "email", null: false
  end

  add_foreign_key "messages", "rooms"
  add_foreign_key "messages", "users"
end
