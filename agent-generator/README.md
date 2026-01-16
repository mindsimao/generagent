# Agent Generator

A tool to generate AI agent configuration files (AGENTS.md) for your projects.

## Features

- Interactive questionnaire to capture project details
- Live preview of generated configuration
- Customizable tech stack, frameworks, and best practices
- Sub-agent configuration suggestions
- Dark theme with Mindera-inspired design

## How to Run

### Option 1: Using Python HTTP Server (Recommended)

```bash
# Navigate to the agent-generator directory
cd agent-generator

# Start a local server (Python 3)
python3 -m http.server 8000

# Open in browser
# Visit: http://localhost:8000
```

### Option 2: Using Node.js HTTP Server

```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to the agent-generator directory
cd agent-generator

# Start server
http-server -p 8000

# Open in browser
# Visit: http://localhost:8000
```

### Option 3: Using VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Open the `agent-generator` folder in VS Code
3. Right-click on `index.html`
4. Select "Open with Live Server"

## Why Do I Need a Server?

The application loads template files (JSON, markdown) using JavaScript fetch API. 
Modern browsers block these requests when opening HTML files directly (`file://` protocol) for security reasons (CORS policy).

Running a local server solves this by serving files over HTTP.

## Usage

1. Fill out the questionnaire sections:
   - Basic Information (project name, description, structure)
   - Tech Stack (select your technologies)
   - Testing Frameworks
   - Best Practices
   - Code Style & Linters
   - Workflows & Commands

2. Watch the live preview update as you type

3. Toggle sections on/off using checkboxes

4. Download the generated `AGENTS.md` file

5. Preview and download suggested sub-agent configurations

## Technologies

- HTML5
- CSS3 (with dark theme and gold accents)
- Vanilla JavaScript (ES6+)
- No build process required

## License

MIT
