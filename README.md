<div align="center">

# ✨ Sloozify - Smart Inventory Management System

### Modern, Animated, Multi-Role Inventory Management Solution

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.9-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Configuration](#-configuration) • [Usage](#-usage)

</div>

---

## Overview

**Sloozify** is a cutting-edge inventory management system designed for businesses to efficiently track products, manage stock levels, and analyze sales trends. Built with modern web technologies, Sloozify offers a stunning UI with smooth animations, theme switching, and role-based access control for managers and store keepers.

### Key Highlights
- 🎨 **Vibrant Animations** - Engaging page transitions, floating elements, and dynamic backgrounds
- 🌗 **Dark/Light Theme** - Fully optimized color scheme for both themes with proper contrast
- 👥 **Role-Based Access** - Separate dashboards and features for managers and store keepers
- 📊 **Real-Time Analytics** - Interactive charts and performance metrics
- 🔐 **Secure Authentication** - User registration and login with encrypted passwords
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

---

## ✨ Features

### Dashboard
- Real-time inventory statistics (Total Products, Total Value, Low Stock Items, Categories)
- Interactive charts showing inventory by category and price distribution
- Animated stat cards with glowing effects and smooth transitions
- Role-specific widgets based on user type

### Inventory Management
- Browse and search products with advanced filtering
- Category-based organization
- Low stock alerts with visual indicators
- Product details including price, quantity, and category
- Smooth animations on product cards with hover effects

### Analytics & Reporting
- Sales trends visualization
- Performance metrics and KPIs
- Revenue analysis with colorful, theme-aware charts
- Historical data tracking

### Orders Tracking
- Complete order history with timestamps
- Transaction details and revenue metrics
- Order status tracking
- Downloadable order information

### User Management
- Secure user registration (Sign-Up)
- Role selection during registration (Manager / Store Keeper)
- Persistent session management
- User profile display with role indicators
- Safe logout functionality

### Animations & Effects
- **Page Transitions** - Smooth slide-in/out animations when navigating
- **Floating Elements** - Animated floating icons throughout the app
- **Background Animations** - Vibrant moving gradient orbs
- **Pulse & Glow Effects** - Interactive elements with glowing borders
- **Staggered Animations** - List items animate in sequence
- **Hover Effects** - Cards scale and glow on interaction

---

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router for seamless navigation
- **React 19.2** - UI library with latest hooks and features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework with animations
- **Recharts** - Beautiful, responsive chart library
- **Radix UI** - Accessible component primitives
- **Lucide Icons** - Modern icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Node.js Runtime** - JavaScript runtime

### Database
- **Neon (PostgreSQL)** - Production database (Vercel integration)
- **MySQL** - Local development database
- **Database Abstraction Layer** - Seamless switching between Neon and MySQL

### Authentication
- **bcryptjs** - Password hashing and verification
- **Session-Based Authentication** - Secure user sessions with Base64 encoding
- **Role-Based Access Control** - Manager and Store Keeper roles

### Styling & Animation
- **Tailwind CSS 4** - Responsive design and animations
- **CSS Animations** - Custom keyframe animations for transitions and effects
- **Next Themes** - Dark/Light mode toggle

### DevTools
- **ESLint** - Code quality and consistency
- **Prettier** (built-in) - Code formatting

---

## 🏗 Architecture

## Project Structure

> Compact, readable directory tree — paste this into GitHub README for a clear view.

```text
sloozify/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts       # Login API endpoint
│   │       └── signup/route.ts      # Registration API endpoint
│   ├── analytics/page.tsx           # Analytics dashboard
│   ├── dashboard/page.tsx           # Main dashboard
│   ├── login/page.tsx               # Login page
│   ├── orders/page.tsx              # Orders tracking page
│   ├── products/page.tsx            # Products inventory page
│   ├── signup/page.tsx              # Registration page
│   ├── globals.css                  # Global styles & animations
│   ├── layout.tsx                   # Root layout + theme provider
│   └── page.tsx                     # Home page
├── components/
│   ├── animated-background.tsx      # Background animation
│   ├── auth-context.tsx             # Auth context/provider
│   ├── product-card.tsx             # Product card UI
│   ├── protected-route.tsx          # Route protection wrapper
│   ├── sidebar.tsx                  # Navigation sidebar
│   ├── theme-provider.tsx           # Theme provider setup
│   └── ui/                          # shadcn/ui components
├── lib/
│   ├── auth.ts                      # Auth logic
│   ├── db.ts                        # DB abstraction (Neon/MySQL)
│   ├── types.ts                     # TypeScript types
│   └── utils.ts                     # Utility helpers
├── scripts/
│   ├── 01-init-database.sql         # DB schema setup
│   └── run-migration.ts             # Migration runner
├── public/                          # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md

```
### Key Components Flow
```

┌─────────────────────────────────────────────────────────────────┐
│                      App (Root Layout)                          │
│                   + Theme Provider                              │
│                   + Animated Background                         │
└────────┬────────────────────────────────────────────────────────┘
         │
    ┌────┴──────┐
    │            │
┌───▼────┐   ┌──▼────────┐
│ Public │   │ Protected  │
│ Pages  │   │  Pages     │
│        │   │            │
│ Login  │   │ Dashboard  │
│ SignUp │   │ Products   │
│ Home   │   │ Analytics  │
│        │   │ Orders     │
└────────┘   └────────────┘
    │             │
    └─────────────┴─────────────────┐
                                    │
                        ┌───────────▼────────────┐
                        │  Auth Context         │
                        │  + User State         │
                        │  + Login/Signup Funcs │
                        │  + Session Storage    │
                        └───────────────────────┘

```
---

### Data Flow
1. **User Registration** → Sign-Up Form → API Route → Database (MySQL/Neon) → Auth Context
2. **User Login** → Login Form → API Route → Database Query → Session Created → Redirect to Dashboard
3. **Dashboard** → Fetches Data → Charts/Stats → Real-time Updates
4. **Product Management** → Product Page → Display Products → Filter/Search → Update UI

### Authentication Flow

User Input (Email/Password)
    ↓
Validation
    ↓
Hash Password (bcryptjs)
    ↓
Store in Database (MySQL/Neon)
    ↓
Create Session Token (Base64)
    ↓
Store in Cookies
    ↓
Redirect to Dashboard


---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **pnpm** package manager
- **MySQL 8.0+** (for local development)
- **Git** (optional, for cloning)

### Installation Steps

#### 1. Clone or Download the Repository
\`\`\`bash
# Using git
git clone https://github.com/yourusername/sloozify.git
cd sloozify

# Or extract the downloaded ZIP file
unzip sloozify.zip
cd sloozify
\`\`\`

#### 2. Install Dependencies
\`\`\`bash
# Using npm
npm install

# Or using pnpm
pnpm install
\`\`\`

#### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Database Configuration (Choose ONE)

# Option A: Neon (PostgreSQL) - Production
DATABASE_URL=postgresql://user:password@region.neon.tech/database?sslmode=require

# Option B: Local MySQL - Development
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=commodities_db

# Optional: Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
\`\`\`

#### 4. Set Up Database

##### For MySQL (Local Development):
\`\`\`bash
# 1. Create database
mysql -u root -p -e "CREATE DATABASE commodities_db;"

# 2. Run migration
npm run db:migrate

# Or manually run the SQL script
mysql -u root -p commodities_db < scripts/01-init-database.sql
\`\`\`

##### For Neon (Production):
Neon automatically creates the database. Just ensure your `DATABASE_URL` is set correctly in `.env.local` or Vercel environment variables.

#### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

The application will be available at `http://localhost:3000`

#### 6. Build for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

---

## ⚙️ Configuration

### MySQL Credentials Setup

#### Local MySQL Installation (Windows/Mac/Linux)

**Windows:**
1. Download MySQL from [mysql.com](https://dev.mysql.com/downloads/mysql/)
2. Run the installer
3. Configure MySQL Server:
   - Port: `3306` (default)
   - Root user password: Set a strong password
   - Add MySQL to PATH

**Mac (using Homebrew):**
\`\`\`bash
brew install mysql
brew services start mysql

# Secure installation
mysql_secure_installation
\`\`\`

**Linux (Ubuntu/Debian):**
\`\`\`bash
sudo apt-get update
sudo apt-get install mysql-server

# Secure installation
sudo mysql_secure_installation

# Start MySQL service
sudo systemctl start mysql
\`\`\`

#### Create MySQL User for Sloozify

\`\`\`bash
# Connect to MySQL as root
mysql -u root -p

# Execute these commands:
CREATE USER 'sloozify'@'localhost' IDENTIFIED BY 'secure_password_123';
GRANT ALL PRIVILEGES ON commodities_db.* TO 'sloozify'@'localhost';
FLUSH PRIVILEGES;
EXIT;
\`\`\`

Update your `.env.local`:
\`\`\`env
MYSQL_HOST=localhost
MYSQL_USER=sloozify
MYSQL_PASSWORD=secure_password_123
MYSQL_DATABASE=commodities_db
\`\`\`

### Neon Database Setup (Production)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env.local` or Vercel environment:
\`\`\`env
DATABASE_URL=postgresql://user:password@region.neon.tech/database?sslmode=require
\`\`\`

### Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `MYSQL_HOST` | MySQL server address | `localhost` |
| `MYSQL_USER` | MySQL username | `root` |
| `MYSQL_PASSWORD` | MySQL password | `password123` |
| `MYSQL_DATABASE` | Database name | `commodities_db` |
| `DATABASE_URL` | Neon connection string | `postgresql://...` |
| `NEXT_PUBLIC_*` | Client-side variables | Any public config |

---

## 📖 Usage

### Running the Application

\`\`\`bash
# Development mode with hot reload
npm run dev

# Production build and run
npm run build
npm run start

# Lint code
npm run lint
\`\`\`

### Demo Credentials

After running the migration script, use these credentials to log in:

**Manager Account:**
- Email: `manager@sloozify.com`
- Password: `manager123`

**Store Keeper Account:**
- Email: `keeper@sloozify.com`
- Password: `keeper123`

### Creating New Users

1. Click **"Sign Up"** on the login page
2. Fill in email, password, full name, and select role
3. Click **"Create Account"**
4. Log in with new credentials

### Navigating the Application

**Dashboard:** View inventory statistics and charts

**Products:** Browse all products, search, and filter by category

**Analytics:** View sales trends and performance metrics

**Orders:** Track all transactions and revenue

**Theme Toggle:** Click the sun/moon icon to switch themes

---

## 🎨 Features in Detail

### Animations & Effects

The application features smooth, performance-optimized animations:

- **Page Transitions** - Slide-in animations when navigating between pages
- **Floating Icons** - Continuously floating animated icons in headers
- **Background Animations** - Vibrant gradient orbs moving smoothly in the background
- **Glow Effects** - Interactive elements glow on hover and interaction
- **Staggered Animations** - List items animate in sequence for visual appeal
- **Theme Transitions** - Smooth color transitions when switching themes

### Color System

**Light Theme:**
- Background: Clean white surfaces
- Text: Dark, readable colors
- Accents: Bright blues, purples, and greens

**Dark Theme:**
- Background: Deep navy and black
- Text: Light gray and white for visibility
- Accents: Vibrant colors with proper contrast

---

## 🔒 Security Considerations

- Passwords are hashed using bcryptjs
- Session tokens are Base64 encoded
- Role-based access control prevents unauthorized access
- Environment variables keep sensitive data secure
- HTTPS enforced in production (Vercel)
- SQL injection prevention via parameterized queries

### Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use strong passwords** - Minimum 12 characters, mixed case, numbers, symbols
3. **Rotate credentials regularly** - Update database passwords periodically
4. **Enable HTTPS** - Always use HTTPS in production
5. **Validate input** - All user inputs are validated and sanitized

---

## 📱 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import project from GitHub
4. Set environment variables in project settings
5. Deploy with a single click

### Deploy to Other Platforms

**Docker:**
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

**Alternative Platforms:** AWS, DigitalOcean, Railway, Render, etc.

---

## 🐛 Troubleshooting

### MySQL Connection Issues
\`\`\`
Error: "connect ECONNREFUSED 127.0.0.1:3306"

Solution:
1. Verify MySQL is running: `sudo systemctl status mysql` (Linux) or check Services (Windows)
2. Check credentials in .env.local
3. Ensure database exists: `mysql -u root -p -e "SHOW DATABASES;"`
\`\`\`

### Port Already in Use
\`\`\`
Error: "Port 3000 is already in use"

Solution:
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
\`\`\`

### Database Migration Fails
\`\`\`
Error: "Table already exists"

Solution:
1. Backup existing data (if important)
2. Drop and recreate database:
   mysql -u root -p -e "DROP DATABASE commodities_db; CREATE DATABASE commodities_db;"
3. Run migration again
\`\`\`

---

## 📚 Project File Structure

### Key Files Explained

- **`app/layout.tsx`** - Root layout with theme provider and global state
- **`components/auth-context.tsx`** - User authentication state management
- **`lib/db.ts`** - Database abstraction layer supporting multiple databases
- **`lib/auth.ts`** - Authentication logic and user management
- **`scripts/01-init-database.sql`** - Database schema definition
- **`app/globals.css`** - Global styles and animations

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---


## 📞 Support & Contact

For issues, questions, or suggestions:

- **GitHub Issues:** Open an issue on the repository
- **Email:** snehamuraleedharan3@gmail.com

---
