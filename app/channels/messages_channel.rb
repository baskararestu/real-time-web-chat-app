class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:room_id]}"
  end

  def receive(data)
    user = User.find(data['user_id']) 
    room = Room.find(data['room_id']) 

    message = Message.create!(
      body: data['body'],
      user_id: user.id,
      room_id: room.id
    )

    ActionCable.server.broadcast "room_#{message.room_id}", {
      message: message.body,
      user_id: message.user_id,
      username: user.username,
      room_id: message.room_id
    }
  end

  def unsubscribed
    puts "Unsubscribed from MessagesChannel"
  end
end
