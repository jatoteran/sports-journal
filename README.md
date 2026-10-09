# SPORTS JOURNAL

A lightweight full-stack sports editorial platform with a public reading experience and a multi-user newsroom.

**Live demo:** [SPORTS JOURNAL](https://jatoteran.github.io/sports-journal/)

Built with HTML, CSS and vanilla JavaScript, backed by Supabase and hosted on GitHub Pages. The product's interface and editorial content are in Spanish.

## Overview

SPORTS JOURNAL brings a sports publication and its editorial workflow into one application. Readers browse published stories, explore topics and discover authors; newsroom members create articles and move them through review, publication and archiving.

The project combines a static frontend with cloud persistence, authentication and role-aware editorial tools, without a frontend framework or application build step.

## Features

### Public Experience

- Responsive sports homepage covering Football, Tennis, Baseball and Basketball.
- Article reader with permanent, slug-based URLs, previous/next stories and related stories.
- Search and topic/tag navigation.
- Article sharing through native Web Share, social links and copy-link fallbacks.
- Public author profiles with display name, avatar, biography and published articles when available.
- About and Contact pages; Contact provides email and copy-email actions.

### Editorial Workflow

- Article editor for titles, summaries, article text, sport, tags and images.
- Image preview, positioning, zoom and crop/fit controls.
- Draft, review, published and archived collections.
- Review actions to publish a submission or return it to draft.
- Archive management, including republishing or moving archived stories back to draft.
- Editorial management views and a journalist dashboard with article counts and status filters.

### Multi-user Newsroom

Authenticated members have ADMIN, EDITOR or JOURNALIST roles. Editorial controls adapt to the current member's role and article ownership. Administrators also have a newsroom member-management view and an invitation interface.

### Backend / Data

- Supabase Auth for sign-in, sessions and password recovery.
- Cloud article persistence through the Supabase client, using `articles` and `profiles` tables.
- Profile data for newsroom identity and public author pages.
- An administrator invitation interface that invokes the Supabase Edge Function `invite-newsroom-member`. The UI describes new invitees as journalists, with later promotion to editor through member management.
- Browser-local automatic snapshots and administrator JSON export/import tools, including a cloud import path. These are application-level backups, not a managed database backup service.

Database authorization depends on the deployed Supabase policies, including Row Level Security (RLS). SQL schemas, RLS definitions and the invitation function's source are not included in this repository, so this checkout alone cannot reproduce or audit that backend configuration.

### UX / Quality

- Responsive layouts for public pages, the reader and newsroom tools, with mobile-specific CSS.
- Browser history integration for public routes and direct article links.
- Keyboard handling, modal focus management, focus restoration and ARIA attributes.
- Version query parameters on CSS and JavaScript assets for cache busting.
- Session/context checks and request-sequence guards that prevent stale asynchronous responses from updating a newer editor or author view.

These are implemented accessibility improvements; they do not constitute a WCAG compliance claim.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Backend | Supabase; client integration with a Supabase Edge Function |
| Auth | Supabase Auth |
| Database | Supabase PostgreSQL, accessed with `supabase-js` v2 |
| Hosting | GitHub Pages |
| Version Control | Git / GitHub |

The Supabase JavaScript client is loaded from a CDN. There is no npm manifest, framework or bundler in this checkout.

## Architecture

```text
Browser
  -> Static HTML / CSS / JavaScript on GitHub Pages
  -> Supabase JavaScript client
       -> Auth and PostgreSQL tables
       -> invite-newsroom-member Edge Function
```

The frontend is a SPA-like static site: JavaScript updates the reading experience and opens modal views within one HTML document. Query parameters identify public stories, author profiles and informational pages, while the History API keeps navigation connected to the browser's Back/Forward controls.

Published articles are loaded from Supabase for readers. Authenticated newsroom sessions load role-appropriate editorial data and send changes to the backend. Browser storage supports snapshots and local recovery; Supabase is the cloud persistence layer.

## Editorial Roles

| Role | High-level capabilities in the frontend |
| --- | --- |
| ADMIN | Manage articles across the editorial lifecycle; manage newsroom member roles and invitations; access backup export/import tools. |
| EDITOR | Edit and manage newsroom articles; publish, return submissions to draft, archive and republish stories. |
| JOURNALIST | Create articles; edit or delete their own drafts and review submissions; submit stories for review; track their articles in a personal dashboard. Cannot publish or archive stories. |

Frontend guards control the available interface. Backend policies must enforce authorization independently.

## Article Lifecycle

```text
Draft -> Review -> Published -> Archived
```

Journalists save their own drafts and submit them for review. Administrators and editors can publish review submissions or return them to draft, and can also publish drafts directly. They can archive published stories, republish archived stories or move them back to draft. The lifecycle supports editorial revisions rather than enforcing a strictly one-way sequence.

## Public Routing

Public routes use query parameters on the site's base URL:

| Route | View |
| --- | --- |
| `?story=<slug>` | Published article |
| `?author=<profile-id>` | Public author profile |
| `?page=about` | About SPORTS JOURNAL |
| `?page=contact` | Contact information |

For example, [About](https://jatoteran.github.io/sports-journal/?page=about) and [Contact](https://jatoteran.github.io/sports-journal/?page=contact) have direct URLs. Article and author routes require an existing published story or accessible profile. Public navigation uses browser history without requiring server-side route rewrites.

## SEO and Sharing

The base HTML includes canonical, description, Open Graph and Twitter metadata, plus `WebSite` structured data. Opening a published article updates its title, canonical URL and metadata, and adds `NewsArticle` structured data in the browser.

Article sharing uses native Web Share when supported, with WhatsApp, Facebook and X links as alternatives. Copy-link controls include a manual-copy fallback. Sharing links do not require connected publication social accounts.

**Static hosting limitation:** GitHub Pages serves static HTML, so article-specific metadata is applied client-side. Social crawlers that do not execute JavaScript may receive generic preview metadata instead of the article's title, description or image.

## Running Locally

1. Clone the repository and enter its directory:

   ```sh
   git clone https://github.com/jatoteran/sports-journal.git
   cd sports-journal
   ```

2. Serve the project root with a local static web server. For example, if Python is installed:

   ```sh
   python -m http.server 5500 --bind 127.0.0.1
   ```

3. Open `http://127.0.0.1:5500/`, the development origin used for this project. Any equivalent static server can be used; VS Code Live Server is optional.

No npm install or build command is required. Internet access is needed for the CDN client and Supabase services.

`supabase-config.js` currently creates the browser client using the project's Supabase URL and publishable key. Running this checkout therefore connects to the configured backend, including for editorial writes. Private newsroom access requires an authorized account and profile.

To use an independent backend, its tables, policies, Auth redirect settings and invitation function must be provisioned separately and the client configuration adapted. This repository does not include backend deployment instructions or migrations. Password recovery and invitation redirects also depend on the deployed Auth configuration accepting the chosen origin.

## Project Structure

```text
index.html           Public layout, reader and editorial UI, base metadata
style.css            Public and newsroom styling, responsive layouts
script.js            Rendering, workflow, Auth, data access, routing and sharing
supabase-config.js   Browser-side Supabase client configuration
favicon.svg          Site favicon
README.md            Project documentation
```

The frontend calls `invite-newsroom-member`, but no `supabase/functions/` directory or function source is present in this checkout.

## Security Notes

The Supabase publishable key is client-side by design. Authorization relies on backend policies and RLS, with additional frontend guards for the private editorial UI. Service-role keys and other backend secrets do not belong in client code. Backend policy definitions are outside this repository.

## Known Limitations

- Article-specific social previews depend on whether a crawler executes JavaScript.
- Static hosting provides no server-rendered article pages; cloud data and interactive views depend on JavaScript and Supabase availability.
- Backend schema, policies and invitation function source are not versioned in this checkout, limiting independent setup from the repository alone.
- V1 provides social sharing links but no connected publication social accounts.

## Future Improvements

Possible follow-up work includes prerendered social previews, image optimization, further accessibility and performance refinements, and publication services such as a newsletter, analytics or dedicated social channels. These are future options, not V1 features.

## Development Journey

SPORTS JOURNAL evolved from a frontend sports publication into a cloud-backed editorial application. Adding persistent articles and member profiles introduced authentication, article ownership and role-aware permissions. A multi-user newsroom then connected drafts, review, publication and archiving through dedicated management views and a journalist dashboard.

Iterative development also expanded the public experience with responsive layouts, direct story URLs, author profiles, informational pages and sharing metadata. Later hardening addressed asynchronous race conditions: session and request-context checks keep delayed responses from affecting a different active editor or profile view. The result connects public reading and editorial operations within a framework-free frontend.

## Status

**SPORTS JOURNAL V1** is deployed on GitHub Pages. The V1 feature set is complete and functional development is in code freeze, with documentation and presentation work continuing.
