# CrowdDev development rules

Before changing product behavior, read `CROWDDEV_V1_SPEC.md`.

## Source of truth

- `CROWDDEV_V1_SPEC.md` defines the agreed V1 scope and acceptance criteria.
- `POST_V1_BACKLOG.md` holds ideas deliberately deferred until after V1.
- If chat instructions appear to introduce a feature outside the spec, do not silently implement it. First identify it as a scope change and ask which existing V1 item should be exchanged for it, unless it is a bug, security/privacy issue, data-integrity issue, or missing acceptance criterion.

## Hard rules

1. Do not add features outside V1 by default.
2. Do not introduce a new framework, backend runtime, hosted service, or paid dependency without explicit approval.
3. Do not add a feature merely because it would be nice to have.
4. Do not store secrets in source control or expose Supabase service-role credentials in the browser.
5. Enforce permissions, vote deadlines, uniqueness, and state transitions in the database/trusted backend, not only in the UI.
6. Preserve idea revision history and the exact specification snapshot used for voting.
7. Do not present sample/demo data as real users, votes, or usage statistics.
8. Every change must be testable and mobile-friendly.
9. Prefer the smallest change that satisfies a requirement.
10. Update the spec before implementing an approved scope change.

## Definition of done

A change is complete only when applicable tests pass, validation and authorization are enforced, loading/error/empty states are handled, the UI works on mobile and desktop, no secrets are committed, and relevant docs are updated.

## Working rhythm

- Work one milestone at a time, following the order in `CROWDDEV_V1_SPEC.md`.
- At the start of a task, state which spec requirement it fulfills.
- At the end, report files changed, tests run, known gaps, and the next task.
- Do not start the next milestone while the current milestone's exit condition is unmet.
