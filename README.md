# IntelliHire

**IntelliHire** is an AI-powered Hiring Intelligence Platform designed to bridge the gap between raw candidate data and actionable recruitment insights. By combining generative AI, natural language processing, and a modern web interface, this platform streamlines the interview lifecycle for both recruiters and applicants.

## Architecture & Tech Stack

### Backend (Python / FastAPI)
*   **Core Framework:** High-performance API built with FastAPI and served via Uvicorn.
*   **Database Management:** Relational data handled by PostgreSQL, utilizing `psycopg2-binary` and SQLAlchemy ORM.
*   **AI & NLP Pipeline:** Integrates `openai>=1.0.0` for generative features, `scikit-learn` and `joblib` for machine learning operations, and `pdfplumber` alongside `python-docx` for robust resume extraction.
*   **Security:** Password hashing is secured with `passlib[bcrypt]`, while data schemas are validated strictly using `pydantic[email]`.

### Frontend (React / Vite)
*   **Framework:** Built with React 19 and TypeScript, bundled for rapid development using Vite.
*   **Styling & UI:** Styled with Tailwind CSS v4, integrated via PostCSS and Autoprefixer. The `@tailwindcss/typography` plugin is explicitly configured to cleanly render rich text elements like candidate roadmaps.
*   **Routing:** Client-side navigation is managed by `react-router-dom` v7.
*   **Code Quality:** Enforces strict type-aware linting rules using ESLint, tailored for TypeScript and React Hooks across `tsconfig.app.json` and `tsconfig.node.json` environments.

##  Core Features

*   **For Recruiters:** Automated Job Description (JD) generation, intelligent resume ranking, and precise skill gap analysis.
*   **For Candidates:** AI-driven mock interviews, detailed resume status tracking, and personalized career roadmaps.

## Local Development Setup

### 1. Backend Initialization
1. Navigate to the backend directory and install the Python dependencies:
   ```bash
   pip install -r requirements.txt