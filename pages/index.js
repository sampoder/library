function random(seed) {
  var x = Math.sin(seed++) * 10000;
  return (x - Math.floor(x)) * 10;
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const colours = [
  "#8FA6AC",
  "#4F583D",
  "#85865F",
  "#93312A",
  "#427861",
  "#712320",
];

export default function Home({ books }) {
  return (
    <>
      <div className="container">
        {Array.from(Array(1000).keys()).map((item) => (
          <div
            className="book-container"
            style={{
              borderBottom: item >= 900 ? "none" : "4.5px solid #8A584C",
              background: "#000024",
            }}
          >
            <div
              className="book"
              style={{
                background: item >= books.length ? "#2c2c36" : colours.random(),
                marginTop: `${random(item)}px`,
                height: `calc(100% - ${random(item)}px)`,
              }}
            >
              <span>{item >= books.length ? '' : books[item].fields['Book Name']}</span>
            </div>
          </div>
        ))}
      </div>
      <div class="overlay">
        <h1>{books.length}/1000 books collected</h1>
        World Book Day is coming up on the 3rd of March. To help share the magic
        of books, we're hosting a book donation drive in collaboration with
        Books Beyond Borders. Books donated will be used to fundraise new
        libraries, better schools and books for students in Nepal. We aim to
        collect over 1,000 books to support the program. We really appreciate
        all the support.
      </div>
    </>
  );
}

export async function getStaticProps() {
  const AirtablePlus = require("airtable-plus");
  const airtable = new AirtablePlus({
    baseID: process.env.BASE_ID,
    apiKey: process.env.KEY,
    tableName: "Books",
  });
  const books = await airtable.read();
  console.log(books)
  return {props: {books}}
}
