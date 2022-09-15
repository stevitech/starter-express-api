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

app.get("/upload", async (req, res) => {
    // store something
await s3.putObject({
    Body: JSON.stringify({key:"value"}),
    Bucket: "cyclic-capris-bear-us-west-2",
    Key: "some_files/my_file.json",
}).promise()

// get it back
let my_file = await s3.getObject({
    Bucket: "cyclic-capris-bear-us-west-2",
    Key: "some_files/my_file.json",
}).promise()

console.log(JSON.parse(my_file))

})

app.listen(process.env.PORT || 3000);
