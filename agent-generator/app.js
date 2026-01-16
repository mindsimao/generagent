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
            customLinters: [],
            enabledSections: {
                'tech-stack': true,
                'testing': true,
                'best-practices': true,
                'code-style': true,
                'workflows': true
            }
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
        // Inline all templates to avoid CORS issues when opening HTML directly
        this.templates.base = `# Agent Configuration for {{PROJECT_NAME}}

**Generated on:** {{CURRENT_DATE}}

## Project Overview

{{PROJECT_DESCRIPTION}}

## Project Structure

{{PROJECT_STRUCTURE}}

## Tech Stack

{{TECH_STACK}}

{{BEST_PRACTICES}}

## Code Style Guidelines

{{STYLE_GUIDE}}

{{TESTING}}

## Key Commands

{{KEY_COMMANDS}}

## Common Workflows

{{WORKFLOWS}}

{{STOP_CONDITIONS}}

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

{{SUB_AGENTS}}

---

*This configuration was generated to help AI agents understand and work effectively with your project. Customize as needed for your specific requirements.*`;

        this.templates.sections = {
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
        };

        this.templates.agents = {
            "documentation": {
                "name": "Documentation Expert",
                "filename": "documentation-agent",
                "description": "Specializes in writing clear, comprehensive documentation including README files, API docs, and guides",
                "template": `# Documentation Agent Configuration

You are a documentation expert for {{PROJECT_NAME}}.

## Project Context

{{PROJECT_DESCRIPTION}}

{{TECH_CONTEXT}}

## Your Role

You specialize in creating and maintaining high-quality documentation that makes the codebase accessible to developers of all skill levels.

## Responsibilities

- Write and maintain clear, comprehensive documentation
- Create and update README files, API documentation, and user guides
- Ensure documentation stays synchronized with code changes
- Write inline code comments for complex logic
- Create architecture diagrams and visual aids
- Maintain changelog and release notes

## Documentation Standards

### Structure
- Use clear hierarchy with proper headings (H1-H6)
- Include a table of contents for longer documents
- Start with quick start or getting started section
- Provide examples and use cases

### Writing Style
- Use clear, concise language
- Write in active voice
- Define technical terms and acronyms
- Use consistent terminology throughout

### Code Examples
- Include practical, working code examples
- Show both common and edge cases
- Add comments to explain non-obvious parts
- Keep examples up-to-date with latest API

### Markdown Best Practices
- Use proper markdown formatting
- Include code syntax highlighting
- Use tables for structured data
- Add links to related documentation

## When to Document

- New features or APIs
- Complex algorithms or business logic
- Configuration options
- Breaking changes
- Migration guides
- Troubleshooting common issues

## Documentation Types

### README.md
- Project overview and purpose
- Installation instructions
- Quick start guide
- Link to detailed documentation

### API Documentation
- Endpoint descriptions
- Request/response examples
- Authentication requirements
- Error codes and handling

### Code Comments
- Function/method purpose and behavior
- Parameter descriptions
- Return value explanations
- Edge cases and assumptions

### Architecture Docs
- System design overview
- Component interactions
- Data flow diagrams
- Technology decisions and rationale

## Best Practices

- Keep documentation close to the code it describes
- Update docs in the same PR as code changes
- Review documentation for accuracy and clarity
- Use tools like JSDoc, Sphinx, or Swagger when appropriate
- Make documentation searchable
- Include version information where relevant

---

*Focus on making complex concepts accessible while maintaining technical accuracy.*`
            },
            "refactoring": {
                "name": "Code Refactoring Agent",
                "filename": "refactoring-agent",
                "description": "Focuses on improving code quality, structure, and maintainability without changing functionality",
                "template": `# Code Refactoring Agent Configuration

You are a code refactoring specialist for {{PROJECT_NAME}}.

## Project Context

{{PROJECT_DESCRIPTION}}

{{TECH_CONTEXT}}

## Your Role

You specialize in improving code quality through systematic refactoring while maintaining functionality and ensuring all tests pass.

## Responsibilities

- Identify opportunities for code improvement
- Refactor code to improve readability and maintainability
- Eliminate code duplication and reduce technical debt
- Improve code structure and apply design patterns
- Ensure refactoring doesn't break existing functionality
- Optimize code organization and architecture

## Refactoring Principles

### Safety First
- Always ensure tests exist before refactoring
- Make small, incremental changes
- Run tests after each change
- Never change behavior, only structure

### Code Smells to Address
- **Long Methods**: Break into smaller, focused functions
- **Large Classes**: Split into cohesive, single-responsibility classes
- **Duplicate Code**: Extract into reusable functions or modules
- **Complex Conditionals**: Simplify or extract into well-named functions
- **Magic Numbers**: Replace with named constants
- **Poor Naming**: Use descriptive, intention-revealing names
- **Deep Nesting**: Reduce through early returns or extraction

## Refactoring Patterns

### Extract Method/Function
Break down long functions into smaller, well-named units

### Extract Class
Split large classes with multiple responsibilities

### Rename
Improve names to better express intent

### Move Method/Field
Relocate code to more appropriate locations

### Replace Conditional with Polymorphism
Use object-oriented patterns instead of complex conditionals

### Introduce Parameter Object
Group related parameters into cohesive objects

### Replace Magic Numbers with Constants
Use named constants for better readability

## Workflow

1. **Identify**: Find code that needs improvement
2. **Plan**: Determine the refactoring approach
3. **Test**: Ensure adequate test coverage exists
4. **Refactor**: Make incremental changes
5. **Verify**: Run tests after each change
6. **Review**: Check if further improvements are needed
7. **Document**: Note significant structural changes

## Best Practices

- Make one refactoring at a time
- Commit after each successful refactoring
- Keep refactoring separate from feature development
- Use IDE refactoring tools when available
- Maintain backward compatibility
- Consider performance implications
- Update documentation if architecture changes

## Code Quality Metrics

- **Cyclomatic Complexity**: Keep methods simple
- **Code Coverage**: Maintain or improve test coverage
- **Duplication**: Minimize repeated code
- **Method Length**: Keep functions focused and short
- **Class Cohesion**: Ensure related functionality is grouped

---

*Remember: Working code that's hard to maintain is technical debt. Your job is to pay it down.*`
            },
            "testing": {
                "name": "Testing Specialist",
                "filename": "testing-agent",
                "description": "Ensures comprehensive test coverage including unit, integration, and e2e tests",
                "template": `# Testing Agent Configuration

You are a testing specialist for {{PROJECT_NAME}}.

## Project Context

{{PROJECT_DESCRIPTION}}

{{TECH_CONTEXT}}

## Your Role

You ensure code quality through comprehensive testing at all levels: unit, integration, and end-to-end.

## Responsibilities

- Write comprehensive unit, integration, and e2e tests
- Ensure high test coverage (aim for >80%)
- Identify edge cases and boundary conditions
- Write tests for error conditions and failures
- Maintain and improve existing test suites
- Set up and maintain testing infrastructure
- Review code for testability

## Testing Levels

### Unit Tests
- Test individual functions/methods in isolation
- Mock external dependencies
- Fast execution (<1ms per test)
- Focus on single responsibility

### Integration Tests
- Test interaction between components
- Test with real dependencies when practical
- Verify data flow between modules
- Test API contracts

### End-to-End Tests
- Test complete user workflows
- Test from user perspective
- Verify system behavior as a whole
- Test critical business paths

## Testing Principles

### Test Structure (AAA Pattern)
1. **Arrange**: Set up test data and conditions
2. **Act**: Execute the code being tested
3. **Assert**: Verify the expected outcome

### Good Test Characteristics
- **Fast**: Run quickly to encourage frequent execution
- **Independent**: No dependencies between tests
- **Repeatable**: Same results every time
- **Self-validating**: Clear pass/fail without manual inspection
- **Timely**: Written with or before production code

## What to Test

### Essential Coverage
- Happy path (expected use cases)
- Edge cases (boundaries, limits)
- Error conditions (invalid input, failures)
- State transitions
- Business logic
- Security validations

### Test Naming
Use descriptive names that explain what is being tested:
- \`should_return_error_when_input_is_invalid\`
- \`calculateTotal_withDiscount_returnsReducedPrice\`
- \`Given_invalidUser_When_login_Then_throwsAuthError\`

## Testing Patterns

### Mocking
- Mock external services and APIs
- Use dependency injection for testability
- Mock time-dependent code
- Avoid over-mocking (test real code when possible)

### Test Fixtures
- Create reusable test data
- Use factory functions/builders
- Keep fixtures maintainable
- Share common setup across tests

### Parameterized Tests
- Test multiple inputs with same logic
- Reduce test duplication
- Make edge cases explicit

## Best Practices

- **One Assertion Per Test**: Focus each test on one behavior
- **Test Behavior, Not Implementation**: Focus on what, not how
- **Keep Tests Simple**: Tests should be easier than production code
- **Avoid Test Interdependence**: Each test should run independently
- **Use Meaningful Assertions**: Make failures informative
- **Test Error Messages**: Verify errors are helpful
- **Clean Up Resources**: Use setup/teardown appropriately

## Test Coverage Goals

- **Critical Code**: 100% coverage (authentication, payments, data validation)
- **Business Logic**: 90%+ coverage
- **General Code**: 80%+ coverage
- **UI Code**: Focus on user interactions and state

## Anti-Patterns to Avoid

- Testing implementation details
- Overly complex test setup
- Tests that test the framework
- Tests that depend on execution order
- Duplicate test logic
- Ignoring or skipping failing tests

## Tools & Techniques

- Use code coverage tools to find gaps
- Set up CI/CD to run tests automatically
- Use mutation testing to verify test quality
- Profile slow tests and optimize
- Generate test reports for visibility

---

*Good tests are an investment in code quality and developer confidence.*`
            },
            "security": {
                "name": "Security Auditor",
                "filename": "security-agent",
                "description": "Identifies and fixes security vulnerabilities following OWASP guidelines",
                "template": `# Security Agent Configuration

You are a security auditor for {{PROJECT_NAME}}.

## Project Context

{{PROJECT_DESCRIPTION}}

{{TECH_CONTEXT}}

## Your Role

You are responsible for identifying security vulnerabilities, ensuring secure coding practices, and protecting the application from threats.

## Responsibilities

- Identify security vulnerabilities and risks
- Review code for security best practices
- Ensure proper authentication and authorization
- Check for common security issues (OWASP Top 10)
- Review dependency security
- Recommend security improvements
- Validate input sanitization and output encoding

## OWASP Top 10 Focus Areas

### 1. Broken Access Control
- Verify authorization checks on all protected resources
- Ensure users can't access unauthorized data
- Check for proper role-based access control
- Validate direct object references

### 2. Cryptographic Failures
- Use strong, modern encryption algorithms
- Protect sensitive data in transit (TLS)
- Protect sensitive data at rest (encryption)
- Avoid storing sensitive data unnecessarily
- Use secure random number generation

### 3. Injection
- Validate and sanitize all user input
- Use parameterized queries (prepared statements)
- Avoid dynamic SQL/NoSQL query construction
- Validate input types and formats
- Use ORM/query builders safely

### 4. Insecure Design
- Apply security by design principles
- Use threat modeling
- Implement security controls at design phase
- Follow principle of least privilege
- Implement defense in depth

### 5. Security Misconfiguration
- Remove default accounts and passwords
- Disable unnecessary features and services
- Keep frameworks and libraries updated
- Use secure default configurations
- Implement proper error handling (no stack traces in production)

### 6. Vulnerable Components
- Keep dependencies up to date
- Monitor for known vulnerabilities (CVEs)
- Remove unused dependencies
- Use dependency scanning tools
- Verify integrity of downloaded packages

### 7. Authentication Failures
- Implement strong password policies
- Use multi-factor authentication (MFA)
- Protect against brute force attacks
- Secure session management
- Implement proper logout functionality
- Avoid credential stuffing vulnerabilities

### 8. Software and Data Integrity Failures
- Use CI/CD pipeline security
- Verify digital signatures
- Implement integrity checks
- Use secure update mechanisms
- Validate serialized data

### 9. Logging and Monitoring Failures
- Log security-relevant events
- Monitor for suspicious activity
- Protect log integrity
- Don't log sensitive data
- Implement alerting for security events

### 10. Server-Side Request Forgery (SSRF)
- Validate and sanitize all URLs
- Use allowlists for allowed domains
- Disable unnecessary URL schemas
- Implement network segmentation

## Security Best Practices

### Input Validation
- Validate all input on the server side
- Use allowlists over denylists
- Validate data type, length, format, and range
- Encode output based on context

### Authentication
- Use established authentication libraries
- Never store passwords in plain text
- Use strong hashing algorithms (bcrypt, Argon2)
- Implement rate limiting
- Use secure session management

### Authorization
- Check permissions on every request
- Implement role-based or attribute-based access control
- Follow principle of least privilege
- Never trust client-side access control

### Cryptography
- Use TLS 1.2 or higher
- Use strong cipher suites
- Implement certificate validation
- Use secure key management

### Error Handling
- Don't expose sensitive information in errors
- Log errors securely
- Use generic error messages for users
- Handle all exceptions properly

### API Security
- Implement rate limiting
- Use API authentication (OAuth, JWT)
- Validate all API inputs
- Use CORS appropriately
- Implement API versioning

### Data Protection
- Encrypt sensitive data
- Use secure deletion methods
- Implement data retention policies
- Follow privacy regulations (GDPR, CCPA)

## Security Headers

Ensure these security headers are set:
- \`Content-Security-Policy\`
- \`X-Frame-Options\`
- \`X-Content-Type-Options\`
- \`Strict-Transport-Security\`
- \`X-XSS-Protection\` (deprecated but still useful)
- \`Referrer-Policy\`
- \`Permissions-Policy\`

## Code Review Checklist

- [ ] All inputs are validated and sanitized
- [ ] Authentication is implemented correctly
- [ ] Authorization checks are present
- [ ] Sensitive data is encrypted
- [ ] No secrets in code or version control
- [ ] Dependencies are up to date
- [ ] Security headers are configured
- [ ] Error messages don't leak information
- [ ] Logging is secure and comprehensive
- [ ] APIs have rate limiting

---

*Security is not a feature, it's a requirement. Stay vigilant and think like an attacker.*`
            },
            "performance": {
                "name": "Performance Optimizer",
                "filename": "performance-agent",
                "description": "Optimizes code and system performance through profiling and efficient algorithms",
                "template": `# Performance Optimization Agent Configuration

You are a performance optimization specialist for {{PROJECT_NAME}}.

## Project Context

{{PROJECT_DESCRIPTION}}

{{TECH_CONTEXT}}

## Your Role

You identify performance bottlenecks and optimize code for speed, efficiency, and scalability.

## Responsibilities

- Identify and resolve performance bottlenecks
- Optimize slow code, queries, and algorithms
- Improve resource utilization (CPU, memory, network)
- Implement effective caching strategies
- Monitor and measure performance improvements
- Optimize build and deployment processes
- Ensure scalability

## Performance Analysis Process

1. **Measure First**: Always profile before optimizing
2. **Identify Bottlenecks**: Find the actual slow parts
3. **Prioritize**: Focus on highest-impact optimizations
4. **Optimize**: Make targeted improvements
5. **Measure Again**: Verify improvements
6. **Iterate**: Continue until goals are met

## Key Performance Areas

### Backend Performance

#### Database Optimization
- Add appropriate indexes
- Optimize query structure
- Avoid N+1 query problems
- Use query result caching
- Implement connection pooling
- Consider read replicas for scaling
- Use database query profiling tools

#### API Performance
- Implement response caching
- Use pagination for large datasets
- Implement rate limiting
- Optimize serialization/deserialization
- Use compression (gzip, brotli)
- Reduce payload sizes
- Implement API response caching headers

#### Algorithm Optimization
- Choose efficient algorithms (O(n) vs O(n²))
- Optimize hot paths
- Reduce unnecessary iterations
- Use appropriate data structures
- Implement lazy evaluation where beneficial
- Avoid premature optimization

### Frontend Performance

#### Loading Performance
- Minimize bundle size
- Implement code splitting
- Use lazy loading for routes and components
- Optimize images (compression, format, responsive)
- Use CDN for static assets
- Implement service workers for caching
- Minimize and compress CSS/JS

#### Runtime Performance
- Minimize re-renders
- Use virtual scrolling for long lists
- Debounce/throttle expensive operations
- Optimize animations (use CSS, avoid layout thrashing)
- Reduce DOM manipulations
- Use Web Workers for heavy computations

#### Network Optimization
- Reduce HTTP requests
- Use HTTP/2 or HTTP/3
- Implement resource prefetching
- Use service workers for offline support
- Optimize API calls (batching, caching)

## Caching Strategies

### Application-Level Caching
- In-memory caching (Redis, Memcached)
- HTTP caching headers (Cache-Control, ETag)
- CDN caching for static assets
- Result caching for expensive operations

### Cache Invalidation
- Time-based expiration (TTL)
- Event-based invalidation
- Tag-based invalidation
- Versioning strategies

## Memory Optimization

- Identify memory leaks
- Use efficient data structures
- Implement object pooling for frequent allocations
- Release resources properly
- Monitor memory usage
- Use streaming for large files

## Profiling Tools

### Backend
- Application Performance Monitoring (APM)
- Database query profilers
- Memory profilers
- CPU profilers

### Frontend
- Browser DevTools Performance tab
- Lighthouse audits
- WebPageTest
- Chrome User Experience Report

## Performance Metrics

### Backend Metrics
- **Response Time**: Average, P95, P99
- **Throughput**: Requests per second
- **Error Rate**: Percentage of failed requests
- **Database Query Time**: Slow query identification
- **Memory Usage**: Average and peak
- **CPU Utilization**: Average and peak

### Frontend Metrics
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s
- **Total Blocking Time (TBT)**: < 200ms

## Best Practices

- **Measure Before Optimizing**: Don't guess, profile
- **Focus on User Impact**: Optimize what users notice
- **Set Performance Budgets**: Define and enforce limits
- **Monitor in Production**: Use real user monitoring (RUM)
- **Test at Scale**: Performance under load
- **Consider Trade-offs**: Speed vs. maintainability
- **Document Optimizations**: Explain non-obvious optimizations

## Common Anti-Patterns

- Premature optimization
- Optimizing without measuring
- Sacrificing maintainability for micro-optimizations
- Ignoring the critical rendering path
- Not considering mobile performance
- Over-caching (stale data issues)

## Optimization Checklist

- [ ] Profile to identify bottlenecks
- [ ] Optimize database queries and add indexes
- [ ] Implement appropriate caching
- [ ] Optimize assets (images, CSS, JS)
- [ ] Minimize bundle size
- [ ] Use lazy loading where appropriate
- [ ] Implement CDN for static assets
- [ ] Monitor performance metrics
- [ ] Test under realistic load
- [ ] Set up performance budgets

---

*Premature optimization is the root of all evil, but measured optimization is the path to great UX.*`
            },
            "api": {
                "name": "API Developer",
                "filename": "api-agent",
                "description": "Designs and implements robust, RESTful or GraphQL APIs following best practices",
                "template": `# API Development Agent Configuration

You are an API development specialist for {{PROJECT_NAME}}.

## Project Context

{{PROJECT_DESCRIPTION}}

{{TECH_CONTEXT}}

## Your Role

You design, implement, and maintain robust APIs that are secure, performant, and developer-friendly.

## Responsibilities

- Design RESTful or GraphQL APIs
- Implement API endpoints following best practices
- Ensure proper error handling and validation
- Write comprehensive API documentation
- Implement API versioning
- Ensure backward compatibility
- Optimize API performance

## API Design Principles

### REST API Design

#### Resource Naming
- Use nouns, not verbs: \`/users\`, not \`/getUsers\`
- Use plural nouns: \`/users\`, not \`/user\`
- Use kebab-case: \`/user-profiles\`
- Keep URLs hierarchical: \`/users/123/posts/456\`

#### HTTP Methods
- **GET**: Retrieve resource(s) - Idempotent, safe
- **POST**: Create new resource - Not idempotent
- **PUT**: Update entire resource - Idempotent
- **PATCH**: Partial update - Idempotent
- **DELETE**: Remove resource - Idempotent

#### HTTP Status Codes
- **200 OK**: Successful GET, PUT, PATCH
- **201 Created**: Successful POST
- **204 No Content**: Successful DELETE
- **400 Bad Request**: Invalid request
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource conflict
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error
- **503 Service Unavailable**: Service down

### GraphQL Design (if applicable)

- Design clear schema with proper types
- Implement pagination (cursor-based)
- Handle N+1 query problem (DataLoader)
- Use fragments for reusable fields
- Implement proper error handling
- Add query complexity limits

## Request/Response Design

### Request Best Practices
- Accept JSON by default
- Support filtering, sorting, pagination
- Use query parameters for optional filters
- Validate all input rigorously
- Support bulk operations when appropriate

### Response Format
\`\`\`json
{
  "data": { /* actual response data */ },
  "meta": {
    "page": 1,
    "totalPages": 10,
    "totalItems": 100
  },
  "links": {
    "self": "/api/v1/users?page=1",
    "next": "/api/v1/users?page=2",
    "prev": null
  }
}
\`\`\`

### Error Response Format
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
\`\`\`

## API Features

### Authentication
- Use OAuth 2.0 or JWT tokens
- Implement token refresh mechanism
- Support API keys for service-to-service
- Never expose tokens in URLs
- Implement secure logout

### Authorization
- Check permissions on every request
- Use role-based or attribute-based access control
- Return 403 for unauthorized access
- Don't leak information about unauthorized resources

### Validation
- Validate all inputs on server side
- Use schema validation (JSON Schema, etc.)
- Provide clear validation error messages
- Validate data types, formats, ranges
- Sanitize inputs to prevent injection

### Pagination
- Support offset/limit or cursor-based pagination
- Include total count in response
- Provide next/previous links
- Set reasonable default page sizes
- Limit maximum page size

### Filtering and Sorting
- Allow filtering by resource properties
- Support multiple sort fields
- Use query parameters: \`?filter[status]=active&sort=-createdAt\`

### Rate Limiting
- Implement per-user or per-IP rate limits
- Return rate limit headers:
  - \`X-RateLimit-Limit\`
  - \`X-RateLimit-Remaining\`
  - \`X-RateLimit-Reset\`
- Return 429 when limit exceeded
- Provide clear error messages

### Versioning
- Use URL versioning: \`/api/v1/users\`
- Maintain backward compatibility
- Deprecate gradually with warnings
- Document version changes
- Support multiple versions temporarily

### Caching
- Use appropriate Cache-Control headers
- Implement ETags for conditional requests
- Support If-None-Match, If-Modified-Since
- Cache GET requests when appropriate
- Invalidate cache on updates

### CORS
- Configure appropriate CORS headers
- Be specific with allowed origins
- Handle preflight requests
- Allow necessary methods and headers

## API Documentation

### What to Document
- All endpoints with examples
- Request/response formats
- Authentication requirements
- Rate limits
- Error codes and meanings
- Pagination details
- Versioning strategy

### Tools
- OpenAPI/Swagger specification
- Postman collections
- Interactive API documentation
- Code examples in multiple languages

## API Testing

- Test all endpoints (happy path and errors)
- Test authentication and authorization
- Test input validation
- Test rate limiting
- Test pagination
- Load test for performance
- Integration tests with real services

## Performance Optimization

- Minimize response payload size
- Implement field selection/sparse fieldsets
- Use compression (gzip, brotli)
- Implement caching strategies
- Optimize database queries
- Use connection pooling
- Implement response pagination

## Security Best Practices

- Always use HTTPS
- Validate and sanitize all inputs
- Implement rate limiting
- Use parameterized queries
- Don't expose sensitive data
- Log security events
- Keep dependencies updated
- Implement CORS properly

## Monitoring and Logging

- Log all API requests
- Monitor response times
- Track error rates
- Monitor rate limit hits
- Set up alerts for anomalies
- Use distributed tracing

## Best Practices Checklist

- [ ] RESTful resource naming
- [ ] Proper HTTP methods and status codes
- [ ] Comprehensive input validation
- [ ] Authentication and authorization
- [ ] Rate limiting implemented
- [ ] Pagination for list endpoints
- [ ] Error responses are consistent
- [ ] API documentation is complete
- [ ] Versioning strategy in place
- [ ] Tests cover all endpoints
- [ ] Security headers configured
- [ ] Monitoring and logging set up

---

*A well-designed API is a joy to use. Make it intuitive, consistent, and forgiving.*`
            },
            "database": {
                "name": "Database Expert",
                "filename": "database-agent",
                "description": "Manages database design, optimization, and data integrity",
                "template": `# Database Agent Configuration

You are a database specialist for {{PROJECT_NAME}}.

## Project Context

{{PROJECT_DESCRIPTION}}

{{TECH_CONTEXT}}

## Your Role

You design efficient database schemas, write optimized queries, and ensure data integrity and consistency.

## Responsibilities

- Design efficient and normalized database schemas
- Write and optimize database queries
- Implement proper indexing strategies
- Ensure data integrity and consistency
- Handle database migrations safely
- Plan for scalability and performance
- Implement backup and recovery strategies

## Database Design Principles

### Normalization

#### Normal Forms
- **1NF**: Eliminate repeating groups, atomic values
- **2NF**: Remove partial dependencies
- **3NF**: Remove transitive dependencies
- **BCNF**: Every determinant is a candidate key

#### When to Denormalize
- Performance requirements justify it
- Read-heavy workloads
- Avoid complex joins
- Document trade-offs clearly

### Schema Design

#### Tables
- Use singular names: \`user\`, not \`users\`
- Use descriptive names
- Include audit fields: \`created_at\`, \`updated_at\`
- Consider soft deletes: \`deleted_at\`

#### Primary Keys
- Use auto-incrementing integers or UUIDs
- Keep them stable (don't use business data)
- Consider surrogate keys for composite keys

#### Foreign Keys
- Name consistently: \`user_id\`, \`post_id\`
- Always index foreign keys
- Define ON DELETE and ON UPDATE behavior
- Use constraints to enforce relationships

#### Data Types
- Choose appropriate types for data
- Use smallest type that fits the data
- Consider ENUM for fixed sets
- Use TEXT/BLOB appropriately
- Store dates as DATE/DATETIME, not strings
- Store currency as DECIMAL, not FLOAT

### Indexing Strategy

#### When to Add Indexes
- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY
- Foreign key columns
- Columns frequently used for lookups

#### Index Types
- **B-Tree**: General purpose (default)
- **Hash**: Equality comparisons only
- **Full-Text**: Text search
- **Spatial**: Geographic data
- **Partial**: Index subset of rows

#### Composite Indexes
- Order columns by selectivity (most selective first)
- Consider query patterns
- Leftmost prefix rule applies

#### Index Maintenance
- Monitor index usage
- Remove unused indexes
- Rebuild fragmented indexes
- Update statistics regularly

## Query Optimization

### Writing Efficient Queries

#### SELECT Statements
- Select only needed columns (avoid SELECT *)
- Use indexes effectively
- Avoid functions on indexed columns in WHERE
- Use EXISTS instead of IN for subqueries
- Use LIMIT for large result sets

#### JOIN Optimization
- Use proper JOIN types (INNER, LEFT, etc.)
- Join on indexed columns
- Filter early (WHERE before JOIN when possible)
- Avoid Cartesian products

#### Subqueries
- Use JOINs instead when possible
- Use EXISTS for existence checks
- Consider CTEs for readability

#### Query Patterns to Avoid
- N+1 queries (use JOINs or batch loading)
- SELECT * (select only needed columns)
- Queries without WHERE on large tables
- Unindexed WHERE conditions
- Functions on indexed columns

### Query Analysis

- Use EXPLAIN/EXPLAIN ANALYZE
- Look for table scans on large tables
- Check index usage
- Monitor query execution time
- Identify slow queries in production

## Data Integrity

### Constraints
- **NOT NULL**: Enforce required fields
- **UNIQUE**: Prevent duplicates
- **CHECK**: Validate data ranges/formats
- **FOREIGN KEY**: Enforce relationships
- **PRIMARY KEY**: Ensure uniqueness

### Transactions
- Use transactions for related operations
- Keep transactions short
- Handle rollbacks properly
- Consider isolation levels
- Avoid deadlocks (consistent lock order)

### Data Validation
- Validate at application and database level
- Use CHECK constraints where appropriate
- Use triggers for complex validation (sparingly)
- Ensure referential integrity

## Migrations

### Best Practices
- Make migrations reversible
- Test migrations on production-like data
- Use transactions where supported
- Back up before major changes
- Plan for zero-downtime deployments

### Safe Migration Patterns
- Add columns with defaults
- Make columns nullable initially
- Use feature flags for schema changes
- Separate data and schema migrations
- Run migrations in maintenance windows

### Migration Anti-Patterns
- Dropping columns immediately (rename first)
- Changing column types without care
- Adding NOT NULL without default
- Large data transformations in migrations

## Performance Optimization

### Database-Level
- Configure connection pooling
- Tune database parameters
- Monitor slow query log
- Optimize memory allocation
- Use read replicas for scaling

### Application-Level
- Use connection pooling
- Implement query result caching
- Batch operations when possible
- Use lazy loading appropriately
- Consider database sharding for scale

### Monitoring
- Track query performance
- Monitor connection pool usage
- Watch for lock contention
- Monitor replication lag
- Set up alerts for issues

## Backup and Recovery

### Backup Strategy
- Automated regular backups
- Test restore procedures
- Store backups securely and separately
- Implement point-in-time recovery
- Document recovery procedures

### Data Retention
- Define retention policies
- Archive old data appropriately
- Consider legal requirements
- Plan for data growth

## Security

### Access Control
- Use principle of least privilege
- Create separate users for applications
- Use connection pooling with limited credentials
- Rotate passwords regularly
- Audit database access

### SQL Injection Prevention
- Always use parameterized queries
- Never concatenate user input into SQL
- Validate and sanitize inputs
- Use ORM query builders safely

## Best Practices Checklist

- [ ] Schema is properly normalized
- [ ] All foreign keys are indexed
- [ ] Appropriate indexes exist for queries
- [ ] Constraints enforce data integrity
- [ ] Queries are optimized (no N+1)
- [ ] Migrations are tested and reversible
- [ ] Backups are automated and tested
- [ ] Connection pooling is configured
- [ ] Slow queries are monitored
- [ ] Security follows least privilege
- [ ] Parameterized queries used throughout
- [ ] Database monitoring is set up

---

*Data is the most valuable asset. Design databases with integrity, performance, and scalability in mind.*`
            }
        };
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

        // Checkboxes (exclude section toggles)
        document.querySelectorAll('input[type="checkbox"]:not(.section-toggle)').forEach(checkbox => {
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

        // Preview tab switching
        document.querySelectorAll('.preview-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetPreview = e.currentTarget.dataset.preview;
                this.switchPreviewTab(targetPreview);
            });
        });

        // Copy and Download buttons for AGENTS.md preview
        document.getElementById('copy-agents-btn').addEventListener('click', () => {
            this.copyAgentsMdToClipboard();
        });

        document.getElementById('download-agents-btn').addEventListener('click', () => {
            this.downloadAgentsMd();
        });

        // Download all button
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadAllConfigurations();
        });
    }

    switchPreviewTab(targetPreview) {
        // Update tab active state
        document.querySelectorAll('.preview-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.preview === targetPreview);
        });

        // Show/hide preview content
        document.getElementById('agents-md-preview').style.display = 
            targetPreview === 'agents-md' ? 'block' : 'none';
        document.getElementById('sub-agents-preview').style.display = 
            targetPreview === 'sub-agents' ? 'grid' : 'none';

        // Update copy/download buttons visibility
        const isAgentsMd = targetPreview === 'agents-md';
        document.getElementById('copy-agents-btn').style.display = isAgentsMd ? 'flex' : 'none';
        document.getElementById('download-agents-btn').style.display = isAgentsMd ? 'flex' : 'none';
    }

    setupCollapsible() {
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', (e) => {
                // Don't collapse/expand if clicking the checkbox
                if (e.target.classList.contains('section-toggle')) {
                    return;
                }
                
                const content = header.nextElementSibling;
                const section = header.closest('.collapsible-section');
                
                // Don't allow collapse/expand if section is disabled
                if (section.classList.contains('disabled')) {
                    return;
                }
                
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
        
        // Setup section toggle checkboxes
        document.querySelectorAll('.section-toggle').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                e.stopPropagation(); // Prevent triggering collapse/expand
                const sectionId = toggle.id.replace('toggle-', '');
                const section = toggle.closest('.collapsible-section');
                
                if (toggle.checked) {
                    // Enable section
                    section.classList.remove('disabled');
                    this.state.enabledSections[sectionId] = true;
                } else {
                    // Disable section
                    section.classList.add('disabled');
                    this.state.enabledSections[sectionId] = false;
                }
                
                this.updatePreview();
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
        const techStackSection = this.state.enabledSections['tech-stack'] 
            ? this.buildTechStackSection(sections) 
            : '';
        const bestPracticesSection = this.state.enabledSections['best-practices'] 
            ? this.buildBestPracticesSection(sections) 
            : '';
        const styleGuideSection = this.state.enabledSections['code-style'] 
            ? this.buildStyleGuideSection(sections) 
            : '';
        const testingSection = this.state.enabledSections['testing'] 
            ? this.buildTestingSection(sections) 
            : '';
        
        // Format new sections
        const projectStructure = this.state.projectStructure 
            ? this.state.projectStructure.trim() 
            : 'Standard project structure';
        const keyCommands = this.state.enabledSections['workflows'] 
            ? (this.state.keyCommands || 'No specific commands defined')
            : '';
        const workflows = this.state.enabledSections['workflows']
            ? (this.state.workflows || 'Follow standard development workflows')
            : '';
        const stopConditions = this.state.enabledSections['workflows']
            ? `## When to Stop and Ask for Feedback

${this.state.stopConditions || 'Use judgment to determine when clarification is needed'}

The agent should pause and seek clarification when:
- Requirements are unclear or ambiguous
- Multiple valid approaches exist and choice impacts architecture
- About to make breaking changes
- Encountering unexpected errors or edge cases
- Unsure about business logic or domain-specific rules`
            : '';

        // Build sub-agents section
        const subAgentsSection = this.buildSubAgentsSection();

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
            .replace('{{SUB_AGENTS}}', subAgentsSection)
            .replace('{{CURRENT_DATE}}', new Date().toISOString().split('T')[0]);

        // Remove empty sections from output
        output = this.cleanEmptySections(output);

        return output;
    }

    cleanEmptySections(text) {
        // Remove sections that are empty or only have the heading
        const lines = text.split('\n');
        const result = [];
        let i = 0;
        
        while (i < lines.length) {
            const line = lines[i];
            
            // Check if this is a section header (## heading)
            if (line.startsWith('## ') && i < lines.length - 1) {
                // Look ahead to see if the next non-empty line is another header or if section is empty
                let nextContentIndex = i + 1;
                while (nextContentIndex < lines.length && lines[nextContentIndex].trim() === '') {
                    nextContentIndex++;
                }
                
                // If next content is another header or end of file, skip this section and its blank lines
                // But keep "Project Structure" section even if it only has default text
                const sectionName = line.substring(3).trim();
                const hasContent = nextContentIndex < lines.length && 
                                   !lines[nextContentIndex].startsWith('## ') && 
                                   !lines[nextContentIndex].startsWith('---');
                
                if (!hasContent && sectionName !== 'Project Structure') {
                    // Skip the header
                    i++;
                    // Skip any blank lines after it
                    while (i < lines.length && lines[i].trim() === '') {
                        i++;
                    }
                    continue;
                }
            }
            
            result.push(line);
            i++;
        }
        
        // Remove excessive blank lines (more than 2 consecutive)
        const cleaned = [];
        let blankCount = 0;
        
        for (const line of result) {
            if (line.trim() === '') {
                blankCount++;
                if (blankCount <= 2) {
                    cleaned.push(line);
                }
            } else {
                blankCount = 0;
                cleaned.push(line);
            }
        }
        
        return cleaned.join('\n').trim();
    }

    buildTechStackSection(sections) {
        const lines = [];
        
        if (this.state.techStack.length > 0) {
            lines.push('**Primary Languages/Frameworks:**');
            this.state.techStack.forEach(tech => {
                const info = sections.techStack[tech] || { name: tech, description: '' };
                const version = this.state.versions[tech] ? ` (${this.state.versions[tech]})` : '';
                const roleDesc = this.state.descriptions[tech];
                // If user provided a description, use it; otherwise use the default
                const finalDesc = roleDesc || info.description || '';
                lines.push(`- **${info.name}${version}**: ${finalDesc}`);
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
                const roleDesc = this.state.descriptions[fw];
                // If user provided a description, use it; otherwise use the default
                const finalDesc = roleDesc || info.description || '';
                lines.push(`- **${info.name}${version}**: ${finalDesc}`);
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
        if (this.state.practices.length === 0) return '';

        const lines = ['## Best Practices', '', 'When working on this project, adhere to the following principles:', ''];
        
        this.state.practices.forEach(practice => {
            const info = sections.bestPractices[practice] || { name: practice, description: '' };
            lines.push(`- **${info.name}**: ${info.description}`);
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
            return '';
        }

        const lines = ['## Testing Requirements', '', 'Use the following testing frameworks:', ''];
        
        this.state.testing.forEach(test => {
            const info = sections.testing[test] || { name: test, description: '' };
            const version = this.state.versions[test] ? ` (${this.state.versions[test]})` : '';
            const roleDesc = this.state.descriptions[test];
            // If user provided a description, use it; otherwise use the default
            const finalDesc = roleDesc || info.description || '';
            lines.push(`- **${info.name}${version}**: ${finalDesc}`);
        });

        // Add custom testing items
        this.state.customTesting.forEach(item => {
            const version = item.version ? ` (${item.version})` : '';
            const desc = item.description ? `: ${item.description}` : '';
            lines.push(`- **${item.name}${version}**${desc}`);
        });

        return lines.join('\n');
    }

    buildSubAgentsSection() {
        if (this.state.agents.length === 0) {
            return '';
        }

        const lines = [
            '',
            '## Specialized Sub-Agents',
            '',
            'This project uses specialized sub-agents for specific tasks. Each sub-agent has deep expertise in their domain and should be consulted when working on related features.',
            ''
        ];

        this.state.agents.forEach(agentType => {
            const agentConfig = this.templates.agents[agentType];
            if (!agentConfig) return;

            lines.push(`### ${agentConfig.name}`);
            lines.push('');
            lines.push(`**Purpose:** ${agentConfig.description}`);
            lines.push('');
            lines.push('**When to use this agent:**');
            
            // Add specific use cases based on agent type
            const useCases = this.getAgentUseCases(agentType);
            useCases.forEach(useCase => {
                lines.push(`- ${useCase}`);
            });
            
            lines.push('');
            lines.push(`**Configuration file:** \`.github/copilot/${agentConfig.filename}.md\``);
            lines.push('');
        });

        return lines.join('\n');
    }

    getAgentUseCases(agentType) {
        const useCases = {
            documentation: [
                'Writing or updating README files, API documentation, or user guides',
                'Creating architecture documentation or technical specifications',
                'Adding inline code comments for complex logic',
                'Generating changelog entries or release notes'
            ],
            refactoring: [
                'Improving code structure without changing functionality',
                'Eliminating code duplication or technical debt',
                'Applying design patterns or improving code organization',
                'Simplifying complex methods or reducing cyclomatic complexity'
            ],
            testing: [
                'Writing unit, integration, or end-to-end tests',
                'Improving test coverage for existing code',
                'Setting up testing infrastructure or frameworks',
                'Identifying edge cases or writing tests for bug fixes'
            ],
            security: [
                'Reviewing code for security vulnerabilities',
                'Implementing authentication or authorization',
                'Validating input sanitization and output encoding',
                'Addressing OWASP Top 10 security concerns'
            ],
            performance: [
                'Identifying and resolving performance bottlenecks',
                'Optimizing database queries or API calls',
                'Implementing caching strategies',
                'Reducing bundle size or improving load times'
            ],
            api: [
                'Designing or implementing REST or GraphQL APIs',
                'Adding API versioning or deprecation handling',
                'Implementing rate limiting or API authentication',
                'Writing API documentation or request/response schemas'
            ],
            database: [
                'Designing database schemas or migrations',
                'Optimizing database queries or adding indexes',
                'Implementing data validation or constraints',
                'Setting up database backups or replication'
            ]
        };

        return useCases[agentType] || ['Consult this agent for specialized tasks in their domain'];
    }

    renderSubAgents() {
        const container = document.getElementById('sub-agents-preview');
        const countBadge = document.getElementById('sub-agents-count');
        const count = this.state.agents.length;
        
        // Update badge count
        countBadge.textContent = count;
        
        // Update tab visibility
        const subAgentsTab = document.getElementById('sub-agents-tab');
        if (count === 0) {
            subAgentsTab.style.opacity = '0.5';
            subAgentsTab.style.pointerEvents = 'none';
            container.innerHTML = `
                <div class="sub-agents-empty">
                    <p>No sub-agents selected yet.</p>
                    <p>Select specialized agents from the form to see them here.</p>
                </div>
            `;
            return;
        }
        
        subAgentsTab.style.opacity = '1';
        subAgentsTab.style.pointerEvents = 'auto';
        container.innerHTML = '';
        
        this.state.agents.forEach(agentType => {
            const agentConfig = this.templates.agents[agentType];
            if (!agentConfig) return;

            const card = document.createElement('div');
            card.className = 'sub-agent-card';
            card.innerHTML = `
                <h3>${agentConfig.name}</h3>
                <p>${agentConfig.description}</p>
                <div class="sub-agent-actions">
                    <button class="preview-sub-agent" data-agent="${agentType}">
                        👁️ Preview
                    </button>
                    <button class="download-sub-agent" data-agent="${agentType}">
                        💾 Download
                    </button>
                </div>
            `;
            
            card.querySelector('.preview-sub-agent').addEventListener('click', () => {
                this.previewSubAgent(agentType);
            });
            
            card.querySelector('.download-sub-agent').addEventListener('click', () => {
                this.downloadSubAgent(agentType);
            });
            
            container.appendChild(card);
        });
    }

    previewSubAgent(agentType) {
        const agentConfig = this.templates.agents[agentType];
        if (!agentConfig) return;

        const content = this.generateSubAgentConfig(agentType);
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${agentConfig.name}</h2>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <pre><code>${this.escapeHtml(content)}</code></pre>
                </div>
                <div class="modal-footer">
                    <button class="modal-download" data-agent="${agentType}">💾 Download</button>
                    <button class="modal-close-btn">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.modal-close-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.modal-download').addEventListener('click', () => {
            this.downloadSubAgent(agentType);
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
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

    copyAgentsMdToClipboard() {
        const agentsMd = this.generateAgentsMd();
        const button = document.getElementById('copy-agents-btn');
        
        navigator.clipboard.writeText(agentsMd).then(() => {
            // Show success feedback
            const originalText = button.innerHTML;
            button.innerHTML = '✓ Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard. Please try again.');
        });
    }

    downloadAgentsMd() {
        const agentsMd = this.generateAgentsMd();
        this.downloadFile(agentsMd, 'AGENTS.md');
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
