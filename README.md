# BookManager - CCS112 Midterm Lab Exam

React frontend + Laravel backend.

## Login
- Username: admin
- Password: book123

## Setup
### Backend
`
cd bookmanager-backend
composer install
cp .env.example .env  # set DB_CONNECTION=mysql, DB_DATABASE=bookmanager
php artisan migrate
php artisan serve
`
### Frontend
`
cd bookmanager-frontend
npm install
npm run dev
`
