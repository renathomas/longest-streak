## The goal:

The goal of this project is to create an application that takes in user typed input, and uses good UX (up to you) to display the longest "even" or "odd" streak of letters.
Evenness for the letters alternates with a = even, b = odd, c = even, d = odd etc.

A few gotchas:

- Whitespace neither counts for a streak, nor breaks a streak
- Non-alphabetic characters including numbers break a streak
- Capitalization does not matter

Underneath the displayed string, please put the total streak count

Here are some examples of what a finished product could look like. Feel free to make it your own:

https://user-images.githubusercontent.com/82614741/122090655-01185780-cdd6-11eb-8035-4d60f115e25d.mp4

https://user-images.githubusercontent.com/82614741/121964608-c9f46880-cd39-11eb-8bce-25d3bba61465.mp4

## Testing out the app:

**This code skeleton is just for illustrative purposes, feel free to move stuff around or do anything a different way**
The front-end should be responsible for displaying the content and functionality, while the backend should do the actual calculations.
Please keep the frontend in Javascript and the backend in python if possible.

First, cd into "api" and run:

### `pip install -r requirements.txt`

If pip isn't installed, you can install it using these instructions:
https://pip.pypa.io/en/stable/installing/

Then, run:

### `flask run`

This opens up the server on port 3000 of localhost.

In the main project directory (cd ..), you can run:

### `npm start`

This will most likely open up a tab in your browser window pointed to localhost:3000. If not, copy and paste localhost:3000 into your browser's url.

### Versions

You will need node v16 & python39
