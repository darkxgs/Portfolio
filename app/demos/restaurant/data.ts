export type Category = "Starters" | "Mains" | "Pizza" | "Desserts" | "Drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  emoji: string;
  gradient: string;
  photo?: string;
  popular?: boolean;
}

export const CATEGORIES: Category[] = [
  "Starters",
  "Mains",
  "Pizza",
  "Desserts",
  "Drinks",
];

export const MENU: MenuItem[] = [
  {
    id: "halloumi",
    name: "TasteBite Grazing Board",
    description: "Cheeses, cured meats, olives & pickles — built for sharing",
    price: 9.5,
    category: "Starters",
    emoji: "🧀",
    gradient: "from-ember-300/40 via-ember-500/25 to-ember-600/30",
    photo: "/food/halloumi.jpg",
  },
  {
    id: "flatbread",
    name: "House Baked Bread",
    description: "Warm seeded loaf, whipped butter",
    price: 4.9,
    category: "Starters",
    emoji: "🥖",
    gradient: "from-ember-200/35 via-ember-400/25 to-char-500/30",
    photo: "/food/flatbread.jpg",
  },
  {
    id: "wings",
    name: "Smoky BBQ Wings",
    description: "Six wings, house BBQ glaze, ranch dip",
    price: 7.9,
    category: "Starters",
    emoji: "🍗",
    gradient: "from-ember-500/40 via-ember-700/30 to-ember-400/25",
    photo: "/food/wings.jpg",
    popular: true,
  },
  {
    id: "burger",
    name: "Charcoal Grill Burger",
    description: "Double smashed patty, cheddar, pickles, fries",
    price: 13.5,
    category: "Mains",
    emoji: "🍔",
    gradient: "from-ember-400/50 via-ember-600/30 to-ember-700/40",
    photo: "/food/burger.jpg",
    popular: true,
  },
  {
    id: "shawarma",
    name: "Chicken Shawarma Plate",
    description: "Marinated chicken, garlic sauce, rice, salad",
    price: 12.9,
    category: "Mains",
    emoji: "🌯",
    gradient: "from-ember-500/35 via-ember-400/25 to-fresh-500/20",
    photo: "/food/shawarma.jpg",
  },
  {
    id: "salmon",
    name: "Grilled Lemon Salmon",
    description: "Chargrilled fillet, herb butter, greens",
    price: 16.9,
    category: "Mains",
    emoji: "🐟",
    gradient: "from-ember-400/35 via-ember-500/25 to-ember-200/30",
    photo: "/food/salmon.jpg",
  },
  {
    id: "margherita",
    name: "Margherita",
    description: "San Marzano tomato, fior di latte, basil",
    price: 10.5,
    category: "Pizza",
    emoji: "🍕",
    gradient: "from-ember-600/35 via-ember-400/25 to-fresh-500/20",
    photo: "/food/margherita.jpg",
    popular: true,
  },
  {
    id: "pepperoni",
    name: "BBQ Chicken & Red Onion",
    description: "House BBQ sauce, mozzarella, fresh coriander",
    price: 12.9,
    category: "Pizza",
    emoji: "🍕",
    gradient: "from-ember-700/45 via-ember-500/30 to-ember-400/30",
    photo: "/food/pepperoni.jpg",
  },
  {
    id: "truffle",
    name: "Prosciutto & Rocket",
    description: "White base, prosciutto, parmesan shavings, rocket",
    price: 13.9,
    category: "Pizza",
    emoji: "🍕",
    gradient: "from-char-500/40 via-ember-400/25 to-ember-300/25",
    photo: "/food/truffle.jpg",
  },
  {
    id: "cheesecake",
    name: "Blueberry Baked Cheesecake",
    description: "Blueberry compote, buttery biscuit base",
    price: 6.2,
    category: "Desserts",
    emoji: "🍰",
    gradient: "from-ember-300/40 via-ember-200/25 to-ember-500/25",
    photo: "/food/cheesecake.jpg",
  },
  {
    id: "lava",
    name: "Chocolate Fudge Cake",
    description: "Dark ganache drip, chocolate cream",
    price: 6.8,
    category: "Desserts",
    emoji: "🍫",
    gradient: "from-ember-700/40 via-ember-600/25 to-char-600/35",
    photo: "/food/lava.jpg",
  },
  {
    id: "lemonmint",
    name: "Lime & Mint Cooler",
    description: "Iced, fresh lime, torn mint",
    price: 3.5,
    category: "Drinks",
    emoji: "🍋",
    gradient: "from-fresh-400/30 via-ember-300/25 to-ember-400/20",
    photo: "/food/lemonmint.jpg",
  },
  {
    id: "smoothie",
    name: "Berry Blast Smoothie",
    description: "Strawberry, blueberry, banana, oat milk",
    price: 4.5,
    category: "Drinks",
    emoji: "🥤",
    gradient: "from-ember-400/30 via-ember-600/25 to-ember-300/25",
    photo: "/food/smoothie.jpg",
  },
  {
    id: "sparkling",
    name: "Peach Iced Tea",
    description: "Cold-brewed, ripe peach, plenty of ice",
    price: 3.2,
    category: "Drinks",
    emoji: "🍑",
    gradient: "from-char-400/30 via-char-300/20 to-ember-300/20",
    photo: "/food/sparkling.jpg",
  },
];

