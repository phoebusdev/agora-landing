/* ========================================================================
   Agora Platform Prototype - Interactive Features
   All JavaScript for simulated interactions (no backend)
   ======================================================================== */

// ========================================================================
// GLOBAL STATE & UTILITIES
// ========================================================================

// Simulated authentication state
let isAuthenticated = false;
let currentUser = null;

// Sample users for demonstration
const USERS = {
  'demo_builder': {
    username: '@demo_builder',
    joinDate: 'January 2025',
    primaryRole: 'builder',
    acceptanceRate: 92,
    projectsSubmitted: 12,
    completedProjects: 11,
    totalEarned: 35000
  },
  'demo_poster': {
    username: '@demo_poster',
    joinDate: 'February 2025',
    primaryRole: 'poster',
    acceptanceRate: 88,
    projectsPosted: 8,
    submissionsReceived: 24,
    totalSpent: 28000
  }
};

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is "signed in" (stored in sessionStorage for prototype)
  const stored = sessionStorage.getItem('agora_user');
  if (stored) {
    isAuthenticated = true;
    currentUser = JSON.parse(stored);
    updateHeaderForAuth();
  }

  // Initialize page-specific features
  initPageFeatures();
});

// Update header based on authentication state
function updateHeaderForAuth() {
  const headerNav = document.querySelector('.header-nav');
  if (!headerNav) return;

  if (isAuthenticated && currentUser) {
    headerNav.innerHTML = `<a href="profile.html">${currentUser.username}</a>`;
  } else {
    headerNav.innerHTML = `<a href="sign-in.html">Sign In</a>`;
  }
}

// Initialize features based on current page
function initPageFeatures() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // Route to page-specific initialization
  switch (page) {
    case 'sign-up.html':
      initSignUp();
      break;
    case 'sign-in.html':
      initSignIn();
      break;
    case 'post.html':
      initPostProject();
      break;
    case 'submit.html':
      initSubmitSolution();
      break;
    case 'evaluate.html':
      initEvaluate();
      break;
    case 'dashboard.html':
      initDashboard();
      break;
    case 'clarify.html':
      initClarify();
      break;
    case 'project.html':
      initProjectDetail();
      break;
  }
}

// ========================================================================
// SIGN UP PAGE
// ========================================================================

function initSignUp() {
  const form = document.getElementById('sign-up-form');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Password matching validation
  function validatePasswords() {
    if (password.value && confirmPassword.value) {
      if (password.value === confirmPassword.value) {
        confirmPassword.setCustomValidity('');
        submitBtn.disabled = false;
        return true;
      } else {
        confirmPassword.setCustomValidity('Passwords do not match');
        submitBtn.disabled = true;
        return false;
      }
    }
    submitBtn.disabled = true;
    return false;
  }

  password.addEventListener('input', validatePasswords);
  confirmPassword.addEventListener('input', validatePasswords);

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    const username = document.getElementById('username').value;
    const primaryRole = document.querySelector('input[name="primary-role"]:checked').value;

    // Simulate account creation
    const newUser = {
      username: '@' + username.replace('@', ''),
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      primaryRole: primaryRole,
      acceptanceRate: 0,
      projectsSubmitted: 0,
      projectsPosted: 0,
      completedProjects: 0,
      totalEarned: 0,
      totalSpent: 0
    };

    // Store user session
    sessionStorage.setItem('agora_user', JSON.stringify(newUser));
    isAuthenticated = true;
    currentUser = newUser;

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  });
}

// ========================================================================
// SIGN IN PAGE
// ========================================================================

function initSignIn() {
  const form = document.getElementById('sign-in-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    // Simulate sign in (use demo users if matches, otherwise create new)
    let user;
    const cleanUsername = username.toLowerCase().replace('@', '');

    if (USERS[cleanUsername]) {
      user = USERS[cleanUsername];
    } else {
      // Create a default user
      user = {
        username: '@' + cleanUsername,
        joinDate: 'January 2025',
        primaryRole: 'builder',
        acceptanceRate: 85,
        projectsSubmitted: 5,
        completedProjects: 4,
        totalEarned: 12000
      };
    }

    // Store user session
    sessionStorage.setItem('agora_user', JSON.stringify(user));
    isAuthenticated = true;
    currentUser = user;

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  });
}

// ========================================================================
// POST PROJECT PAGE
// ========================================================================

