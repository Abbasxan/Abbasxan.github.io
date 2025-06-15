// Basic tests for Neon Sultan website
// This file contains simple tests to verify critical elements on the website

// Test suite object
const TestSuite = {
  tests: [],
  
  // Add a test to the suite
  addTest: function(name, testFn) {
    this.tests.push({ name, testFn });
  },
  
  // Run all tests and report results
  runTests: function() {
    const results = {
      passed: 0,
      failed: 0,
      details: []
    };
    
    console.log('Running tests...');
    
    this.tests.forEach(test => {
      try {
        const result = test.testFn();
        if (result === true) {
          results.passed++;
          results.details.push({ name: test.name, passed: true });
          console.log(`✅ PASS: ${test.name}`);
        } else {
          results.failed++;
          results.details.push({ name: test.name, passed: false, message: result || 'Test failed' });
          console.error(`❌ FAIL: ${test.name} - ${result || 'Test failed'}`);
        }
      } catch (error) {
        results.failed++;
        results.details.push({ name: test.name, passed: false, message: error.message });
        console.error(`❌ ERROR: ${test.name} - ${error.message}`);
      }
    });
    
    console.log(`\nTest Summary: ${results.passed} passed, ${results.failed} failed`);
    return results;
  }
};

// Helper functions
function elementExists(selector) {
  const element = document.querySelector(selector);
  return element ? true : `Element "${selector}" not found`;
}

function elementContainsText(selector, text) {
  const element = document.querySelector(selector);
  if (!element) return `Element "${selector}" not found`;
  return element.textContent.includes(text) ? true : `Element "${selector}" does not contain text "${text}"`;
}

// Define tests
TestSuite.addTest('Navigation bar exists', () => {
  return elementExists('nav');
});

TestSuite.addTest('Page has a title', () => {
  return document.title && document.title.length > 0 ? true : 'Page title is empty';
});

TestSuite.addTest('Theme toggle button exists', () => {
  return elementExists('#themeToggle');
});

TestSuite.addTest('Navigation links exist', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  return navLinks.length > 0 ? true : 'No navigation links found';
});

// Export the test suite for use in HTML test runner
window.TestSuite = TestSuite;