export type Fulfilment = "delivery" | "collection";

export interface OrderLine {
  itemId: string;
  name: string;
  emoji: string;
  price: number;
  qty: number;
}

export interface ChatMessage {
  id: string;
  from: "business" | "customer";
  text: string;
  time: string;
}

export interface Order {
  id: string;
  number: number;
  customer: string;
  phone: string;
  fulfilment: Fulfilment;
  lines: OrderLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  stage: number; // 0 received, 1 kitchen, 2 ready, 3 done
  placedAt: number; // demo-clock minutes
  messages: ChatMessage[];
}

export const DELIVERY_FEE = 2.5;
export const OPENING_CLOCK = 18 * 60 + 42; // 18:42 demo time

export function formatEuro(n: number): string {
  return "€" + n.toFixed(2);
}

export function formatClock(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function elapsedLabel(placedAt: number, clock: number): string {
  const d = clock - placedAt;
  if (d <= 0) return "just now";
  return `${d} min ago`;
}

export function stageLabels(f: Fulfilment): string[] {
  return [
    "Order received",
    "In the kitchen",
    "Ready",
    f === "delivery" ? "Delivered" : "Collected",
  ];
}

export function advanceButtonLabel(stage: number, f: Fulfilment): string {
  if (stage === 0) return "Start cooking";
  if (stage === 1) return "Mark ready";
  return f === "delivery" ? "Mark delivered" : "Mark collected";
}

export function businessMessage(
  stage: number,
  orderNumber: number,
  f: Fulfilment,
  customer: string,
  total: number,
): string {
  const firstName = customer.split(" ")[0] || customer;
  switch (stage) {
    case 0:
      return `Hi ${firstName}! 👋 TasteBite here — we’ve received your order #${orderNumber} (${formatEuro(total)}). We’ll keep you posted right here.`;
    case 1:
      return `Order #${orderNumber} is on the grill 🔥 The kitchen just started — about 15 minutes to go.`;
    case 2:
      return f === "delivery"
        ? `Order #${orderNumber} is ready and our rider just left 🛵 Keep your phone handy!`
        : `Order #${orderNumber} is ready for collection 🛍️ Ask for it at the counter — see you soon!`;
    default:
      return f === "delivery"
        ? `Delivered! Enjoy your meal 😋 Thanks for ordering with TasteBite, ${firstName}.`
        : `Picked up and paid — enjoy! 😋 Thanks for choosing TasteBite, ${firstName}.`;
  }
}

function line(itemId: string, qty: number): OrderLine {
  const item = MENU.find((m) => m.id === itemId);
  if (!item) throw new Error(`Unknown menu item: ${itemId}`);
  return {
    itemId: item.id,
    name: item.name,
    emoji: item.emoji,
    price: item.price,
    qty,
  };
}

function buildSeedOrder(
  id: string,
  number: number,
  customer: string,
  phone: string,
  fulfilment: Fulfilment,
  lines: OrderLine[],
  stage: number,
  placedAt: number,
): Order {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const deliveryFee = fulfilment === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const messages: ChatMessage[] = [];
  for (let s = 0; s <= stage; s++) {
    messages.push({
      id: `${id}-msg-${s}`,
      from: "business",
      text: businessMessage(s, number, fulfilment, customer, total),
      time: formatClock(placedAt + s * 3),
    });
  }
  return {
    id,
    number,
    customer,
    phone,
    fulfilment,
    lines,
    subtotal,
    deliveryFee,
    total,
    stage,
    placedAt,
    messages,
  };
}

export function seedOrders(): Order[] {
  return [
    buildSeedOrder(
      "seed-1039",
      1039,
      "Ciara Exampleton",
      "+353 85 000 1039",
      "collection",
      [line("shawarma", 1), line("flatbread", 1), line("smoothie", 1)],
      3,
      OPENING_CLOCK - 25,
    ),
    buildSeedOrder(
      "seed-1040",
      1040,
      "Liam Mockford",
      "+353 85 000 1040",
      "collection",
      [line("truffle", 1), line("halloumi", 1), line("sparkling", 2)],
      2,
      OPENING_CLOCK - 14,
    ),
    buildSeedOrder(
      "seed-1041",
      1041,
      "Mona Fictionberg",
      "+353 85 000 1041",
      "collection",
      [line("margherita", 1), line("wings", 1), line("lemonmint", 2)],
      1,
      OPENING_CLOCK - 11,
    ),
    buildSeedOrder(
      "seed-1042",
      1042,
      "Omar Demoson",
      "+353 85 000 1042",
      "delivery",
      [line("burger", 2), line("lava", 1)],
      0,
      OPENING_CLOCK - 6,
    ),
  ];
}
