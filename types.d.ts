export type Coin = "penny" | "nickel" | "dime" | "quarter";
export type Note = "one" | "five" | "ten" | "twenty" | "hundred";

export interface Denomination {
  name: Coin | Note;
  value: number;
  quantity: number;
}

export type Drawer = Denomination[];
