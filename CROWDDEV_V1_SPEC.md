# CrowdDev V1 — Product Specification

**Status:** Scope locked for first public release  
**Version:** 1.0  
**Purpose:** Single source of truth for product scope, user experience, rules, engineering requirements, and release acceptance.

> **Anti-feature-creep rule:** If a request is not explicitly included in V1 below, it is out of scope by default. Add it to `POST_V1_BACKLOG.md`; do not build it during V1 unless it fixes a blocker, security/privacy issue, or a broken acceptance criterion. To add a feature, name the V1 feature that will be removed or deferred in exchange.

---

## 1. Product definition

CrowdDev is a platform where people propose open-source products, help shape their specifications, vote on which ideas deserve to move forward, and express interest in helping build accepted projects.

**Product promise:** Ideas can find their audience before they are built, and accepted ideas have a transparent path toward becoming open-source projects.

CrowdDev is not a replacement for GitHub, a general-purpose social network, or a full project-management tool. V1 validates the journey from proposal to community input to a recorded decision and admin-managed project formation.

### 1.1 The problem

Many products are built before a real audience has helped shape them. At the same time, people have ideas and skills but lack a clear place to find promising projects, influence their initial direction, or signal willingness to contribute.

### 1.2 Target users

- **Idea creators:** People with a problem or product vision they want to propose.
- **Supporters / potential users:** People who want to shape ideas and vote on whether they should proceed.
- **Potential contributors:** People who may want to help build an accepted project.
- **Admins:** The small team responsible for moderation and post-vote project organization in V1.
- **Project leads:** Users designated by admins to coordinate a project after formation begins.

A person may be a supporter, contributor, and/or idea creator. Voting does not automatically make someone a project owner or maintainer.

### 1.3 Product principles

1. Explain the purpose within seconds: **discover ideas, help shape them, vote, and potentially help build them**.
2. The dedicated idea page is the core product experience; feed cards are for discovery.
3. Community feedback informs decisions, but the platform must show who can make each decision.
4. A vote is a signal to proceed, not a guarantee that a project will be built.
5. Preserve the original proposal and a visible history of accepted changes.
6. Security-critical rules are enforced by trusted backend/database logic, not just by hiding UI controls.
7. Finish and deploy a small, coherent release before adding further product capabilities.

---

## 2. V1 goals and non-goals

### 2.1 V1 goals

- Let visitors understand CrowdDev and browse public ideas.
- Let registered, email-verified users create and manage ideas.
- Give each idea a rich page containing the problem, vision, proposed solution, initial feature list, and design references.
- Let the community suggest and support changes to an idea.
- Let the idea owner or an admin review suggestions and accept, reject, or defer them.
- Preserve a revision history when the official specification changes.
- Run a simple, transparent Yes/No vote with a deadline and published acceptance rule.
- Automatically record a final vote outcome.
- Give admins a small workflow to review accepted ideas, assign a lead, manage project participants, and update project stages.
- Let users signal interest in contributing to a project.
- Deploy a working public site and publish a clear README and architecture notes.

### 2.2 Explicit non-goals — not in V1

- Hosting Git repositories or replacing GitHub/GitLab.
- In-app code editing, pull requests, issue tracking, task boards, sprints, or CI/CD.
- Real-time chat, direct messages, or a general comments/discussion system.
- Collaborative live editing of project specifications.
- AI idea generation or AI moderation.
- Tokens, cryptocurrency, paid membership, financial incentives, or weighted voting.
- Multiple voting models, per-project custom governance engines, or complex delegation.
- Publicly editable projects without permissions or review.
- Native mobile apps.
- Advanced analytics, gamification, follower counts, or notification systems beyond what is essential for account verification.
- A guarantee that CrowdDev or its creator will personally build every accepted idea.
- Automatic community ownership/maintainership transfer. V1 project coordination is admin-managed.

---

## 3. V1 navigation and main screens

Primary navigation:

1. **Explore** — public feed of ideas and projects.
2. **Projects** — ideas that have been accepted and moved into admin review or project formation, plus projects in later stages.
3. **How it works** — a short explanation of proposal shaping, voting, and project formation.
4. **Propose an idea** — clear call to action.
5. **Account menu** — profile, user's proposals, and sign out.

Admins also see an **Admin** destination after authorization.

### 3.1 Homepage

Must answer these three questions quickly:

- What is CrowdDev? A platform for community-shaped open-source projects.
- What can I do? Explore ideas, suggest improvements, vote, propose an idea, and express contributor interest.
- What happens after voting? Accepted ideas enter transparent admin review and may proceed to project formation.

