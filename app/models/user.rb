class User < ApplicationRecord
    has_secure_password
    
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: {with:URI::MailTo::EMAIL_REGEXP}
    validates :first_name, presence: true


    has_many :playlists, dependent: :destroy


end
