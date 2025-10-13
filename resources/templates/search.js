const pages = [
  { title: "Apples", url: "FruitVegData.html/APPLES.html", description: "Learn more about apples here" },
  { title: "Avocados", url: "FruitVegData.html/AVOCADO.html", description: "Learn more about avocados here" },
  { title: "Broccoli", url: "FruitVegData.html/BROCCOLI.html", description: "Learn more about broccoli here" },
  { title: "Cabbage", url: "FruitVegData.html/CABBAGE.html", description: "Learn more about cabbage here" },
  { title: "Carrots", url: "FruitVegData.html/CARROTS.html", description: "Learn more about carrots here" },
  { title: "Cucumbers", url: "FruitVegData.html/CUCUMBERS.html", description: "Learn more about cucumbers here" },
  { title: "Lettuce", url: "FruitVegData.html/LETTUCE.html", description: "Learn more about lettuce here" },
  { title: "Maize", url: "FruitVegData.html/MAIZE.html", description: "Learn more about maize here" },
  { title: "Onions", url: "FruitVegData.html/ONIONS.html", description: "Learn more about onions here" },
  { title: "Oranges", url: "FruitVegData.html/ORANGES.html", description: "Learn more about oranges here" },
  { title: "Potatoes", url: "FruitVegData.html/POTATOES.html", description: "Learn more about potatoes here" },
  { title: "Spinach", url: "FruitVegData.html/SWEET POTATOES.html", description: "Learn more about sweet potatoes here" },
  { title: "Tomatoes", url: "FruitVegData.html/TOMATOES.html", description: "Learn more about tomatoes here" },
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