function initPostProject() {
  const form = document.getElementById('post-project-form');
  const criteriaContainer = document.getElementById('criteria-list');
  const addCriterionBtn = document.getElementById('add-criterion');

  let criteriaCount = 3; // Start with 3 (minimum)

  // Add new criterion
  addCriterionBtn.addEventListener('click', () => {
    criteriaCount++;
    const newCriterion = createCriterionInput(criteriaCount);
    criteriaContainer.insertAdjacentHTML('beforeend', newCriterion);
    updateRemoveButtons();
  });

  // Remove criterion (delegated event)
  criteriaContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-criterion')) {
      const criterionItem = e.target.closest('.criterion-input-group');
      if (criteriaContainer.children.length > 3) {
        criterionItem.remove();
        criteriaCount--;
        updateRemoveButtons();
      }
    }
  });

  // Update remove button states
  function updateRemoveButtons() {
    const removeButtons = criteriaContainer.querySelectorAll('.remove-criterion');
    removeButtons.forEach(btn => {
      btn.disabled = criteriaContainer.children.length <= 3;
    });
  }

  // Create criterion input HTML
  function createCriterionInput(num) {
    return `
      <div class="criterion-input-group flex flex-gap-sm mb-sm">
        <input
          type="text"
          class="form-input"
          name="criterion-${num}"
          placeholder="e.g., User can create an account with email and password"
          required
          style="flex: 1;"
        >
        <button type="button" class="btn btn-secondary remove-criterion">Remove</button>
      </div>
    `;
  }

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      title: document.getElementById('project-title').value,
      summary: document.getElementById('project-summary').value,
      payment: document.getElementById('payment-amount').value,
      specification: document.getElementById('specification').value,
      criteria: []
    };

    // Collect all criteria
    const criteriaInputs = criteriaContainer.querySelectorAll('input[name^="criterion-"]');
    criteriaInputs.forEach(input => {
      if (input.value.trim()) {
        formData.criteria.push(input.value.trim());
      }
    });

    // Validate minimum criteria
    if (formData.criteria.length < 3) {
      alert('Please provide at least 3 acceptance criteria');
      return;
    }

    // Simulate project creation
    console.log('Project created:', formData);

    // Show confirmation and redirect
    if (confirm('Project posted successfully! Payment escrowed. Redirect to browse projects?')) {
      window.location.href = 'browse.html';
    }
  });

  // Initialize remove button states
  updateRemoveButtons();
}

// ========================================================================
// SUBMIT SOLUTION PAGE
// ========================================================================

function initSubmitSolution() {
  const form = document.getElementById('submit-solution-form');
  const acknowledgment = document.getElementById('acknowledgment');
  const submitBtn = form.querySelector('button[type="submit"]');
  const demoUrl = document.getElementById('demo-url');

  // Collapsible requirements
  const requirementsToggle = document.querySelector('[data-toggle="requirements"]');
  const requirementsContent = document.getElementById('requirements-content');

  if (requirementsToggle && requirementsContent) {
    requirementsToggle.addEventListener('click', () => {
      requirementsContent.classList.toggle('hidden');
      const icon = requirementsToggle.querySelector('.toggle-icon');
      if (icon) {
        icon.textContent = requirementsContent.classList.contains('hidden') ? '▼' : '▲';
      }
    });
  }

  // Enable/disable submit based on acknowledgment
  acknowledgment.addEventListener('change', () => {
    submitBtn.disabled = !acknowledgment.checked;
  });

  // URL validation
  demoUrl.addEventListener('blur', () => {
    const url = demoUrl.value.trim();
    if (url && !url.match(/^https?:\/\/.+/)) {
      demoUrl.setCustomValidity('Please enter a valid URL starting with http:// or https://');
      demoUrl.classList.add('form-input-error');
    } else {
      demoUrl.setCustomValidity('');
      demoUrl.classList.remove('form-input-error');
    }
  });

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!acknowledgment.checked) {
      return;
    }

    // Collect form data
    const formData = {
      demoUrl: demoUrl.value,
      testUsername: document.getElementById('test-username').value,
      testPassword: document.getElementById('test-password').value,
      deploymentInstructions: document.getElementById('deployment-instructions').value,
      technicalExplanation: document.getElementById('technical-explanation').value
    };

    console.log('Solution submitted:', formData);

    // Show confirmation
    showSubmissionConfirmation();
  });
}

function showSubmissionConfirmation() {
  const main = document.querySelector('.main');
  main.innerHTML = `
    <div class="container" style="padding-top: 64px; padding-bottom: 64px; text-align: center;">
      <div class="card" style="max-width: 600px; margin: 0 auto;">
        <h1 class="mb-md">✓ Solution Submitted</h1>
        <p class="mb-md text-gray">
          Your solution has been submitted for review. The project poster will evaluate it against
          the acceptance criteria and make a decision within 72 hours.
        </p>
        <p class="mb-lg text-gray">
          You'll be notified when the evaluation is complete. Payment will be automatically
          released if your solution is accepted.
        </p>
        <a href="dashboard.html" class="btn btn-primary">View Dashboard</a>
      </div>
    </div>
  `;
}

// ========================================================================
// EVALUATE SUBMISSION PAGE
// ========================================================================

