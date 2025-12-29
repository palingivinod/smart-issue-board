# 1.  Why did you choose the frontend stack you used?
I chose React with Vite for the frontend because it is

* Simple to set up and fast to develop, and it  is widely used in real-world industry projects.
* It has a great component-based structure for pages like Login, Dashboard, Issue List, etc.
* Vite gives very fast development server and builds compared to CRA, and integrates easily with Firebase SDK.
* Easy to route using react-router-dom and manage authentication state.

# 2. Explain your Firestore data structure
I used a single collection called issues.

Each document contains the following data
| Field       | DataType      | Description               |
| ----------- | --------- | ------------------------- |
| title       | string    | Issue title               |
| description | string    | Detailed description      |
| priority    | string    | Low / Medium / High       |
| status      | string    | Open / In Progress / Done |
| assignedTo  | string    | Name or email             |
| createdBy   | string    | Creator email             |
| createdAt   | timestamp | Firestore server time     |
* Example
    issues/
    issueId/
      title: "Login not working"
      description: "Button does nothing."
      priority: "High"
      status: "Open"
      assignedTo: "dev@example.com"
      createdBy: "user@example.com"
      createdAt: Timestamp
This structure allows:
* filtering by status and priority.
* sorting by most recent.
* storing audit info like createdBy and createdAt.
# 3. Explain how you handled similar issues
When the user types an issue title while creating an issue:
* I query Firestore for existing issues whose titles start with similar text.
* I compare at least the first few characters of the title (slice(0,3)).
* If matches exist, I display a warning and a list of similar issues.

This approach:
* prevents duplicate tickets.
* Let users decide whether to continue anyway.
# 4. Mention what was confusing or challenging
Some challenges I faced:
* Firebase .env configuration with Vite.
* Struggle with adding issues to the Firestore initially.
* I faced a challenge to understand the problem, that is, Firestore calls are blocked by ad blockers.
# 5. Mention what you would improve next
* Role based access control (admin/user permissions).
* Better UI using Tailwind / Material UI.
* File attachments for issues to get a better understanding of the issue.
* Email / push notification on status change.
* Unit tests and integration tests.


# Deployed URL:
https://smart-issue-board-psi.vercel.app/
