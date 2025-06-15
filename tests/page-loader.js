// Page loader for testing
// This file loads a page in an iframe and runs tests against it

// Create a function to load a page in an iframe
function loadPageInIframe(pageUrl) {
  return new Promise((resolve, reject) => {
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '500px';
    iframe.style.border = '1px solid #ddd';
    iframe.style.borderRadius = '4px';
    
    // Add load event listener
    iframe.addEventListener('load', () => {
      resolve(iframe);
    });
    
    // Add error event listener
    iframe.addEventListener('error', (error) => {
      reject(new Error(`Failed to load page: ${error.message}`));
    });
    
    // Set source and append to document
    iframe.src = pageUrl;
    document.getElementById('page-container').appendChild(iframe);
  });
}

// Function to run tests against the loaded page
function runTestsAgainstPage(iframe) {
  // Get the document from the iframe
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  
  // Create a new test suite for the page
  const PageTestSuite = {
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
      
      console.log('Running page tests...');
      
      this.tests.forEach(test => {
        try {
          const result = test.testFn(iframeDoc);
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
      
      console.log(`\nPage Test Summary: ${results.passed} passed, ${results.failed} failed`);
      return results;
    }
  };
  
  // Helper functions
  function elementExists(doc, selector) {
    const element = doc.querySelector(selector);
    return element ? true : `Element "${selector}" not found`;
  }
  
  function elementContainsText(doc, selector, text) {
    const element = doc.querySelector(selector);
    if (!element) return `Element "${selector}" not found`;
    return element.textContent.includes(text) ? true : `Element "${selector}" does not contain text "${text}"`;
  }
  
  // Define tests for the page
  PageTestSuite.addTest('Navigation bar exists', (doc) => {
    return elementExists(doc, 'nav');
  });
  
  PageTestSuite.addTest('Page has a title', (doc) => {
    return doc.title && doc.title.length > 0 ? true : 'Page title is empty';
  });
  
  PageTestSuite.addTest('Theme toggle button exists', (doc) => {
    return elementExists(doc, '#themeToggle');
  });
  
  PageTestSuite.addTest('Navigation links exist', (doc) => {
    const navLinks = doc.querySelectorAll('.nav-links a');
    return navLinks.length > 0 ? true : 'No navigation links found';
  });
  
  // Return the test suite
  return PageTestSuite;
}

// Export functions
window.PageLoader = {
  loadPageInIframe,
  runTestsAgainstPage
};