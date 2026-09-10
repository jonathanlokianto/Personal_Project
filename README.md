<div align="center">
  <h1>🚀 Personal Data Management Dashboard</h1>
  <p>A centralized, responsive, and robust web application for managing personal data and daily tasks.</p>
  
  ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

## About The Project

This repository (`Personal_Project`) houses my personal data management dashboard. Built to be accessible from anywhere, it acts as a private hub for organizing, tracking, and visualizing personal metrics, tasks, and notes.

By combining the robustness of **Laravel** for backend logic with the reactive UI of **React**, bridged seamlessly via **Inertia.js**, this application provides a Single Page Application (SPA) experience without the complexity of traditional API routing. **Tailwind CSS** ensures the interface is sleek, responsive, and easy to navigate on any device.

## Built With

*   **Backend:** [Laravel](https://laravel.com/) (PHP)
*   **Frontend:** [React](https://reactjs.org/)
*   **Bridge:** [Inertia.js](https://inertiajs.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Database:** MySQL

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your local environment:
- [PHP](https://www.php.net/) >= 8.1
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) & npm
- [MySQL](https://www.mysql.com/) or another preferred database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jonathanlokianto/Personal_Project.git
   cd Personal_Project
   ```

2. **Install PHP Dependencies:**
   ```bash
   composer install
   ```

3. **Install NPM Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Copy the example environment file and generate the application key.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database Configuration:**
   Open the `.env` file and update your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password
   ```

6. **Run Migrations:**
   Create the necessary database tables.
   ```bash
   php artisan migrate
   ```

## Usage

To start the application locally (running both the Laravel backend server and Vite frontend server concurrently), run:

   ```bash
   composer run dev
   ```
Once the servers are up, open your web browser and navigate to `http://localhost:8000`.

## Deployment

To deploy this application to a production environment (so it can be accessed from anywhere):

1. Ensure your server meets Laravel's server requirements.
2. Clone the repository on your server.
3. Install dependencies:
   ```bash
   composer install --optimize-autoloader --no-dev
   npm ci
   ```
4. Build frontend assets for production:
   ```bash
   npm run build
   ```
5. Configure your web server (Nginx/Apache) to point to the `public` directory.
6. Make sure file permissions for `storage` and `bootstrap/cache` are properly set.

## Author

**Jonathan Lokianto**
- GitHub: [@jonathanlokianto](https://github.com/jonathanlokianto)
