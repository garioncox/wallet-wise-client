# Final Project - Advanced Front End

## Financial Planning System / Budget Tracker

This project is a financial planning system. No systems I've seen has completely fit my needs, so I want to build one that does.

I want to be able to create categories and sub-categories based on transaction types (e.g. necessities as a large category, transportation costs as a sub category), then input my current balance and income + tag them.

Same with expenses- I want to tag an expense with one or more categories and one or more subcategories. (e.g. buying a soda will count as "food", but not "necessity").

**[I will be working on this by myself]**

[Link to the API page](https://github.com/garioncox/afe-final-api)

#

The site will have these pages:

1. Landing - for users not logged in
2. Dashboard - for viewing quick stats
3. Transaction Input
4. Transaction History / Management - to quickly see, add, delete, update all transactions
5. Budget Setup / Management - create tags and subtags here
6. Recurring Transactions Setup / Management - set up Bills or income to be auto populated after a date
7. Reports - a more in depth stats page
8. Alert Setup Page - set up email alerts
9. Settings - for turning on and off features, maybe even changing theme
10. User Profile - to change credentials, profile picture, email, etc.

# Check in 1 (Nov 6)

Goals:

- [ ] Tailwind config / standardization
- [x] Create Local db
- [x] Seed db with fake data
- [x] One API Call
- [x] CI / CD pipeline - testing + linting + deploy to k8s

Page work:

- [x] **[Figma]** Landing page
- [x] **[Figma]** Dashboard page

| Score   | Technology                              |
| ------- | --------------------------------------- |
| **5/5** | Use of Local Storage                    |
| 0/5     | Client side state stores                |
| 0/5     | Toasts / global notifications or alerts |
| 0/5     | Error handling                          |
| **1/5** | Network Calls                           |
| 0/5     | Developer type helping (TypeScript)     |
| 0/5     | 10+ pages/views via a router            |
| **3/5** | CI/CD pipeline                          |
| 0/9     | 3+ reusable form input components       |
| 0/12    | 4+ reusable layout components           |
| 0/10    | Authentication and user account support |
| 0/5     | Authorized pages and public pages       |

| Score | Experience                                            |
| ----- | ----------------------------------------------------- |
| 0/5   | All experiences mobile friendly                       |
| 0/5   | 3 instances where elements reorder on smaller screens |

A self evaluation of the rubric (below the projected rubric evaluation)
Check boxes filled in to show which features were completed

- [x] Use of Local Storage
- [x] Network Calls
- [x] CI/CD Pipeline

# Check in 2 (Nov 9)

Goals:

- [x] 2 more network calls
- [x] CI / CD Complete
- [x] Authentication

Page work:

- [x] Landing Page
- [ ] Dashboard Page
- [ ] **[Figma]** Transaction Input
- [ ] **[Figma]** Transaction History / Management

| Score    | Technology                              |
| -------- | --------------------------------------- |
| 5/5      | Use of Local Storage                    |
| 0/5      | Client side state stores                |
| 0/5      | Toasts / global notifications or alerts |
| 0/5      | Error handling                          |
| **2/5**  | Network Calls                           |
| 0/5      | Developer type helping (TypeScript)     |
| 0/5      | 10+ pages/views via a router            |
| **5/5**  | CI/CD pipeline                          |
| 0/9      | 3+ reusable form input components       |
| 0/12     | 4+ reusable layout components           |
| **5/10** | Authentication and user account support |
| 0/5      | Authorized pages and public pages       |

| Score | Experience                                            |
| ----- | ----------------------------------------------------- |
| 0/5   | All experiences mobile friendly                       |
| 0/5   | 3 instances where elements reorder on smaller screens |

- [x] 2 more network calls
- [x] CI / CD Complete
- [x] Authentication

# Check in 3 (Nov 13)

Goals:

- [x] 1 tanstack storage
- [x] Toasts integrated and shown
- [x] Authentication complete
- [x] 1 more network call

Page work:

- [ ] Transaction Input
- [ ] Transaction History / Management
- [ ] **[Figma]** Budget Setup / Management
- [ ] **[Figma]** Recurring Transactions Setup / Management

| Score     | Technology                              |
| --------- | --------------------------------------- |
| 5/5       | Use of Local Storage                    |
| **1/5**   | Client side state stores                |
| **5/5**   | Toasts / global notifications or alerts |
| 0/5       | Error handling                          |
| **3/5**   | Network Calls                           |
| 0/5       | Developer type helping (TypeScript)     |
| 0/5       | 10+ pages/views via a router            |
| 5/5       | CI/CD pipeline                          |
| 0/9       | 3+ reusable form input components       |
| 0/12      | 4+ reusable layout components           |
| **10/10** | Authentication and user account support |
| 0/5       | Authorized pages and public pages       |

| Score | Experience                                            |
| ----- | ----------------------------------------------------- |
| 0/5   | All experiences mobile friendly                       |
| 0/5   | 3 instances where elements reorder on smaller screens |

# Check in 4 (Nov 16)

Goals:

- [x] 4 more tanstack state stores
- [x] Error boundary / handling
- [x] 1 more network call
- [x] 1 reusable input component

Page work:

- [ ] Budget Setup / Management
- [ ] Recurring Transactions Setup / Management
- [ ] **[Figma]** In Depth Reports

| Score   | Technology                              |
| ------- | --------------------------------------- |
| 5/5     | Use of Local Storage                    |
| **5/5** | Client side state stores                |
| 5/5     | Toasts / global notifications or alerts |
| **3/5** | Error handling                          |
| **5/5** | Network Calls                           |
| 0/5     | Developer type helping (TypeScript)     |
| 0/5     | 10+ pages/views via a router            |
| 5/5     | CI/CD pipeline                          |
| **3/9** | 3+ reusable form input components       |
| 0/12    | 4+ reusable layout components           |
| 10/10   | Authentication and user account support |
| 0/5     | Authorized pages and public pages       |

| Score | Experience                                            |
| ----- | ----------------------------------------------------- |
| 0/5   | All experiences mobile friendly                       |
| 0/5   | 3 instances where elements reorder on smaller screens |

# Check in 5 (Nov 20)

Goals:

- [x] Finish error boundary / handling
- [ ] 2 more reusable inputs
- [ ] Page authorization

Page work:

- [ ] In Depth Reports
- [ ] **[Figma]** Settings
- [ ] **[Figma]** User Profile

| Score   | Technology                              |
| ------- | --------------------------------------- |
| 5/5     | Use of Local Storage                    |
| 5/5     | Client side state stores                |
| 5/5     | Toasts / global notifications or alerts |
| **5/5** | Error handling                          |
| 5/5     | Network Calls                           |
| 0/5     | Developer type helping (TypeScript)     |
| 0/5     | 10+ pages/views via a router            |
| 5/5     | CI/CD pipeline                          |
| **9/9** | 3+ reusable form input components       |
| 0/12    | 4+ reusable layout components           |
| 10/10   | Authentication and user account support |
| **3/5** | Authorized pages and public pages       |

| Score | Experience                                            |
| ----- | ----------------------------------------------------- |
| 0/5   | All experiences mobile friendly                       |
| 0/5   | 3 instances where elements reorder on smaller screens |

# Check in 6 (Nov 23)

Goals:

- [ ] 4 pages complete
- [ ] 2 reusable layout components
- [ ] Page authorization complete

Page work:

- [ ] Settings
- [ ] User Profile
- [ ] **[Figma]** Alert Setup Page

| Score    | Technology                              |
| -------- | --------------------------------------- |
| 5/5      | Use of Local Storage                    |
| 5/5      | Client side state stores                |
| 5/5      | Toasts / global notifications or alerts |
| 5/5      | Error handling                          |
| 5/5      | Network Calls                           |
| 0/5      | Developer type helping (TypeScript)     |
| **2/5**  | 10+ pages/views via a router            |
| 5/5      | CI/CD pipeline                          |
| 9/9      | 3+ reusable form input components       |
| **6/12** | 4+ reusable layout components           |
| 10/10    | Authentication and user account support |
| **5/5**  | Authorized pages and public pages       |

| Score | Experience                                            |
| ----- | ----------------------------------------------------- |
| 0/5   | All experiences mobile friendly                       |
| 0/5   | 3 instances where elements reorder on smaller screens |

# Check in 7 (Nov 26)

Goals:

- [ ] 8 pages complete
- [ ] 2 more reusable layout components
- [ ] 2 pages where elements reorder on smaller screens

Page work:

- [ ] Alert Setup Page

| Score     | Technology                              |
| --------- | --------------------------------------- |
| 5/5       | Use of Local Storage                    |
| 5/5       | Client side state stores                |
| 5/5       | Toasts / global notifications or alerts |
| 5/5       | Error handling                          |
| 5/5       | Network Calls                           |
| 0/5       | Developer type helping (TypeScript)     |
| **4/5**   | 10+ pages/views via a router            |
| 5/5       | CI/CD pipeline                          |
| 9/9       | 3+ reusable form input components       |
| **12/12** | 4+ reusable layout components           |
| 10/10     | Authentication and user account support |
| 5/5       | Authorized pages and public pages       |

| Score   | Experience                                            |
| ------- | ----------------------------------------------------- |
| 0/5     | All experiences mobile friendly                       |
| **2/5** | 3 instances where elements reorder on smaller screens |

# Check in 8 (Dec 4)

Goals:

- [ ] Developer type helping
- [ ] 10 pages complete
- [ ] All experiences mobile friendly
- [ ] 2 more instances where elements reorder on smaller screens

| Score   | Technology                              |
| ------- | --------------------------------------- |
| 5/5     | Use of Local Storage                    |
| 5/5     | Client side state stores                |
| 5/5     | Toasts / global notifications or alerts |
| 5/5     | Error handling                          |
| 5/5     | Network Calls                           |
| **5/5** | Developer type helping (TypeScript)     |
| **5/5** | 10+ pages/views via a router            |
| 5/5     | CI/CD pipeline                          |
| 9/9     | 3+ reusable form input components       |
| 12/12   | 4+ reusable layout components           |
| 10/10   | Authentication and user account support |
| 5/5     | Authorized pages and public pages       |

| Score   | Experience                                            |
| ------- | ----------------------------------------------------- |
| **5/5** | All experiences mobile friendly                       |
| **5/5** | 3 instances where elements reorder on smaller screens |
