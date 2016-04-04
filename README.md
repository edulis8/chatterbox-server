# Chatterbox-server
Part of the Hack Reactor Remote curriculum. I completed this project with a pair.

Built a custom back-end in Node to replace the Parse API in my chatterbox-client app. 

This sprint covered CommonJS, routing, and how to debug server-side code.

## Structure

This repo consists of:

- A server app
- [A client app](https://github.com/edulis8/chatterbox-client/)
- test Spec files

#### Server

The server features at a glance :

- GET/POST/OPTIONS requests. 
- Support CORS to handle cross domain issues. 
- Serve Static Assets (css/html/js/img)
- Persistent storage on file.

It has an extensive architecture to potentially handle as many endpoint as necessary.

## Installation

The project relies on bower and npm for external dependencies. In the root directory, run:
- `bower install`
- `npm install`

To run the server, use `node basic-server.js` and open the client/index.html file with your browser.
In particular:

- `./server/basic-server.js`
- `./client/index.html`

