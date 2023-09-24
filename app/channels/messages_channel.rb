# app/channels/messages_channel.rb

class MessagesChannel < ApplicationCable::Channel
  def subscribed
        # room = Room.find(params[:room_id])
    # Stream name for debugging purposes
    stream_name = "MessagesChannel"
    
    # Debugging statement
    puts "Subscribed to #{stream_name}"
    
    stream_from stream_name
  end

  def send_message(data)
    # Debugging statement
    puts "Received message: #{data}"
    
    # room = Room.find(params[:room_id])
    user = current_user
    message = room.messages.create(body: data['body'], user: user)
    
    # Debugging statement
    puts "Broadcasting message: #{message.body}, user: #{user.username}"
    
    ActionCable.server.broadcast "MessagesChannel", message: message.body, user: user.username
  end

  def unsubscribed
    # Debugging statement
    puts "Unsubscribed from MessagesChannel"
    
    # Any cleanup needed when channel is unsubscribed
  end
end
