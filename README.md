# IRONPULSE — Gym Product E-Commerce Website (React + Vite + Tailwind CSS)

## Quick Start Instructions

1. **Extract this ZIP archive** into a folder on your machine.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## Project Architecture
```
ironpulse-gym-ecommerce/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── utils/
    │   └── config.js
    ├── data/
    │   └── products.js
    ├── context/
    │   └── StoreContext.jsx
    ├── hooks/
    │   └── useLocalStorage.js
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   └── StarRating.jsx
    └── pages/
        ├── Home.jsx
        ├── Shop.jsx
        ├── ProductDetails.jsx
        ├── Cart.jsx
        ├── Checkout.jsx
        ├── AboutContact.jsx
        ├── Auth.jsx
        └── NotFound.jsx
```
