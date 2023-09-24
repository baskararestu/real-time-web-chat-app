class Message < ApplicationRecord
    after_create_commit {broadcast_message}
      belongs_to :user
  belongs_to :room

    private

  def broadcast_message
    # Broadcast the message to the MessagesChannel of the associated room
    ActionCable.server.broadcast("MessagesChannel", {
      user_id: user_id,
      username:user.username,
      body: body,
      room_id: room_id
    })
  end

end
