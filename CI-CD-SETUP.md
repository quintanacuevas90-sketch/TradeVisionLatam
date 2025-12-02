# CI/CD Setup Guide for TradeVisionLatam

## Overview
This document outlines the Continuous Integration and Continuous Deployment (CI/CD) pipeline setup for the TradeVisionLatam educational trading platform.

## Deployment Platforms

### Vercel
**Primary deployment platform for the frontend**
- Automatic deployments on push to `main` branch
- Preview deployments for pull requests
- Environment variables configured in Vercel dashboard
- Custom domain: trade-vision-latam.vercel.app

### Netlify
**Alternative/secondary deployment option**
- Build command: `npm run build`
- Publish directory: `dist/` or `.next/`
- Auto-deploy on main branch push

## GitHub Actions Workflows

### Location
All workflow files are stored in `.github/workflows/`

### Current Workflows

#### 1. Build & Test Pipeline
- Runs on: `push` and `pull_request` events
- Node.js versions tested: 18.x, 20.x
- Steps:
  - Checkout code
  - Setup Node.js
  - Install dependencies (`npm install`)
  - Run linting checks
  - Build project (`npm run build`)
  - Run tests if available

#### 2. Deploy to Vercel
- Trigger: Successful build on `main` branch
- Uses: Vercel CLI integration
- Automated production deployment

## Environment Variables

### Required Variables (Production)
```
VERCEL_TOKEN=<your_vercel_token>
GITHUB_TOKEN=<your_github_token>
NEXT_PUBLIC_API_URL=<api_endpoint>
NEXT_PUBLIC_ANALYTICS_ID=<analytics_id>
```

### Setting Variables
- **Vercel**: Configure in Project Settings > Environment Variables
- **GitHub**: Add to Settings > Secrets and variables > Actions
- **Local Development**: Create `.env.local` file (never commit)

## Branch Protection Rules

### Main Branch
- Require pull request reviews (minimum 1)
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Dismiss stale pull request approvals when new commits are pushed

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git configured

### Steps
```bash
# Clone repository
git clone https://github.com/quintanacuevas90-sketch/TradeVisionLatam.git
cd TradeVisionLatam

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -am 'Add feature'`
3. Push to GitHub: `git push origin feature/your-feature`
4. Open a Pull Request with a clear description
5. Ensure all CI/CD checks pass
6. Wait for review and approval
7. Merge when ready

## Troubleshooting

### Deployment Failures
- Check GitHub Actions logs in the Actions tab
- Verify environment variables are set correctly
- Ensure build dependencies are pinned to compatible versions
- Check Vercel build logs in project dashboard

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules and cache: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version compatibility: `node --version`

### Environment Variables Not Loading
- Verify variables are set in correct platform (Vercel or GitHub)
- For local development, check `.env.local` file path and format
- Ensure variable names match between code and configuration

## Monitoring & Analytics

- Vercel Analytics: Available in project dashboard
- GitHub Actions: Monitor in Actions tab
- Build logs: Accessible via Vercel and GitHub
- Deployment status: Check workflow runs and deployment history

## Security Best Practices

- Never commit `.env` files with sensitive data
- Use GitHub Secrets for sensitive values
- Regularly rotate tokens and credentials
- Review GitHub Actions permissions
- Keep dependencies updated: `npm audit`
- Use branch protection rules to prevent unauthorized deployments

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Netlify Documentation](https://docs.netlify.com)

## Contact & Support

For CI/CD related issues, please:
1. Check this documentation
2. Review GitHub Actions logs
3. Check Vercel deployment logs
4. Open an issue on GitHub if problem persists

---
**Last Updated**: December 2024
**Maintained By**: TradeVisionLatam Team
