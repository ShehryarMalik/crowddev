# CrowdDev

**The community decides what gets built.**

CrowdDev is a platform for turning community ideas into open-source projects. People can propose products, help shape their features, and vote on which ideas deserve to move forward. Accepted proposals can then enter project formation, where contributors can work together to bring them to life.

The goal is simple: **let ideas find their audience before they're built, and give that audience a way to help shape what comes next.**

> 🚧 **Status: Early development**
>
> CrowdDev is currently an interactive UI prototype. The core experience and visual direction are being developed before authentication, persistent storage, and the full voting lifecycle are implemented. Sample proposals and interactions are for demonstration purposes only.

## Why CrowdDev?

Good products don't have to begin with a developer working in isolation.

Someone might envision a community for people looking for work, a cozy multiplayer game, or a tool that solves a problem developers face every day. Others may want the same thing, have ideas to improve it, or be willing to help build it.

CrowdDev aims to connect these people before development begins.

Instead of treating an idea as a static submission, each proposal can evolve through community feedback, feature suggestions, and voting. Accepted ideas can move toward organized development and, eventually, community-maintained open-source projects.

## How it works

1. **Propose an idea**  
   Describe a problem, your vision, a potential solution, and the initial features you imagine.

2. **Shape the idea together**  
   Community members suggest features and improvements. The idea owner or an administrator reviews suggestions and decides which changes become part of the official specification.

3. **Vote on the proposal**  
   Members vote on whether an idea should move forward under clearly published rules.

4. **Organize the project**  
   Accepted proposals enter an administrative review process. Administrators can decide whether to proceed, assign an initial project lead, and coordinate contributors.

5. **Build in the open**  
   Projects can eventually establish public repositories, welcome contributions, and develop their own maintenance and governance practices.

A successful vote does not guarantee that a project will be built. It establishes community support and an opportunity to move forward.

## What we're building

The initial release focuses on the journey from an idea to a community decision.

### Planned V1 features

- Public homepage and idea discovery
- Dedicated pages for project proposals
- Proposal creation with a problem statement, vision, feature list, and design references
- Community feature suggestions and suggestion support
- Owner and administrator review of suggestions
- Revision history for official project specifications
- User accounts and authenticated participation
- Yes/No voting with a deadline and published acceptance rules
- Recorded voting outcomes
- Administrative review and project formation
- Basic contributor-interest submissions
- Responsive design for desktop and mobile

These are the intended V1 capabilities; they are not all implemented yet. The authoritative scope and acceptance criteria are maintained in `CROWDDEV_V1_SPEC.md`.

### What comes later

The longer-term vision includes deeper integration with GitHub, contributor workflows, project roadmaps, code review links, and more community-led governance.

These features are deliberately outside the initial release. The priority is to finish and deploy a useful, coherent product before expanding the scope.

## Technology stack

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type-safe application code |
| Vite | Development server and build tooling |
| CSS | Responsive styling and visual design |
| Supabase — planned | Authentication, PostgreSQL database, and access control |
| GitHub | Source control and collaboration |

The first version is designed to use a hosted backend and free-tier infrastructure where practical. Hosting availability and usage limits will be verified before deployment.

## Getting started

You can run the current frontend locally with Node.js and npm.

### Prerequisites

- Node.js with npm
- Git, if cloning the repository

### Installation

```bash
git clone https://github.com/ShehryarMalik/crowddev.git
cd crowddev
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Production build

```bash
npm run build
```

Vite generates the production frontend build in the `dist` directory.

The commands above cover the current frontend setup. Additional environment variables and backend setup instructions will be documented as those components are implemented.

## Project structure

The repository will evolve as the application grows. The current project uses the standard React + TypeScript + Vite structure, with product requirements and development rules maintained separately.

Important project documents:

- `CROWDDEV_V1_SPEC.md` — product requirements, V1 scope, lifecycle rules, and acceptance criteria
- `AGENTS.md` — development constraints and instructions for coding assistants
- `POST_V1_BACKLOG.md` — ideas intentionally deferred until after V1

These documents help keep development focused and prevent scope creep.

## Design principles

CrowdDev is intended to feel like a place to discover and support ideas, not a generic SaaS dashboard.

The interface uses a bold, friendly, creator-first visual direction inspired by indie storefronts and editorial product discovery. Ideas should have their own identity, while the overall experience remains easy to navigate, accessible, and responsive.

The product follows a few core principles:

- Keep the purpose understandable within seconds.
- Make the idea page the center of the experience.
- Preserve the original proposal and the history of accepted changes.
- Make voting rules and decisions transparent.
- Never imply that an accepted idea is guaranteed to be developed.
- Keep permissions and security rules enforced by the backend, not just the interface.
- Ship a working release before adding more features.

## Open-source vision

CrowdDev is intended to help communities create and maintain open-source projects. Projects established through the platform should explicitly choose an appropriate open-source license and contribution terms.

The CrowdDev platform itself has not yet been assigned a license. A publicly viewable repository does not automatically grant permission to reuse or redistribute its code.

## Development roadmap

The planned milestones are:

1. Complete the UI and navigation for the core user journeys.
2. Set up Supabase, the database schema, and authentication.
3. Implement proposal management, feature suggestions, and revision history.
4. Implement secure voting, deadlines, and result finalization.
5. Build the administrative workflow for project formation and contributor interest.
6. Deploy the application, test the live flows, and document the finished system.

Each milestone has an exit condition defined in the product specification. New features should be deferred unless they are necessary to complete the agreed release.

## Contributing

CrowdDev is currently in early development, and its product scope is being established.

For now, the most useful way to follow the project is to explore the repository and track its progress. As the platform matures, contribution guidelines and the licensing model will be clarified before external code contributions are invited.

## Project links

- **Repository:** https://github.com/ShehryarMalik/crowddev
- **Live demo:** Not deployed yet
- **Product specification:** [`CROWDDEV_V1_SPEC.md`](CROWDDEV_V1_SPEC.md)

---

*CrowdDev — ideas find their people, and communities help build what comes next.*