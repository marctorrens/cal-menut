# CONTENT_MODEL.md

## Milestone 1 Content Model

The initial content model is organised around five top-level sections. Each section has a title, route slug, short summary, and placeholder page.

## Sections

| Section | Route | Purpose |
| --- | --- | --- |
| Masia | `/masia` | Core information about the house, spaces, and daily life. |
| Infraestructures | `/infraestructures` | Utilities, maintenance, and technical resources. |
| Equips | `/equips` | Teams, responsibilities, and collaborators. |
| Gestions | `/gestions` | Tasks, procedures, calendars, and administration. |
| Arxiu | `/arxiu` | Documents, photos, and historical materials. |

## Shared Fields

- `title`: Display name for navigation and headings.
- `slug`: URL-safe route identifier.
- `summary`: Short explanatory copy for cards and search results.
- `status`: Current maturity of the section, beginning with `placeholder`.


## Optional Decision Notes

Records that involve an unresolved technical choice can include a `decisionNotes` block so research already completed is preserved without presenting the result as approved or installed. User-facing labels are Catalan:

- `need` → “Necessitat”
- `optionsConsidered` → “Opcions considerades”
- `pros` → “Pros”
- `cons` → “Contres”
- `decisionCriteria` → “Criteris de decisió”
- `provisionalConclusion` → “Conclusió provisional”
- `decisionStatus` → “Estat de la decisió”

Decision-bearing records may also separate operational information into:

- `confirmedFacts` → “Fets existents confirmats”
- `plannedInfrastructure` → “Infraestructura planificada”
- `optionsUnderConsideration` → “Opcions en estudi”
- `finalDecisions` → “Decisions finals”

A provisional conclusion must describe a working hypothesis only. It must not be written as an installed, approved, or final solution unless the decision status is final and the supporting facts have been confirmed.
