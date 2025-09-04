<p align="center">
  <img src="./public/logo.svg" alt="BlogPost Logo" />
</p>

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="Prisma" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40" height="40"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind Version">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/Vercel-deployed-black" alt="Deployed on Vercel">
</p>

# BlogPost

BlogPost is a modern, full-stack web application that empowers users to share their stories with the world. Create beautiful blog posts with compelling titles, stunning images, and engaging descriptions. Discover and explore content from a vibrant community of writers and creators.

## ✨ Features

### 🔐 Authentication & User Management
- Secure user authentication with Kinde Auth
- Personalized user dashboard
- User profile management with profile pictures

### 📝 Content Creation & Management
- **Create Posts**: Rich text editor for creating blog posts with titles, images, and descriptions
- **My Posts**: Personal dashboard to manage your published content
- **Post Management**: Edit and delete your own posts
- **Image Upload**: Support for high-quality image uploads

### 🌐 Content Discovery
- **Browse All Posts**: Explore posts from the entire community
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Real-time Updates**: Dynamic content loading and updates

### 🎨 User Experience
- Clean, intuitive interface built with Tailwind CSS
- Smooth animations and transitions
- Notification system for user interactions
- Dark/Light mode support (coming soon)

## 🛠 Technologies Used

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Neon.tech)
- **Authentication**: Kinde Auth
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Development**: ESLint, Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- PostgreSQL database (or Neon.tech account)
- Kinde Auth account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blog-post.git
   cd blog-post
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   KINDE_CLIENT_ID="your-kinde-client-id"
   KINDE_CLIENT_SECRET="your-kinde-client-secret"
   KINDE_ISSUER_URL="your-kinde-issuer-url"
   KINDE_SITE_URL="http://localhost:3000"
   KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
   KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
blog-post/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Dashboard pages
│   ├── posts/             # Post-related pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── general/           # General UI components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── styles/                # Global styles
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Kinde](https://kinde.com/) for seamless authentication
- [Prisma](https://prisma.io/) for the excellent ORM
- [Vercel](https://vercel.com/) for deployment and hosting

## 📞 Support

If you have any questions or run into issues, please:
- Check the [Issues](https://github.com/yourusername/blog-post/issues) page
- Create a new issue if your problem isn't already listed
- Join our community discussions

---

<p align="center">Made with ❤️ by [Your Name]</p>

