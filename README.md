
    Starting with the foundational infrastructure. I need to ensure the database and environment are fully configured before writing any application logic. A serverless architecture fits the requested low-overhead, scalable vibe.

    ### Step 1: Infrastructure & Data Architecture

    Establish the foundational repository, database, and infrastructure-as-code required to support a scalable, serverless backend.
    - [ ] Initialize the monorepo structure separating frontend and backend services.
    - [ ] Provision the core database (e.g., AWS DynamoDB or RDS PostgreSQL).
    - [ ] Define the data schema models for Vendor, PolicyData, ComplianceAudit, and User.
    - [ ] Configure local development environment variables (database URIs, API keys, JWT secrets).
    - [ ] Write Infrastructure-as-Code (Terraform or AWS CDK) scripts to make deployments reproducible.

    With the database ready, the next logical component is the background worker. This Python engine needs to be robust enough to handle 404s and rate limits when scraping vendor sites, and strict enough to enforce the LLM's legal evaluation.

    ### Step 2: The Core Engine (Scraping & AI Analysis)
    Build the backend Python worker responsible for extracting terms of service text and evaluating it via an LLM against federal and state privacy laws.
    - [ ] Build the web scraper (Playwright/BeautifulSoup) targeting `/terms` and `/privacy` URLs.
    - [ ] Implement rate limiting, CAPTCHA bypass, and error handling for the scraper.
    - [ ] Integrate the chosen LLM API (OpenAI/Anthropic).
    - [ ] Design the strict system prompt rubric for evaluating COPPA, FERPA, and state-specific mandates.
    - [ ] Create the pipeline script that scrapes, passes text to the LLM, parses the JSON response, and updates the database.

    Now that data is being processed and stored, I need an API layer to serve this data to the frontend UI and handle authenticated actions from the IT staff.

    ### Step 3: The Backend API (Routing & Business Logic)
    Develop the RESTful API server that connects the frontend dashboard to the database and triggers the Python scraping engine.
    - [ ] Initialize the lightweight API server (FastAPI or Node/Express).
    - [ ] Build Google Workspace SSO OAuth 2.0 endpoints for secure staff authentication.
    - [ ] Create GET endpoints for the Global App Directory (fetch all, filter, search).
    - [ ] Create GET and POST endpoints for the Triage Queue (fetch pending requests, approve/deny).
    - [ ] Build a POST endpoint to manually trigger a re-audit of a specific vendor URL.

    The backend is complete. Moving to the React frontend. The UI needs to be dense, high-contrast, and keyboard-friendly, avoiding bloated modals.

    ### Step 4: The React Frontend (UI/UX)
    Construct the high-density, terminal-inspired web dashboard for IT administrators to review AI compliance scores and manage the software roster.
    - [ ] Scaffold the React application (Vite) and set up routing and data fetching libraries.
    - [ ] Implement global state and the Auth Context wrapper for SSO enforcement.
    - [ ] Build the minimal layout shell (static sidebar, top header).
    - [ ] Build the Triage Queue component (list view, AI confidence badges, batch action buttons).
    - [ ] Build the Global App Directory component (sortable data table, client-side search).
    - [ ] Build the Detailed App View component (raw text display, red highlighting for problematic clauses).
    - [ ] Build the Analytics Dashboard component (charts for total vetted, shadow IT trends).

    The application is functionally complete. The final phase is securing the routes and automating the deployment to production.

    ### Step 5: Security, CI/CD, and Deployment
    Harden the application's security posture and set up automated deployment pipelines to push the frontend and backend to production.
    - [ ] Implement Role-Based Access Control (RBAC) to separate Super Admins from View-Only staff.
    - [ ] Configure GitHub Actions for automated linting, testing, and building on push.
    - [ ] Deploy the backend API and Python worker to the cloud (e.g., AWS Lambda/EC2).
    - [ ] Deploy the compiled React frontend to a CDN (e.g., Vercel, Netlify, CloudFront).
    - [ ] Map the custom domain and enforce strict HTTPS/SSL.
    - [ ] Set up cloud logging and monitoring (CloudWatch) for API failures and LLM token usage tracking.
