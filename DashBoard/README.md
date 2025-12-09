# CRM Dashboard

A modern, responsive CRM Dashboard built with React, Vite, and Tailwind CSS.

## Features

- 📊 **Ecommerce Analytics** - Track sales, orders, revenue, and top products
- 👥 **Customer Management** - Manage customer data with search, filter, and export
- 📅 **Calendar** - Integrated calendar with event management (Day/Week/Month views)
- 🎯 **Lead Tracking** - Monitor and manage sales leads with status tracking
- 👤 **Account Management** - User profile with authentication and settings
- 🌍 **Multi-language Support** - English, Spanish, French, and German
- 🎨 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 💾 **Local Storage** - Data persists across sessions per user
- 🔐 **Authentication** - Login system with user-specific data

## Tech Stack

- **React 19.2.0** - UI framework
- **Vite 7.2.4** - Build tool and dev server
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Font Awesome 7.1.0** - Icons
- **LocalStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd DashBoard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
DashBoard/
├── src/
│   ├── components/
│   │   ├── Account/          # User account and profile
│   │   ├── Auth/             # Login page
│   │   ├── Calendar/         # Calendar with events
│   │   ├── Contacts/         # Contact management (deprecated)
│   │   ├── Customers/        # Customer management
│   │   ├── Dashboard/        # CRM Dashboard (deprecated)
│   │   ├── Ecommerce/        # Ecommerce analytics
│   │   ├── Leads/            # Lead tracking
│   │   ├── Settings/         # App settings
│   │   └── Sidebar/          # Navigation sidebar
│   ├── context/
│   │   └── SettingsContext.jsx  # Global settings state
│   ├── utils/
│   │   └── translations.js   # Multi-language translations
│   ├── assets/               # Images and static files
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                   # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # This file
```

## Features Detail

### Ecommerce Page
- Revenue and sales tracking
- Top products showcase
- Recent orders table
- Month-based filtering
- Export data to JSON
- Add new products

### Customers Page
- Customer list with search
- Filter by status (Active/Lead/Churned)
- Add new customers
- Export customer data
- Pagination support

### Calendar Page
- Day, Week, and Month views
- Add/Edit/Delete events
- Color-coded events
- User-specific events storage

### Leads Page
- Lead status tracking (New/Contacted/Qualified/Lost)
- Search and filter leads
- Add new leads
- Export functionality

### Account Page
- User profile editing
- Password change
- Avatar upload
- Login/Logout functionality

### Settings Page
- Language selection (4 languages)
- Timezone configuration
- Currency preferences

## Data Persistence

All data is stored in browser localStorage with user-specific keys:
- `currentUser` - Logged-in user info
- `products_{userId}` - Ecommerce products
- `orders_{userId}` - Customer orders
- `customers_{userId}` - Customer list
- `leads_{userId}` - Leads data
- `calendarEvents_{userId}` - Calendar events
- `appDefaultSettings` - Global settings

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px (sm, md)
- **Desktop**: > 1024px (lg, xl)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

malak - malaksayedfayez@gmail.com
