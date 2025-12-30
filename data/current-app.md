# Current App Documentation

This document summarizes the current behavior of the Tulsa Mental Health Support Navigator web page.

## Purpose

A guided, question-based navigator that routes users to the appropriate mental health resources in Tulsa based on urgency, age, and primary need.

## Core Flow (Wizard Steps)

1) Step A: Emergency triage
- Question: Is anyone in immediate danger or a medical emergency?
- Yes -> Emergency results section
- No -> Step B

2) Step B: Age
- Question: Is the person 18 or older?
- Yes -> Step C (adult urgency)
- No -> Youth results section

3) Step C: Adult urgency
- Question: Are you in crisis and need immediate help?
- Yes -> Adult crisis results section
- No -> Step D (primary reason)

4) Step D: Primary reason (single choice)
- Detox or psychosis -> Highcare results (urgent medical evaluation)
- Therapy or meds -> Routine outpatient services
- Navigation (MHAOK) -> MHAC results
- Basic needs (2-1-1) -> Resources 2-1-1 results

## Results Sections (Components)

- Emergency
  - 911, 988 call/text, 2-1-1 Eastern Oklahoma, COPES crisis line
  - Includes COPES explainer modal

- Youth (minors)
  - YES Tulsa
  - CALM Center

- Adult Crisis
  - COPES (mobile response)
  - Grand Mental Health URC (24-hour walk-in)

- Highcare
  - Recommendation for urgent medical evaluation
  - COPES call option and ER locator

- Routine (adult outpatient)
  - CRSOK (Counseling & Recovery Services)
  - Family & Children’s Services
  - Community Health Connection

- MHAC
  - Mental Health Assistance Center (MHAOK)

- Resources 2-1-1
  - 2-1-1 Oklahoma for basic needs and local services

Each results section includes a reset button that returns the user to Step A.

## Emergency Banner

A persistent emergency banner is displayed at the top with:
- 911 messaging
- 988 call/text actions
- Expand/collapse details

## Localization

- All text is localized through data-i18n attributes.
- Languages supported: English, Japanese, Spanish.
- Language selection is based on URL param, localStorage, or browser language.

## Accessibility and UX Notes

- Sections are shown/hidden with the "hidden" class and focused on entry.
- Emergency section uses role="alert" with aria-live.
- Modals trap focus and close on Escape or backdrop click.

## Assumptions and Limits

- The tool is not for emergencies; emergency resources are always shown.
- Service availability is limited to Tulsa County and nearby areas.
- No personal data is stored.
