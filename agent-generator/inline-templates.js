// Script to generate inlined templates

const fs = require('fs');

// Read template files
const baseTemplate = fs.readFileSync('templates/agents/base-template.md', 'utf8');
const sections = JSON.parse(fs.readFileSync('templates/sections/sections.json', 'utf8'));
const agentTemplates = JSON.parse(fs.readFileSync('templates/agents/agent-templates.json', 'utf8'));

// Generate the loadTemplates function
const code = `    async loadTemplates() {
        // Inline all templates to avoid CORS issues when opening HTML directly
        this.templates.base = ${JSON.stringify(baseTemplate)};
        
        this.templates.sections = ${JSON.stringify(sections, null, 8)};
        
        this.templates.agents = ${JSON.stringify(agentTemplates, null, 8)};
    }`;

console.log(code);
