# Vivian Wanjiku

Portfolio site for Vivian Wanjiku, a software developer in Nairobi. It reads her public GitHub repositories and presents selected work, including SkyLink Aviation and TapNet Network.

## Stack

- [Next.js](https://nextjs.org/) (App Router) and React
- TypeScript
- Tailwind CSS and [shadcn/ui](https://ui.shadcn.com/)
- `next-themes` for light and dark mode, with dark as the default for first-time visitors

The repository list comes from `https://api.github.com/users/vivianwanjiku-gif/repos`. Responses are cached for about an hour. If GitHub is unavailable, the site uses the snapshot in `content/github-fallback.json`.

The playground is a small terminal (`help`, `about`, `projects`, `skills`, `contact`, `game`, `clear`) and a game of Snake. Snake is loaded only when the dialog opens. The best score and the Konami code bonus stay in `localStorage` on that browser. The hero subtitle types itself unless the visitor has asked for reduced motion.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4327](http://127.0.0.1:4327).

```bash
npm run lint
npm run build
npm start
```

## Edit the content

Almost all personal copy lives in [`content/site.ts`](content/site.ts).

| Field | What to put there |
| --- | --- |
| `portrait` | A file in `public/`, such as `"/portrait.jpg"`. Empty keeps the VW monogram. |
| `availability` | A short line under the role, or leave it empty. |
| `linkedinUrl` | A full profile URL, or leave it empty. |
| `resumeUrl` | A CV URL or a file in `public/`, such as `"/cv.pdf"`. |
| `education` | A qualification, only if you want it public. |
| `experience` | Roles you want public. An empty list hides the section. |
| `phoneDisplay` / `phoneHref` | Phone link. Clear both strings to hide it. |
| `intro` and `about` | The hero and about copy. |
| `featured` | The six selected projects: title, summary, tags, and links. |
| `featured[].repoUrl` | Used only when GitHub has no matching repository. SkyLink Aviation needs a URL here. |
| `featured[].matchNames` | Repository names that should attach live GitHub data to that card. |
| `stack` | Tools named in repository files. The language bars are calculated from GitHub and are not edited here. |

Empty strings are hidden. A value that starts with `PLACEHOLDER` is hidden too.

Do not add employers, degrees, or testimonials unless they are yours. GitHub names, descriptions, and languages are not typed into this file. They update from the API.

To refresh the offline snapshot, save a new `content/github-fallback.json` with the same shape: `fetchedAt`, `profile`, and `repos`. Language byte maps are optional. Two repositories (`Master_CLI` and `Recipe-swap`) were left without byte maps because committed dependency files dwarf the project source. Primary language still comes from GitHub.

## Deploy on Vercel

1. Push this repository to GitHub.
2. In Vercel, import the repository. Framework preset: Next.js. No extra environment variables are required.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to the public origin, for example `https://your-domain.vercel.app`, so the canonical URL, sitemap, and social cards use that host. If it is unset, Vercel’s own URL is used.
4. Deploy. `npm run build` is the build command.

The GitHub requests are unauthenticated. A token is not required for this public profile. If you later add `GITHUB_TOKEN`, keep it out of the client and out of git.
