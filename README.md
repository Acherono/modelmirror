# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/42de003e-401d-463b-b02a-1b7c55b60c3b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/42de003e-401d-463b-b02a-1b7c55b60c3b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/42de003e-401d-463b-b02a-1b7c55b60c3b) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Dark Mode Color Structure

The application features a comprehensive dark mode with the following design principles:

### Global Dark Mode Adjustments

- All backgrounds in dark mode use pure black (`hsl(0, 0%, 0%)`) for maximum contrast and visual clarity
- Text colors are optimized for readability against black backgrounds
- Button components maintain their original styling to preserve visual distinction and usability

### Sidebar Customization

- Active sidebar items use a white background with black text in dark mode for clear visual indication
- Non-selected sidebar items maintain the black background with appropriate text contrast

### Visual Consistency

- All components maintain consistent styling in dark mode
- Text and icon colors are adjusted to ensure proper contrast against black backgrounds
- Border colors are slightly lighter than backgrounds to provide subtle visual separation

### Implementation Details

- Dark mode colors are defined in `src/index.css` using CSS variables
- The ThemeProvider component in `src/components/theme/ThemeProvider.tsx` handles theme switching
- Active states in the sidebar are managed through conditional classes in `src/components/layout/Sidebar.tsx`
