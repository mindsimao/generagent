# Multi-Step Wizard AGENTS.md Generator - Implementation Plan

## Overview
A step-by-step wizard that guides users through creating an AGENTS.md file with educational context, examples, and real-time preview building.

## Design Principles
- **Educational**: Each step explains WHY the section is valuable
- **Progressive**: Build the AGENTS.md file incrementally as users progress
- **Flexible**: Allow skipping steps or going back to edit
- **Visual**: Show live preview panel building up with each step
- **Example-driven**: Provide concrete examples for each section

---

## Step Structure

### Step 0: Welcome & Introduction
**Purpose**: Set context and explain what AGENTS.md files do

**Content**:
- Brief explanation of AI coding assistants and agent configurations
- Benefits of having a well-configured AGENTS.md file
- What they'll create in this wizard
- Estimated time: 5-10 minutes

**UI Elements**:
- Hero section with title and description
- "Why use AGENTS.md?" explanation
- "Get Started" button
- Option to load from existing file (future feature)

**Preview Panel**: Empty or shows a minimal template outline

---

### Step 1: Basic Project Information
**Purpose**: Establish project identity and context

**WHY This Matters**:
> "Agents need to understand your project's purpose and structure to provide relevant suggestions. Clear project information helps AI understand context and make better decisions."

**Form Fields**:
1. **Project Name** (required)
   - Placeholder: "my-awesome-project"
   
2. **Project Description** (required)
   - Multi-line text area
   - Placeholder: "A web application that..."
   - Character count: 50-500 chars
   
3. **Project Structure** (optional but recommended)
   - Multi-line text area
   - Examples shown:
     ```
     /src - Main application code
     /tests - Test suites
     /docs - Documentation
     /config - Configuration files
     ```
   - Helper: "This reduces tokens by guiding the agent to the right directories"

**Examples Shown**:
- Example 1: E-commerce platform structure
- Example 2: API service structure
- Example 3: Mobile app structure

**Preview Panel**: Shows header of AGENTS.md with project name and description

**Navigation**: Next (required fields must be filled) | Save & Exit

---

### Step 2: Technology Stack
**Purpose**: Define languages, frameworks, and versions

**WHY This Matters**:
> "Specifying exact versions helps agents use correct syntax, avoid deprecated features, and suggest appropriate patterns for your tech stack."

**Form Fields**:
1. **Primary Language(s)** (checkbox selection + version)
   - JavaScript/Node.js, Python, Java, Go, Rust, C#/.NET, PHP, Ruby, etc.
   - For each selected: Version input + Role description
   
2. **Frontend Framework** (if applicable)
   - React, Vue, Angular, Svelte, Vanilla JS, etc.
   - Version + description fields
   
3. **Backend Framework** (if applicable)
   - Express, Django, Flask, Spring Boot, etc.
   - Version + description fields
   
4. **Database(s)**
   - PostgreSQL, MongoDB, MySQL, Redis, etc.
   - Version + description fields
   
5. **Other Technologies**
   - Custom add interface for anything not listed

**Quick Presets**:
- "Full Stack JavaScript" (Node.js + React)
- "Python Data Science" (Python + Jupyter + Pandas)
- "Java Enterprise" (Java + Spring Boot + PostgreSQL)
- "Modern Web" (TypeScript + Next.js + Prisma)

**Examples Shown**:
- Why version numbers matter (example of syntax differences between versions)
- How role descriptions help (e.g., "React 18 for customer-facing UI" vs "React for internal admin panel")

**Preview Panel**: Adds "Tech Stack" section with selected technologies formatted nicely

**Navigation**: Back | Skip | Next

---

### Step 3: Testing Strategy
**Purpose**: Define testing frameworks and approach

**WHY This Matters**:
> "Clear testing guidance helps agents write tests in the right framework, follow your testing patterns, and maintain test quality standards."

**Form Fields**:
1. **Testing Frameworks** (checkbox selection)
   - Unit testing: Jest, Pytest, JUnit, Mocha, Vitest, etc.
   - E2E testing: Cypress, Playwright, Selenium, etc.
   - For each: Version + test location (e.g., "/tests", "**/*.test.js")
   
2. **Testing Philosophy** (radio buttons)
   - Test-Driven Development (TDD)
   - Behavior-Driven Development (BDD)
   - Pragmatic/as-needed testing
   
3. **Coverage Expectations** (optional slider)
   - Target code coverage percentage (0-100%)
   
4. **Testing Commands**
   - Run all tests: e.g., "npm test"
   - Run specific tests: e.g., "npm test -- path/to/test"
   - Watch mode: e.g., "npm test -- --watch"

**Examples Shown**:
- Sample test structure for different frameworks
- How agents can write tests automatically
- Benefits of specifying test patterns

**Preview Panel**: Adds "Testing" section with frameworks and guidance

**Navigation**: Back | Skip | Next

---

### Step 4: Code Style & Quality
**Purpose**: Define linting, formatting, and code quality standards

