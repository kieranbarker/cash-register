const {
  removeItem,
  addItem,
  countCoins,
  countNotes,
  sumDrawer,
  canMakeAmount,
  transaction,
} = require("./index.js");

const drawer = [
  { name: "penny", value: 1, quantity: 72 },
  { name: "nickel", value: 5, quantity: 41 },
  { name: "dime", value: 10, quantity: 31 },
  { name: "quarter", value: 25, quantity: 17 },
  { name: "one", value: 100, quantity: 90 },
  { name: "five", value: 500, quantity: 11 },
  { name: "ten", value: 1_000, quantity: 2 },
  { name: "twenty", value: 2_000, quantity: 3 },
  { name: "hundred", value: 10_000, quantity: 1 },
];

describe("removeItem", () => {
  it("removes a penny", () => {
    const exampleDrawer = [{ name: "penny", value: 1, quantity: 5 }];
    const testDrawer = removeItem("penny", exampleDrawer);
    const expectedDrawer = [{ name: "penny", value: 1, quantity: 4 }];
    expect(testDrawer).toEqual(expectedDrawer);
  });
});

describe("addItem", () => {
  it("adds a penny", () => {
    const exampleDrawer = [{ name: "penny", value: 1, quantity: 5 }];
    const testDrawer = addItem("penny", exampleDrawer);
    const expectedDrawer = [{ name: "penny", value: 1, quantity: 6 }];
    expect(testDrawer).toEqual(expectedDrawer);
  });
});

describe("countCoins", () => {
  it("counts the number of coins", () => {
    expect(countCoins(drawer)).toEqual(161);
  });
});

describe("countNotes", () => {
  it("counts the number of notes", () => {
    expect(countNotes(drawer)).toEqual(107);
  });
});

describe("sumDrawer", () => {
  it("sums the drawer", () => {
    expect(sumDrawer(drawer)).toEqual("$335.12");
  });
});

describe("canMakeAmount", () => {
  const makeAmountDrawer = [
    { name: "penny", value: 1, quantity: 2 },
    { name: "nickel", value: 5, quantity: 0 },
    { name: "dime", value: 10, quantity: 0 },
    { name: "quarter", value: 25, quantity: 3 },
    { name: "one", value: 100, quantity: 2 },
    { name: "five", value: 500, quantity: 1 },
    { name: "ten", value: 1_000, quantity: 1 },
  ];
  it("returns false when the amount cannot be made", () => {
    expect(canMakeAmount(613, makeAmountDrawer)).toBeFalsy();
  });

  it("returns true when the amount can be made", () => {
    const exampleDrawer = [
      { name: "penny", value: 1, quantity: 2 },
      { name: "nickel", value: 5, quantity: 0 },
      { name: "dime", value: 10, quantity: 0 },
      { name: "quarter", value: 25, quantity: 3 },
      { name: "one", value: 100, quantity: 2 },
      { name: "five", value: 500, quantity: 1 },
      { name: "ten", value: 1_000, quantity: 1 },
    ];
    expect(canMakeAmount(1651, exampleDrawer)).toBeTruthy();
  });
});

describe("transaction", () => {
  it("returns the drawer with the right adjustments", () => {
    const cost = 450;
    const paid = 1000;
    const inputDrawer = [
      { name: "penny", value: 1, quantity: 2 },
      { name: "nickel", value: 5, quantity: 0 },
      { name: "dime", value: 10, quantity: 0 },
      { name: "quarter", value: 25, quantity: 3 },
      { name: "one", value: 100, quantity: 2 },
      { name: "five", value: 500, quantity: 1 },
      { name: "ten", value: 1_000, quantity: 1 },
    ];
    const outputDrawer = [
      { name: "penny", value: 1, quantity: 2 },
      { name: "nickel", value: 5, quantity: 0 },
      { name: "dime", value: 10, quantity: 0 },
      { name: "quarter", value: 25, quantity: 1 },
      { name: "one", value: 100, quantity: 2 },
      { name: "five", value: 500, quantity: 0 },
      { name: "ten", value: 1_000, quantity: 2 },
    ];
    const testDrawer = transaction(cost, paid, inputDrawer);
    expect(testDrawer).toEqual(outputDrawer);
  });
});
