class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]
  skip_before_action :authenticate_request, only: [:create, :sign_in]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    user = User.new(user_params)
    
    begin
      if user.save
        render json: { message: 'User registered successfully', user: user }, status: :created
      else
        render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordNotUnique => e
      if e.message.include?('users.username')
        render json: { error: 'Username has already been taken' }, status: :unprocessable_entity
      else
        render json: { error: 'Email has already been taken' }, status: :unprocessable_entity
      end
    end
  end

  def sign_in
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      expiration_time = Time.now + 360.minutes
      access_token = JsonWebToken.encode(user_id: user.id)

      render json: { message: 'Login successful', access_token: access_token, expires_at: expiration_time,
      user: {
      user_id:user.id,
      username: user.username,
      email: user.email
      }}

    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

  # Only allow a list of trusted parameters through.
  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