Homepage sections:

- concise mission statement and primary actions;
- selected / recently active ideas;
- simple explanation of the lifecycle;
- clear link to explore all ideas.

Do not fill the homepage with fabricated metrics, fake testimonials, or decorative dashboard statistics. Seed/demo examples must be labeled as examples until replaced by real content.

### 3.2 Explore page

- List public ideas and projects.
- Search by title and description.
- Filter by lifecycle status and category.
- Display title, short summary, category, creator, current state, vote/support information where relevant, and a link to the detail page.
- Include loading, empty, and error states.

### 3.3 Idea / project page

An idea keeps the same canonical page as it progresses; do not create a duplicate project page on acceptance. It should contain:

- title, short tagline, category, creator, and status;
- problem statement, vision, proposed solution;
- initial feature list / current official specification;
- optional cover-image URL and external design/reference links (no file-upload system in V1);
- suggestion list, suggestion submission form, support counts, and review statuses;
- voting rules, deadline, vote totals, and final outcome when applicable;
- revision history for official specification changes;
- project lead, assigned contributors, and project stage once formation begins;
- a simple “I’m interested in contributing” action when the project is eligible for contributors.

The page should visibly distinguish the **specification version that was voted on** from later accepted revisions.

### 3.4 Create/edit idea form

Required fields:

- title;
- short summary/tagline;
- problem being solved;
- vision / proposed solution;
- initial feature list (structured list, not one giant paragraph);
- category.

Optional fields:

- cover image URL;
- design/reference URLs.

Drafts can be edited by their creator. Published/shaping ideas remain editable by their creator while preserving revision history for official specification changes. Admins can moderate content and intervene when required.

### 3.5 Suggestion form

Each suggestion contains:

- concise title;
- explanation of the proposed feature or change;
- why it would help / what problem it solves.

Other signed-in, email-verified users can support a suggestion once. In V1, support is an expression of interest, not a binding vote. No threaded comments are required.

Suggestion states: `Pending`, `Accepted`, `Rejected`, `Deferred`.

### 3.6 Admin screens

Admins can:

- review and moderate reported or inappropriate content;
- inspect accepted voting outcomes;
- move an accepted idea to `Under review`, `In formation`, or `Not proceeding`;
- record a reason when deciding not to proceed;
- create/update the project record linked to the same idea;
- assign one project lead from registered users;
- add/remove registered users as project contributors;
- review contributor-interest requests and approve/decline them;
- move projects between allowed stages;
- see a basic audit history of administrative decisions.

V1 does not include a full project-management workspace. Admin management is limited to the project record, lead, participant list, status, and decision history.

### 3.7 Visual design direction

CrowdDev uses a bold, friendly, creator-first visual style inspired by indie storefronts and editorial product discovery. Gumroad is a reference for its approachable creator-led presentation and discovery experience, not a layout to copy.

**Visual principles:**

- Warm off-white or paper-like backgrounds, with dark ink typography.
- Expressive headings, clear hierarchy, and generous but purposeful spacing.
- A restrained palette of vivid pink, yellow, mint, and other project-specific accent colors.
- Crisp borders, simple geometric shapes, and subtle offset shadows for personality.
- Distinctive visual covers for ideas and projects, while keeping cards readable and consistent.
- Clear, prominent actions for exploring ideas, proposing an idea, suggesting features, and voting.
- Mobile-first responsiveness and accessible contrast, focus states, and form controls.

**Experience principles:**

- The interface should feel like a place to discover and support ideas, not a generic SaaS dashboard.
- Give ideas and their creators visual identity without making the interface noisy or cluttered.
- The dedicated idea page is the center of the experience; discovery cards should lead naturally to it.
- Avoid permanent sidebars, decorative dashboards, unnecessary metrics, excessive gradients, and animation that do not improve the user journey.
- Do not display fabricated community metrics or present sample content as real activity.
- Preserve the established product scope. Visual redesigns must not introduce new features.

**Design acceptance criteria:**

- The homepage explains CrowdDev's purpose within seconds.
- The discovery feed makes proposals visually distinct and easy to scan.
- The dedicated idea page clearly separates the vision, official features, community suggestions, and voting state.
- Forms and actions use consistent visual patterns.
- The primary flows remain usable on mobile and desktop.
- Future screens follow the same visual system rather than introducing a new design direction.

---

## 4. Lifecycle and decision rules

Keep the **voting outcome** separate from the **project stage**. A proposal can have an accepted vote while still awaiting admin review.