function initEvaluate() {
  const criteriaItems = document.querySelectorAll('.criterion-item');
  const acceptBtn = document.getElementById('accept-btn');
  const rejectBtn = document.getElementById('reject-btn');
  const acceptModal = document.getElementById('accept-modal');
  const rejectModal = document.getElementById('reject-modal');

  // Collapsible specification
  const specToggle = document.querySelector('[data-toggle="specification"]');
  const specContent = document.getElementById('specification-content');

  if (specToggle && specContent) {
    specToggle.addEventListener('click', () => {
      specContent.classList.toggle('hidden');
      const icon = specToggle.querySelector('.toggle-icon');
      if (icon) {
        icon.textContent = specContent.classList.contains('hidden') ? '▼' : '▲';
      }
    });
  }

  // Track evaluation state
  let evaluationState = {};

  // Handle criterion evaluation
  criteriaItems.forEach(item => {
    const criterionId = item.dataset.criterionId;
    const radios = item.querySelectorAll('input[type="radio"]');

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        evaluationState[criterionId] = radio.value;

        // Update visual state
        item.classList.remove('pass', 'fail');
        item.classList.add(radio.value);

        // Check if all criteria are marked
        updateEvaluationButtons();
      });
    });
  });

  // Update button states
  function updateEvaluationButtons() {
    const totalCriteria = criteriaItems.length;
    const markedCriteria = Object.keys(evaluationState).length;
    const allPassed = Object.values(evaluationState).every(val => val === 'pass');

    // Enable reject if all marked
    rejectBtn.disabled = markedCriteria < totalCriteria;

    // Enable accept if all marked AND all passed
    acceptBtn.disabled = markedCriteria < totalCriteria || !allPassed;
  }

  // Accept button click
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      if (!acceptBtn.disabled) {
        acceptModal.classList.remove('hidden');
      }
    });
  }

  // Reject button click
  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      if (!rejectBtn.disabled) {
        rejectModal.classList.remove('hidden');
      }
    });
  }

  // Modal interactions
  setupModal(acceptModal, () => {
    // Accept confirmation
    console.log('Solution accepted, payment released');
    window.location.href = 'dashboard.html';
  });

  setupModal(rejectModal, () => {
    // Reject confirmation
    console.log('Solution rejected');
    window.location.href = 'dashboard.html';
  });

  // Initialize button states
  updateEvaluationButtons();
}

// ========================================================================
// DASHBOARD PAGE
// ========================================================================

function initDashboard() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update visible content
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Set current user info if authenticated
  if (currentUser) {
    const usernameEl = document.getElementById('dashboard-username');
    if (usernameEl) {
      usernameEl.textContent = currentUser.username;
    }
  }
}

// ========================================================================
// CLARIFY PAGE
// ========================================================================

function initClarify() {
  const projectCards = document.querySelectorAll('.project-with-questions');

  projectCards.forEach(card => {
    const toggleBtn = card.querySelector('.toggle-questions');
    const questionsSection = card.querySelector('.questions-list');
    const askBtn = card.querySelector('.ask-question-btn');
    const questionForm = card.querySelector('.question-form');

    // Toggle questions visibility
    if (toggleBtn && questionsSection) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = questionsSection.classList.contains('hidden');
        questionsSection.classList.toggle('hidden');
        toggleBtn.textContent = isHidden ? 'Hide Questions' : 'Show Questions';
      });
    }

    // Show question form
    if (askBtn && questionForm) {
      askBtn.addEventListener('click', () => {
        questionForm.classList.remove('hidden');
        askBtn.classList.add('hidden');
      });
    }

    // Question form submission
    if (questionForm) {
      const submitQuestionBtn = questionForm.querySelector('.submit-question');
      const cancelBtn = questionForm.querySelector('.cancel-question');
      const textarea = questionForm.querySelector('textarea');

      submitQuestionBtn.addEventListener('click', () => {
        if (textarea.value.trim()) {
          console.log('Question submitted:', textarea.value);
          alert('Question submitted successfully! The project poster will be notified.');
          textarea.value = '';
          questionForm.classList.add('hidden');
          askBtn.classList.remove('hidden');
        }
      });

      cancelBtn.addEventListener('click', () => {
        textarea.value = '';
        questionForm.classList.add('hidden');
        askBtn.classList.remove('hidden');
      });
    }
  });
}

// ========================================================================
// PROJECT DETAIL PAGE
// ========================================================================

function initProjectDetail() {
  // Check authentication for "Submit Solution" button
  const submitBtn = document.querySelector('.submit-solution-btn');

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      if (!isAuthenticated) {
        e.preventDefault();
        if (confirm('You need to sign in to submit a solution. Go to sign in page?')) {
          window.location.href = 'sign-in.html';
        }
      }
    });
  }
}

// ========================================================================
// MODAL UTILITIES
// ========================================================================

function setupModal(modal, onConfirm) {
  if (!modal) return;

  const overlay = modal;
  const confirmBtn = modal.querySelector('.modal-confirm');
  const cancelBtn = modal.querySelector('.modal-cancel');

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      modal.classList.add('hidden');
    }
  });

  // Cancel button
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // Confirm button
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      if (onConfirm) onConfirm();
    });
  }
}

// ========================================================================
// BROWSE PROJECTS PAGE
// ========================================================================

// Project card click handling (via CSS and HTML hrefs)
// No JavaScript needed - handled by anchor tags

// ========================================================================
// UTILITY FUNCTIONS
// ========================================================================

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Format relative time
function formatRelativeTime(daysAgo) {
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return 'Yesterday';
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`;
  return `${Math.floor(daysAgo / 30)} months ago`;
}
