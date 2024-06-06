# DocuMentorAI

## Purpose of the software

Repository for the Information Systems Project Development Course
Enterprise LLM application.
DocuMentorAI aims to enable users to manage and interact with documents (Product + Legal Documents).It provides tools for document retrieval and summarization, aimed at enhancing productivity and decision-making processes.

### Main Features
- Secure Authentification
- Document Retrieval and Summarization
- User-Friendly Interface

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v12 or higher)
- PostgreSQL

### Installation

1. Clone the repository:
   - git clone <repository-url>
   - cd <repository-directory>/client
2. Install dependencies:
   - npm install
  
## Deployment

1. Build angular application:
   - 'ng serve'
2. Start server:
   - cd <repository-directory>/server
   - 'node server.js'
   - Server is running and accessible at 'http://localhost:3000'
  
## Running Tests

### Unit Tests + Integration Test (Jasmine)

1. Navigate to server directory
   - cd <repository-directory>/server
2. Run:
   - 'npx jasmine'

### Integration Test Cypress

1. Start the Server
   - 'node server.js'
2. Start the Angular application:
   - 'ng serve'
3. Run Cypress tests:
   - 'npm run integration-tests'


## How to Use

### Access to the Application

Open your browser and navigate to http://localhost:3000 to access the front-end application.

### Authentification

1. Register with username, email address, and password as a new user.
2. Login with existing credentials.

### Document Display

1. Navigate to "All Documents" in the navigation.
2. All documents are displayed.
3. Click on "Show Document" for displaying/hiding the content of a document.
4. CLick on "Show Summary" for displaying/hiding the content of a summary.
   	-> Unfortunately the summary is not shown in the application, but only in the 	   console.

### Document Search

1. Navigate to "Document Search" in the navigation.
2. Write the search prompt to find documents and submit by clicking on "Retrieve  
   Documents".
3. Click on "Show Document" for displaying/hiding the content of a document.
4. CLick on "Show Summary" for displaying/hiding the content of a summary.
   	-> Unfortunately the summary is not shown in the application, but only in the 	   console.
