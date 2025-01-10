## Tech Stack used in this project

### Primary Technologies:
- Frontend: React with TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS

### Database:
- Supabase (PostgreSQL) for data persistence
- Row Level Security (RLS) enabled for user data isolation
- Real-time subscriptions for live updates

### API Architecture:
- REST API via Supabase client
- Finnhub.io API for real-time stock data
- WebSocket connections for real-time updates

### Authentication:
- Supabase Auth with email and password
- JWT-based session management
- Row-level security policies enforcing user data access

### Key Dependencies:
- @supabase/supabase-js: Database client
- lucide-react: for icons 
- recharts: Data visualization
- TypeScript: Type safety

## Wanna run this project locally?

### 1. Clone the repository:
```bash
git clone https://github.com/sayanoops/portfolio-tracker.git
```
or download the zip file from the repository.

### 2. Navigate to the project directory:
```bash
cd portfolio-tracker
```

### 3. Install the dependencies:
```bash
npm install
```

### 4. Create a .env file:
```bash
touch .env
```

### 5. Create a Finnhub.io API key:
- Go to https://finnhub.io/
- Create a new account
- Copy the API key
- Paste the API key in the .env file and store it in the `VITE_FINNHUB_API_KEY` variable.

### 6. Create a Supabase project:
- Go to https://app.supabase.io/
- Create a new project
- Copy the URL of the project
- Paste the URL in the .env file and store it in the `VITE_SUPABASE_URL` variable.
- Copy the anon key
- Paste the anon key in the .env file and store it in the `VITE_SUPABASE_ANON_KEY` variable.

### 7. Start the development server:
```bash
npm run dev
```

## Assumptions and limitations:

### System Requirements:
-Modern web browser with JavaScript enabled and WebSocket support for real-time updates
-Internet connection required for real-time stock updates

### Performance Limitations:
-Stock price updates limited to 60-second intervals
-On top of all plan's limit, there is a 30 API calls/second limit.
(If your limit is exceeded, you will receive a response with status code 429.)

## Link to the deployed project:
https://portfolio-tracker.vercel.app/

## finnhub.io API documentation:
https://finnhub.io/docs/api/