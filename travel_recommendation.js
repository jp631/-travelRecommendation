const searchInput = document.getElementById("search_input");
const searchBtn = document.getElementById("search_btn");
const resetBtn = document.getElementById("reset_btn");
const displayCity = document.getElementById("displayCity");

let searchQuery = "";
let keyword = [
  ["countries", "country"],
  ["cities", "city"],
  ["temples", "temple"],
  ["beaches", "beach"],
];

let keywordSearch = (word) => {
  keyword.forEach((wordArray) => {
    if (wordArray.includes(word)) {
      console.log(wordArray[0], "c");
      searchQuery = wordArray[0];
      return;
    }
  });
};

let createTravelCard = (city) => {
  let travelCard = document.createElement("div");
  travelCard.classList.add("travel-card");
  displayCity.classList.add("show");
  displayCity.appendChild(travelCard);
  let cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  cardImage.setAttribute("src", `${city.imageUrl}`);
  travelCard.appendChild(cardImage);
  let cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  travelCard.appendChild(cardContent);
  let countryName = document.createElement("p");
  countryName.classList.add("country-name");
  countryName.innerText = "Name";
  cardContent.appendChild(countryName);
  let cityName = document.createElement("p");
  cityName.classList.add("city-name");
  cityName.innerText = `${city.name}`;
  cardContent.appendChild(cityName);
  let description = document.createElement("p");
  description.classList.add("description");
  description.innerText = `${city.description}`;
  cardContent.appendChild(description);
};

const fetchAllData = async (searchQuery = "none", filter) => {
  let foundData = [];
  if (searchQuery === "none") {
    return;
  }

  const dataResponse = await fetch("./travel_recommendation_api.json");
  const data = await dataResponse.json();
  foundData = data;

  if (filter) {
    return () => {
      return filter(foundData, searchQuery);
    };
  } else {
    return foundData;
  }
};

searchInput.addEventListener("change", (e) => {
  e.preventDefault();
  keywordSearch(e.target.value.trim());
  console.log(searchQuery, "ggfdsfggfds");
  ``;
});

let resetDisplayCity = () => {
  displayCity.classList.remove("show");
  displayCity.innerHTML = "";
  searchInput.value = "";
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  resetDisplayCity();
  console.log(searchQuery, "searchQuery");
  fetchAllData(searchQuery, filterData).then((data) => {
    let getData = data();
    if (searchQuery === "countries") {
      getData.forEach((element) => {
        element.cities.forEach((city) => {
          createTravelCard(city);
        });
      });
    } else {
      getData.forEach((element) => {
        createTravelCard(element);
      });
    }
  });
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetDisplayCity();
  searchQuery = "";
});

let filterData = (data, search) => {
  return data[search.toLowerCase()];
};

document.addEventListener("DOMContentLoaded", () => {
  alert(
    "the search input is not completely functional, you can only search for country, temple and beach. Will I improve it later I do not knkow. This website is just a simple project to pass my course.",
  );
});
