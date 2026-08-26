#!/usr/bin/env bash
# exit on error
set -o errexit

composer install --no-dev --optimize-autoloader
npm install
npm run build

php artisan config:cache
php artisan route:cache
php artisan view:cache

# Buat file sqlite jika belum ada dan jalankan migrasi
touch database/database.sqlite
php artisan migrate --force