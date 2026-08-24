export type DietTag = "Vegan" | "Veggie" | "High protein";

export type SignatureBowl = {
  id: string;
  name: string;
  img: string;
  ingredients: string;
  kcal: number;
  protein: number;
  price: number;
  tags: DietTag[];
};

export const SIGNATURE_BOWLS: SignatureBowl[] = [
  {
    id: "harvest",
    name: "Harvest Bowl",
    img: "/salads/harvest.jpg",
    ingredients:
      "Avocado, cherry tomatoes, chickpeas, roast sweet potato, red cabbage slaw, watermelon radish",
    kcal: 520,
    protein: 16,
    price: 9.9,
    tags: ["Vegan"],
  },
  {
    id: "tofu",
    name: "Crispy Tofu Bowl",
    img: "/salads/tofu.jpg",
    ingredients:
      "Golden tofu cubes, edamame, sweetcorn, quail eggs, red cabbage, cucumber",
    kcal: 560,
    protein: 28,
    price: 10.4,
    tags: ["Veggie", "High protein"],
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    img: "/salads/mediterranean.jpg",
    ingredients:
      "Feta cubes, black & green olives, red onion rings, shredded carrot, walnuts",
    kcal: 480,
    protein: 14,
    price: 9.4,
    tags: ["Veggie"],
  },
  {
    id: "falafel",
    name: "Falafel & Chickpea",
    img: "/salads/falafel.jpg",
    ingredients:
      "Falafel, chickpeas, flatbread wedge, peppers, olives, fresh herbs, yogurt",
    kcal: 610,
    protein: 19,
    price: 9.8,
    tags: ["Veggie"],
  },
  {
    id: "garden",
    name: "Garden Egg Bowl",
    img: "/salads/garden.jpg",
    ingredients:
      "Soft-boiled egg, courgette ribbons, kale, cherry tomatoes, carrot slaw, radish",
    kcal: 430,
    protein: 21,
    price: 9.2,
    tags: ["Veggie"],
  },
  {
    id: "quinoa",
    name: "Quinoa Avocado",
    img: "/salads/quinoa.jpg",
    ingredients: "Quinoa, kale, spiced chickpeas, sugar snaps, avocado, peppers",
    kcal: 540,
    protein: 22,
    price: 10.2,
    tags: ["Vegan", "High protein"],
  },
  {
    id: "steak",
    name: "Steak & Greens",
    img: "/salads/steak.jpg",
    ingredients:
      "Seared steak strips, butterhead lettuce, cherry tomatoes, hazelnuts, balsamic glaze",
    kcal: 570,
    protein: 34,
    price: 12.9,
    tags: ["High protein"],
  },
  {
    id: "salmon",
    name: "Salmon Couscous",
    img: "/salads/salmon.jpg",
    ingredients:
      "Salmon fillet, herby couscous, green beans, cherry tomatoes, pine nuts",
    kcal: 590,
    protein: 31,
    price: 12.4,
    tags: ["High protein"],
  },
];

/* ---------- Bowl builder ---------- */

export type BuilderOption = {
  id: string;
  name: string;
  price: number;
  kcal: number;
  protein?: number;
};

export const BASES: BuilderOption[] = [
  { id: "leaves", name: "Mixed leaves", price: 4.2, kcal: 90 },
  { id: "quinoa", name: "Quinoa", price: 4.8, kcal: 210 },
  { id: "couscous", name: "Herby couscous", price: 4.6, kcal: 190 },
  { id: "kale", name: "Kale & spinach", price: 4.4, kcal: 110 },
];

export const PROTEINS: BuilderOption[] = [
  { id: "chicken", name: "Grilled chicken", price: 3.4, kcal: 165, protein: 31 },
  { id: "tofu", name: "Crispy tofu", price: 2.9, kcal: 140, protein: 18 },
  { id: "tuna", name: "Tuna", price: 3.2, kcal: 130, protein: 28 },
  { id: "steak", name: "Seared steak", price: 4.4, kcal: 190, protein: 34 },
  { id: "salmon", name: "Salmon", price: 4.2, kcal: 210, protein: 30 },
  { id: "falafel", name: "Falafel", price: 2.6, kcal: 220, protein: 13 },
];