### 4.1 Idea lifecycle

1. **Draft** — private to its creator and admins.
2. **Shaping** — public; the community can suggest and support improvements; the creator can edit the proposal.
3. **Voting open** — the voted-on specification version is frozen.
4. **Vote finalized** — outcome is one of:
   - `Accepted`: at least 10 valid votes and at least 60% are Yes.
   - `Not accepted`: at least 10 valid votes, but fewer than 60% are Yes.
   - `Inconclusive`: fewer than 10 valid votes at the deadline.
5. If accepted, the idea enters **Under review** for admin-managed project formation.
6. Admin may move it to **In formation**, **Not proceeding**, or leave it **Under review** with a clear status.

Non-accepted and inconclusive proposals remain publicly viewable with their outcomes. V1 does not automatically reopen voting; any exceptional reopening is an explicit admin action with history recorded.

### 4.2 Voting rules

- Voting period: **7 days** from the server-recorded start time.
- Only registered users with verified email may vote.
- One current vote per user per idea; users may change their choice before the deadline.
- Choices: `Yes` or `No`.
- Threshold: at least 10 total valid votes and at least 60% Yes to be accepted.
- The creator may vote like any other eligible member.
- Results are computed from database records, never trusted from client-submitted counts.
- The server/database must reject votes after the deadline even if a client leaves a button enabled.
- Voting start captures an immutable snapshot/version of the official specification. That version is shown with the result.
- Specification changes are not applied to the frozen voting snapshot. Suggestions submitted during voting may remain pending until voting ends; they must not silently change the subject of the vote.
- Finalization must be safe to run more than once and safe under concurrent requests.
- Deadline finalization must run server-side, independently of the browser. Choose a scheduler or an equivalent reliable backend mechanism during implementation and test it.

The 7-day period, 10-vote quorum, and 60% threshold are initial V1 defaults. They must be visible to users before they vote. Do not build a configurable governance engine in V1.

### 4.3 Specification revisions

- The original submitted proposal is preserved.
- Every accepted change to the official specification creates a new numbered revision with author and timestamp.
- A suggestion can be accepted only by the idea owner or an admin.
- Accepted suggestions update the current official specification; rejected/deferred items do not.
- Preserve the exact revision used for any formal vote.
- Changes made after voting closes are visible as later revisions and are not represented as part of the version the community voted on.
- Do not silently overwrite history.

### 4.4 Post-vote project formation — admin-managed in V1

The earlier idea of giving the creator seven days to self-start and then allowing any member to claim formation is **not part of V1**. It is superseded by admin-managed formation to keep the first release focused.

For an accepted idea:

1. It enters the admin review queue.
2. An admin decides whether to proceed, keep it under review, or mark it `Not proceeding` with a reason.
3. If proceeding, the admin moves it to `In formation`, assigns a project lead, and can add registered contributors.
4. Eligible signed-in users can express contributor interest with a short message/skills note. Admins can approve or decline the request and, if approved, add the member to the project roster.
5. Admins own project-stage changes in V1. Project leads do not receive a separate project administration system yet.

Project stages: `Under review`, `In formation`, `Active`, `Paused`, `Released`, `Archived`, `Not proceeding`.

---

## 5. Roles and permissions

### Visitor

- Browse public ideas/projects and read outcomes/revisions.
- Cannot vote, submit suggestions, create ideas, or express contributor interest.

### Registered, email-verified member

- Create and manage their own draft ideas.
- Publish ideas and edit them during the shaping stage.
- Vote once per idea (and change their vote before the deadline).
- Submit suggestions and support suggestions.
- Express contributor interest in eligible projects.

### Idea owner

- All member capabilities.
- Edit their idea while it is in draft/shaping.
- Accept, reject, or defer suggestions on their own idea while the idea is not in an active voting freeze.
- Cannot change votes, threshold results, admin status, or another user's permissions.

### Admin

- Moderation and project-formation abilities listed in Section 3.6.
- Can make exceptional state changes only through validated, auditable server-side operations.

### Project lead / contributor

- Assigned by admin in V1.
- Displayed on the project page.
- No task board, repository permission management, or separate lead-only workflow in V1.

**Security requirement:** Admin role cannot be granted by changing a client-editable profile field. Use a trusted server-side role assignment and database policies. Every write must be authorized in the backend/database.

---

## 6. Data model — logical entities

The final schema may adjust names, but it must support these concepts without storing derived information redundantly when it can be safely calculated.

