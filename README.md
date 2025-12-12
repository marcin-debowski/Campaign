# Campaign Management System

A React + TypeScript application for managing advertising campaigns with real-time fund tracking and keyword suggestions.

## Features

### Campaign Management

- ✅ **Create** new campaigns with all required fields
- ✅ **Edit** existing campaigns with pre-filled data
- ✅ **Delete** campaigns with confirmation
- ✅ **Real-time validation** with error messages

### Campaign Fields

- **Campaign Name** (mandatory, min 3 characters)
- **Keywords** (mandatory, with typeahead suggestions)
- **Bid Amount** (mandatory, must be > 0)
- **Campaign Fund** (mandatory, validated against available funds)
- **Status** (Active/Inactive)
- **Town** (dropdown with pre-populated cities)
- **Radius** (mandatory, in kilometers)

### Advanced Features

- 🔍 **Keyword Typeahead** - Intelligent suggestions while typing
- 💰 **Fund Management** - Real-time balance tracking and validation
- 📱 **Responsive Grid** - Auto-fill campaign cards

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern effects

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd Campaign
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

### Creating a Campaign

1. Click **"Add Campaign"** button
2. Fill in all required fields (marked with \*)
3. Use keyword typeahead by typing in Keywords field
4. Select status (Active/Inactive)
5. Click **"Create Campaign"**

### Editing a Campaign

1. Click **"Edit"** button on any campaign card
2. Modify fields as needed
3. Click **"Update Campaign"**

### Deleting a Campaign

1. Click **"Delete"** button on campaign card
2. Campaign is removed immediately

### Fund Management

- Total funds: 100,000 (configurable in mockData.ts)
- Active campaigns deduct from available funds
- Form validates if sufficient funds exist
- Balance updates in real-time in TopMenu

## Validation Rules

- **Campaign Name**: Required, minimum 3 characters
- **Keywords**: At least one keyword required
- **Bid Amount**: Must be greater than 0
- **Fund**: Must be greater than 0, cannot exceed available funds (for active campaigns)
- **Radius**: Must be greater than 0

---

## Technical Details (Vite Configuration)

This project uses Vite with React and TypeScript. Below are the default configuration notes:
