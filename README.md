# 📄 ProResume

A modern, feature-rich **resume builder** web app built with React + Vite and powered by Supabase authentication.

## ✨ Features

- 🎨 **Multiple Resume Templates** — Modern, Minimal, Corporate, Creative, Compact
- 📝 **Live Preview** — See your resume update in real-time as you type
- 📥 **PDF Download** — Export your resume as a polished PDF (requires sign-in)
- 🔐 **Authentication** — Secure email-based sign in / sign up via Supabase
- ⚙️ **Customizable Settings** — Font, color, and layout options

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Devloper-Akash/ProResume.git
cd ProResume
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your [Supabase](https://supabase.com) project credentials in `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| Supabase | Authentication & database |
| React Router | Client-side routing |
| Lucide React | Icons |
| html2pdf.js | PDF export |

## 📁 Project Structure

```
src/
├── components/
│   ├── builder/          # Form components (Personal Info, Experience, etc.)
│   ├── layout/           # Navbar, AuthModal
│   └── resume-templates/ # Template designs
├── context/              # React Context (Auth, Resume data)
├── pages/                # Home, Builder pages
└── utils/                # Helper utilities
```

## 📜 License

MIT © [Akash](https://github.com/Devloper-Akash)
