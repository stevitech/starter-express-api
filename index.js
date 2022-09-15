const express = require("express");
const app = express();
app.all("/", (req, res) => {
    console.log("Just got a request!");
    res.send("Yo!");
});

app.get("/api", (req, res) => {
    const path = `/api/item`;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.listen(process.env.PORT || 3000);
