# Quote Of the Day 

This app provides random inspirational quotes based on a category chosen by the user. Users can save quotes to their favorites, remove them, and retrieve their favorite quotes. The quote updates every day and the user can also change their quote of the day if they don't like it.

## Features

- **Random Quotes**: Fetch random quotes based on a chosen category.
- **Favorite Quotes**: Save your favorite quotes locally using `AsyncStorage`.
- **Remove Quotes**: Remove quotes from your favorites list.
- **Daily Quote Update**: The quote refreshes every day at midnight.
- **Change Quote**: Change your daily qutoe if you don't like it.
- **Category Selection**: Users can select categories to get quotes from.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/quote-app.git
   cd quote-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add your API key:

   ```env
   API_KEY=your-api-ninjas-api-key
   
4. Start the app:
   ```bash
   npm start

## Technologies Used

**React Native:** To build the mobile interface.
**TypeScript:** For type safety and better code maintainability.
**Expo:** To handle mobile app development and deployment.
**AsyncStorage:** For local storage to store quotes and favorites.
**API Ninjas Quotes API:** For fetching random quotes from different categories.


