# Strapi + Next.js Blog Platform

A modern, multilingual blog management platform built with **Strapi CMS and Next.js**. The application provides dynamic blog content management, English and Gujarati language support, and AI-powered blog content generation using Google Gemini.

## 🚀 Features

- **Headless CMS:** Manage blog content using Strapi.
- **Dynamic Blog Listing:** Display blog articles dynamically from the Strapi API.
- **Blog Details:** Dedicated pages for individual blog articles.
- **Multilingual Support:** English and Gujarati language support.
- **Category Filtering:** Browse articles by category.
- **Search Functionality:** Search for blog articles.
- **Markdown Rendering:** Display formatted blog content using React Markdown.
- **AI Blog Generation:** Generate blog content using Google Gemini AI.
- **Draft Management:** Generate content and save it as a draft for review before publishing.

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React 19
- Tailwind CSS 4
- React Markdown

### Backend
- Strapi 5 (Headless CMS)
- Node.js
- SQLite
- Google Gemini AI (@google/genai)

## 📁 Project Structure

```text
strapi-nextjs-blog/
│
├── blog-backend/
│   ├── config/
│   ├── src/
│   ├── public/
│   ├── scripts/
│   ├── database/
│   ├── package.json
│   └── .env.example
│
├── blog-frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```






## 🌐 Language Support

The application supports:

- English (en)
- Gujarati (gu)

Users can switch between languages using the locale query parameter:

```text
http://localhost:3000/?locale=en
http://localhost:3000/?locale=gu
```

## 🤖 AI Blog Generation

The backend integrates Google Gemini AI to generate blog content.

**API Endpoint:**

```http
POST /api/ai/generate
```

The generated blog content can be saved as a draft in Strapi, allowing the content to be reviewed and edited before publishing.

Configure your Google Gemini API key in the backend `.env` file.


