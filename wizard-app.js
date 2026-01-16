// Wizard State Management
const wizardState = {
    currentStep: 0,
    formData: {},
    completedSteps: new Set()
};

// Step Definitions
const steps = [
    {
        id: 'welcome',
        title: 'Welcome to AGENTS.md Generator',
        required: false,
        render: renderWelcomeStep,
        getData: () => ({}),
        validate: () => true
    },
    {
        id: 'basic-info',
        title: 'Basic Project Information',
        subtitle: 'Tell us about your project',
        why: {
            title: 'Why This Matters',
            content: 'Agents need to understand your project\'s purpose and structure to provide relevant suggestions. Clear project information helps AI make better decisions and saves you from repeating context.'
        },
        required: true,
        render: renderBasicInfoStep,
        getData: getBasicInfoData,
        validate: validateBasicInfo
    },
    {
        id: 'tech-stack',
        title: 'Technology Stack',
        subtitle: 'Define your languages, frameworks, and tools',
        why: {
            title: 'Why This Matters',
            content: 'Specifying exact versions helps agents use correct syntax, avoid deprecated features, and suggest appropriate patterns. This reduces token usage by not having to infer your setup.'
        },
        required: false,
        render: renderTechStackStep,
        getData: getTechStackData,
        validate: () => true
    },
    {
        id: 'project-structure',
        title: 'Project Structure',
        subtitle: 'Map your directory layout',
        why: {
            title: 'Why This Matters',
            content: 'Reduces navigation tokens significantly. AI knows where to find things without exploring. Saves time and API costs by not having to map your directory tree repeatedly.'
        },
        required: false,
        render: renderProjectStructureStep,
        getData: getProjectStructureData,
        validate: () => true
    },
    {
        id: 'commands',
        title: 'Key Commands',
        subtitle: 'Define your workflow commands',
        why: {
            title: 'Why This Matters',
            content: 'AI can run the right commands without guessing or asking. Clear commands prevent mistakes and streamline development workflows.'
        },
        required: false,
        render: renderCommandsStep,
        getData: getCommandsData,
        validate: () => true
    },
    {
        id: 'best-practices',
        title: 'Best Practices & Guidelines',
        subtitle: 'Define your development philosophy',
        why: {
            title: 'Why This Matters',
            content: 'Your team\'s principles guide decision-making. Agents suggest solutions that align with your values and patterns, maintaining consistency across your codebase.'
        },
        required: false,
        render: renderBestPracticesStep,
        getData: getBestPracticesData,
        validate: () => true
    },
    {
        id: 'testing',
        title: 'Testing Strategy',
        subtitle: 'Define your testing approach',
        why: {
            title: 'Why This Matters',
            content: 'Clear testing guidance helps agents write tests in the right framework, follow your testing patterns, and maintain quality standards automatically.'
        },
        required: false,
        render: renderTestingStep,
        getData: getTestingData,
        validate: () => true
    },
    {
        id: 'stop-points',
        title: 'When to Stop & Ask',
        subtitle: 'Define boundaries and escalation points',
        why: {
            title: 'Why This Matters',
            content: 'Agents work best with clear boundaries. Knowing when to pause prevents mistakes, catches ambiguities early, and keeps you in control of important decisions.'
        },
        required: false,
        render: renderStopPointsStep,
        getData: getStopPointsData,
        validate: () => true
    },
    {
        id: 'review',
        title: 'Review & Generate',
        subtitle: 'Your AGENTS.md file is ready!',
        required: false,
        render: renderReviewStep,
        getData: () => ({}),
        validate: () => true
    }
];

// Initialize Wizard
function initWizard() {
    renderStep(0);
    updateProgress();
    setupEventListeners();
}

