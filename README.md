# ⚛️ React + Firebase Universal Boilerplate

This repository contains a plug-and-play template for building a Single Page Application (SPA) using Vite, React, and Firebase Firestore. It includes a universal database service that can read/write to *any* collection.

## 🚀 How to Use This in Any Project

**1. Clone the repository and install dependencies:**
Open your terminal and run:
git clone <your-repo-link-here>
cd <your-folder-name>
npm install

**2. Connect your Database:**
Go to your Firebase Console, get your project API keys, and paste them into `src/firebase.js`.
*Note: Make sure your Firestore Database is created and set to "Test Mode"!*

**3. Start the Application:**
npm run dev

---

## 🛠️ How to Add a New Field to be Collected

If you need to collect a new piece of data (for example, adding an **Email Address** to the User Details form), you only need to update the React component (`UserForm.jsx` or `Enroll.jsx`). You DO NOT need to change the Firebase service files!

Follow these 3 exact steps:

### Step 1: Add a new State Variable at the top
Inside your component, right below your other state variables, add one for the new field:

```jsx
const [username, setUsername] = useState("");
const [phone, setPhone] = useState("");
const [age, setAge] = useState("");
// 👉 ADD THIS:
const [email, setEmail] = useState("");
