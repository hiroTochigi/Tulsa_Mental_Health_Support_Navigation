# Insurance and EAP Expansion Plan

This document describes the proposed expansion to support people with insurance and/or an Employee Assistance Program (EAP). It does not change any existing code or content yet.

## Placement in the Flow

- Add the insurance/EAP question immediately after the emergency screen (i.e., after Step A).
- Continue routing minors to the youth flow after this new question.

## New Question (Post-Emergency)

Question: Do you have health insurance or access to an Employee Assistance Program (EAP)?

Options:
- No
- Yes, I have insurance
- Yes, I have EAP
- Yes, both (optional, if desired)

## Routing Overview

- No -> current uninsured flow (existing steps and results).
- Yes, insurance -> insurance results path (new).
- Yes, EAP -> EAP results path (new).
- Yes, both -> show both insurance and EAP results (or pick one and offer the other as a fallback card).

## Separate Results Required

Two separate results sections are needed:

1) Insurance results: for people with insurance
2) EAP results: for people with an Employee Assistance Program

## Insurance Results: Content Outline

Goal: help insured users find covered care quickly, with a clear fallback to local safety-net resources if coverage is limited.

Recommended content blocks:
- Call your member services number (back of insurance card)
- Use insurer directory for in-network providers
- Urgent vs routine guidance (when to use urgent care vs ER)
- Ask for a behavioral health or psychiatry referral if required
- If you cannot find care, use local safety-net options (current uninsured resources)

Open items (need decisions):
- Include specific insurer directory links? (not decided)
- Include a list of recommended local clinics that accept many plans? (not decided)

## EAP Results: Content Outline

Goal: help users activate EAP benefits and set expectations.

Recommended content blocks:
- Contact EAP through HR portal or EAP phone line
- What EAP covers (short-term counseling, referrals, limited sessions)
- Ask for in-network or low-cost referrals if ongoing care is needed
- When to use crisis resources instead (988/911/COPES)

Open items (need decisions):
- Any specific employer or EAP vendor links? (not decided)

## Combined Insurance + EAP Results (Optional)

If a combined option is supported, consider one of these patterns:
- Show both cards with short explanations and separate call-to-action buttons
- Ask which to use first, then show the other as a fallback

## Localization Changes Needed

New English copy will be required for:
- The new insurance/EAP question and options
- The insurance results section
- The EAP results section
- Any combined or fallback copy

Translations will also be needed for Japanese and Spanish.

## Assumptions and Constraints

- No code changes are included in this document.
- No specific external links are proposed yet due to unknown preferences.
- Existing emergency and youth paths remain unchanged.

## Next Decisions Needed

- Exact wording for the insurance/EAP question and options
- Whether to support a combined (insurance + EAP) option
- Which specific links or local resources to include for insured and EAP users
- Whether to place insurance/EAP before or after the adult/minor split (current plan: after emergency)
