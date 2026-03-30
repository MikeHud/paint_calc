# Jotun Paint Mixing Calculator

An embeddable web calculator for mixing Jotun 2-part epoxy paints by weight. This calculator helps users determine the correct mixing ratios for various Jotun paint products.

## Features

- **Paint Type Selection**: Dropdown with common Jotun paint products
- **Weight-based Calculation**: Calculate mixing ratios based on total weight needed (in grams)
- **Hardener Selection**: Choose between standard and winter grade hardeners
- **Real-time Results**: Instant calculation of base and hardener components
- **Pot Life Information**: Display pot life for selected paint type and hardener
- **Responsive Design**: Works on desktop and mobile devices
- **Embeddable**: Can be easily embedded in other websites via iframe

## Usage

### Standalone Usage

1. Open `index.html` in a web browser
2. Select the paint type from the dropdown
3. Enter the total weight needed in grams
4. Select the hardener type (standard or winter grade)
5. Click "Calculate Mixing Ratio"
6. View the results showing base component, hardener component, mixing ratio, and pot life

### Embedding in Other Websites

#### Basic Embedding

```html
<iframe 
    src="path/to/index.html" 
    width="500" 
    height="600" 
    frameborder="0"
    scrolling="no">
</iframe>
```

#### Responsive Embedding

```html
<div style="position: relative; padding-bottom: 120%; height: 0; overflow: hidden;">
    <iframe 
        src="path/to/index.html" 
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
        scrolling="no">
    </iframe>
</div>
```

#### Custom Styling

The calculator automatically detects when it's embedded in an iframe and applies appropriate styling. You can also customize the appearance by modifying the CSS.

## Paint Types Included

### Jotamastic Series
- Jotamastic 87 (4:1 standard, 3:1 winter grade, 2-3 hours standard, 4-5 hours winter grade)
- Jotamastic 90 (4:1 standard, 3:1 winter grade, 2-3 hours standard, 4-5 hours winter grade)

## Technical Details

### File Structure
```
paint_calc/
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript logic
└── README.md       # This file
```

### Dependencies
- No external dependencies required
- Pure HTML, CSS, and JavaScript
- Works in all modern browsers

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Adding New Paint Types

To add new paint types, edit the `paintData` object in `script.js`:

```javascript
'new-paint-type': {
    name: 'New Paint Name',
    baseRatio: 4,
    hardenerRatio: 1,
    totalRatio: 5,
    potLife: '2-3 hours at 20°C',
    description: 'Paint description'
}
```

### Styling Customization

Modify `styles.css` to customize the appearance. The calculator includes:
- Modern gradient background
- Card-based layout
- Responsive design
- Embeddable styling options

### API Access

The calculator exposes a global `JotunPaintCalculator` object for programmatic access:

```javascript
// Access paint data
const paintData = window.JotunPaintCalculator.paintData;

// Trigger calculation programmatically
window.JotunPaintCalculator.calculateMixing();
```

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the calculator.

## Disclaimer

This calculator provides general guidance for mixing Jotun paints. Always refer to the official product data sheets for specific application requirements and safety information.
