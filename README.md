# Vibecodedsloptest

This is just a test website.

It is a tiny static page for experimenting with a 4-digit code message flow.

## How it works

- Enter `1310` to open the sender view.
- Write a message and choose a 4-digit receiver code.
- Enter that receiver code on the first screen to read the saved message.

## Current storage

This version stores messages in the browser with `localStorage`. That means it is only good for testing the flow on one device, but it will not share messages between different people or different browsers after publishing to GitHub Pages.

For real anonymous message sharing, this site needs a small backend or database. A 4-digit code also is not private enough for sensitive messages because there are only 10,000 possible codes.

## Note

This repo is just for testing. The current version is a static front-end demo, not a real anonymous messaging service.
