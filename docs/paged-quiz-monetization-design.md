# Paged Quiz Monetization Design

Status: planned pilot, not implemented  
Current exam: CompTIA Security+ SY0-701  
Project test ID: SEC-701

## Purpose

Evaluate whether full document navigation between quiz questions can create
additional, policy-compliant advertising opportunities without weakening the
practice-test experience.

The existing single-page quiz remains the known-good implementation until the
paged pilot passes usability, accessibility, persistence, and reporting tests.

## Recommended public URL structure

```text
/security-plus/sy0-701/practice-test/
/security-plus/sy0-701/practice-test/question/1/
/security-plus/sy0-701/practice-test/question/2/
/security-plus/sy0-701/practice-test/question/3/
/security-plus/sy0-701/practice-test/results/
```

The question number represents the position in the current randomized session,
not a permanent question identity.

## Session identity

Keep the random `sessionId` inside browser storage. Do not place it in the URL.

The browser session should continue to hold:

- the session ID
- test ID and data version
- selected question count
- randomized question order
- displayed answer order for every question
- saved selections
- flags
- current position
- start and completion timestamps
- the original question snapshot needed for stable review

For the first pilot, retain `sessionStorage`. Full page loads within the same tab
preserve it. Cross-device resume and week-long persistence are separate future
features and should not be implied by the URL.

## Search and crawl rules

Every generated question-position page and the results page should:

- use `noindex,follow`
- be excluded from the sitemap
- canonicalize to `/security-plus/sy0-701/practice-test/`
- require an active browser session before showing a question
- avoid exposing question IDs or session IDs in the address

The main versioned practice-test page remains the indexable entry page.

## Navigation behavior

Before any full-page navigation:

1. Save the current answer and flag state.
2. Save the current session position.
3. Navigate to the selected question-position URL.
4. Restore the exact session and displayed answer order.
5. Validate that the requested position is within the chosen test length.
6. Move keyboard focus to the question heading.
7. Announce the restored position to assistive technology.

Browser Back and Forward should restore the corresponding question position
without creating a new randomized session.

Opening a question-position URL without an active session should not silently
start a new test. Show a clear unavailable-session message with a button to
start a new randomized test.

## Pilot configurations

### A. One question per document

Best monetization potential and clearest page-level analytics. Highest risk of
latency, distraction, and abandonment on longer tests.

### B. Five-question sections

One document load per five questions. Fewer ad opportunities, but less
interruption for 30- and 50-question sessions.

### C. Current single-page engine

Control experience and immediate fallback.

Initial implementation should use a configuration switch so the current engine
can remain available during testing.

## Advertising guardrails

Advertising must remain clearly separated from quiz controls.

Do not place ads:

- between the final answer and the Next button
- inside the question navigator
- where an ad resembles an answer choice or navigation control
- in an overlay that blocks the question
- in a position likely to cause accidental taps on mobile
- through unsupported manual refresh behavior

Reasonable candidates include a desktop sidebar or a clearly labeled block
below the complete question-navigation area. Final placement depends on the
selected advertising network's policies.

## Metrics

Measure outcomes by completed session, not raw pageviews alone:

- test starts
- completion rate
- completion time
- question-to-question continuation rate
- abandonment position
- results-page reach
- report-submission success
- mobile versus desktop behavior
- page performance
- ad revenue per started session
- ad revenue per completed session

Do not adopt the paged model merely because it creates more page requests.
Retention, usefulness, performance, and revenue must improve together.

## Accessibility and resilience

The pilot must preserve:

- keyboard-only operation
- visible focus
- semantic headings and form controls
- live-region announcements
- stable answer identities
- exact multi-select grading
- previous, next, and direct question navigation
- unanswered and flagged states
- before-unload protection
- detailed review and question reporting
- usable behavior when an ad or analytics request fails

Ads and third-party scripts must not be required for the quiz to function.

## Implementation stages

1. Add generated question-position shells and results shell.
2. Add route parsing and session validation.
3. Change navigation from in-document rendering to saved full-page navigation.
4. Add `noindex`, canonical, and sitemap exclusions.
5. Extend unit tests for URL position and invalid-session handling.
6. Test keyboard, Back/Forward, refresh, mobile, and reporting behavior.
7. Deploy without ads and measure completion behavior.
8. Add policy-compliant ad placements only after the paged experience is stable.
9. Compare against the single-page control before making the new model default.

## Non-goals for the first pilot

- account login
- server-side quiz sessions
- session IDs in URLs
- cross-device resume
- email resume links
- permanent shareable question-position links
- ad-network-specific refresh logic