export const TOPPINGS: BuilderOption[] = [
  { id: "avocado", name: "Avocado", price: 1.6, kcal: 120 },
  { id: "tomatoes", name: "Cherry tomatoes", price: 0.9, kcal: 25 },
  { id: "feta", name: "Feta", price: 1.2, kcal: 90 },
  { id: "chickpeas", name: "Chickpeas", price: 0.9, kcal: 110 },
  { id: "sweetcorn", name: "Sweetcorn", price: 0.7, kcal: 70 },
  { id: "olives", name: "Olives", price: 0.9, kcal: 60 },
  { id: "sweetpotato", name: "Roast sweet potato", price: 1.1, kcal: 95 },
  { id: "edamame", name: "Edamame", price: 1.0, kcal: 85 },
  { id: "slaw", name: "Red cabbage slaw", price: 0.7, kcal: 35 },
  { id: "seeds", name: "Toasted seeds", price: 0.8, kcal: 105 },
];

export const DRESSINGS: BuilderOption[] = [
  { id: "goddess", name: "Green goddess", price: 0.6, kcal: 80 },
  { id: "lemon", name: "Lemon vinaigrette", price: 0.5, kcal: 60 },
  { id: "tahini", name: "Tahini", price: 0.6, kcal: 95 },
  { id: "chilli", name: "Chilli-honey", price: 0.6, kcal: 70 },
  { id: "balsamic", name: "Olive oil & balsamic", price: 0.4, kcal: 90 },
];

export const MAX_TOPPINGS = 4;

/* ---------- Basket & orders ---------- */

export type BasketLine = {
  id: number;
  name: string;
  unitPrice: number;
  qty: number;
  detail?: string;
};

export type OrderStatus = "Preparing" | "Ready" | "Picked up";

export type OrderItem = {
  name: string;
  qty: number;
  unitPrice: number;
  detail?: string;
};

export type Order = {
  id: number;
  customer: string;
  placedLabel: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  readyAt?: string;
  fromVisitor?: boolean;
};

function orderTotal(items: OrderItem[]): number {
  return items.reduce((sum, it) => sum + it.unitPrice * it.qty, 0);
}

function seedOrder(
  id: number,
  customer: string,
  placedLabel: string,
  status: OrderStatus,
  items: OrderItem[],
): Order {
  return { id, customer, placedLabel, status, items, total: orderTotal(items) };
}

export const SEED_ORDERS: Order[] = [
  seedOrder(2040, "Marco D.", "12:02", "Preparing", [
    { name: "Mediterranean", qty: 1, unitPrice: 9.4 },
    { name: "Falafel & Chickpea", qty: 1, unitPrice: 9.8 },
  ]),
  seedOrder(2039, "Priya R.", "11:55", "Preparing", [
    { name: "Crispy Tofu Bowl", qty: 1, unitPrice: 10.4 },
  ]),
  seedOrder(2038, "Tom B.", "11:48", "Ready", [
    { name: "Salmon Couscous", qty: 1, unitPrice: 12.4 },
    { name: "Garden Egg Bowl", qty: 1, unitPrice: 9.2 },
  ]),
  seedOrder(2037, "Amira S.", "11:41", "Ready", [
    {
      name: "Custom bowl",
      qty: 1,
      unitPrice: 10.3,
      detail: "Quinoa · Falafel · Avocado, Sweetcorn · Tahini",
    },
  ]),
  seedOrder(2036, "Jonas K.", "11:26", "Picked up", [
    { name: "Steak & Greens", qty: 2, unitPrice: 12.9 },
  ]),
  seedOrder(2035, "Lena M.", "11:12", "Picked up", [
    { name: "Harvest Bowl", qty: 1, unitPrice: 9.9 },
    { name: "Quinoa Avocado", qty: 1, unitPrice: 10.2 },
  ]),
];

export const FIRST_VISITOR_ORDER_ID = 2041;

/* Sold counts from earlier today (before the seeded board), used as the
   baseline for the bestseller bars. Visitor orders add on top. */
export const SEED_SOLD: Record<string, number> = {
  "Harvest Bowl": 14,
  "Crispy Tofu Bowl": 11,
  "Salmon Couscous": 9,
  "Custom bowl": 8,
  "Steak & Greens": 7,
  "Quinoa Avocado": 6,
  Mediterranean: 5,
  "Falafel & Chickpea": 5,
  "Garden Egg Bowl": 4,
};

/* Deterministic pickup slots: 12:00 → 14:30 every 15 minutes. */
export const PICKUP_SLOTS: string[] = [
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
];

export type StockItem = { name: string; left: number; threshold: number };

export const STOCK: StockItem[] = [
  { name: "Avocado", left: 9, threshold: 10 },
  { name: "Salmon", left: 6, threshold: 10 },
  { name: "Falafel", left: 12, threshold: 10 },
  { name: "Feta", left: 14, threshold: 10 },
  { name: "Green goddess", left: 5, threshold: 10 },
];

export function euro(n: number): string {
  return `€${n.toFixed(2)}`;
}