// Render Current Step
function renderStep(stepIndex) {
    const step = steps[stepIndex];
    const stepContent = document.getElementById('stepContent');
    
    stepContent.innerHTML = step.render(step);
    
    // Update navigation buttons
    updateNavigationButtons(stepIndex);
    
    // Update preview if not welcome or review step
    if (stepIndex > 0 && stepIndex < steps.length - 1) {
        updatePreview();
    } else if (stepIndex === steps.length - 1) {
        showFinalPreview();
    }
    
    // Re-check validation after a brief delay to ensure form fields are rendered
    setTimeout(() => updateNavigationButtons(stepIndex), 50);
}

// Welcome Step
function renderWelcomeStep(step) {
    return `
        <div class="welcome-content">
            <h1 class="welcome-title">🤖 AGENTS.md Generator</h1>
            <p class="welcome-description">
                Create a comprehensive configuration file for AI coding assistants.
                We'll guide you through each section, explaining why it matters and
                showing you examples along the way.
            </p>
            
            <div class="welcome-features">
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">Save Tokens</div>
                    <div class="feature-description">Reduce API costs by providing context upfront</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <div class="feature-title">Better Results</div>
                    <div class="feature-description">AI understands your project and gives relevant suggestions</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📚</div>
                    <div class="feature-title">Guided Process</div>
                    <div class="feature-description">Step-by-step with examples and explanations</div>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <div class="feature-title">5-10 Minutes</div>
                    <div class="feature-description">Quick setup, long-term benefits</div>
                </div>
            </div>
        </div>
    `;
}

// Basic Info Step
function renderBasicInfoStep(step) {
    const data = wizardState.formData['basic-info'] || {};
    return `
        ${renderStepHeader(step)}
        
        <div class="form-group">
            <label class="form-label form-label-required">Project Name</label>
            <input type="text" class="form-input" id="projectName" 
                   value="${data.projectName || ''}" 
                   placeholder="my-awesome-project">
            <div class="form-hint">The name of your project</div>
        </div>
        
        <div class="form-group">
            <label class="form-label form-label-required">Project Description</label>
            <textarea class="form-textarea" id="projectDescription" 
                      placeholder="A web application that helps users...">${data.projectDescription || ''}</textarea>
            <div class="form-hint">Brief description of what your project does (50-500 characters)</div>
        </div>
        
        ${renderExamples([
            {
                title: 'E-commerce Platform',
                content: 'A full-stack e-commerce platform for selling handmade crafts with payment processing, inventory management, and seller dashboards.'
            },
            {
                title: 'API Service',
                content: 'RESTful API service for real-time weather data aggregation, providing endpoints for current conditions, forecasts, and historical data.'
            }
        ])}
    `;
}

function getBasicInfoData() {
    return {
        projectName: document.getElementById('projectName')?.value || '',
        projectDescription: document.getElementById('projectDescription')?.value || ''
    };
}

function validateBasicInfo() {
    const data = getBasicInfoData();
    return data.projectName.trim().length > 0 && data.projectDescription.trim().length > 0;
}

// Tech Stack Step
function renderTechStackStep(step) {
    const data = wizardState.formData['tech-stack'] || { technologies: [] };
    return `
        ${renderStepHeader(step)}
        
        <div id="techStackList" class="tech-stack-list">
            ${data.technologies.map((tech, idx) => renderTechItem(tech, idx)).join('')}
        </div>
        
        <button class="btn-add" onclick="addTechnology()">+ Add Technology</button>
        
        ${renderExamples([
            {
                title: 'Full Stack JavaScript',
                content: 'Node.js 20.x (Backend API), React 18.2 (Frontend UI), PostgreSQL 15 (Database)'
            },
            {
                title: 'Python Data Science',
                content: 'Python 3.11 (Core language), Pandas 2.0 (Data processing), Jupyter (Notebooks)'
            }
        ])}
    `;
}

