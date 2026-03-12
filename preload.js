const { contextBridge, ipcRenderer } = require('electron');

// ============================================
// ELECTRON API - Window Controls
// ============================================
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close')
});

// ============================================
// ALL ROUTER CREDENTIALS (HARDCODED)
// ============================================
const ROUTER_CREDENTIALS = {
  huawei: {
    username: 'telecomadmin',
    password: 'Syed#Alijah',
    hasUsername: true
  },
  dlink: {
    username: '',
    password: 'pxshr3ws',
    hasUsername: false
  },
  tenda1: {
    username: '',
    password: 'Tenda0',
    hasUsername: false
  },
  tenda2: {
    username: '',
    password: 'Tenda0',
    hasUsername: false
  }
};

// Pre-built login scripts for each router (avoids template literal issues)
const LOGIN_SCRIPTS = {
  huawei: `
    (function() {
      console.log('[Router Kawaii] Auto-login for HUAWEI...');
      function attemptLogin() {
        const usernameField = document.querySelector('input[id="txt_Username"]') || 
                              document.querySelector('input[name="Username"]') ||
                              document.querySelector('input[name="username"]');
        const passwordField = document.querySelector('input[type="password"]') ||
                              document.querySelector('input[id="txt_Password"]') ||
                              document.querySelector('input[name="Password"]');
        const submitBtn = document.querySelector('#loginBtn') ||
                          document.querySelector('input[type="submit"]') ||
                          document.querySelector('button[type="submit"]');
        
        if (passwordField) {
          console.log('[Router Kawaii] Found HUAWEI login form...');
          
          if (usernameField) {
            usernameField.value = 'telecomadmin';
            usernameField.dispatchEvent(new Event('input', { bubbles: true }));
            usernameField.dispatchEvent(new Event('change', { bubbles: true }));
          }
          
          passwordField.value = 'Syed#Alijah';
          passwordField.dispatchEvent(new Event('input', { bubbles: true }));
          passwordField.dispatchEvent(new Event('change', { bubbles: true }));
          
          setTimeout(() => {
            if (submitBtn) {
              console.log('[Router Kawaii] Clicking HUAWEI submit...');
              submitBtn.click();
            }
          }, 500);
          return true;
        }
        return false;
      }
      
      if (!attemptLogin()) {
        setTimeout(attemptLogin, 1000);
        setTimeout(attemptLogin, 2000);
      }
    })();
  `,

  dlink: `
    (function() {
      console.log('[Router Kawaii] Auto-login for D-LINK starting...');
      
      function attemptLogin() {
        console.log('[D-Link] Attempting login...');
        
        // Log all password inputs found
        const allPasswordInputs = document.querySelectorAll('input[type="password"]');
        console.log('[D-Link] Found password inputs:', allPasswordInputs.length);
        allPasswordInputs.forEach((inp, i) => {
          console.log('[D-Link] Password input ' + i + ':', inp.id, inp.name, inp.className);
        });
        
        // Log all inputs
        const allInputs = document.querySelectorAll('input');
        console.log('[D-Link] Total inputs on page:', allInputs.length);
        
        // Try many selectors
        const passwordField = document.querySelector('input[type="password"]') ||
                              document.querySelector('input[name="password"]') ||
                              document.querySelector('input[name="Password"]') ||
                              document.querySelector('input[name="admin_password"]') ||
                              document.querySelector('#admin_password') ||
                              document.querySelector('#password') ||
                              document.querySelector('#loginPassword') ||
                              document.querySelector('[id*="password"]') ||
                              document.querySelector('[id*="Password"]') ||
                              document.querySelector('[name*="password"]') ||
                              document.querySelector('[name*="Password"]');
        
        if (passwordField) {
          console.log('[D-Link] Found password field:', passwordField.id, passwordField.name);
          
          // Set value multiple ways
          passwordField.value = 'pxshr3ws';
          passwordField.setAttribute('value', 'pxshr3ws');
          
          // Trigger all possible events
          passwordField.dispatchEvent(new Event('input', { bubbles: true }));
          passwordField.dispatchEvent(new Event('change', { bubbles: true }));
          passwordField.dispatchEvent(new Event('keyup', { bubbles: true }));
          passwordField.dispatchEvent(new Event('blur', { bubbles: true }));
          
          // Also try focus/typing simulation
          passwordField.focus();
          
          console.log('[D-Link] Password set to:', passwordField.value);
          
          // Find submit button
          const submitBtn = document.querySelector('input[type="submit"]') ||
                            document.querySelector('button[type="submit"]') ||
                            document.querySelector('#login') ||
                            document.querySelector('#loginBtn') ||
                            document.querySelector('#btn_login') ||
                            document.querySelector('.btn_login') ||
                            document.querySelector('input[value="Log In"]') ||
                            document.querySelector('input[value="Login"]') ||
                            document.querySelector('input[value="login"]') ||
                            document.querySelector('button[onclick*="login"]') ||
                            document.querySelector('button[onclick*="Login"]') ||
                            document.querySelector('a[onclick*="login"]') ||
                            document.querySelector('[onclick*="doLogin"]');
          
          console.log('[D-Link] Submit button found:', submitBtn ? 'YES' : 'NO');
          
          setTimeout(() => {
            if (submitBtn) {
              console.log('[D-Link] Clicking submit button...');
              submitBtn.click();
            } else {
              // Try form submit
              const form = passwordField.closest('form');
              if (form) {
                console.log('[D-Link] Submitting form directly...');
                form.submit();
              } else {
                console.log('[D-Link] No form found, looking for any clickable login element...');
                // Try clicking any element that might be a login button
                const loginElements = document.querySelectorAll('[onclick*="login"], [onclick*="Login"], .login, #login');
                loginElements.forEach(el => {
                  console.log('[D-Link] Clicking:', el.tagName, el.id, el.className);
                  el.click();
                });
              }
            }
          }, 800);
          
          return true;
        } else {
          console.log('[D-Link] No password field found yet...');
        }
        return false;
      }
      
      // Try multiple times with delays
      setTimeout(attemptLogin, 500);
      setTimeout(attemptLogin, 1500);
      setTimeout(attemptLogin, 3000);
      setTimeout(attemptLogin, 5000);
    })();
  `,

  tenda1: `
    (function() {
      console.log('[Router Kawaii] Auto-login for TENDA 1...');
      let alreadyLoggedIn = false;
      
      function attemptLogin() {
        if (alreadyLoggedIn) return true;
        
        const passwordField = document.querySelector('input[type="password"]') ||
                              document.querySelector('#password') ||
                              document.querySelector('input[name="password"]');
        const submitBtn = document.querySelector('input[type="submit"]') ||
                          document.querySelector('button[type="submit"]') ||
                          document.querySelector('#login-btn') ||
                          document.querySelector('.login-btn') ||
                          document.querySelector('input[value="Login"]') ||
                          document.querySelector('button[onclick*="login"]');
        
        if (passwordField && !passwordField.value) {
          console.log('[Router Kawaii] Found Tenda 1 password field...');
          
          passwordField.value = 'Tenda0';
          passwordField.dispatchEvent(new Event('input', { bubbles: true }));
          passwordField.dispatchEvent(new Event('change', { bubbles: true }));
          
          alreadyLoggedIn = true;
          
          setTimeout(() => {
            if (submitBtn) {
              console.log('[Router Kawaii] Clicking Tenda 1 submit...');
              submitBtn.click();
            } else {
              const form = passwordField.closest('form');
              if (form) form.submit();
            }
          }, 500);
          return true;
        }
        return false;
      }
      
      if (!attemptLogin()) {
        setTimeout(attemptLogin, 1500);
      }
    })();
  `,

  tenda2: `
    (function() {
      console.log('[Router Kawaii] Auto-login for TENDA 2...');
      let alreadyLoggedIn = false;
      
      function attemptLogin() {
        if (alreadyLoggedIn) return true;
        
        const passwordField = document.querySelector('input[type="password"]') ||
                              document.querySelector('#password') ||
                              document.querySelector('input[name="password"]');
        const submitBtn = document.querySelector('input[type="submit"]') ||
                          document.querySelector('button[type="submit"]') ||
                          document.querySelector('#login-btn') ||
                          document.querySelector('.login-btn') ||
                          document.querySelector('input[value="Login"]') ||
                          document.querySelector('button[onclick*="login"]');
        
        if (passwordField && !passwordField.value) {
          console.log('[Router Kawaii] Found Tenda 2 password field...');
          
          passwordField.value = 'Tenda0';
          passwordField.dispatchEvent(new Event('input', { bubbles: true }));
          passwordField.dispatchEvent(new Event('change', { bubbles: true }));
          
          alreadyLoggedIn = true;
          
          setTimeout(() => {
            if (submitBtn) {
              console.log('[Router Kawaii] Clicking Tenda 2 submit...');
              submitBtn.click();
            } else {
              const form = passwordField.closest('form');
              if (form) form.submit();
            }
          }, 500);
          return true;
        }
        return false;
      }
      
      if (!attemptLogin()) {
        setTimeout(attemptLogin, 1500);
      }
    })();
  `
};

// Expose safe APIs to renderer
contextBridge.exposeInMainWorld('routerAPI', {
  getCredentials: (routerName) => ROUTER_CREDENTIALS[routerName] || ROUTER_CREDENTIALS.huawei,

  // Get auto-login script for specific router
  getAutoLoginScriptFor: (routerName) => {
    return LOGIN_SCRIPTS[routerName] || '';
  },

  // Legacy function for backward compatibility
  getAutoLoginScript: () => {
    return LOGIN_SCRIPTS.huawei;
  }
});

console.log('[Router Kawaii] Preload script loaded - All router credentials ready');
