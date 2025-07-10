# Advanced Password Generator

A comprehensive React-based password generator with advanced customization options, real-time strength analysis, and user-friendly interface built with Create React App.

## Features

### Core Functionality
- **Multiple Password Generation**: Generate 1-10 passwords simultaneously
- **Customizable Length**: 4-128 characters with slider control
- **Character Set Options**: Uppercase, lowercase, numbers, special characters
- **Advanced Filters**: Exclude similar/ambiguous characters
- **Custom Characters**: Add your own character sets
- **Character Exclusion**: Exclude specific unwanted characters

### Smart Features
- **Real-time Strength Analysis**: 5-level password strength indicator
- **Auto-generation Mode**: Automatically generate new passwords every 3 seconds
- **Must Include Each Type**: Ensures at least one character from each selected type
- **History Tracking**: Keeps last 50 generated passwords
- **Favorites System**: Save and manage favorite passwords
- **One-click Copy**: Copy passwords to clipboard instantly

### User Experience
- **Dark/Light Mode**: Toggle between themes
- **Export Functionality**: Export passwords as TXT or JSON
- **Local Storage**: Remembers your preferences
- **Responsive Design**: Works on all device sizes
- **Clean Interface**: Minimal, distraction-free design

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Quick Start
```bash
# Clone or download the project
cd password-generator

# Install dependencies
npm install

# Start the development server
npm start
```

The application will automatically open at `http://localhost:3000` and will hot-reload when you make changes.

### Available Scripts
```bash
npm start          # Runs the app in development mode
npm run build      # Builds the app for production
npm test           # Launches the test runner
npm run eject      # Ejects from Create React App (one-way operation)
```

## Project Structure

```
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── Hooks/
│   │   └── use-password-generator.js  # Custom hook with all logic
│   ├── components/
│   │   ├── Button.js           # Reusable button component
│   │   ├── CheckBox.js         # Checkbox input component
│   │   └── strengthChecker.js  # Password strength indicator
│   ├── App.css                 # All application styles
│   ├── App.js                  # Main application component
│   └── index.js                # React entry point
├── package.json                # Dependencies and scripts
└── README.md                   # This documentation
```

## Architecture Overview

The application follows a clean React architecture with Create React App as the foundation, custom hooks for state management, and reusable components for UI elements.

### Component Hierarchy
- **App.js**: Main container with layout and theme management
- **usePasswordGenerator**: Custom hook managing all password logic
- **Button**: Reusable button with consistent styling
- **CheckBox**: Labeled checkbox component
- **StrengthChecker**: Password strength visualization

### Technology Stack
- **React 18**: Modern React with hooks and functional components
- **Create React App**: Zero-configuration build setup
- **CSS3**: Custom styling with CSS variables for theming
- **Local Storage API**: For persisting user preferences
- **Clipboard API**: For copy-to-clipboard functionality

## Usage Guide

### Basic Usage
1. **Set Password Length**: Use the length slider (4-128 characters)
2. **Choose Quantity**: Select how many passwords to generate (1-10)
3. **Select Character Types**: Check desired character sets
4. **Generate**: Click "Generate Passwords" button

### Advanced Options
- **Exclude Similar**: Removes confusing characters like 'i', 'l', '1', 'O', '0'
- **Exclude Ambiguous**: Removes special characters that might cause issues
- **Must Include Each Type**: Guarantees at least one character from each selected type
- **Custom Characters**: Add your own character set
- **Exclude Characters**: Remove specific characters you don't want

### Auto-Generation
Enable "Auto Generate" to automatically create new passwords every 3 seconds - perfect for browsing options quickly.

### Managing Passwords
- **Copy**: Click any "Copy" button to copy password to clipboard
- **Favorite**: Click "★" to save password to favorites
- **History**: View previously generated passwords
- **Export**: Download passwords as TXT or JSON file

## Technical Details

### Password Strength Levels
- **Excellent** (90-100): Very strong password
- **Strong** (75-89): Good password
- **Medium** (50-74): Acceptable password
- **Weak** (25-49): Should be improved
- **Very Weak** (0-24): Not recommended

### Character Sets
- **Lowercase**: a-z (26 characters)
- **Uppercase**: A-Z (26 characters)
- **Numbers**: 0-9 (10 characters)
- **Special**: !@#$%^&*()_+-=[]{}|;:,.<>?~` (32 characters)

### Storage
- Settings are automatically saved to browser's localStorage
- History keeps last 50 passwords
- Favorites limited to 20 passwords for performance

### Development Features
- **Hot Reloading**: Changes reflect immediately during development
- **Error Boundaries**: Graceful error handling
- **ESLint Integration**: Code quality enforcement
- **Production Optimization**: Minified builds for deployment

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Lightweight: ~150KB total bundle size (gzipped)
- Fast generation: Can generate 10 x 128-character passwords instantly
- Efficient rendering: Uses React's built-in optimization
- Memory conscious: Limits history and favorites storage

## Security Notes

- All generation happens client-side
- No passwords are sent to any server
- Uses cryptographically secure random number generation
- Clipboard access requires user permission
- No password data is logged or tracked

## Deployment

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deployment Options
- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Any static hosting**: Upload the build folder contents

## Development

### Adding New Features
1. Create components in `src/components/`
2. Add logic to `src/Hooks/use-password-generator.js`
3. Update styles in `src/App.css`
4. Test changes with `npm start`

### Code Style
- Uses functional components with hooks
- Follows React best practices
- Consistent naming conventions
- Proper separation of concerns

## Contributing

This is a standalone React application built with Create React App. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Open source - feel free to use and modify as needed.

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill the process using port 3000
npx kill-port 3000
# Or start on a different port
PORT=3001 npm start
```

**Build fails:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Clipboard not working:**
- Ensure you're using HTTPS or localhost
- Check browser permissions for clipboard access

For more help, check the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).
