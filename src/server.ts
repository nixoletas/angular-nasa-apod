import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AngularAppEngine } from '@angular/ssr';
import { environment } from './environments/environment';
import dotenv from 'dotenv';

dotenv.config();

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();
const angularAppEngine = new AngularAppEngine();

const apiUrl = environment.API_URL;
const apiKey = process.env['API_KEY'];

// API Routes with proper caching
app.get('/api/apod', async (req, res) => {
  try {
    // Set cache headers BEFORE making the API call
    res.set({
      'Cache-Control': 'public, max-age=10800, s-maxage=10800, must-revalidate', // 3 hours
      'Content-Type': 'application/json'
    });

    const response = await fetch(`${apiUrl}&api_key=${apiKey}&count=10`);
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

app.get('/api/today', async (req, res) => {
  try {
    // Cache for 1 hour since this is daily content that updates once per day
    res.set({
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, must-revalidate', // 1 hour
      'Content-Type': 'application/json'
    });

    const response = await fetch(`${apiUrl}&api_key=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching today APOD:', error);
    res.status(500).json({ error: 'Failed to fetch today APOD data' });
  }
});

// Static files
app.use(
  express.static(browserDistFolder, {
    maxAge: '1h',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  // IMPORTANT: Set headers BEFORE calling angularApp.handle()
  res.set({
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, must-revalidate', // 1 hour for HTML pages
  });

  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);