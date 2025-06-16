
![Captura de tela 2025-06-16 003035](https://github.com/user-attachments/assets/b44f2990-b802-4561-b54b-b6fdae088e06)

# NASA Astronomy Picture of the Day (APOD) Viewer

A modern web application built with Angular that displays 10 random NASA's Astronomy Picture of the Day collection. Responsive interface to explore stunning astronomical images along with their detailed explanations.

## Features

- View NASA's Astronomy Picture of the Day collection of 10 random images
- Responsive design that works on all devices
- UI with Tailwind CSS styling
- Detailed explanations for each astronomical image

## Technologies Used

- Angular 19
- TypeScript
- Tailwind CSS
- RxJS
- Node.js

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nixoletas/angular-nasa-apod.git
cd angular-nasa-apod
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Building for Production

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

To execute the unit tests:

```bash
ng test
```

## Project Structure

```
src/
├── app/
│   ├── pages/
│   │   └── home/        # Main page component
│   ├── services/        # API services
│   └── interface/       # TypeScript interfaces
├── assets/              # Static assets
└── environments/        # Environment configurations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- NASA for providing the APOD API
- Angular team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
