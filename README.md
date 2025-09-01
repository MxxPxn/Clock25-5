# 25 + 5 Clock (Pomodoro Timer)

A clean, functional Pomodoro timer built with React that helps you manage work and break intervals using the popular Pomodoro Technique.

## Features

- **Customizable Session Length**: Adjust work sessions from 1-60 minutes (default: 25 minutes)
- **Customizable Break Length**: Set break duration from 1-60 minutes (default: 5 minutes)
- **Automatic Mode Switching**: Seamlessly transitions between work sessions and breaks
- **Audio Notifications**: Plays a beep sound when switching between modes
- **Visual Timer Display**: Clean MM:SS format with current mode indicator
- **Start/Stop Control**: Pause and resume timer at any point
- **Reset Functionality**: Instantly reset to default settings
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React** (with Hooks)
- **JavaScript (ES6+)**
- **HTML5 Audio API**
- **CSS** (for styling)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd pomodoro-timer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

### Setting Up Your Timer

1. **Adjust Session Length**: Use the + and - buttons under "Session Length" to set your work period (1-60 minutes)
2. **Adjust Break Length**: Use the + and - buttons under "Break Length" to set your break period (1-60 minutes)

### Running a Pomodoro Session

1. Click the **"start/stop"** button to begin your session
2. The timer will count down from your set session length
3. When the session ends, you'll hear a beep and the timer automatically switches to break mode
4. After the break, it switches back to session mode
5. Use **"start/stop"** to pause/resume at any time
6. Click **"reset"** to return to default settings and stop the timer

### Default Settings

- Session Length: 25 minutes
- Break Length: 5 minutes
- Audio notification enabled

## Component Structure

The application consists of a single main component:

- `TimerDisplay`: Main component handling all timer logic, state management, and UI rendering

### Key Features Implementation

- **State Management**: Uses React hooks (`useState`) for timer state
- **Timer Logic**: `useEffect` with `setInterval` for countdown functionality
- **Audio Integration**: HTML5 audio element for notifications
- **Prevent Adjustment During Timer**: Settings can only be changed when timer is stopped

## File Structure

```
src/
├── TimerDisplay.js    # Main timer component
├── App.js            # App wrapper (if applicable)
├── App.css           # Styling
└── index.js          # Entry point
```

## Customization

### Changing Default Times

Update the constants at the top of `TimerDisplay.js`:

```javascript
const INITIAL_SESSION_TIME = 25; // Change default session length
const INITIAL_BREAK_TIME = 5;    // Change default break length
```

### Styling

The component uses CSS classes and IDs for styling:
- `.clock__body` - Main container
- `.timer-control` - Control buttons container
- Various IDs for specific elements (`#timer-label`, `#time-left`, etc.)

### Audio Customization

Replace the audio source URL in the component:
```javascript
<audio id="beep" src="your-custom-audio-file.wav"/>
```

## Browser Compatibility

- Modern browsers with ES6+ support
- HTML5 Audio API support required for sound notifications
- Tested on Chrome, Firefox, Safari, and Edge

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the Pomodoro Technique 
- Audio file courtesy of freeCodeCamp
- Built as part of freeCodeCamp's Front End Development Libraries certification

## Future Enhancements

- [ ] Add statistics tracking (completed sessions, total time)
- [ ] Multiple audio notification options
- [ ] Visual progress indicators
- [ ] Keyboard shortcuts
- [ ] Local storage for user preferences
- [ ] Dark/light theme toggle
- [ ] Long break intervals (every 4th break)
