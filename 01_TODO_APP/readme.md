# Multi-User Todo App

A modern, responsive web application that allows multiple users to manage their personal todo lists in a single interface. Built with vanilla HTML, CSS, and JavaScript.

## Features

- **Multi-User Support**: Multiple users can have their own todo lists on the same page
- **Add New Users**: Dynamic user creation with name and email
- **Task Management**: Add and delete tasks for each user
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, dark-themed interface with smooth animations
- **Real-time Updates**: Instant task addition and deletion

## Demo

The app comes pre-populated with 6 sample users:
- Bhupinder Singh
- Khushi
- Aditya Jha
- Anubhav Prasad
- Hemesh Singh Rajput
- Hans Raj

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Dynamic functionality and DOM manipulation
- **Gilroy Font**: Custom typography via external CDN

## File Structure

```
todo-app/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
├── plus.svg            # Add button icon
└── delete.png          # Delete button icon
```

## Installation & Setup

1. **Clone or download** the project files
2. **Ensure you have the required assets**:
   - `plus.svg` - Icon for add buttons
   - `delete.png` - Icon for delete buttons
3. **Open `index.html`** in your web browser

No build process or server setup required - it's a static web application!

## Usage

### Adding a New User
1. Click the **"ADD USER"** button (floating button at bottom-right)
2. Enter the user's name and email in the modal form
3. Click **"Submit"** to create the new user card

### Managing Tasks
1. **Add Task**: Type in the input field and click the green plus button
2. **Delete Task**: Click the delete icon next to any task
3. Each user's tasks are managed independently

### Responsive Design
- **Desktop**: Grid layout with multiple columns
- **Mobile**: Stacked layout for optimal viewing

## Code Structure

### HTML Structure
- Uses semantic HTML5 elements
- Data attributes for JavaScript targeting
- Template element for dynamic user creation

### CSS Features
- CSS Grid for responsive layout
- Flexbox for component alignment
- CSS custom properties for consistent theming
- Smooth transitions and hover effects
- Mobile-first responsive design

### JavaScript Functionality
- Event delegation for dynamic elements
- DOM manipulation for task management
- Form validation and user input handling
- Template cloning for new user creation

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization

### Adding New Themes
Modify the CSS variables in `style.css`:
```css
:root {
  --primary-bg: #111f;
  --primary-text: white;
  --accent-color: rgb(25, 255, 52);
}
```

### Modifying User Template
Edit the `<template>` element in `index.html` to change the structure of new user cards.

### Adding New Features
The modular JavaScript structure makes it easy to add:
- Task editing functionality
- Local storage persistence
- Task categories or priorities
- Due dates and reminders

## Performance Considerations

- Efficient DOM queries using data attributes
- Event delegation to minimize memory usage
- Optimized CSS with minimal reflows
- Lightweight vanilla JavaScript implementation

## Future Enhancements

- [ ] Local storage for data persistence
- [ ] Task editing capabilities
- [ ] Task categories and tags
- [ ] Due date functionality
- [ ] Search and filter options
- [ ] Export/import functionality
- [ ] Dark/light theme toggle

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the application.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created as a demonstration of modern web development techniques using vanilla JavaScript.

---

**Note**: Make sure to include the `plus.svg` and `delete.png` files in your project directory for the icons to display properly.
