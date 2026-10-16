# ph-website-forms

Cloud Run service behind the praan.health forms (callback popup, Contact, Support).

`POST /api/forms` validates the submission, saves it to Firestore (`websiteFormSubmissions`, with `environment`,
`site`, IP, user agent and the forward result), then, for forms in `FORWARD_FORMS`, posts the lead to the n8n
**Incoming Leads** webhook in the flat shape that workflow reads (see `src/n8n.js`). Storing comes first so a lead
survives an n8n outage; either step failing alone does not fail the visitor.

## Settings (environment variables)
| Name | Default | Notes |
|---|---|---|
| `FORWARD_TO_N8N` | `off` | `on` sends leads to n8n; needs `N8N_WEBHOOK_URL` |
| `N8N_WEBHOOK_URL` | none | the Incoming Leads webhook URL |
| `FORWARD_FORMS` | `Contact Form` | comma list of form names that go to n8n |
| `ALLOWED_ORIGINS` | github.io, praan.health, www.praan.health | CORS allow-list |
| `ENVIRONMENT` | `production` | stored on every submission |
| `FIRESTORE_COLLECTION` | `websiteFormSubmissions` | Contact Form (callback popup and Contact page) |
| `SUPPORT_COLLECTION` | `websiteSupportRequests` | Team Support Form |

## Develop
```bash
npm test          # node --test, no network
```

## Deploy (no Cloud Build trigger; manual)
```bash
gcloud run deploy ph-website-forms --source=services/forms --region=asia-south1 --allow-unauthenticated \
  --set-env-vars=ENVIRONMENT=production,FORWARD_TO_N8N=off
```
