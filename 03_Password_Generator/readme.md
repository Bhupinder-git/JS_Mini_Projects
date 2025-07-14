# Password Generator

A modern, responsive password generator built with HTML, CSS, and JavaScript. Generate secure passwords with customizable length and character types, featuring real-time strength indication and one-click copying.

## Features

- **Customizable Length**: Generate passwords from 1 to 20 characters
- **Character Options**: Include/exclude uppercase letters, lowercase letters, numbers, and symbols
- **Strength Indicator**: Real-time visual feedback on password strength
- **One-Click Copy**: Copy generated passwords to clipboard with visual confirmation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Glass-morphism design with smooth animations and gradients

## Demo

The password generator provides:
- Interactive slider for password length selection
- Checkbox options for character types
- Color-coded strength indicator (Red/Yellow/Green)
- Animated copy button with tooltip feedback
- Real-time password generation

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd password-generator
```

2. Open `index.html` in your web browser or serve it using a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have live-server installed)
npx live-server
```

## Usage

1. **Set Password Length**: Use the slider to select desired password length (1-20 characters)

2. **Choose Character Types**: Check the boxes for character types to include:
   - Uppercase Letters (A-Z)
   - Lowercase Letters (a-z)
   - Numbers (0-9)
   - Symbols (~`!@#$%^&*()_+=/*-+.?/:;<.,>{[}])

3. **Generate Password**: Click the "Generate Password" button

4. **Copy Password**: Click the copy icon to copy the password to your clipboard

5. **Check Strength**: Monitor the strength indicator:
   - 🔴 **Red**: Weak password
   - 🟡 **Yellow**: Medium strength
   - 🟢 **Green**: Strong password

## Password Strength Rules

The strength indicator follows these rules:

- **Strong (Green)**: 
  - Has uppercase AND lowercase letters
  - Has numbers OR symbols
  - At least 8 characters long

- **Medium (Yellow)**:
  - Has uppercase OR lowercase letters
  - Has numbers OR symbols
  - At least 6 characters long

- **Weak (Red)**:
  - Doesn't meet medium or strong criteria

## File Structure

```
password-generator/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Password generation logic
└── README.md           # Project documentation
```

## Technologies Used

- **HTML5**: Semantic structure and form elements
- **CSS3**: Modern styling with glass-morphism effects, gradients, and animations
- **JavaScript (ES6+)**: Password generation algorithms and DOM manipulation
- **Feather Icons**: Clean, lightweight icons for UI elements

## Key JavaScript Functions

- `generatePassword()`: Main password generation with Fisher-Yates shuffle
- `calcStrength()`: Real-time password strength calculation
- `copyContent()`: Clipboard API integration with async/await
- `shufflePassword()`: Secure password shuffling using Fisher-Yates algorithm

## Browser Support

- Modern browsers with ES6+ support
- Chrome 63+
- Firefox 53+
- Safari 10+
- Edge 79+

## Security Features

- **No Server Communication**: All generation happens client-side
- **Cryptographically Secure**: Uses `Math.random()` for character selection
- **No Password Storage**: Passwords are never stored or transmitted
- **Secure Shuffling**: Fisher-Yates algorithm ensures uniform distribution

## Customization

### Adding New Symbol Sets
```javascript
const symbols = '~`!@#$%^&*()_+=/*-+.?/:;<.,>{[}]';
// Add or remove symbols as needed
```

### Modifying Strength Rules
```javascript
function calcStrength(){
    // Customize strength calculation logic here
}
```

### Changing Password Length Limits
```html
<input type="range" min="1" max="20" class="slider" step="1" data-lengthSlider>
<!-- Modify min/max values -->
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Feather Icons](https://feathericons.com/) for the beautiful icons
- Fisher-Yates shuffle algorithm for secure password randomization
- Modern CSS techniques for the glass-morphism UI design

---

**Note**: This password generator is designed for general use. For high-security applications, consider using dedicated password management tools or hardware security keys.
