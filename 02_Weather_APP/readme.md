# Weather App 🌤️

A modern, responsive weather application built with vanilla JavaScript that provides current weather information for any location worldwide. The app features a sleek glassmorphism design with smooth animations and supports both geolocation-based weather and city search functionality.

## ✨ Features

- **Dual Weather Modes**: Switch between current location weather and city search
- **Geolocation Support**: Automatically detect and display weather for your current location
- **City Search**: Search for weather information in any city worldwide
- **Detailed Weather Data**: View temperature, humidity, wind speed, and cloud coverage
- **Weather Icons**: Visual weather representations with custom icons
- **Country Flags**: Display country flags alongside city names
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations and transitions
- **Loading Animations**: Engaging Lottie animations during data fetching

## 🚀 Demo

The app provides real-time weather data including:
- Current temperature
- Weather conditions (clear, cloudy, rainy, etc.)
- Wind speed
- Humidity percentage
- Cloud coverage
- Country identification with flags

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with glassmorphism effects, gradients, and animations
- **JavaScript (ES6+)**: Vanilla JavaScript with async/await, modern DOM manipulation
- **APIs**:
  - [Open-Meteo API](https://open-meteo.com/): Weather data
  - [API Ninjas](https://api.api-ninjas.com/): Geocoding and reverse geocoding
  - [FlagsAPI](https://flagsapi.com/): Country flags
- **External Libraries**:
  - [Lottie Web Components](https://lottiefiles.com/): Loading animations
  - [Gilroy Font](https://fonts.google.com/): Typography

## 📁 Project Structure

```
weather-app/
├── index.html          # Main HTML structure
├── style.css           # Complete styling with responsive design
├── script.js           # Main JavaScript application logic
├── countryCodes.js     # Country code to name mapping
├── assets/             # Static assets
│   ├── map.png         # Location icon
│   ├── loupe.png       # Search icon
│   ├── storm.png       # Wind speed icon
│   ├── humidity.png    # Humidity icon
│   └── clouds.png      # Cloud coverage icon
└── icons/              # Weather condition icons
    ├── clear-sky.png
    ├── partly-cloudy.png
    ├── thunderstorm.png
    └── ... (various weather icons)
```

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **API Key Setup**:
   - Sign up for a free API key at [API Ninjas](https://api.api-ninjas.com/)
   - Replace the `API_KEY` in `script.js`:
     ```javascript
     const API_KEY = "your-api-key-here";
     ```

3. **Local Development**:
   - Open `index.html` in your browser, or
   - Use a local server for better development experience:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

4. **Access the app**:
   - Open your browser and navigate to `http://localhost:8000`

## 🔑 API Configuration

The app uses the following APIs:

### API Ninjas (Geocoding)
- **Purpose**: Convert city names to coordinates and vice versa
- **Endpoint**: `https://api.api-ninjas.com/v1/geocoding`
- **Authentication**: X-Api-Key header
- **Rate Limit**: Check API documentation

### Open-Meteo (Weather Data)
- **Purpose**: Fetch current weather conditions
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Authentication**: None required (free tier)
- **Data**: Temperature, humidity, wind speed, weather codes

### FlagsAPI (Country Flags)
- **Purpose**: Display country flags
- **Endpoint**: `https://flagsapi.com/{country_code}/shiny/64.png`
- **Authentication**: None required

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-like elements with backdrop blur
- **Responsive Grid**: CSS Grid for weather parameters on all screen sizes
- **Smooth Transitions**: CSS transitions and animations throughout
- **Typography**: Custom Gilroy font for enhanced readability
- **Color Scheme**: Blue gradient background with white glass elements
- **Loading States**: Animated loading screens during API calls

## 💻 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## 🔄 Usage

1. **Current Location Weather**:
   - Click "Your Weather" tab
   - Grant location access when prompted
   - View your current location's weather

2. **City Search**:
   - Click "Search Weather" tab
   - Enter city name in the search field
   - Press Enter or click the search button
   - View weather for the searched city

3. **Navigation**:
   - Switch between tabs anytime
   - Location permission is remembered in session storage
   - Search history is cleared after each search

## 🛡️ Error Handling

The app includes comprehensive error handling for:
- Network failures
- Invalid city names
- Geolocation permission denied
- API rate limits
- Malformed responses

## 📱 Responsive Design

The app is fully responsive with breakpoints at:
- **Desktop**: > 768px
- **Tablet**: 768px - 481px
- **Mobile**: ≤ 480px

Features adapt accordingly:
- Navigation tabs stack on mobile
- Grid layout adjusts for smaller screens
- Typography scales appropriately
- Touch-friendly button sizes

## 🔒 Privacy & Data

- No user data is stored permanently
- Location coordinates are stored in session storage only
- No personal information is transmitted to third parties
- All API calls are made client-side

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for free weather API
- [API Ninjas](https://api.api-ninjas.com/) for geocoding services
- [FlagsAPI](https://flagsapi.com/) for country flag images
- [LottieFiles](https://lottiefiles.com/) for loading animations
- Weather icons from various open-source contributors
- 
**Made with ❤️ by Bhupinder**
