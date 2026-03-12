# Router Kawaii - Project Blueprint

## 📋 Project Overview

**Project Name:** Router Kawaii  
**Application Name:** Syed Alijah Home  
**Version:** 1.0.0  
**Author:** Syed Alijah  
**License:** MIT  
**Type:** Electron Desktop Application  

### 🎯 Purpose
Router Kawaii is an Electron-based desktop application designed for managing multiple home network routers through a unified control center. It provides a single interface to monitor, configure, and access various router devices in a home network environment.

---

## 🏗️ Architecture Overview

### Technology Stack
- **Framework:** Electron 28.0.0
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** TailwindCSS 3.4.0
- **Build Tool:** TailwindCSS CLI
- **Target Platform:** Desktop (Windows, macOS, Linux)

### Application Structure
```
router-kawaii/
├── main.js                 # Electron main process
├── preload.js             # Preload script for security bridge
├── package.json           # Project configuration
├── tailwind.config.js     # TailwindCSS configuration
├── README.md              # Project documentation
├── src/                   # Source files
│   ├── index.html         # Main application UI
│   ├── index.css          # Custom CSS styles
│   └── output.css         # Compiled TailwindCSS
├── node_modules/          # Dependencies
└── .git/                  # Version control
```

---

## 🔧 Core Components

### 1. Main Process (main.js)
**Purpose:** Electron application lifecycle management and security configuration

**Key Features:**
- Window creation and management
- Custom frameless window design
- Security header stripping for router webviews
- IPC handlers for window controls
- Header bypass for X-Frame-Options and CSP

**Security Configuration:**
- Strips security headers from specific router IPs to enable webview embedding
- Supports multiple router endpoints:
  - D-Link: 10.1.10.1
  - HUAWEI: 100.10.10.1
  - Tenda1: 100.10.10.3:8080
  - Tenda2: 100.10.10.4:8080
  - Camera: 100.10.10.2

### 2. Preload Script (preload.js)
**Purpose:** Security bridge between main and renderer processes

**Key Features:**
- Exposes safe APIs to renderer process
- Window control functions (minimize, maximize, close)
- Router credential management
- Auto-login scripts for different router types

**Router Credentials:**
- D-Link: Password: pxshr3ws
- HUAWEI: Username: telecomadmin, Password: Syed#Alijah
- Tenda1: Password: Tenda0
- Tenda2: Password: Tenda0
- Camera: Password: admin

### 3. User Interface (src/index.html)
**Purpose:** Main application interface with router management capabilities

**Layout Structure:**
- **Navigation Sidebar:** Router selection buttons with status indicators
- **Main Content Area:** Tabbed interface for different views
- **Dashboard:** Network monitoring and router status overview
- **Router Tabs:** Individual router webview interfaces
- **Settings Tab:** Router configuration and credential management

---

## 🌐 Network Architecture

### Supported Router Types
1. **D-Link Router** (10.1.10.1)
   - Pink theme
   - Password-only authentication
   - Primary network device

2. **HUAWEI Router** (100.10.10.1)
   - Blue theme
   - Username + password authentication
   - Secondary network device

3. **Tenda Router 1** (100.10.10.3:8080)
   - Green theme
   - Password-only authentication
   - Port 8080 access

4. **Tenda Router 2** (100.10.10.4:8080)
   - Orange theme
   - Password-only authentication
   - Port 8080 access

5. **Camera Router** (100.10.10.2)
   - Cyan theme
   - Password-only authentication
   - Camera device management

### Network Monitoring System
- **Bandwidth Calculation:** 30 Mbps per online router
- **Status Checking:** Every 30 seconds
- **Device Detection:** Automatic network scanning
- **Load Balancing:** Network load percentage calculation

---

## 💻 User Interface Design

### Design System
- **Theme:** Glassmorphism with gradient backgrounds
- **Color Scheme:** 
  - Pink (D-Link)
  - Blue (HUAWEI)
  - Green (Tenda1)
  - Orange (Tenda2)
  - Cyan (Camera)
- **Typography:** Segoe UI, system fonts
- **Animations:** Floating effects, hover states, transitions

### UI Components
1. **Navigation Buttons**
   - Router status LEDs (green/yellow/red)
   - Hover effects and scaling
   - Active state indicators

