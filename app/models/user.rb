class User < ApplicationRecord
    has_secure_password
    
    validates :username, presence: true, uniqueness: true, length: {maximum: 30}
    validates :email, presence: true, uniqueness: true, format: {with:URI::MailTo::EMAIL_REGEXP}, length: {maximum: 30}
    validates :first_name, presence: true, length: {maximum: 30}
    validates :password, length: {in: 3..30}

    has_many :playlists, dependent: :destroy

    def member_since
        self.created_at.strftime('%B %d, %Y')
    end


end
