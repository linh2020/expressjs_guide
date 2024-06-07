import express from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/books", (req, res) => {
  res.status(200).json({
    status: "Success",
  });
});

app.listen(PORT, () =>
  console.log(`Express server is listening on port ${PORT}`)
);
