document.addEventListener("DOMContentLoaded", getMenu);

function getMenu() {
  fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const foodItemsContainer = document.getElementById("food-items");
      data.forEach((item) => {
        const foodItem = document.createElement("div");
        foodItem.className = "food-item";
        foodItem.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <button onclick="initiateOrder()"> + </button>
                `;
        foodItemsContainer.appendChild(foodItem);
      });
    })
    .catch((error) => console.error("Error fetching food items:", error));
}

function TakeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = [
        "Cheeseburger",
        "Double Cheeseburger",
        "Veggie Burger",
        "Chicken Burger",
        "Fish Burger",
      ];
      const selectedBurgers = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * burgers.length);
        selectedBurgers.push(burgers[randomIndex]);
      }
      resolve({ order: selectedBurgers });
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

function initiateOrder() {
  TakeOrder()
    .then((order) => {
      console.log("Order:", order);
      return orderPrep();
    })
    .then((prepStatus) => {
      console.log("Order Prep Status:", prepStatus);
      return payOrder();
    })
    .then((paymentStatus) => {
      console.log("Payment Status:", paymentStatus);
      if (paymentStatus.paid) {
        thankyouFnc();
      }
    })
    .catch((error) => console.error("Error:", error));
}
