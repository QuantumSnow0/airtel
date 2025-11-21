# Pre-Deployment Checklist

## Before Deploying to Vercel

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (keep secret!)
- [ ] `MS_FORMS_FORM_ID` - Microsoft Forms form ID
- [ ] `MS_FORMS_RESPONSE_PAGE_URL` - Microsoft Forms response page URL

### Supabase Setup
- [ ] Database table `leads` is created
- [ ] Row Level Security policies are configured
- [ ] Test insert works in Supabase

### Code Quality
- [ ] No TypeScript errors (`npm run build` succeeds)
- [ ] No linting errors
- [ ] All dependencies are in `package.json`

### Testing
- [ ] Form loads correctly
- [ ] Validation works (try invalid inputs)
- [ ] Form submission works
- [ ] Data appears in Supabase
- [ ] Data appears in Microsoft Forms
- [ ] Error handling works (test with network issues)
- [ ] Mobile view works correctly
- [ ] Time picker modal works

### Vercel Configuration
- [ ] Git repository is pushed
- [ ] Vercel project is created
- [ ] Environment variables are added in Vercel dashboard
- [ ] Build command: `npm run build` (default)
- [ ] Output directory: `.next` (default)

## Post-Deployment

- [ ] Visit deployed URL
- [ ] Test form submission
- [ ] Check Supabase for new records
- [ ] Check Microsoft Forms for new responses
- [ ] Monitor Vercel logs for errors
- [ ] Test on mobile device
- [ ] Share URL with team

## Quick Deploy Commands

```bash
# Build locally to test
npm run build

# If build succeeds, push to git
git add .
git commit -m "Ready for deployment"
git push origin main

# Vercel will auto-deploy on push
# Or deploy manually via Vercel CLI:
npx vercel --prod
```

