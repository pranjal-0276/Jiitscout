 const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const cards = document.querySelectorAll(".card-wrapper");

    cards.forEach(card => {
      const title = card.querySelector(".card-title").innerText.toLowerCase();

      if (title.startsWith(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });