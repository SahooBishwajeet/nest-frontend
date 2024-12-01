# **Nest**

This is the frontend application for Nest, a course and user management system, built using **Next.js**, **Tailwind CSS**, and **Axios** for API calls.

---

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Usage](#usage)

---

## **Features**

- Responsive design with Tailwind CSS.
- Integrated Sidebar with filters for course content.
- Dynamic video player and PDF viewer.
- Notes management with options to add, edit, and delete notes.
- Progress tracking and content completion handling.

---

## **Technologies Used**

- **Next.js**: React framework for server-rendered applications.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Axios**: HTTP client for API requests.
- **Headless UI**: Accessible UI components for dropdowns and menus.

---

## **Getting Started**

Follow these steps to set up and run the project locally:

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd <repository-name>
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env.local` file in the root of the project and add the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### **4. Start the Development Server**

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## **Project Structure**

```
.
├── public/                 # Static assets
├── src/
│   ├── api/                # Axios instance and API calls
│   │   └── axios.ts        # Axios setup with base URL
│   ├── components/         # Reusable components
│   │   ├── NotesSection/   # Notes-related components
│   │   ├── SidebarSection/ # Sidebar components
│   │   ├── VideoPlayerSection/ # Video Player
│   │   ├── ProgressBar.tsx # Progress bar component
│   ├── pages/              # Next.js pages
│   │   ├── index.tsx       # Landing page
│   │   ├── course.tsx      # Course page
│   ├── styles/             # Global and module-specific styles
│   ├── utils/              # Helper functions
├── .env.local              # Environment variables
├── package.json            # Project dependencies and scripts
```

---

## **Environment Variables**

| Variable Name              | Description                      | Example Value              |
|----------------------------|----------------------------------|----------------------------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for API calls           | `http://localhost:5000/api` |

---

## **Scripts**

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Starts the development server.           |
| `npm run build` | Builds the project for production.       |
| `npm start`     | Starts the production server.            |
| `npm run lint`  | Runs ESLint for code linting.            |

---

## **Usage**

### **1. Run the Application**

After starting the development server, visit [http://localhost:3000](http://localhost:3000).

### **2. Interact with Features**

- Navigate to the course page to view the video player and Sidebar.
- Use the filters in the Sidebar to sort content by type or status.
- Add, edit, and delete notes directly in the Notes section.
- Track content progress and mark items as completed or not completed.

---