**WHY This Matters**:
> "Consistent code style makes collaboration easier. Agents can format code to match your standards automatically."

**Form Fields**:
1. **Linters** (checkbox selection)
   - ESLint, Pylint, Rubocop, Checkstyle, etc.
   - Configuration file location
   
2. **Formatters** (checkbox selection)
   - Prettier, Black, Rustfmt, etc.
   - Configuration file location
   
3. **Style Guides** (checkbox selection)
   - Airbnb, Google, Standard, PEP 8, etc.
   
4. **Custom Rules** (text area)
   - Any specific code style preferences
   - e.g., "Always use const/let, never var"
   - e.g., "Prefer named exports over default exports"

**Examples Shown**:
- Before/after code formatting examples
- How linting catches common mistakes

**Preview Panel**: Adds "Code Style & Quality" section

**Navigation**: Back | Skip | Next

---

### Step 5: Best Practices & Guidelines
**Purpose**: Define development philosophy and patterns

**WHY This Matters**:
> "Your team's principles guide decision-making. Agents can suggest solutions that align with your values and patterns."

**Form Fields**:
1. **Development Principles** (checkbox selection)
   - SOLID principles
   - DRY (Don't Repeat Yourself)
   - KISS (Keep It Simple, Stupid)
   - YAGNI (You Aren't Gonna Need It)
   - Clean Code principles
   
2. **Priority Areas** (checkbox selection)
   - Security-first development
   - Performance optimization
   - Accessibility (a11y)
   - Mobile-first design
   - Internationalization (i18n)
   
3. **Custom Guidelines** (text area)
   - Any specific patterns or anti-patterns
   - Architectural decisions

**Examples Shown**:
- How principles influence code decisions
- Example refactorings guided by principles

**Preview Panel**: Adds "Best Practices" section

**Navigation**: Back | Skip | Next

---

### Step 6: Development Workflow
**Purpose**: Define commands, workflows, and processes

**WHY This Matters**:
> "Clear workflows prevent mistakes. Agents can guide you through proper procedures and run the right commands."

**Form Fields**:
1. **Key Commands** (dynamic list builder)
   - Command: e.g., "npm run dev"
   - Description: e.g., "Start development server"
   - Add/remove rows
   
2. **Common Workflows** (text area)
   - Feature development workflow
   - Bug fix workflow
   - Release process
   - Template provided with examples
   
3. **CI/CD Information** (optional)
   - CI platform: GitHub Actions, GitLab CI, Jenkins, etc.
   - Build command
   - Deploy process

**Examples Shown**:
- Sample workflow for feature development
- How commands save time
- CI/CD benefits

**Preview Panel**: Adds "Workflows & Commands" section

**Navigation**: Back | Skip | Next

---

### Step 7: When to Stop & Ask
**Purpose**: Define boundaries and escalation points

**WHY This Matters**:
> "Agents work best with clear boundaries. Knowing when to pause prevents mistakes and keeps you in control."

**Form Fields**:
1. **Stop Conditions** (checkbox selection + custom)
   - Requirements are unclear or ambiguous
   - Multiple valid approaches exist
   - About to make breaking changes
   - Encountering unexpected errors
   - Unsure about business logic
   - Need to modify database schema
   - Need to change API contracts
   - Custom conditions...
   
2. **Review Requirements** (checkbox selection)
   - Always review before committing
   - Review security-related changes
   - Review database changes
   - Review API changes

**Examples Shown**:
- Scenarios where stopping is important
- Benefits of agent caution

**Preview Panel**: Adds "When to Stop" section

**Navigation**: Back | Skip | Next

---

### Step 8: Sub-Agents (Optional)
**Purpose**: Add specialized agent configurations

**WHY This Matters**:
> "Specialized agents have focused expertise. A documentation agent knows best practices for docs; a testing agent excels at writing tests."

**Form Fields**:
1. **Available Sub-Agents** (card selection)
   Each card shows:
   - Agent name and icon
   - Brief description
   - When to use it
   - Checkbox to include
   
   Options:
   - **Documentation Agent**: Expert in writing/maintaining docs
   - **Testing Agent**: Focused on test creation and debugging
   - **Refactoring Agent**: Specialized in code cleanup
   - **Bug Fixing Agent**: Dedicated to debugging
   - **Security Agent**: Focused on security audits
   - **Performance Agent**: Optimization specialist
   - **API Agent**: REST/GraphQL API expert
   - **Database Agent**: Schema and query optimization

**Examples Shown**:
- Sample sub-agent in action
- When to invoke a sub-agent
- How they integrate with main AGENTS.md

**Preview Panel**: Shows selected sub-agents section with "When to Use" guidance

**Navigation**: Back | Skip | Next

---

### Step 9: Review & Generate
**Purpose**: Review complete configuration and generate files

**Content**:
1. **Summary Cards** - Show all sections configured
   - Click any card to jump back to that step
   - Shows completion status (filled/skipped)
   
2. **Full Preview** - Complete AGENTS.md file
   - Syntax highlighted
   - Collapsible sections
   
3. **Sub-Agents Preview** (if any selected)
   - List of sub-agent files
   - Preview each individually

**Actions**:
- **Copy to Clipboard** - Copy AGENTS.md content
- **Download AGENTS.md** - Download main file
- **Download All** - Download AGENTS.md + all sub-agents as ZIP
- **Save as Template** - Save configuration for future use (localStorage)
- **Start Over** - Clear and restart wizard
- **Edit Builder** - Switch to the all-in-one form view

**Preview Panel**: Shows complete generated file(s)

**Navigation**: Back | Download & Finish

---

## Technical Implementation

### File Structure
```
/wizard-index.html          # Multi-step wizard entry point
/wizard-app.js              # Wizard-specific JavaScript
/wizard-styles.css          # Wizard-specific styles
/shared/
  /templates.js             # Shared template logic
  /generator.js             # Shared generation logic
  /utils.js                 # Shared utilities
```

### State Management
```javascript
{
  currentStep: 0,
  steps: [...stepConfigs],
  formData: {
    step1: {...},
    step2: {...},
    // etc.
  },
  preview: {
    content: '',
    sections: []
  },
  completed: [true, true, false, ...] // Track step completion
}
```

### Step Component Structure
```javascript
class Step {
  constructor(id, title, subtitle, why, fields, examples) {
    this.id = id
    this.title = title
    this.subtitle = subtitle
    this.why = why // WHY explanation
    this.fields = fields // Form field definitions
    this.examples = examples // Example content
  }
  
  validate() { /* Check required fields */ }
  render() { /* Generate HTML */ }
  getData() { /* Get form values */ }
  updatePreview() { /* Update preview panel */ }
}
```

### Preview Building Strategy
- Each step adds/updates a section in the preview
- Preview panel scrolls to the newly added section
- Highlight animation when new content appears
- Maintain previous content as context

### Navigation Flow
- Linear progression but allow jumping back
- Mark steps as complete/incomplete
- Show progress indicator (e.g., "Step 3 of 9")
- Breadcrumb navigation at top

### Responsive Design
- Mobile: Stack form and preview (show preview as expanding panel)
- Tablet: Side-by-side with smaller preview
- Desktop: Full side-by-side layout

---

## UI/UX Enhancements

### Progress Indicators
- Visual stepper at top showing all steps
- Current step highlighted
- Completed steps shown with checkmark
- Percentage complete (e.g., "60% complete")

### Animations
- Smooth transitions between steps (slide/fade)
- Preview content animates in
- Success animation on final generation

### Validation & Feedback
- Inline validation as user types
- Show what's required vs. optional
- Warning if skipping recommended sections
- Success messages when step is complete

### Help & Guidance
- Tooltip icons (?) next to labels for extra help
- Example toggle button to show/hide examples
- "Why does this matter?" expandable section
- Links to learn more about concepts

### Accessibility
- Keyboard navigation (Tab, Enter, Arrow keys)
- Screen reader friendly
- ARIA labels on all interactive elements
- Focus management between steps

---

## Data Persistence

### Auto-save
- Save to localStorage after each step
- Restore on page reload with prompt: "Continue where you left off?"
- Clear option in case of corruption

### Export/Import Configuration
- Download configuration as JSON
- Import previous configuration to prefill wizard
- Share configurations with team

---

## Advantages Over All-in-One Builder

1. **Less Overwhelming**: One section at a time vs. giant form
2. **Educational**: Explains each section's purpose
3. **Guided**: Clear path through configuration
4. **Progressive**: See AGENTS.md build up naturally
5. **Flexible**: Easy to skip or go back
6. **Examples**: Contextual examples for each section
7. **Mobile-Friendly**: Easier to use on smaller screens

---

## Implementation Phases

### Phase 1: Core Wizard (MVP)
- Steps 1-7 (skip sub-agents initially)
- Basic step navigation
- Preview building
- Download AGENTS.md

### Phase 2: Sub-Agents
- Step 8 (sub-agents selection)
- Sub-agent preview/download
- ZIP download of all files

### Phase 3: Enhanced UX
- Progress indicators
- Animations
- Better mobile experience
- Validation improvements

### Phase 4: Persistence & Sharing
- Auto-save to localStorage
- Import/export configurations
- Template library

---

## Questions to Consider

1. **Should both versions coexist?**
   - Wizard for new users
   - All-in-one builder for power users
   - Link between them?

2. **Template presets in wizard?**
   - "Quick Start" templates that prefill common configurations
   - E.g., "React App", "Python API", "Full Stack JS"

3. **Collaborative features?**
   - Share configuration URLs
   - Team templates
   - Future: Cloud storage?

4. **Onboarding flow?**
   - First-time user tour
   - Highlight key features
   - Skip for returning users

---

## Next Steps

1. Create `wizard-index.html` with basic structure
2. Implement Step class and navigation logic
3. Build Step 1 (Basic Info) as proof of concept
4. Add preview building logic
5. Iterate through remaining steps
6. Polish UI/UX
7. Test across devices
8. User testing and feedback
