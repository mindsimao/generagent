// Template engine and state management
class AgentGenerator {
    constructor() {
        this.state = {
            projectName: '',
            projectDescription: '',
            projectStructure: '',
            keyCommands: '',
            workflows: '',
            stopConditions: '',
            techStack: [],
            frontend: [],
            testing: [],
            practices: [],
            style: [],
            agents: [],
            versions: {}, // Store versions for each technology
            descriptions: {}, // Store role descriptions for each technology
            customTech: [], // Store custom technologies
            customFrontend: [],
            customTesting: [],
            customLinters: []
        };
        
        this.templates = {};
        this.init();
    }

    async init() {
        await this.loadTemplates();
        this.attachEventListeners();
        this.setupCollapsible();
        this.updatePreview();
    }

    async loadTemplates() {
        try {
            // Load all templates
            const [baseTemplate, sections, agentTemplates] = await Promise.all([
                fetch('templates/agents/base-template.md').then(r => r.text()),
                fetch('templates/sections/sections.json').then(r => r.json()),
                fetch('templates/agents/agent-templates.json').then(r => r.json())
            ]);

            this.templates.base = baseTemplate;
            this.templates.sections = sections;
            this.templates.agents = agentTemplates;
        } catch (error) {
            console.error('Error loading templates:', error);
            this.templates.base = this.getFallbackTemplate();
            this.templates.sections = this.getFallbackSections();
            this.templates.agents = this.getFallbackAgentTemplates();
        }
    }

