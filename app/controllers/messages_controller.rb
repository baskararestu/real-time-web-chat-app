class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show update destroy ]
  skip_before_action :authenticate_request
  
  # GET /messages
  def index
    @messages = Message.includes(:user).all
    # Include the associated user's username in the JSON response
    messages_with_username = @messages.map do |message|
      {
        id: message.id,
        body: message.body,
        created_at: message.created_at,
        updated_at: message.updated_at,
        user_id: message.user_id,
        username: message.user.username # Include the username
      }
    end

    render json: messages_with_username
  end


  # GET /messages/1
  def show
    render json: @message
  end

  # POST /messages
  def create
    # Assuming you have a user authenticated and stored in localStorage
    user_id = params[:message][:user_id]
    room_id = params[:message][:room_id]
    puts "user_id: #{user_id}, room_id: #{room_id}"

    # Find the user and room based on the provided IDs
    user = User.find(user_id)
    room = Room.find(room_id)

    @message = Message.new(message_params)
    @message.user = user
    @message.room = room

    if @message.save
      render json: @message, status: :created, location: @message
      ActionCable.server.broadcast "MessagesChannel", { message: @message.body, user_id: user_id, username: user.username }
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /messages/1
  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  def destroy
    @message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:body, :user_id, :room_id)
    end
end
