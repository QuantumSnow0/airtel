# Airtel SmartConnect Lead Capture Form

A modern, customer-friendly lead capture form for Airtel Kenya's SmartConnect 5G/FTTx services. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful, minimal, mobile-first design
- 📱 Fully responsive form with smart input handling
- ✅ Real-time validation with helpful error messages
- 🔄 Dual submission: Saves to Supabase and Microsoft Forms
- ⚡ Fast and optimized with Next.js App Router

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Integration**: Microsoft Forms API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account and project
- Microsoft Forms form ID

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create `.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
MS_FORMS_FORM_ID=your_form_id
MS_FORMS_RESPONSE_PAGE_URL=your_response_page_url
```

4. Set up Supabase database (see `SUPABASE_SETUP.md`)

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the form.

## Project Structure

```
lead-capture/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── submit/        # Form submission API route
│   │   ├── page.tsx           # Main form page
│   │   └── layout.tsx        # Root layout
│   └── lib/
│       ├── supabase.ts        # Supabase client
│       └── types.ts           # TypeScript types
├── SUPABASE_SETUP.md         # Supabase setup guide
└── VERCEL_DEPLOYMENT.md      # Vercel deployment guide
```

## Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:
1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md)
- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)
- [Form Details](./../form_details.md)
- [Integration Notes](./../integration_notes.md)

## License

Private - Airtel Kenya Internal Use
