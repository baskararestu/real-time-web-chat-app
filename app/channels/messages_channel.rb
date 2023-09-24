class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_name = "MessagesChannel"
    
    # Debugging statement
    puts "Subscribed to #{stream_name}"
    
    stream_from stream_name
  end

  def receive(data)
    # Create a message and broadcast it
    message = Message.create!(
      body: data['body'],
      user_id: data['user_id'],
      room_id: data['room_id']
    )

    # Broadcast the message to the room
    MessagesChannel.broadcast_to(message.room, message: message)
  end

  def unsubscribed
    # Debugging statement
    puts "Unsubscribed from MessagesChannel"
    
    # Any cleanup needed when channel is unsubscribed
  end
end
