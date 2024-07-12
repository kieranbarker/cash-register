// const drawer = require("./drawer.js");

function removeItem(name, drawer) {
  let item;

  for (let i = 0; i < drawer.length; i++) {
    if (drawer[i].name === name) {
      item = drawer[i];
      break;
    }
  }

  if (item && item.quantity > 0) {
    item.quantity--;
  }

  return drawer;
}

function addItem(name, drawer) {
  let item;

  for (let i = 0; i < drawer.length; i++) {
    if (drawer[i].name === name) {
      item = drawer[i];
      break;
    }
  }

  if (item) {
    item.quantity++;
  }

  return drawer;
}

function countCoins(drawer) {
  const coins = ["penny", "nickel", "dime", "quarter"];
  let count = 0;

  for (let i = 0; i < drawer.length; i++) {
    if (coins.includes(drawer[i].name) && drawer[i].quantity > 0) {
      count += drawer[i].quantity;
    }
  }

  return count;
}

function countNotes(drawer) {
  const notes = ["one", "five", "ten", "twenty", "hundred"];
  let count = 0;

  for (let i = 0; i < drawer.length; i++) {
    if (notes.includes(drawer[i].name) && drawer[i].quantity > 0) {
      count += drawer[i].quantity;
    }
  }

  return count;
}

function sumDrawer(drawer) {
  let total = 0;

  for (let i = 0; i < drawer.length; i++) {
    if (drawer[i].quantity > 0) {
      total += drawer[i].quantity * drawer[i].value;
    }
  }

  return "$" + (total / 100).toFixed(2);
}

function canMakeAmount(target, drawer) {
  for (let i = drawer.length - 1; i >= 0; i--) {
    while (drawer[i].quantity > 0) {
      const diff = target - drawer[i].value;
      if (diff < 0) break;

      target -= drawer[i].value;
      drawer[i].quantity--;
    }
  }

  return target === 0;
}

function transaction(cost, paid, drawer) {
  let changeDue = paid - cost;

  // Add the customer's cash to the drawer
  for (let i = drawer.length - 1; i >= 0; i--) {
    while (paid > 0) {
      const diff = paid - drawer[i].value;
      if (diff < 0) break;

      paid -= drawer[i].value;
      drawer[i].quantity++;
    }
  }

  // Remove the customer's change from the drawer
  for (let i = drawer.length - 1; i >= 0; i--) {
    while (changeDue > 0) {
      const diff = changeDue - drawer[i].value;
      if (diff < 0) break;

      changeDue -= drawer[i].value;
      drawer[i].quantity--;
    }
  }

  return drawer;
}

module.exports = {
  removeItem,
  addItem,
  countCoins,
  countNotes,
  sumDrawer,
  canMakeAmount,
  transaction,
};