    attachEventListeners() {
        // Text inputs
        document.getElementById('project-name').addEventListener('input', (e) => {
            this.state.projectName = e.target.value;
            this.updatePreview();
        });

        document.getElementById('project-description').addEventListener('input', (e) => {
            this.state.projectDescription = e.target.value;
            this.updatePreview();
        });

        document.getElementById('project-structure').addEventListener('input', (e) => {
            this.state.projectStructure = e.target.value;
            this.updatePreview();
        });

        document.getElementById('key-commands').addEventListener('input', (e) => {
            this.state.keyCommands = e.target.value;
            this.updatePreview();
        });

        document.getElementById('workflows').addEventListener('input', (e) => {
            this.state.workflows = e.target.value;
            this.updatePreview();
        });

        document.getElementById('stop-conditions').addEventListener('input', (e) => {
            this.state.stopConditions = e.target.value;
            this.updatePreview();
        });

        // Checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateState();
                this.updatePreview();
            });
        });

        // Version inputs
        document.querySelectorAll('.version-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const tech = e.target.dataset.tech;
                this.state.versions[tech] = e.target.value;
                this.updatePreview();
            });
        });

        // Description inputs
        document.querySelectorAll('.description-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const tech = e.target.dataset.tech;
                this.state.descriptions[tech] = e.target.value;
                this.updatePreview();
            });
        });

        // Custom tech buttons
        this.setupCustomTechHandler('tech', 'custom-tech-name', 'custom-tech-version', 'custom-tech-description', 'add-custom-tech', 'custom-tech-list', 'customTech');
        this.setupCustomTechHandler('frontend', 'custom-frontend-name', 'custom-frontend-version', 'custom-frontend-description', 'add-custom-frontend', 'custom-frontend-list', 'customFrontend');
        this.setupCustomTechHandler('testing', 'custom-testing-name', 'custom-testing-version', 'custom-testing-description', 'add-custom-testing', 'custom-testing-list', 'customTesting');
        
        // Custom linter handler (no version field)
        this.setupCustomLinterHandler();

        // Download button
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadAllConfigurations();
        });
    }

    setupCollapsible() {
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isCollapsed = content.classList.contains('collapsed');
                
                if (isCollapsed) {
                    // Expand
                    content.classList.remove('collapsed');
                    content.classList.add('active');
                    header.classList.remove('collapsed');
                    header.querySelector('.collapse-icon').textContent = '−';
                } else {
                    // Collapse
                    content.classList.remove('active');
                    content.classList.add('collapsed');
                    header.classList.add('collapsed');
                    header.querySelector('.collapse-icon').textContent = '+';
                }
            });
        });
    }

    setupCustomLinterHandler() {
        document.getElementById('add-custom-linter').addEventListener('click', () => {
            const nameInput = document.getElementById('custom-linter-name');
            const descInput = document.getElementById('custom-linter-description');
            const name = nameInput.value.trim();
            const description = descInput.value.trim();

            if (name) {
                this.state.customLinters.push({ name, description });
                nameInput.value = '';
                descInput.value = '';
                this.renderCustomLinterList();
                this.updatePreview();
            }
        });

        ['custom-linter-name', 'custom-linter-description'].forEach(inputId => {
            document.getElementById(inputId).addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('add-custom-linter').click();
                }
            });
        });
    }

    renderCustomLinterList() {
        const container = document.getElementById('custom-linter-list');
        container.innerHTML = '';
        
        this.state.customLinters.forEach((item, index) => {
            const tag = document.createElement('div');
            tag.className = 'custom-tech-tag';
            const descText = item.description ? ` - ${item.description}` : '';
            tag.innerHTML = `
                <span>${item.name}${descText}</span>
                <button class="remove-btn" data-index="${index}">×</button>
            `;
            
            tag.querySelector('.remove-btn').addEventListener('click', () => {
                this.state.customLinters.splice(index, 1);
                this.renderCustomLinterList();
                this.updatePreview();
            });
            
            container.appendChild(tag);
        });
    }

    setupCustomTechHandler(category, nameInputId, versionInputId, descriptionInputId, buttonId, listId, stateKey) {
        document.getElementById(buttonId).addEventListener('click', () => {
            const nameInput = document.getElementById(nameInputId);
            const versionInput = document.getElementById(versionInputId);
            const descriptionInput = document.getElementById(descriptionInputId);
            const name = nameInput.value.trim();
            const version = versionInput.value.trim();
            const description = descriptionInput.value.trim();

            if (name) {
                this.state[stateKey].push({ name, version, description });
                nameInput.value = '';
                versionInput.value = '';
                descriptionInput.value = '';
                this.renderCustomTechList(listId, stateKey);
                this.updatePreview();
            }
        });

        // Allow Enter key to add
        [nameInputId, versionInputId, descriptionInputId].forEach(inputId => {
            document.getElementById(inputId).addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById(buttonId).click();
                }
            });
        });
    }

    renderCustomTechList(listId, stateKey) {
        const container = document.getElementById(listId);
        container.innerHTML = '';
        
        this.state[stateKey].forEach((item, index) => {
            const tag = document.createElement('div');
            tag.className = 'custom-tech-tag';
            const versionText = item.version ? ` ${item.version}` : '';
            const descText = item.description ? ` - ${item.description}` : '';
            tag.innerHTML = `
                <span>${item.name}${versionText}${descText}</span>
                <button class="remove-btn" data-index="${index}">×</button>
            `;
            
            tag.querySelector('.remove-btn').addEventListener('click', () => {
                this.state[stateKey].splice(index, 1);
                this.renderCustomTechList(listId, stateKey);
                this.updatePreview();
            });
            
            container.appendChild(tag);
        });
    }

    updateState() {
        this.state.techStack = this.getCheckedValues('tech');
        this.state.frontend = this.getCheckedValues('frontend');
        this.state.testing = this.getCheckedValues('testing');
        this.state.practices = this.getCheckedValues('practices');
        this.state.style = this.getCheckedValues('style');
        this.state.agents = this.getCheckedValues('agents');
    }

    getCheckedValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
            .map(cb => cb.value);
    }

    updatePreview() {
        const agentsMd = this.generateAgentsMd();
        document.getElementById('preview-output').innerHTML = `<code>${this.escapeHtml(agentsMd)}</code>`;
        
        this.renderSubAgents();
    }

    generateAgentsMd() {
        const template = this.templates.base;
        const sections = this.templates.sections;

        // Build sections
        const techStackSection = this.buildTechStackSection(sections);
        const bestPracticesSection = this.buildBestPracticesSection(sections);
        const styleGuideSection = this.buildStyleGuideSection(sections);
        const testingSection = this.buildTestingSection(sections);
        
        // Format new sections
        const projectStructure = this.state.projectStructure || 'Standard project structure';
        const keyCommands = this.state.keyCommands || 'No specific commands defined';
        const workflows = this.state.workflows || 'Follow standard development workflows';
        const stopConditions = this.state.stopConditions || 'Use judgment to determine when clarification is needed';

        // Replace placeholders
        let output = template
            .replace('{{PROJECT_NAME}}', this.state.projectName || 'Your Project')
            .replace('{{PROJECT_DESCRIPTION}}', this.state.projectDescription || 'A description of your project')
            .replace('{{PROJECT_STRUCTURE}}', projectStructure)
            .replace('{{TECH_STACK}}', techStackSection)
            .replace('{{BEST_PRACTICES}}', bestPracticesSection)
            .replace('{{STYLE_GUIDE}}', styleGuideSection)
            .replace('{{TESTING}}', testingSection)
            .replace('{{KEY_COMMANDS}}', keyCommands)
            .replace('{{WORKFLOWS}}', workflows)
            .replace('{{STOP_CONDITIONS}}', stopConditions)
            .replace('{{CURRENT_DATE}}', new Date().toISOString().split('T')[0]);

        return output;
    }

    buildTechStackSection(sections) {
        const lines = [];
        
        if (this.state.techStack.length > 0) {
            lines.push('**Primary Languages/Frameworks:**');
            this.state.techStack.forEach(tech => {
                const info = sections.techStack[tech] || { name: tech, description: '' };
                const version = this.state.versions[tech] ? ` (${this.state.versions[tech]})` : '';
                const roleDesc = this.state.descriptions[tech] ? ` - ${this.state.descriptions[tech]}` : '';
                const baseDesc = info.description || '';
                const fullDesc = roleDesc ? `${roleDesc}. ${baseDesc}` : baseDesc;
                lines.push(`- **${info.name}${version}**: ${fullDesc}`);
            });
        }

        // Add custom tech stack items
        if (this.state.customTech.length > 0) {
            if (lines.length === 0) lines.push('**Primary Languages/Frameworks:**');
            this.state.customTech.forEach(item => {
                const version = item.version ? ` (${item.version})` : '';
                const desc = item.description ? `: ${item.description}` : '';
                lines.push(`- **${item.name}${version}**${desc}`);
            });
        }

        if (this.state.frontend.length > 0) {
            lines.push('\n**Frontend:**');
            this.state.frontend.forEach(fw => {
                const info = sections.frontend[fw] || { name: fw, description: '' };
                const version = this.state.versions[fw] ? ` (${this.state.versions[fw]})` : '';
                const roleDesc = this.state.descriptions[fw] ? ` - ${this.state.descriptions[fw]}` : '';
                const baseDesc = info.description || '';
                const fullDesc = roleDesc ? `${roleDesc}. ${baseDesc}` : baseDesc;
                lines.push(`- **${info.name}${version}**: ${fullDesc}`);
            });
        }

        // Add custom frontend items
        if (this.state.customFrontend.length > 0) {
            if (lines.length > 0 && !lines[lines.length - 1].includes('**Frontend:**')) {
                lines.push('\n**Frontend:**');
            }
            this.state.customFrontend.forEach(item => {
                const version = item.version ? ` (${item.version})` : '';
                const desc = item.description ? `: ${item.description}` : '';
                lines.push(`- **${item.name}${version}**${desc}`);
            });
        }

        return lines.length > 0 ? lines.join('\n') : 'Not specified';
    }

    buildBestPracticesSection(sections) {
        if (this.state.practices.length === 0) return 'Follow standard industry best practices';

        const lines = this.state.practices.map(practice => {
            const info = sections.bestPractices[practice] || { name: practice, description: '' };
            return `- **${info.name}**: ${info.description}`;
        });

        return lines.join('\n');
    }

    buildStyleGuideSection(sections) {
        const lines = [];
        
        if (this.state.style.length > 0) {
            this.state.style.forEach(style => {
                const info = sections.styleGuide[style] || { name: style, description: '' };
                lines.push(`- **${info.name}**: ${info.description}`);
            });
        }

        // Add custom linters
        if (this.state.customLinters.length > 0) {
            this.state.customLinters.forEach(item => {
                const desc = item.description ? `: ${item.description}` : '';
                lines.push(`- **${item.name}**${desc}`);
            });
        }

        return lines.length > 0 ? lines.join('\n') : 'Follow standard code style conventions';
    }

    buildTestingSection(sections) {
        if (this.state.testing.length === 0 && this.state.customTesting.length === 0) {
            return 'Write tests as appropriate for the codebase';
        }

        const lines = ['Use the following testing frameworks:'];
        
        this.state.testing.forEach(test => {
            const info = sections.testing[test] || { name: test, description: '' };
            const version = this.state.versions[test] ? ` (${this.state.versions[test]})` : '';
            const roleDesc = this.state.descriptions[test] ? ` - ${this.state.descriptions[test]}` : '';
            const baseDesc = info.description || '';
            const fullDesc = roleDesc ? `${roleDesc}. ${baseDesc}` : baseDesc;
            lines.push(`- **${info.name}${version}**: ${fullDesc}`);
        });

        // Add custom testing items
        this.state.customTesting.forEach(item => {
            const version = item.version ? ` (${item.version})` : '';
            const desc = item.description ? `: ${item.description}` : '';
            lines.push(`- **${item.name}${version}**${desc}`);
        });

        return lines.join('\n');
    }

    renderSubAgents() {
        const container = document.getElementById('sub-agents-preview');
        
        if (this.state.agents.length === 0) {
            container.innerHTML = '';
            return;
        }

        container.innerHTML = '<h3 style="margin-bottom: 15px; color: #333;">Suggested Sub-Agents</h3>';
        
        this.state.agents.forEach(agentType => {
            const agentConfig = this.templates.agents[agentType];
            if (!agentConfig) return;

            const card = document.createElement('div');
            card.className = 'sub-agent-card';
            card.innerHTML = `
                <h3>${agentConfig.name}</h3>
                <p>${agentConfig.description}</p>
                <button class="download-sub-agent" data-agent="${agentType}">
                    Download ${agentConfig.name} Config
                </button>
            `;
            
            card.querySelector('.download-sub-agent').addEventListener('click', () => {
                this.downloadSubAgent(agentType);
            });
            
            container.appendChild(card);
        });
    }

    generateSubAgentConfig(agentType) {
        const agentConfig = this.templates.agents[agentType];
        if (!agentConfig) return '';

        let config = agentConfig.template
            .replace('{{PROJECT_NAME}}', this.state.projectName || 'Your Project')
            .replace('{{PROJECT_DESCRIPTION}}', this.state.projectDescription || 'A description of your project');

        // Add tech-specific instructions
        const allTech = [
            ...this.state.techStack.map(t => {
                const version = this.state.versions[t] ? ` ${this.state.versions[t]}` : '';
                const desc = this.state.descriptions[t] ? ` (${this.state.descriptions[t]})` : '';
                return t + version + desc;
            }),
            ...this.state.customTech.map(t => {
                const version = t.version ? ` ${t.version}` : '';
                const desc = t.description ? ` (${t.description})` : '';
                return `${t.name}${version}${desc}`;
            })
        ];
        
        if (allTech.length > 0) {
            const techList = allTech.join(', ');
            config = config.replace('{{TECH_CONTEXT}}', `This project uses: ${techList}.`);
        } else {
            config = config.replace('{{TECH_CONTEXT}}', '');
        }

        return config;
    }

    downloadSubAgent(agentType) {
        const config = this.generateSubAgentConfig(agentType);
        const agentConfig = this.templates.agents[agentType];
        const filename = `${agentConfig.filename || agentType + '-agent'}.md`;
        
        this.downloadFile(config, filename);
    }

    downloadAllConfigurations() {
        // Download main AGENTS.md
        const agentsMd = this.generateAgentsMd();
        this.downloadFile(agentsMd, 'AGENTS.md');

        // Download all sub-agent configs
        this.state.agents.forEach(agentType => {
            setTimeout(() => {
                this.downloadSubAgent(agentType);
            }, 100);
        });
    }

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    getFallbackTemplate() {
        return `# Agent Configuration for {{PROJECT_NAME}}

**Generated on:** {{CURRENT_DATE}}

## Project Overview

{{PROJECT_DESCRIPTION}}

## Tech Stack

{{TECH_STACK}}

## Best Practices

{{BEST_PRACTICES}}

## Code Style Guidelines

{{STYLE_GUIDE}}

## Testing Requirements

{{TESTING}}

## General Instructions

When working on this project:

1. Always follow the tech stack and best practices outlined above
2. Write clean, maintainable, and well-documented code
3. Ensure all code changes include appropriate tests
4. Follow the established code style guidelines
5. Consider security implications in all implementations
6. Optimize for performance where appropriate
7. Maintain backward compatibility unless explicitly instructed otherwise

## Communication

- Ask clarifying questions when requirements are unclear
- Provide context for technical decisions
- Suggest improvements when you see opportunities
- Flag potential issues or concerns proactively
`;
    }

    getFallbackSections() {
        return {
            techStack: {
                javascript: { name: 'JavaScript/Node.js', description: 'Modern JavaScript ES6+ and Node.js runtime' },
                typescript: { name: 'TypeScript', description: 'Typed superset of JavaScript' },
                python: { name: 'Python', description: 'Python 3.x for backend and scripting' },
                java: { name: 'Java', description: 'Java for enterprise applications' },
                go: { name: 'Go', description: 'Go for high-performance backend services' },
                rust: { name: 'Rust', description: 'Rust for systems programming' },
                csharp: { name: 'C#/.NET', description: '.NET framework and C#' },
                php: { name: 'PHP', description: 'PHP for web development' }
            },
            frontend: {
                react: { name: 'React', description: 'React for building user interfaces' },
                vue: { name: 'Vue.js', description: 'Progressive JavaScript framework' },
                angular: { name: 'Angular', description: 'Platform for building web applications' },
                svelte: { name: 'Svelte', description: 'Cybernetically enhanced web apps' },
                vanilla: { name: 'Vanilla JS', description: 'Plain JavaScript without frameworks' }
            },
            testing: {
                jest: { name: 'Jest', description: 'JavaScript testing framework' },
                pytest: { name: 'Pytest', description: 'Python testing framework' },
                mocha: { name: 'Mocha', description: 'JavaScript test framework' },
                junit: { name: 'JUnit', description: 'Java testing framework' },
                vitest: { name: 'Vitest', description: 'Vite-native testing framework' },
                cypress: { name: 'Cypress', description: 'End-to-end testing framework' },
                playwright: { name: 'Playwright', description: 'Browser automation and testing' }
            },
            bestPractices: {
                tdd: { name: 'Test-Driven Development', description: 'Write tests before implementation' },
                solid: { name: 'SOLID Principles', description: 'Follow SOLID design principles' },
                'clean-code': { name: 'Clean Code', description: 'Write readable and maintainable code' },
                dry: { name: 'DRY', description: 'Don\'t repeat yourself - avoid code duplication' },
                security: { name: 'Security-First', description: 'Prioritize security in all implementations' },
                performance: { name: 'Performance', description: 'Optimize for performance and scalability' },
                accessibility: { name: 'Accessibility', description: 'Ensure WCAG compliance and a11y best practices' }
            },
            styleGuide: {
                eslint: { name: 'ESLint', description: 'Use ESLint for JavaScript linting' },
                prettier: { name: 'Prettier', description: 'Use Prettier for code formatting' },
                black: { name: 'Black', description: 'Use Black for Python code formatting' },
                pylint: { name: 'Pylint', description: 'Use Pylint for Python code analysis' },
                pep8: { name: 'PEP 8', description: 'Follow PEP 8 style guide for Python' }
            }
        };
    }

    getFallbackAgentTemplates() {
        return {
            documentation: {
                name: 'Documentation Expert',
                filename: 'documentation-agent',
                description: 'Specializes in writing clear, comprehensive documentation',
                template: `# Documentation Agent Configuration

You are a documentation expert for {{PROJECT_NAME}}.

{{PROJECT_DESCRIPTION}}

## Responsibilities

- Write and maintain clear, comprehensive documentation
- Create and update README files, API docs, and guides
- Ensure documentation stays in sync with code changes
- Follow documentation best practices and style guides
- Make complex concepts accessible to different audiences

{{TECH_CONTEXT}}

## Documentation Standards

- Use clear, concise language
- Include code examples where appropriate
- Keep documentation up-to-date with code changes
- Use proper markdown formatting
- Include diagrams and visuals when helpful
`
            },
            refactoring: {
                name: 'Code Refactoring Agent',
                filename: 'refactoring-agent',
                description: 'Focuses on improving code quality and structure',
                template: `# Code Refactoring Agent Configuration

You are a code refactoring specialist for {{PROJECT_NAME}}.

{{PROJECT_DESCRIPTION}}

## Responsibilities

- Identify opportunities for code improvement
- Refactor code to improve readability and maintainability
- Eliminate code duplication and technical debt
- Improve code structure and design patterns
- Ensure refactoring doesn't break existing functionality

{{TECH_CONTEXT}}

## Refactoring Principles

- Make small, incremental changes
- Always maintain test coverage
- Improve code without changing behavior
- Follow established design patterns
- Document significant structural changes
`
            },
            testing: {
                name: 'Testing Specialist',
                filename: 'testing-agent',
                description: 'Ensures comprehensive test coverage and quality',
                template: `# Testing Agent Configuration

You are a testing specialist for {{PROJECT_NAME}}.

{{PROJECT_DESCRIPTION}}

## Responsibilities

- Write comprehensive unit, integration, and e2e tests
- Ensure high test coverage
- Identify edge cases and write tests for them
- Maintain and improve existing tests
- Follow testing best practices and patterns

{{TECH_CONTEXT}}

## Testing Standards

- Aim for high code coverage (>80%)
- Write clear, descriptive test names
- Test edge cases and error conditions
- Keep tests maintainable and fast
- Use appropriate testing patterns (AAA, Given-When-Then)
`
            },
            security: {
                name: 'Security Auditor',
                filename: 'security-agent',
                description: 'Identifies and fixes security vulnerabilities',
                template: `# Security Agent Configuration

You are a security auditor for {{PROJECT_NAME}}.

{{PROJECT_DESCRIPTION}}

## Responsibilities

- Identify security vulnerabilities and risks
- Review code for security best practices
- Ensure proper authentication and authorization
- Check for common security issues (OWASP Top 10)
- Recommend security improvements

{{TECH_CONTEXT}}

## Security Focus Areas

- Input validation and sanitization
- Authentication and authorization
- Data encryption and protection
- Secure API design
- Dependency vulnerabilities
- Security headers and configurations
`
            },
            performance: {
                name: 'Performance Optimizer',
                filename: 'performance-agent',
                description: 'Optimizes code and system performance',
                template: `# Performance Optimization Agent Configuration

You are a performance optimization specialist for {{PROJECT_NAME}}.

{{PROJECT_DESCRIPTION}}

## Responsibilities

- Identify performance bottlenecks
- Optimize slow code and queries
- Improve resource utilization
- Implement caching strategies
- Monitor and measure performance improvements

{{TECH_CONTEXT}}

## Optimization Focus

- Database query optimization
- Algorithm efficiency
- Memory usage and management
- Network request optimization
- Caching strategies
- Lazy loading and code splitting
`
            },
            api: {
                name: 'API Developer',
                filename: 'api-agent',
                description: 'Designs and implements robust APIs',
                template: `# API Development Agent Configuration

You are an API development specialist for {{PROJECT_NAME}}.

{{PROJECT_DESCRIPTION}}

## Responsibilities

- Design RESTful or GraphQL APIs
- Implement API endpoints following best practices
- Ensure proper error handling and validation
- Write API documentation
- Implement versioning and backward compatibility

{{TECH_CONTEXT}}

## API Standards

- Follow REST/GraphQL best practices
- Use proper HTTP status codes
- Implement consistent error responses
- Validate all inputs
- Document all endpoints
- Consider rate limiting and pagination
`
            },
            database: {
                name: 'Database Expert',
                filename: 'database-agent',
                description: 'Manages database design and optimization',
                template: `# Database Agent Configuration

You are a database specialist for {{PROJECT_NAME}}.

{{PROJECT_DESCRIPTION}}

## Responsibilities

- Design efficient database schemas
- Write optimized queries
- Implement proper indexing strategies
- Ensure data integrity and consistency
- Handle migrations and schema changes

{{TECH_CONTEXT}}

## Database Best Practices

- Normalize data appropriately
- Use proper indexing
- Optimize query performance
- Implement transactions where needed
- Handle migrations safely
- Consider scalability
`
            }
        };
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new AgentGenerator();
});
