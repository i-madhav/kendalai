Working Demo Link --> https://www.loom.com/share/39e15eb8c2e7458baf9799b09fd49b71?sid=b9f43613-559d-44a2-8f7d-ba61166211bc

#SETUP
## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Installation Steps

1. Clone the repository
2. Run npm install
3.Enter .env parameters
NEXT_PUBLIC_YOUTUBE_API_KEY=
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

4.setup prisma --> run : npx prisma migrate dev to initialize all the migratetion 
5. run: npm run dev to start repo locally 

# Design Choices

## Architecture
- Built with Next.js 13 App Router for modern, server-side rendered React application
- Uses Prisma as ORM with PostgreSQL for robust database management
- Implements NextAuth.js for secure authentication

## Key Features

### Property Search & Display
- Interactive dual-panel layout with property listings and map view
- Real-time map updates using Google Maps API integration
- Advanced search functionality with location autocomplete
- Property filtering by categories (VILLA, APARTMENT, HOUSE, etc.)

### User Interface
- Clean, modern design with responsive layout
- Loading states with skeleton screens for better UX
- Custom map markers and info windows for property details
- Smooth animations and transitions

### State Management
- Redux for global state management
- Efficient property data caching
- Real-time synchronization between map and listing views

### API Design
- RESTful API endpoints for property data
- Optimized database queries with Prisma
- Proper error handling and status codes
- Support for complex search queries and filtering

### Authentication & Security
- Secure user authentication with NextAuth.js
- Protected routes for property listing
- Environment variable configuration for sensitive data

### Performance Optimizations
- Optimized image loading with Next.js Image component
- Efficient state updates and re-renders


#CHALLENGES FACED DURING DEVELOPMENT PROCESS
- Although it was a pretty descent process while developing the application , but the challenge i faced how should i store property data in the database in order to fetch data seamlessly and render property lat,lng on the marker and making sure the code is durable and the way i approached the challenge , i searched for all possible way i could should store and then choose the one most suitable for current scenario , 
