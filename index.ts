import type { Coin, Denomination, Drawer, Note } from "./types";

function removeItem(name: Denomination["name"], drawer: Drawer) {
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

function addItem(name: Denomination["name"], drawer: Drawer) {
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

function isCoin(name: Denomination["name"]): name is Coin {
  return (
    name === "penny" ||
    name === "nickel" ||
    name === "dime" ||
    name === "quarter"
  );
}

function countCoins(drawer: Drawer) {
  let count = 0;

  for (let i = 0; i < drawer.length; i++) {
    if (isCoin(drawer[i].name) && drawer[i].quantity > 0) {
      count += drawer[i].quantity;
    }
  }

  return count;
}

function isNote(name: Denomination["name"]): name is Note {
  return (
    name === "one" ||
    name === "five" ||
    name === "ten" ||
    name === "twenty" ||
    name === "hundred"
  );
}

function countNotes(drawer: Drawer) {
  let count = 0;

  for (let i = 0; i < drawer.length; i++) {
    if (isNote(drawer[i].name) && drawer[i].quantity > 0) {
      count += drawer[i].quantity;
    }
  }

  return count;
}

function sumDrawer(drawer: Drawer) {
  let total = 0;

  for (let i = 0; i < drawer.length; i++) {
    if (drawer[i].quantity > 0) {
      total += drawer[i].quantity * drawer[i].value;
    }
  }

  return "$" + (total / 100).toFixed(2);
}

function canMakeAmount(target: number, drawer: Drawer) {
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

// ALTERNATIVE APPROACH
// function canMakeAmount(target: number, drawer: Drawer) {
//   for (let i = drawer.length - 1; i >= 0; i--) {
//     while (drawer[i].quantity > 0 && target - drawer[i].value >= 0) {
//       target -= drawer[i].value;
//       drawer[i].quantity--;
//     }
//   }

//   return target === 0;
// }

function transaction(cost: number, paid: number, drawer: Drawer) {
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