- `profiles`: user id, display name, avatar URL (optional), created timestamp.
- `ideas`: creator, title, summary, problem, vision/solution, category, cover/reference URLs, lifecycle state, current revision, voting timestamps, decision outcome.
- `idea_revisions`: idea id, revision number, specification snapshot, author, timestamp, reason/source suggestion, optional vote snapshot reference.
- `votes`: idea id, user id, choice, timestamps; unique `(idea_id, user_id)`.
- `suggestions`: idea id, author, title, description/rationale, status, timestamps, review metadata.
- `suggestion_supports`: suggestion id, user id, timestamp; unique `(suggestion_id, user_id)`.
- `projects`: idea id (unique link), project stage, lead user, created/updated timestamps, stage-change metadata.
- `project_members`: project id, user id, role (`lead` or `contributor`), added by, timestamp; unique membership per project/user.
- `contributor_interest`: project id, user id, optional short message/skills note, status (`pending`, `approved`, `declined`), timestamps; prevent duplicate active requests per user/project.
- `project_events`: project id, actor, event type, metadata, timestamp for important admin changes.

Do not add tables for comments, notifications, chat, tasks, or GitHub webhooks in V1.

---

## 7. Technical constraints and stack

- Frontend: **React + TypeScript + Vite** (existing StackBlitz project).
- Backend platform: **Supabase** — Auth, PostgreSQL, Row Level Security, and server-side functions where needed.
- Source control: **GitHub** repository.
- Hosting: free-tier static frontend hosting and Supabase free tier, subject to confirming current quotas and project availability before launch.
- No paid services may be required for routine V1 development or deployment.
- No custom Go API in V1. Do not add another backend runtime before the release. The backend must still demonstrate real engineering through schema design, constraints, RLS, trusted functions, and automated tests. If a Go service is later desired for career goals, treat it as a separately approved post-V1 milestone.
- Keep credentials in environment variables. Commit only a safe `.env.example`; never commit service-role keys or secrets.
- Use SQL migrations for schema changes, not undocumented manual-only changes.
- Provide a reproducible setup in the README.

### 7.1 Required engineering properties

- Database constraints enforce uniqueness and referential integrity.
- RLS policies protect reads/writes by role and ownership.
- Server-side functions enforce deadline, quorum, acceptance, and state-transition rules.
- Counts/results are calculated from trusted database state.
- Sensitive admin actions produce an audit event.
- Error responses and UI states are deliberate, not silent failures.
- The system does not expose Supabase service-role credentials to the browser.

---

## 8. Non-functional requirements

- Responsive layout from 360px mobile width through desktop.
- Clear loading, empty, validation, success, and error states.
- Accessible form labels, keyboard focus, and sufficient contrast.
- No fabricated community counts or claims of adoption.
- No critical browser console errors in primary flows.
- Basic abuse protection: email verification, input validation, sensible length limits, and basic rate limiting where available.
- Public idea pages should not expose private account data.
- Administrative operations must be auditable.
- A user's data must not be lost because another user edits an idea or submits a suggestion.

---

## 9. Definition of done

A feature is **not done** just because it looks correct in the browser. It is done only when all applicable items below are true:

1. It matches a requirement in this spec.
2. Success, loading, empty, and failure states are handled.
3. Validation and authorization occur on the trusted backend/database where required.
4. It works on mobile and desktop.
5. Relevant tests exist and pass.
6. No secrets are committed.
7. The README or developer notes are updated if setup or behavior changes.
8. The deployed version has been smoke-tested where relevant.

### Critical tests

- A user cannot cast a second independent vote on the same idea.
- A user can change their own vote before the deadline but cannot vote after it.
- A user cannot change another user's vote or edit another person's private draft.
- Only the owner/admin can review suggestions for an idea.
- An accepted suggestion creates a new revision and does not erase prior revisions.
- The voting snapshot remains unchanged during and after the vote.
- Under-10-vote results become inconclusive.
- At least 10 votes and 60% Yes becomes accepted; at least 10 votes and below 60% Yes becomes not accepted.
- Finalization is idempotent and safe under concurrent attempts.
- A regular member cannot self-assign admin privileges.
- Only admins can assign leads/contributors or change project stages.
- Only an eligible signed-in member can submit contributor interest; duplicate requests are handled safely.

---

## 10. Delivery milestones

Work in this order. Do not skip ahead to polish a later feature before the current milestone works.

### M0 — Scope and repo foundation

- Save this spec in the repo root.
- Add `AGENTS.md` and `POST_V1_BACKLOG.md`.
- Connect GitHub and commit the current prototype.
- Confirm design tokens, navigation, and responsive page structure.

