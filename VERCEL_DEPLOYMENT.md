# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Connect your repository
3. **Supabase Project**: Already set up (from Step 1)
4. **Microsoft Forms**: Form ID and response page URL

## Deployment Steps

### 1. Push to Git Repository

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will auto-detect Next.js
4. Click "Deploy"

### 3. Configure Environment Variables

In your Vercel project settings, add these environment variables:

#### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Microsoft Forms Configuration
```
MS_FORMS_FORM_ID=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzJBMFE5VUpRSzM3VVFNRlJUNkY2QlBIRC4u
MS_FORMS_RESPONSE_PAGE_URL=https://forms.office.com/pages/responsepage.aspx?id=JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzJBMFE5VUpRSzM3VVFNRlJUNkY2QlBIRC4u&route=shorturl
```

**How to add environment variables:**
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable for **Production**, **Preview**, and **Development**
4. Click **Save**
5. Redeploy your project (Vercel will automatically redeploy when you add env vars)

### 4. Verify Deployment

After deployment:
1. Visit your Vercel URL (e.g., `your-project.vercel.app`)
2. Test the form submission
3. Check Supabase to verify data is being saved
4. Check Microsoft Forms to verify submissions are going through

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Form loads and displays correctly
- [ ] Form validation works
- [ ] Submissions save to Supabase
- [ ] Submissions are sent to Microsoft Forms
- [ ] Error handling works (test with invalid data)
- [ ] Mobile responsiveness works
- [ ] Time picker modal works

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript errors are resolved
- Check Vercel build logs

### Environment Variables Not Working
- Make sure variables are added for the correct environment (Production/Preview/Development)
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Microsoft Forms Submission Fails
- Check server logs in Vercel dashboard
- Verify `MS_FORMS_FORM_ID` and `MS_FORMS_RESPONSE_PAGE_URL` are correct
- Check if Microsoft Forms requires authentication changes

### Supabase Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and keys are correct
- Check Supabase project is active
- Verify Row Level Security policies allow inserts

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL

## Monitoring

- **Analytics**: Enable Vercel Analytics in project settings
- **Logs**: View function logs in Vercel dashboard
- **Errors**: Set up error tracking (Sentry, etc.) if needed





