import React from "react";
import ReactDOMServer from "react-dom/server";
import http from "http";

const App = () => {
  return (
    <html>
      <head>
        <title>TypeScript TSX Example</title>
      </head>
      <body>
        <div id="root">
          <h1>Hello from TypeScript and React!</h1>
        </div>
      </body>
    </html>
  );
};

const server = http.createServer((_req, res: any) => {
  const html = ReactDOMServer.renderToString(<App />);

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