2. **Dashboard Cards**
   - Network status overview
   - Bandwidth monitoring
   - Router status indicators
   - Real-time updates

3. **Router Interface Webviews**
   - Full router admin panels
   - Auto-login functionality
   - Security header bypass
   - Individual reload controls

---

## 🔐 Security Features

### Security Considerations
- **Content Security Policy:** Currently uses unsafe-inline/unsafe-eval (development)
- **Header Stripping:** Bypasses X-Frame-Options for router embedding
- **Credential Storage:** Hardcoded in preload.js (development approach)
- **IPC Communication:** Secure bridge between processes

### Security Bypasses Required
- X-Frame-Options header removal
- Content-Security-Policy header removal
- CORS handling for cross-origin requests
- Webview embedding restrictions

---

## ⚙️ Functionality Details

### Core Functions

1. **Router Status Monitoring**
   - Real-time connectivity checks
   - LED status indicators
   - Automatic status updates every 30 seconds
   - Special camera detection logic

2. **Bandwidth Calculation**
   - Base speed: 30 Mbps per router
   - Total bandwidth: Online routers × 30 Mbps
   - Network load percentage calculation
   - Dynamic status badge updates

3. **Auto-Login System**
   - Router-specific login scripts
   - Credential injection
   - Form filling automation
   - Session monitoring

4. **Network Device Scanning**
   - D-Link interface integration
   - Fallback IP scanning
   - Device count estimation
   - Network topology mapping

### Advanced Features

1. **Camera Router Special Handling**
   - Multi-endpoint detection
   - Image-based connectivity testing
   - Fallback endpoint testing
   - Enhanced timeout handling

2. **Window Management**
   - Custom title bar
   - Minimize/maximize/close controls
   - Frameless window design
   - Drag functionality

3. **Settings Management**
   - Credential viewing (toggle visibility)
   - Router information display
   - Configuration editing guidance

---

## 📊 Data Flow

### Application Startup
1. Main process creates Electron window
2. Security headers configured
3. Preload script loaded
4. Renderer process initializes
5. Router status checking begins
6. UI updates with current status

### Status Monitoring Cycle
1. Check all router endpoints
2. Update LED indicators
3. Calculate bandwidth metrics
4. Update dashboard displays
5. Repeat every 30 seconds

### User Interaction Flow
1. User selects router from navigation
2. Corresponding tab becomes active
3. Router webview loads with auto-login
4. User can interact with router interface
5. Status monitoring continues in background

---

## 🚀 Deployment & Development

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build CSS (watch mode)
npm run build:css
```

### Build Requirements
- Node.js environment
- Electron development dependencies
- TailwindCSS CLI

### Distribution
- Electron Builder (not configured)
- Package.json scripts for development
- No production build process defined

---

## 🔮 Future Enhancements

### Potential Improvements
1. **Security Enhancements**
   - Secure credential storage
   - CSP policy hardening
   - Authentication token management

2. **Feature Additions**
   - Router configuration backup/restore
   - Network performance metrics
   - Alert system for network issues
   - Mobile companion app

3. **UI/UX Improvements**
   - Dark/light theme toggle
   - Customizable dashboard
   - Router grouping and organization
   - Advanced network visualization

4. **Technical Improvements**
   - Production build process
   - Auto-update functionality
   - Plugin system for router types
   - Cloud synchronization

---

## 📝 Development Notes

### Known Issues
- CSP policy allows unsafe-inline and unsafe-eval (security risk)
- Hardcoded credentials (not production-ready)
- No production build configuration
- Limited error handling in some areas

### Technical Debt
- Camera detection logic could be optimized
- Status checking could be more efficient
- UI code could be componentized
- Missing unit tests

### Dependencies
- Electron 28.0.0 (main framework)
- TailwindCSS 3.4.0 (styling)
- No additional runtime dependencies

---

## 📞 Support & Maintenance

### Code Structure
- Modular design with clear separation of concerns
- Well-commented critical sections
- Consistent naming conventions
- Responsive design principles

### Maintenance Considerations
- Regular dependency updates
- Security policy reviews
- Router compatibility testing
- Performance optimization opportunities

---

*This blueprint provides a comprehensive overview of the Router Kawaii project architecture, functionality, and development considerations for future maintenance and enhancement purposes.*
