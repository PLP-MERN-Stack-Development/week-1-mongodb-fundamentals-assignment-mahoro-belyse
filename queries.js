// inserting data
db.books.insertMany([
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: "J. B. Lippincott & Co.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: "Charles Scribner's Sons",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    published_year: 1932,
    price: 11.5,
    in_stock: false,
    pages: 311,
    publisher: "Chatto & Windus",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: "Little, Brown and Company",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: "T. Egerton, Whitehall",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: "Allen & Unwin",
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    published_year: 1945,
    price: 8.5,
    in_stock: false,
    pages: 112,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: "HarperOne",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    published_year: 1851,
    price: 12.5,
    in_stock: false,
    pages: 635,
    publisher: "Harper & Brothers",
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Gothic Fiction",
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: "Thomas Cautley Newby",
  },
]);

// Find all books in a specific genre
db.books.find({ genre: "Fiction" });
// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// Find books by a specific author
db.books.find({ author: "George Orwell" });

// Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 13.99 } });

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

// Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Projection: only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sort by price ascending
db.books.find().sort({ price: 1 });

// Sort by price descending
db.books.find().sort({ price: -1 });

// Pagination: page 1 (5 books)
db.books.find().skip(0).limit(5);

// Pagination: page 2 (next 5 books)
db.books.find().skip(5).limit(5);

// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } },
]);

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 },
]);

// Group books by publication decade
db.books.aggregate([
  {
    $group: {
      _id: {
        decade: {
          $subtract: ["$published_year", { $mod: ["$published_year", 10] }],
        },
      },
      count: { $sum: 1 },
    },
  },
  { $sort: { "_id.decade": 1 } },
]);
// Cdb.books.createIndex({ title: 1 })
db.books.createIndex({ title: 1 });

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Check performance using explain
db.books.find({ title: "1984" }).explain("executionStats");