function renderTechItem(tech = {}, index) {
    return `
        <div class="tech-item">
            <div class="tech-item-header">
                <span>Technology ${index + 1}</span>
                <button class="btn-remove" onclick="removeTechnology(${index})">Remove</button>
            </div>
            <div class="tech-item-fields">
                <input type="text" class="form-input" placeholder="Technology name" 
                       value="${tech.name || ''}" data-tech-index="${index}" data-field="name">
                <input type="text" class="form-input" placeholder="Version" 
                       value="${tech.version || ''}" data-tech-index="${index}" data-field="version">
            </div>
            <textarea class="form-textarea" placeholder="Role in project" 
                      data-tech-index="${index}" data-field="role" style="margin-top: 0.5rem;">${tech.role || ''}</textarea>
        </div>
    `;
}

function addTechnology() {
    // Save current form data first
    const currentData = getTechStackData();
    currentData.technologies.push({ name: '', version: '', role: '' });
    wizardState.formData['tech-stack'] = currentData;
    renderStep(wizardState.currentStep);
}

function removeTechnology(index) {
    // Save current form data first
    const currentData = getTechStackData();
    currentData.technologies.splice(index, 1);
    wizardState.formData['tech-stack'] = currentData;
    renderStep(wizardState.currentStep);
}

function getTechStackData() {
    const techItems = document.querySelectorAll('[data-tech-index]');
    const technologiesMap = new Map();
    
    techItems.forEach(item => {
        const index = parseInt(item.dataset.techIndex);
        const field = item.dataset.field;
        
        if (!technologiesMap.has(index)) {
            technologiesMap.set(index, {});
        }
        technologiesMap.get(index)[field] = item.value;
    });
    
    const technologies = Array.from(technologiesMap.values());
    return { technologies: technologies.filter(t => t && t.name) };
}

// Project Structure Step
function renderProjectStructureStep(step) {
    const data = wizardState.formData['project-structure'] || {};
    return `
        ${renderStepHeader(step)}
        
        <div class="form-group">
            <label class="form-label">Directory Structure</label>
            <textarea class="form-textarea" id="projectStructure" 
                      placeholder="/src - Main application code&#10;/tests - Test suites&#10;/docs - Documentation&#10;/config - Configuration files" 
                      style="min-height: 200px;">${data.structure || ''}</textarea>
            <div class="form-hint">List key directories and their purposes (one per line)</div>
        </div>
        
        ${renderExamples([
            {
                title: 'React Application',
                content: '/src - React components and application code\n/public - Static assets\n/tests - Jest test files\n/build - Production build output'
            },
            {
                title: 'Python API',
                content: '/app - Application code\n/tests - Pytest test files\n/migrations - Database migrations\n/docs - API documentation'
            }
        ])}
    `;
}

function getProjectStructureData() {
    return {
        structure: document.getElementById('projectStructure')?.value || ''
    };
}

// Commands Step
function renderCommandsStep(step) {
    const data = wizardState.formData['commands'] || { commands: [] };
    return `
        ${renderStepHeader(step)}
        
        <div id="commandsList" class="tech-stack-list">
            ${data.commands.map((cmd, idx) => renderCommandItem(cmd, idx)).join('')}
        </div>
        
        <button class="btn-add" onclick="addCommand()">+ Add Command</button>
        
        ${renderExamples([
            {
                title: 'Common Commands',
                content: 'npm install - Install dependencies\nnpm run dev - Start development server\nnpm test - Run test suite\nnpm run build - Build for production'
            }
        ])}
    `;
}

function renderCommandItem(cmd = {}, index) {
    return `
        <div class="tech-item">
            <div class="tech-item-header">
                <span>Command ${index + 1}</span>
                <button class="btn-remove" onclick="removeCommand(${index})">Remove</button>
            </div>
            <input type="text" class="form-input" placeholder="Command (e.g., npm run dev)" 
                   value="${cmd.command || ''}" data-cmd-index="${index}" data-field="command" style="margin-bottom: 0.5rem;">
            <input type="text" class="form-input" placeholder="Description" 
                   value="${cmd.description || ''}" data-cmd-index="${index}" data-field="description">
        </div>
    `;
}

