require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const app = express();

app.all("/", (req, res) => {
    console.log("Just got a request!");
    res.send("Yo!");
});
const s3 = new AWS.S3();

app.get("/api", (req, res) => {
    const path = `/api/item`;
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/upload", async (req, res) => {
    // store something
    const val = await s3
        .upload({
            Body: JSON.stringify({ key: "value" }),
            Bucket: "cyclic-capris-bear-us-west-2",
            Key: "some_files/my_file.json",
        })
        .promise();

    // get it back
    // let my_file = await s3
    //     .getObject({
    //         Bucket: "cyclic-capris-bear-us-west-2",
    //         Key: "some_files/my_file.json",
    //     })
    //     .promise();

    console.log();
    res.send({ message: "upload DONE@@", val });
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});

process.on("SIGTERM", () => {
    server.close(() => {
        console.log("Process terminated");
    });
});
