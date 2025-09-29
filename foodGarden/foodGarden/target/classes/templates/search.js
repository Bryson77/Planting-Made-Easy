const pages = [
  { title: "Apples", url: "/templates/FruitVegPages/APPLES.html", description: "Learn more about apples here" },
  { title: "Avocados", url: "/templates/FruitVegPages/AVOCADO.html", description: "Learn more about avocados here" },
  { title: "Broccoli", url: "/templates/FruitVegPages/BROCCOLI.html", description: "Learn more about broccoli here" },
  { title: "Cabbage", url: "/templates/FruitVegPages/CABBAGE.html", description: "Learn more about cabbage here" },
  { title: "Carrots", url: "/templates/FruitVegPages/CARROTS.html", description: "Learn more about carrots here" },
  { title: "Cucumbers", url: "/templates/FruitVegPages/CUCUMBERS.html", description: "Learn more about cucumbers here" },
  { title: "Lettuce", url: "/templates/FruitVegPages/LETTUCE.html", description: "Learn more about lettuce here" },
  { title: "Maize", url: "/templates/FruitVegPages/MAIZE.html", description: "Learn more about maize here" },
  { title: "Onions", url: "/templates/FruitVegPages/ONIONS.html", description: "Learn more about onions here" },
  { title: "Oranges", url: "/templates/FruitVegPages/ORANGES.html", description: "Learn more about oranges here" },
  { title: "Potatoes", url: "/templates/FruitVegPages/POTATOES.html", description: "Learn more about potatoes here" },
  { title: "Spinach", url: "/templates/FruitVegPages/SPINACH.html", description: "Learn more about spinach here" },
  { title: "Sweet Potatoes", url: "/templates/FruitVegPages/SWEET POTATOES.html", description: "Learn more about sweet potatoes here" },
  { title: "Tomatoes", url: "/templates/FruitVegPages/TOMATOES.html", description: "Learn more about tomatoes here" },
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