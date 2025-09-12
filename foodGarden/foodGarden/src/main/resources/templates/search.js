const pages = [
  { title: "Apples", url: "/templates/FruitVegPages/APPLES.html", description: "Learn more about apples here" },
  { title: "About Us", url: "about.html", description: "Learn more about our company and team." },
  { title: "Services", url: "services.html", description: "Explore the services we offer." },
  { title: "Contact", url: "contact.html", description: "Get in touch with us." },
  { title: "Blog", url: "blog.html", description: "Read our latest news and articles." }
];

const searchBox = document.getElementById("searchBox");
const resultsList = document.getElementById("results");

searchBox.addEventListener("keyup", function () {
  const query = this.value.toLowerCase();
  resultsList.innerHTML = "";

  if (query.length > 0) {
    const filtered = pages.filter(page =>
      page.title.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query)
    );

    filtered.forEach(page => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${page.url}">${page.title}</a><br>
        <small>${page.description}</small>
      `;
      resultsList.appendChild(li);
    });

    if (filtered.length === 0) {
      resultsList.innerHTML = "<li>No results found</li>";
    }
  }
});