function addCommand() {
    // Save current form data first
    const currentData = getCommandsData();
    currentData.commands.push({ command: '', description: '' });
    wizardState.formData['commands'] = currentData;
    renderStep(wizardState.currentStep);
}

function removeCommand(index) {
    // Save current form data first
    const currentData = getCommandsData();
    currentData.commands.splice(index, 1);
    wizardState.formData['commands'] = currentData;
    renderStep(wizardState.currentStep);
}

function getCommandsData() {
    const cmdItems = document.querySelectorAll('[data-cmd-index]');
    const commands = [];
    
    cmdItems.forEach(item => {
        const index = parseInt(item.dataset.cmdIndex);
        const field = item.dataset.field;
        
        if (!commands[index]) {
            commands[index] = {};
        }
        commands[index][field] = item.value;
    });
    
    return { commands: commands.filter(c => c.command && c.command.trim()) };
}

// Best Practices Step
function renderBestPracticesStep(step) {
    const data = wizardState.formData['best-practices'] || {};
    return `
        ${renderStepHeader(step)}
        
        <div class="form-group">
            <label class="form-label">Development Principles</label>
            <div class="checkbox-group">
                <label class="checkbox-item">
                    <input type="checkbox" value="SOLID" ${data.principles?.includes('SOLID') ? 'checked' : ''}>
                    <span>SOLID Principles</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" value="DRY" ${data.principles?.includes('DRY') ? 'checked' : ''}>
                    <span>DRY (Don't Repeat Yourself)</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" value="KISS" ${data.principles?.includes('KISS') ? 'checked' : ''}>
                    <span>KISS (Keep It Simple, Stupid)</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" value="Clean Code" ${data.principles?.includes('Clean Code') ? 'checked' : ''}>
                    <span>Clean Code Principles</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Custom Guidelines</label>
            <textarea class="form-textarea" id="customGuidelines" 
                      placeholder="- Always use const/let, never var&#10;- Prefer functional components over class components&#10;- Write descriptive variable names">${data.customGuidelines || ''}</textarea>
            <div class="form-hint">Any specific patterns or anti-patterns (one per line)</div>
        </div>
        
        ${renderExamples([
            {
                title: 'Example Guidelines',
                content: '- Use TypeScript for type safety\n- Prefer composition over inheritance\n- Keep functions small and focused\n- Write self-documenting code'
            }
        ])}
    `;
}

function getBestPracticesData() {
    const checkboxes = document.querySelectorAll('.checkbox-item input:checked');
    const principles = Array.from(checkboxes).map(cb => cb.value);
    
    return {
        principles,
        customGuidelines: document.getElementById('customGuidelines')?.value || ''
    };
}

// Testing Step
function renderTestingStep(step) {
    const data = wizardState.formData['testing'] || {};
    return `
        ${renderStepHeader(step)}
        
        <div class="form-group">
            <label class="form-label">Testing Framework</label>
            <input type="text" class="form-input" id="testingFramework" 
                   value="${data.framework || ''}" 
                   placeholder="e.g., Jest, Pytest, JUnit">
        </div>
        
        <div class="form-group">
            <label class="form-label">Test File Pattern</label>
            <input type="text" class="form-input" id="testPattern" 
                   value="${data.pattern || ''}" 
                   placeholder="e.g., **/*.test.js, tests/">
            <div class="form-hint">Where test files are located</div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Testing Guidelines</label>
            <textarea class="form-textarea" id="testingGuidelines" 
                      placeholder="- Write unit tests for all business logic&#10;- Aim for 80% code coverage&#10;- Test edge cases and error conditions">${data.guidelines || ''}</textarea>
        </div>
        
        ${renderExamples([
            {
                title: 'Testing Approach',
                content: 'Use Jest for unit tests, React Testing Library for component tests. All new features require tests. Run tests before committing.'
            }
        ])}
    `;
}

