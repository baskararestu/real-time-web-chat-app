class Message < ApplicationRecord
  after_create_commit { broadcast_message }
  belongs_to :user
  belongs_to :room

  private

  def broadcast_message
    ActionCable.server.broadcast("room_#{room_id}", {
      user_id: user_id,
      username: user.username,
      body: body,
      room_id: room_id
    })
  end
end
