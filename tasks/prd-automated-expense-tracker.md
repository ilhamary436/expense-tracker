# PRD: Automated Expense Tracker

## 1. Introduction/Overview
The Automated Expense Tracker is a tool designed to minimize the friction of manually logging expenses. By leveraging natural language processing, users can input expenses in conversational formats (e.g., "pengeluaran 50k buat beli jajan jam 10"), and the system will automatically parse, categorize, and store this information.

## 2. Goals
- Eliminate manual data entry forms.
- Enable natural language input for expense tracking.
- Automate expense categorization.
- Store data in a portable and accessible format (Google Sheets).
- Provide immediate feedback to the user on their daily spending.

## 3. User Stories
- As a user, I want to input my expenses using natural language so that I can track my spending quickly without opening a complex app.
- As a user, I want the system to categorize my expenses automatically so that I don't have to define categories manually.
- As a user, I want to see my spending summary immediately after input so that I can be aware of my current budget.

## 4. Functional Requirements
1. The system shall accept natural language input via a Telegram Bot.
2. The system shall parse nominal, description, and time (if provided) from the input.
3. The system shall automatically categorize the expense based on the description (e.g., "jajan" -> "Makanan").
4. The system shall store the structured data (Date, Time, Nominal, Description, Category) into a Google Sheet.
5. The system shall respond with a summary of the current day's total spending after a successful entry.

## 5. Non-Goals (Out of Scope)
- Automatic bank statement importing.
- Multi-user support.
- Advanced budget forecasting/analytics dashboards.

## 6. Technical Considerations
- Integration with Telegram Bot API.
- Integration with Google Sheets API (v4).
- A simple NLP library or LLM prompt to parse and categorize natural language strings.
- Implementation using Node.js to stay consistent with the `gemini-cli` environment.

## 7. Success Metrics
- Average time to log an expense < 10 seconds.
- Categorization accuracy > 80% (initially).

## 8. Open Questions
- What specific categories should be supported initially?
- Does the user prefer to configure category mapping themselves?
