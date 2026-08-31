# Gym Plans

A small, open library of training plans and exercise definitions in plain
markdown — browsable on GitHub, and downloadable straight into the
[Gym Vault](https://github.com/RuanPienaarCode/Gym-Vault) Obsidian plugin.

Everything here is a file you can read, edit and fork. No accounts, no app.

## What's in it

### Programmes — a week you follow

| Plan | For |
|---|---|
| **Postpartum — Rebuild to Running** (4 phases) | Pelvic floor, core and strength after birth, through to running again |
| **Get Over The Bar** | At-home calisthenics built around one hard goal: the muscle-up |
| **Trail Base — Road to 15km** | Rebuilding to a comfortable 15km on trail, 12-week ladder |

### Full body — three that people actually run

| Plan | For |
|---|---|
| **Full Body · Recommended Routine** | The r/bodyweightfitness classic: three identical full-body sessions a week, paired supersets, progress by making the movement harder |
| **Full Body · Simple & Sinister** | Pavel Tsatsouline's minimalist pair — 100 swings and 10 get-ups, one bell, twenty minutes |
| **Full Body · Evidence-Based Hypertrophy** | Three different full-body days built to the numbers the research supports: ~10+ hard sets per muscle per week, 1–3 reps in reserve, double progression |

### Kettlebell

| Plan | For |
|---|---|
| **Kettlebell · Rite of Passage** | Enter the Kettlebell's clean-and-press ladders — the one-bell answer to getting strong rather than just conditioned |
| **Kettlebell · 10,000 Swing Challenge** | Dan John's month: twenty workouts of 500 swings, with an easy strength lift between sets |
| **Kettlebell · Armor Building Complex** | 2 cleans, 1 press, 3 front squats — the most copied complex on the internet |
| **Fullbody Workout Kettle Bell** | One full-body session, one kettlebell, no weekday — reach for it when you want it |

### Body part — accessory sessions with no weekday

Each is one full session plus a short express version, both on `(any)`, so they
never collide with the programme you are actually running.

| Plan | For |
|---|---|
| **Arms · Biceps, Triceps & Grip** | Direct arm work stacked on top of your pulling and pressing |
| **Legs · Squat, Hinge & Single-leg** | A standalone leg day, single-leg heavy, kind to long femurs |
| **Chest · Press & Push** | Four honest chest angles from a home rack with no bench press in it |
| **Shoulders · Press & Rear Delt** | Press first, raise second — plus a no-pressing shoulder-health day |
| **Back · Pull & Row** | Rowing volume for the weeks that are all pull-ups and no upper back |
| **Mobility · Hips, Back & Shoulders** | A 20-minute full pass and a 10-minute desk reset |

### Hands-free

| Plan | For |
|---|---|
| **Hands-free · Tap Counter Circuit** | Five exercises the app can count for you — nose on the glass for push-ups, a timed interval for the plank |

### Filler

| Plan | For |
|---|---|
| **9 Foundations** | Nine exercises you loop as a circuit for however long you have |
| **Rest & Recovery** | Mobility and recovery that fills whatever day your training plan leaves empty |

## Structure

```
plans/          one markdown file per plan
exercises/      one markdown file per exercise, with how-to steps
plans.json      generated index — what the plugin reads
scripts/        build-index.mjs regenerates the index from the files
```

### Plan format

Frontmatter, then prose, then a day per `## Heading (weekday)`:

```markdown
---
parallel: false      # true = runs alongside the active plan instead of replacing it
fallback: false      # true = fills any weekday nothing else claims
---

Anything you write up here is the plan's intro.

## Day 1 · Pull (mon)

Prose inside a day is kept exactly where you put it.

- Pull-ups | 4 x 5
- Inverted Rows | 3 x 10-12
```

`(any)` is a wildcard weekday — used by fallback plans, and by on-demand plans
that are a single session rather than a week. Everything after the first
`|` is free text — `submax`, `8/leg`, `3 x 8-10 @ 20kg` all work, because real
prescriptions are not numbers.

### Adding a plan

1. Write `plans/your-plan.md`.
2. Make sure every exercise it names has a file in `exercises/`.
3. Run `node scripts/build-index.mjs`.

The build **fails** if a plan references an exercise this repo doesn't
define — a downloadable plan whose exercises are missing is a broken plan.

## A note on the postpartum plans

They follow the widely used return-to-running-postnatal framework: connection
and breathing first, then strength, then load tolerance, then impact — with
running from around 12 weeks at the earliest, gated on symptom-free
load-tolerance tests rather than on the calendar.

They are general training guidance, not medical advice, and they cannot know
an individual history. The plans say so in their own text, and they say
plainly that a pelvic health physiotherapist assessment is the most useful
first step — a routine six-week check usually isn't one.

## Licence

Plan and exercise content: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — use it, adapt it, credit it.

Exercise photographs referenced by some plans come from
[free-exercise-db](https://github.com/yuhonas/free-exercise-db) (public domain),
[wger](https://wger.de) (CC BY-SA 4.0, videos by Goulart) and
[Wikimedia Commons](https://commons.wikimedia.org) (CC BY-SA 4.0 and public
domain — the burpee and kettlebell front squat sequences are by Taco fleur);
each exercise note credits its own media, and says so in its own body wherever
the photo shows a near variant rather than the exact movement.