**Exit condition:** The repository is backed up; product scope is visible; no work is trapped only in StackBlitz.

### M1 — UX skeleton

- Homepage and navigation.
- Explore listing with clearly labeled sample data.
- Idea detail page.
- Create idea form and suggestion UI.
- Mobile responsive pass.

**Exit condition:** Main screens and navigation work with sample data; no fake metrics are presented as real.

### M2 — Supabase foundation and identity

- Configure environment variables.
- Add SQL migrations and core schema.
- Sign-up/sign-in/email verification/profile.
- RLS and tests for roles/ownership.

**Exit condition:** Real users can sign in, and access rules are tested.

### M3 — Ideas, suggestions, revisions

- Persist ideas and feature list.
- Submit/support/review suggestions.
- Create revision history on accepted edits.
- Preserve the voting snapshot concept.

**Exit condition:** An idea can be created, shaped, and revised through the real database without losing history.

### M4 — Voting lifecycle

- Start and lock a vote snapshot.
- Yes/No votes with uniqueness and deadline enforcement.
- Server-side finalization and outcomes.
- Result display and critical tests.

**Exit condition:** The thresholds, deadlines, authorization, and idempotence tests pass.

### M5 — Admin-managed project formation

- Admin queue for accepted proposals.
- Decide proceed / under review / not proceeding with reason.
- Create linked project record, assign lead, manage contributors and stage.
- Contributor-interest form and review queue.
- Basic audit history.

**Exit condition:** An accepted idea can be reviewed and, if approved, moved into formation with a lead and members.

### M6 — Release and portfolio

- Production environment configuration.
- Deploy frontend and connect Supabase.
- Test core flows on the public URL.
- Add README, setup steps, architecture diagram, screenshots, known limitations, and test instructions.
- Add CrowdDev to the portfolio.
- Seed a small number of genuine founder-created proposals and clearly label any demonstration content.

**Exit condition:** A stranger can visit, understand CrowdDev, sign up, create/shape an idea, vote, and see a result; admin flow works; repo is reproducible and publicly presentable.

---

## 11. Scope-change policy (anti-feature-creep contract)

Every new idea is classified as one of:

- **Bug/blocker:** Current in-scope behavior is broken. Fix it now.
- **Security/privacy/data-integrity issue:** Fix it immediately.
- **Acceptance-criteria gap:** Required by this spec but missing. Complete it.
- **Polish:** Only if the current milestone's exit condition is already met and the polish does not delay the release.
- **New feature:** Put it in `POST_V1_BACKLOG.md`. Do not implement it in V1 by default.

A new feature may enter V1 only when all are true:

1. There is a clear user problem or release blocker.
2. Its scope can be described in a few sentences and tested.
3. The owner explicitly approves it.
4. At least one existing V1 item of similar or greater effort is removed/deferred, or the release owner explicitly accepts a schedule change.
5. This spec is updated before implementation begins.

When tempted to add a feature, ask: **“Does this prevent us from releasing the agreed V1 if it is absent?”** If no, backlog it.

No redesigning the whole application because of one new idea. Record a design decision and change only the affected screens.

---

## 12. Launch and success criteria

V1 is successful as a release when:

- It is publicly deployed and stable enough to demonstrate.
- The end-to-end core journey works with real persistence.
- Security-sensitive behavior is enforced and critical tests pass.
- A new developer can set it up by following the README.
- The portfolio page links to the live site and repository.

After launch, measure real participation: verified signups, ideas submitted, votes cast, suggestions accepted, contributor-interest submissions, and returning participants. Do not treat likes on launch posts as proof of product/market fit. User growth is a learning goal, not a condition that must be met before calling V1 complete.

---

## 13. Current decisions locked

- Product: community-shaped open-source project proposals.
- One rich canonical page per idea; it evolves into its project page.
- Community suggestions inform the specification; owner/admin reviews them.
- Formal vote is Yes/No, 7 days, 10-vote minimum, 60% Yes threshold.
- Voting freezes a specific specification snapshot.
- Post-vote formation is admin-managed in V1; the earlier creator-first 7-day self-service formation rule is superseded.
- Admins review accepted ideas, decide whether to proceed, assign a lead/contributors, and manage project stage.
- V1 includes a basic contributor-interest path, not full recruitment or task management.
- Stack is React + TypeScript + Vite + Supabase + GitHub; no paid service requirement and no custom Go API in V1.
- GitHub/repository automation, tasks, code reviews, advanced governance, chat, and community-managed permissions are post-V1.
- Ship the small release before expanding the vision.
