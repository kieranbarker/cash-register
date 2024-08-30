"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeItem(name, drawer) {
    var item;
    for (var i = 0; i < drawer.length; i++) {
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
    var item;
    for (var i = 0; i < drawer.length; i++) {
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
    var count = 0;
    function isCoin(name) {
        return (name === "penny" ||
            name === "nickel" ||
            name === "dime" ||
            name === "quarter");
    }
    for (var i = 0; i < drawer.length; i++) {
        if (isCoin(drawer[i].name) && drawer[i].quantity > 0) {
            count += drawer[i].quantity;
        }
    }
    return count;
}
function countNotes(drawer) {
    var count = 0;
    function isNote(name) {
        return (name === "one" ||
            name === "five" ||
            name === "ten" ||
            name === "twenty" ||
            name === "hundred");
    }
    for (var i = 0; i < drawer.length; i++) {
        if (isNote(drawer[i].name) && drawer[i].quantity > 0) {
            count += drawer[i].quantity;
        }
    }
    return count;
}
function sumDrawer(drawer) {
    var total = 0;
    for (var i = 0; i < drawer.length; i++) {
        if (drawer[i].quantity > 0) {
            total += drawer[i].quantity * drawer[i].value;
        }
    }
    return "$" + (total / 100).toFixed(2);
}
function canMakeAmount(target, drawer) {
    for (var i = drawer.length - 1; i >= 0; i--) {
        while (drawer[i].quantity > 0) {
            var diff = target - drawer[i].value;
            if (diff < 0)
                break;
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
function transaction(cost, paid, drawer) {
    var changeDue = paid - cost;
    // Add the customer's cash to the drawer
    for (var i = drawer.length - 1; i >= 0; i--) {
        while (paid > 0) {
            var diff = paid - drawer[i].value;
            if (diff < 0)
                break;
            paid -= drawer[i].value;
            drawer[i].quantity++;
        }
    }
    // Remove the customer's change from the drawer
    for (var i = drawer.length - 1; i >= 0; i--) {
        while (changeDue > 0) {
            var diff = changeDue - drawer[i].value;
            if (diff < 0)
                break;
            changeDue -= drawer[i].value;
            drawer[i].quantity--;
        }
    }
    return drawer;
}
module.exports = {
    removeItem: removeItem,
    addItem: addItem,
    countCoins: countCoins,
    countNotes: countNotes,
    sumDrawer: sumDrawer,
    canMakeAmount: canMakeAmount,
    transaction: transaction,
};