function getTestingData() {
    return {
        framework: document.getElementById('testingFramework')?.value || '',
        pattern: document.getElementById('testPattern')?.value || '',
        guidelines: document.getElementById('testingGuidelines')?.value || ''
    };
}

// Stop Points Step
function renderStopPointsStep(step) {
    const data = wizardState.formData['stop-points'] || {};
    return `
        ${renderStepHeader(step)}
        
        <div class="form-group">
            <label class="form-label">Agent Should Stop When...</label>
            <div class="checkbox-group">
                <label class="checkbox-item">
                    <input type="checkbox" value="unclear" ${data.conditions?.includes('unclear') ? 'checked' : ''}>
                    <span>Requirements are unclear or ambiguous</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" value="multiple-approaches" ${data.conditions?.includes('multiple-approaches') ? 'checked' : ''}>
                    <span>Multiple valid approaches exist</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" value="breaking-changes" ${data.conditions?.includes('breaking-changes') ? 'checked' : ''}>
                    <span>About to make breaking changes</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" value="unexpected-errors" ${data.conditions?.includes('unexpected-errors') ? 'checked' : ''}>
                    <span>Encountering unexpected errors</span>
                </label>
                <label class="checkbox-item">
                    <input type="checkbox" value="business-logic" ${data.conditions?.includes('business-logic') ? 'checked' : ''}>
                    <span>Unsure about business logic</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label class="form-label">Additional Stop Conditions</label>
            <textarea class="form-textarea" id="additionalStops" 
                      placeholder="- Before modifying database schema&#10;- Before changing API contracts&#10;- When security implications are unclear">${data.additional || ''}</textarea>
        </div>
        
        ${renderExamples([
            {
                title: 'Why Stop Points Matter',
                content: 'Clear boundaries prevent costly mistakes. For example, stopping before schema changes prevents data loss; pausing on ambiguous requirements saves rework.'
            }
        ])}
    `;
}

function getStopPointsData() {
    const checkboxes = document.querySelectorAll('.checkbox-item input:checked');
    const conditions = Array.from(checkboxes).map(cb => cb.value);
    
    return {
        conditions,
        additional: document.getElementById('additionalStops')?.value || ''
    };
}

// Review Step
function renderReviewStep(step) {
    return `
        <div class="step-header">
            <h2 class="step-title">${step.title}</h2>
            <p class="step-subtitle">${step.subtitle}</p>
        </div>
        
        <div class="review-summary">
            ${steps.slice(1, -1).map((s, idx) => renderSummaryCard(s, idx + 1)).join('')}
        </div>
        
        <div style="text-align: center; padding: 2rem;">
            <p style="color: var(--color-text-secondary); margin-bottom: 1rem;">
                Your AGENTS.md file is complete and ready to use!
            </p>
            <p style="color: var(--color-text-secondary);">
                Click "Generate Files" to download your configuration.
            </p>
        </div>
    `;
}

function renderSummaryCard(step, stepIndex) {
    const completed = wizardState.completedSteps.has(step.id);
    const data = wizardState.formData[step.id];
    const hasData = data && Object.values(data).some(v => 
        Array.isArray(v) ? v.length > 0 : v && v.toString().trim()
    );
    
    return `
        <div class="summary-card" onclick="goToStep(${stepIndex})">
            <div class="summary-card-header">
                <span class="summary-card-title">${step.title}</span>
                <span class="summary-card-status ${hasData ? 'status-complete' : 'status-skipped'}">
                    ${hasData ? '✓ Complete' : 'Skipped'}
                </span>
            </div>
            <p style="color: var(--color-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                ${step.subtitle}
            </p>
        </div>
    `;
}

