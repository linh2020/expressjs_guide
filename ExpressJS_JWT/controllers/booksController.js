import express from "express";

const books = [
  {
    id: 1,
    name: "Head FirstJava",
    author: "Kathy Sierra, Bert Bates",
  },
  {
    id: 2,
    name: "Java. Beginner's Guide",
    author: "Herbert Schildt",
  },
  {
    id: 3,
    name: "Java for dummies",
    author: "Barry A. Burd",
  },
];

const getABook = (req, res) => {};

const getAllBooks = (req, res) => {
  res.status(200).json({ status: "success", data: books });
};

// module.exports = { getABook, getAllBooks };
export default { getABook, getAllBooks };
