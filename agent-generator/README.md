# 🤖 Agent Configuration Generator

A simple, lightweight web application that generates custom AI agent configurations for your projects. No backend, no database, no LLM calls needed - just answer a few questions and get instant, customized configuration files.

## Features

- ✨ **Real-time Preview**: See your configuration update as you answer questions
- 📦 **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript
- 🎨 **Beautiful UI**: Modern, responsive design with live updates
- 📥 **Instant Download**: Download AGENTS.md and sub-agent configs
- 🔧 **Template-Based**: Easy to customize and extend templates
- 🚀 **No Backend Required**: Run entirely in the browser

## How It Works

1. **Fill out the questionnaire** with details about your project:
   - Project name and description
   - Tech stack (JavaScript, Python, Java, etc.)
   - Frontend frameworks (React, Vue, etc.)
   - Testing frameworks (Jest, Pytest, etc.)
   - Best practices (TDD, SOLID, Security-first, etc.)
   - Code style preferences (ESLint, Prettier, etc.)
   - Additional specialized agents needed

2. **Watch the preview update** in real-time as you make selections

3. **Download configurations** for your main AGENTS.md file and any specialized sub-agents

## Quick Start

### Option 1: Open Locally

Simply open `index.html` in your web browser:

```bash
open index.html
# or
firefox index.html
# or
chrome index.html
```

### Option 2: Use a Local Server

If you encounter CORS issues loading templates, serve with a local server:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000`

## Project Structure

```
agent-generator/
├── index.html              # Main application UI
├── styles.css              # Styling
├── app.js                  # Application logic
├── README.md               # This file
└── templates/
    ├── agents/
    │   ├── base-template.md       # Main AGENTS.md template
    │   └── agent-templates.json   # Sub-agent templates
    └── sections/
        └── sections.json          # Content sections for different options
```

## Customizing Templates

### Modifying the Main Template

Edit `templates/agents/base-template.md` to customize the main AGENTS.md output. Use placeholders:

- `{{PROJECT_NAME}}` - Project name from input
- `{{PROJECT_DESCRIPTION}}` - Project description
- `{{TECH_STACK}}` - Generated tech stack section
- `{{BEST_PRACTICES}}` - Generated best practices section
- `{{STYLE_GUIDE}}` - Generated style guide section
- `{{TESTING}}` - Generated testing section
- `{{CURRENT_DATE}}` - Current date

### Adding New Tech Stack Options

Edit `templates/sections/sections.json` and add entries to the appropriate sections:

```json
{
  "techStack": {
    "your-tech": {
      "name": "Your Technology",
      "description": "Description of the technology"
    }
  }
}
```

Then update `index.html` to add the checkbox option.

### Creating New Sub-Agents

Add new agent configurations to `templates/agents/agent-templates.json`:

```json
{
  "your-agent": {
    "name": "Your Agent Name",
    "filename": "your-agent",
    "description": "What this agent does",
    "template": "# Your Agent Configuration\n\n{{PROJECT_NAME}}\n\n..."
  }
}
```

Then add a checkbox in `index.html` under "Additional Agents Needed".

## Use Cases

Perfect for:

- **Project Setup**: Generate agent configs when starting new projects
- **Team Onboarding**: Create consistent guidelines for AI agent assistance
- **Documentation**: Generate structured documentation for your tech stack
- **Best Practices**: Ensure AI agents follow your team's standards
- **Specialized Tasks**: Configure agents for specific roles (testing, security, etc.)

## Generated Files

### AGENTS.md
The main configuration file that provides AI agents with:
- Project overview and description
- Technology stack details
- Best practices and coding standards
- Testing requirements
- General instructions and workflows

### Sub-Agent Configurations
Specialized agent files based on your selections:
- **documentation-agent.md** - Documentation writing expert
- **refactoring-agent.md** - Code refactoring specialist
- **testing-agent.md** - Testing and QA specialist
- **security-agent.md** - Security auditor
- **performance-agent.md** - Performance optimizer
- **api-agent.md** - API development expert
- **database-agent.md** - Database design specialist

## Browser Support

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Want to improve the templates or add new features?

1. Templates are in `templates/` directory
2. Modify `app.js` for new features
3. Update `styles.css` for styling changes
4. Test in multiple browsers

## License

MIT License - feel free to use and modify as needed!

## Tips

- **Start Simple**: Fill out basic info first, then add more details
- **Iterate**: Download, review, and regenerate with adjustments
- **Customize**: Edit downloaded files to match your exact needs
- **Version Control**: Commit generated files to your project repo
- **Team Alignment**: Use this to ensure team consistency with AI assistance

---

Built with ❤️ using vanilla JavaScript - no frameworks, no build tools, just the web platform.
