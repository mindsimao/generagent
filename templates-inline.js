// Inlined templates to avoid CORS issues
const INLINED_TEMPLATES = {
    base: `# Agent Configuration for {{PROJECT_NAME}}

**Generated on:** {{CURRENT_DATE}}

## Project Overview

{{PROJECT_DESCRIPTION}}

## Project Structure

{{PROJECT_STRUCTURE}}

## Tech Stack

{{TECH_STACK}}

## Best Practices

When working on this project, adhere to the following principles:

{{BEST_PRACTICES}}

## Code Style Guidelines

{{STYLE_GUIDE}}

## Testing Requirements

{{TESTING}}

## Key Commands

{{KEY_COMMANDS}}

## Common Workflows

{{WORKFLOWS}}

## When to Stop and Ask for Feedback

{{STOP_CONDITIONS}}

The agent should pause and seek clarification when:
- Requirements are unclear or ambiguous
- Multiple valid approaches exist and choice impacts architecture
- About to make breaking changes
- Encountering unexpected errors or edge cases
- Unsure about business logic or domain-specific rules

## General Instructions

When working on this project:

1. **Context Awareness**: Always consider the full context of the codebase before making changes
2. **Code Quality**: Write clean, maintainable, and well-documented code
3. **Testing**: Ensure all code changes include appropriate tests
4. **Style Consistency**: Follow the established code style guidelines
5. **Security**: Consider security implications in all implementations
6. **Performance**: Optimize for performance where appropriate
7. **Backward Compatibility**: Maintain backward compatibility unless explicitly instructed otherwise
8. **Documentation**: Update documentation when making significant changes

## Communication Guidelines

- **Clarification**: Ask clarifying questions when requirements are unclear
- **Transparency**: Provide context for technical decisions
- **Proactivity**: Suggest improvements when you see opportunities
- **Risk Management**: Flag potential issues or concerns proactively
- **Collaboration**: Work with other agents when tasks overlap

## Workflow

1. Understand the requirement fully before coding
2. Review existing code and patterns
3. Implement changes following project standards
4. Write/update tests
5. Verify the changes work as expected
6. Update relevant documentation

---

*This configuration was generated to help AI agents understand and work effectively with your project. Customize as needed for your specific requirements.*`,

    sections: {
        "techStack": {
            "javascript": {"name": "JavaScript/Node.js", "description": "Modern JavaScript ES6+ with Node.js runtime for backend services (use LTS versions)"},
            "typescript": {"name": "TypeScript", "description": "Strongly-typed superset of JavaScript for improved code quality and developer experience"},
            "python": {"name": "Python", "description": "Python 3.x for backend development, data processing, and scripting (use latest stable version)"},
            "java": {"name": "Java", "description": "Java for enterprise-grade applications and services (use LTS versions)"},
            "go": {"name": "Go", "description": "Go for high-performance, concurrent backend services"},
            "rust": {"name": "Rust", "description": "Rust for memory-safe systems programming and performance-critical code"},
            "csharp": {"name": "C#/.NET", "description": ".NET framework and C# for enterprise applications (use LTS versions)"},
            "php": {"name": "PHP", "description": "PHP for web development and server-side scripting"}
        },
        "frontend": {
            "react": {"name": "React", "description": "React library for building dynamic user interfaces with components"},
            "vue": {"name": "Vue.js", "description": "Progressive framework for building user interfaces"},
            "angular": {"name": "Angular", "description": "Comprehensive platform for building scalable web applications"},
            "svelte": {"name": "Svelte", "description": "Compiler-based framework for building efficient web applications"},
            "vanilla": {"name": "Vanilla JavaScript", "description": "Plain JavaScript without frameworks for maximum flexibility"}
        },
        "testing": {
            "jest": {"name": "Jest", "description": "Delightful JavaScript testing framework with built-in coverage"},
            "pytest": {"name": "Pytest", "description": "Powerful Python testing framework with simple syntax"},
            "mocha": {"name": "Mocha", "description": "Flexible JavaScript test framework running on Node.js"},
            "junit": {"name": "JUnit", "description": "Industry-standard testing framework for Java"},
            "vitest": {"name": "Vitest", "description": "Blazing fast Vite-native testing framework"},
            "cypress": {"name": "Cypress", "description": "End-to-end testing framework for web applications"},
            "playwright": {"name": "Playwright", "description": "Cross-browser automation and testing framework"}
        },
        "bestPractices": {
            "tdd": {"name": "Test-Driven Development (TDD)", "description": "Write tests before implementation to ensure code correctness and design"},
            "solid": {"name": "SOLID Principles", "description": "Follow Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles"},
            "clean-code": {"name": "Clean Code", "description": "Write self-documenting, readable code with meaningful names and simple logic"},
            "dry": {"name": "DRY (Don't Repeat Yourself)", "description": "Avoid code duplication by extracting reusable components and utilities"},
            "security": {"name": "Security-First Development", "description": "Prioritize security in design and implementation, validate all inputs, use secure dependencies"},
            "performance": {"name": "Performance Optimization", "description": "Consider performance implications, optimize critical paths, use efficient algorithms"},
            "accessibility": {"name": "Accessibility (a11y)", "description": "Ensure WCAG compliance, semantic HTML, keyboard navigation, and screen reader support"}
        },
        "styleGuide": {
            "eslint": {"name": "ESLint", "description": "Use ESLint for JavaScript/TypeScript linting with project-specific rules"},
            "prettier": {"name": "Prettier", "description": "Use Prettier for consistent code formatting across the codebase"},
            "black": {"name": "Black", "description": "Use Black - The uncompromising Python code formatter"},
            "pylint": {"name": "Pylint", "description": "Use Pylint for Python code analysis and quality checks"},
            "pep8": {"name": "PEP 8", "description": "Follow PEP 8 style guide for Python code"}
        }
    }
};