// Helper Functions
function renderStepHeader(step) {
    return `
        <div class="step-header">
            <h2 class="step-title">${step.title}</h2>
            <p class="step-subtitle">${step.subtitle}</p>
            ${step.why ? `
                <div class="step-why">
                    <div class="step-why-title">${step.why.title}</div>
                    <div class="step-why-content">${step.why.content}</div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderExamples(examples) {
    return `
        <div class="examples-section">
            <div class="examples-title">💡 Examples</div>
            ${examples.map(ex => `
                <div class="example-item">
                    <strong>${ex.title}</strong>
                    <div class="example-code">${ex.content}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Navigation
function updateNavigationButtons(stepIndex) {
    const backBtn = document.getElementById('backBtn');
    const skipBtn = document.getElementById('skipBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    // Back button
    backBtn.style.display = stepIndex > 0 ? 'block' : 'none';
    
    // Skip button (hide on welcome and review)
    skipBtn.style.display = (stepIndex > 0 && stepIndex < steps.length - 1) ? 'block' : 'none';
    
    // Next/Finish buttons
    if (stepIndex === steps.length - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        finishBtn.style.display = 'none';
        
        // Disable next if required step not valid
        const step = steps[stepIndex];
        if (step.required && step.validate) {
            nextBtn.disabled = !step.validate();
        } else {
            nextBtn.disabled = false;
        }
    }
}

function nextStep() {
    const currentStepObj = steps[wizardState.currentStep];
    
    // Save current step data
    if (currentStepObj.getData) {
        wizardState.formData[currentStepObj.id] = currentStepObj.getData();
        wizardState.completedSteps.add(currentStepObj.id);
    }
    
    if (wizardState.currentStep < steps.length - 1) {
        wizardState.currentStep++;
        renderStep(wizardState.currentStep);
        updateProgress();
    }
}

function prevStep() {
    // Save current step data before going back
    const currentStepObj = steps[wizardState.currentStep];
    if (currentStepObj.getData) {
        wizardState.formData[currentStepObj.id] = currentStepObj.getData();
    }
    
    if (wizardState.currentStep > 0) {
        wizardState.currentStep--;
        renderStep(wizardState.currentStep);
        updateProgress();
    }
}

function skipStep() {
    wizardState.completedSteps.delete(steps[wizardState.currentStep].id);
    nextStep();
}

function goToStep(stepIndex) {
    // Save current step data
    const currentStepObj = steps[wizardState.currentStep];
    if (currentStepObj.getData) {
        wizardState.formData[currentStepObj.id] = currentStepObj.getData();
    }
    
    wizardState.currentStep = stepIndex;
    renderStep(stepIndex);
    updateProgress();
}

function updateProgress() {
    const progress = ((wizardState.currentStep) / (steps.length - 1)) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `Step ${wizardState.currentStep + 1} of ${steps.length}`;
}

// Preview Generation
function updatePreview() {
    const previewContent = document.getElementById('previewContent');
    const previewActions = document.getElementById('previewActions');
    
    const content = generateAgentsMD();
    
    if (content.trim()) {
        previewContent.innerHTML = `<pre>${escapeHtml(content)}</pre>`;
        previewActions.style.display = 'flex';
    } else {
        previewContent.innerHTML = '<div class="preview-placeholder"><p>Your AGENTS.md file will appear here as you fill in the steps.</p></div>';
        previewActions.style.display = 'none';
    }
}

function showFinalPreview() {
    updatePreview();
}

function generateAgentsMD() {
    let content = '';
    
    // Basic Info
    const basicInfo = wizardState.formData['basic-info'];
    if (basicInfo && basicInfo.projectName) {
        content += `# ${basicInfo.projectName}\n\n`;
        if (basicInfo.projectDescription) {
            content += `${basicInfo.projectDescription}\n\n`;
        }
    }
    
    // Tech Stack
    const techStack = wizardState.formData['tech-stack'];
    if (techStack && techStack.technologies && techStack.technologies.length > 0) {
        content += `## Technology Stack\n\n`;
        techStack.technologies.forEach(tech => {
            if (tech.name) {
                content += `- **${tech.name}** ${tech.version ? `(${tech.version})` : ''}`;
                if (tech.role) {
                    content += ` - ${tech.role}`;
                }
                content += '\n';
            }
        });
        content += '\n';
    }
    
    // Project Structure
    const structure = wizardState.formData['project-structure'];
    if (structure && structure.structure) {
        content += `## Project Structure\n\n\`\`\`\n${structure.structure}\n\`\`\`\n\n`;
    }
    
    // Commands
    const commands = wizardState.formData['commands'];
    if (commands && commands.commands && commands.commands.length > 0) {
        content += `## Key Commands\n\n`;
        commands.commands.forEach(cmd => {
            if (cmd.command) {
                content += `- \`${cmd.command}\``;
                if (cmd.description) {
                    content += ` - ${cmd.description}`;
                }
                content += '\n';
            }
        });
        content += '\n';
    }
    
    // Best Practices
    const practices = wizardState.formData['best-practices'];
    if (practices && (practices.principles?.length > 0 || practices.customGuidelines)) {
        content += `## Best Practices\n\n`;
        if (practices.principles && practices.principles.length > 0) {
            content += `### Development Principles\n\n`;
            practices.principles.forEach(p => {
                content += `- ${p}\n`;
            });
            content += '\n';
        }
        if (practices.customGuidelines) {
            content += `### Guidelines\n\n${practices.customGuidelines}\n\n`;
        }
    }
    
    // Testing
    const testing = wizardState.formData['testing'];
    if (testing && (testing.framework || testing.guidelines)) {
        content += `## Testing\n\n`;
        if (testing.framework) {
            content += `**Framework:** ${testing.framework}\n\n`;
        }
        if (testing.pattern) {
            content += `**Test Files:** ${testing.pattern}\n\n`;
        }
        if (testing.guidelines) {
            content += `### Guidelines\n\n${testing.guidelines}\n\n`;
        }
    }
    
    // Stop Points
    const stopPoints = wizardState.formData['stop-points'];
    if (stopPoints && (stopPoints.conditions?.length > 0 || stopPoints.additional)) {
        content += `## When to Stop and Ask for Feedback\n\n`;
        content += `The agent should pause and seek clarification when:\n\n`;
        
        if (stopPoints.conditions && stopPoints.conditions.length > 0) {
            const conditionTexts = {
                'unclear': 'Requirements are unclear or ambiguous',
                'multiple-approaches': 'Multiple valid approaches exist and choice impacts architecture',
                'breaking-changes': 'About to make breaking changes',
                'unexpected-errors': 'Encountering unexpected errors or edge cases',
                'business-logic': 'Unsure about business logic or domain-specific rules'
            };
            
            stopPoints.conditions.forEach(c => {
                content += `- ${conditionTexts[c] || c}\n`;
            });
        }
        
        if (stopPoints.additional) {
            content += `${stopPoints.additional}\n`;
        }
        content += '\n';
    }
    
    return content;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Actions
function copyToClipboard() {
    const content = generateAgentsMD();
    navigator.clipboard.writeText(content).then(() => {
        showNotification('Copied to clipboard!');
    });
}

function downloadFile() {
    const content = generateAgentsMD();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AGENTS.md';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Downloaded AGENTS.md!');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: var(--color-bg);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('nextBtn').addEventListener('click', nextStep);
    document.getElementById('backBtn').addEventListener('click', prevStep);
    document.getElementById('skipBtn').addEventListener('click', skipStep);
    document.getElementById('finishBtn').addEventListener('click', downloadFile);
    document.getElementById('copyPreviewBtn').addEventListener('click', copyToClipboard);
    document.getElementById('downloadPreviewBtn').addEventListener('click', downloadFile);
    
    // Listen for input changes to update preview and validation
    document.addEventListener('input', () => {
        updateNavigationButtons(wizardState.currentStep);
        if (wizardState.currentStep > 0 && wizardState.currentStep < steps.length - 1) {
            // Debounce preview updates
            clearTimeout(window.previewTimeout);
            window.previewTimeout = setTimeout(updatePreview, 500);
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initWizard);
