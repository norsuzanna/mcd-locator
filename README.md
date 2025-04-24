# 🍟 McD Locator – FastAPI + Next.js + Supabase

**McD Locator** is a full-stack web application that visualizes McDonald’s outlets in Malaysia on a map and provides a smart chatbot interface to help users search for outlet features.

## 🌍 Live Demo

> 🔗 [https://mcd-locator.vercel.app](https://mcd-locator.vercel.app)

---

## ✨ Features

- 🗺️ View all McDonald’s Malaysia outlets on an interactive map
- 📍 Show 5km radius around each outlet
- 🔄 Highlight overlapping outlets within catchment areas
- 💬 Chatbot to answer natural language queries like:
  - "Which stores open 24 hours?"
  - "Which outlet has Wi-Fi or EV charging?"
- 📊 Search by proximity (1KM, 3KM, 5km, 10km, 15km)
- 📦 API-based backend using FastAPI + Supabase
---

## 🧱 Tech Stack

| Frontend         | Backend         | Database     | Deployment       |
|------------------|------------------|--------------|------------------|
| Next.js (React)  | FastAPI          | Supabase     | Vercel / Heroku  |
| Axios            | Uvicorn          | PostgreSQL   | Codesandbox Dev  |
| Leaflet (Map)    | OpenAI API (Chat)|              |                  |

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/norsuzanna/mcd-locator.git
cd mcd-locator
```

### 2. Install Dependencies

```bash
pnpm install
pnpm run dev

```
## 📂 Project Structure

```bash
/frontend
    components/ChatWidget.js
    styles/ChatWidget.module.css
    pages/index.js      # Main map + chat interface
```

## 💡 Chat Query Examples
* "Which outlets open 24 hours?"

* "Show me outlets with EV charging"

* "Do any outlets offer birthday party?"

## 🧑‍💻 Author
Built with ❤️ by [@norsuzanna](https://github.com/norsuzanna)

## 📄 License
This project is licensed under the MIT License.

