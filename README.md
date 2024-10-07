# Email Signature Generator

A Vue.js 3 application that generates professional email signatures with company/brand logos, designations, and phone numbers.

## Features

- Built with Vue.js 3 and Vite for fast development and optimal performance
- Customizable email signatures with company/brand logos
- Easy-to-use interface for inputting personal and company information
- Responsive design for various screen sizes
- Lightweight and easy to deploy

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/shazzad/signature-generator.git
   ```

2. Navigate to the project directory:

   ```
   cd signature-generator
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Add your company/brand logos:

   - Place your logo files in the `/public/logo` folder

2. Configure your organization details:

   - Open `index.html` in the root directory
   - Locate the configuration section (usually at the top of the file)
   - Update the following information:
     - Organization name
     - Logo URL (relative to the `/public/logo` folder)
     - Company website URL

3. Start the development server:

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173/signature-generator` (or the port specified in the console)

5. Use the interface to input your personal details and generate your email signature

6. Copy the generated signature and use it in your email client

## Building for Production

To create a production-ready build:

```
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Customization

You can further customize the app by modifying the Vue.js components in the `src` directory. The main signature generation logic can be found in the main component file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
