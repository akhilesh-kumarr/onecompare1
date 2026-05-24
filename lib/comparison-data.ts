export type Category = "electronics" | "food" | "grocery" | "cabs" | "deals";

export type SortKey = "best" | "price" | "rating" | "popular" | "fastest";

export type PlatformOffer = {
  platform: string;
  price: number;
  mrp?: number;
  discount: number;
  rating: number;
  delivery: string;
  deliveryMinutes: number;
  availability: "In Stock" | "Limited" | "Unavailable";
  offer: string;
  meta?: string;
};

export type ComparisonItem = {
  id: string;
  category: Category;
  name: string;
  brand: string;
  type: string;
  popularity: number;
  imageLabel: string;
  specs: Record<string, string>;
  tags: string[];
  offers: PlatformOffer[];
};

export const comparisonItems: ComparisonItem[] = [
  {
    id: "iphone-15",
    category: "electronics",
    name: "iPhone 15 128GB",
    brand: "Apple",
    type: "Mobile",
    popularity: 98,
    imageLabel: "48MP camera . OLED . USB-C",
    tags: ["iphone", "mobile", "smartphone", "apple"],
    specs: {
      Processor: "A16 Bionic",
      Display: "6.1 inch Super Retina XDR",
      Storage: "128GB",
      Camera: "48MP main camera",
      Battery: "All-day battery"
    },
    offers: [
      { platform: "Amazon", price: 64999, mrp: 79900, discount: 19, rating: 4.6, delivery: "Tomorrow", deliveryMinutes: 1440, availability: "In Stock", offer: "Bank offer available" },
      { platform: "Flipkart", price: 66499, mrp: 79900, discount: 17, rating: 4.5, delivery: "2 days", deliveryMinutes: 2880, availability: "In Stock", offer: "Exchange bonus" },
      { platform: "Croma", price: 67990, mrp: 79900, discount: 15, rating: 4.4, delivery: "Store pickup today", deliveryMinutes: 240, availability: "Limited", offer: "No-cost EMI" }
    ]
  },
  {
    id: "macbook-air-m3",
    category: "electronics",
    name: "MacBook Air M3",
    brand: "Apple",
    type: "Laptop",
    popularity: 92,
    imageLabel: "M3 chip . 18 hr battery . 256GB",
    tags: ["macbook", "laptop", "apple", "student"],
    specs: {
      Processor: "Apple M3",
      Display: "13.6 inch Liquid Retina",
      RAM: "8GB unified memory",
      Storage: "256GB SSD",
      Battery: "Up to 18 hours"
    },
    offers: [
      { platform: "Amazon", price: 109900, mrp: 114900, discount: 4, rating: 4.7, delivery: "Tomorrow", deliveryMinutes: 1440, availability: "In Stock", offer: "Student EMI" },
      { platform: "Flipkart", price: 107990, mrp: 114900, discount: 6, rating: 4.6, delivery: "2 days", deliveryMinutes: 2880, availability: "In Stock", offer: "Card discount" },
      { platform: "Croma", price: 112900, mrp: 114900, discount: 2, rating: 4.6, delivery: "Store pickup today", deliveryMinutes: 240, availability: "Limited", offer: "AppleCare bundle" }
    ]
  },
  {
    id: "gaming-laptop-rtx",
    category: "electronics",
    name: "Acer Nitro V Gaming Laptop",
    brand: "Acer",
    type: "Laptop",
    popularity: 87,
    imageLabel: "RTX graphics . 16GB RAM . 144Hz",
    tags: ["gaming laptop", "laptop", "acer", "rtx"],
    specs: {
      Processor: "Intel Core i5 H-series",
      Display: "15.6 inch 144Hz",
      RAM: "16GB DDR5",
      Storage: "512GB SSD",
      Graphics: "NVIDIA RTX 4050"
    },
    offers: [
      { platform: "Amazon", price: 72990, mrp: 89990, discount: 19, rating: 4.3, delivery: "Tomorrow", deliveryMinutes: 1440, availability: "In Stock", offer: "Gaming sale" },
      { platform: "Flipkart", price: 69990, mrp: 89990, discount: 22, rating: 4.4, delivery: "2 days", deliveryMinutes: 2880, availability: "In Stock", offer: "Bank discount" },
      { platform: "Croma", price: 74990, mrp: 89990, discount: 17, rating: 4.2, delivery: "Store pickup", deliveryMinutes: 360, availability: "Limited", offer: "Extended warranty" }
    ]
  },
  {
    id: "sony-xm5",
    category: "electronics",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    type: "Headphones",
    popularity: 84,
    imageLabel: "ANC . Hi-res audio . 30 hr battery",
    tags: ["sony", "headphones", "audio", "anc"],
    specs: {
      "Noise cancellation": "Adaptive ANC",
      Battery: "30 hours",
      Audio: "Hi-res wireless",
      Connectivity: "Bluetooth multipoint"
    },
    offers: [
      { platform: "Amazon", price: 27490, mrp: 34990, discount: 21, rating: 4.5, delivery: "Tomorrow", deliveryMinutes: 1440, availability: "In Stock", offer: "Coupon Rs. 500" },
      { platform: "Flipkart", price: 26990, mrp: 34990, discount: 23, rating: 4.4, delivery: "3 days", deliveryMinutes: 4320, availability: "In Stock", offer: "Limited deal" },
      { platform: "Croma", price: 29990, mrp: 34990, discount: 14, rating: 4.5, delivery: "Today pickup", deliveryMinutes: 180, availability: "In Stock", offer: "Free setup help" }
    ]
  },
  {
    id: "chicken-biryani",
    category: "food",
    name: "Chicken Biryani",
    brand: "Biryani House",
    type: "Food Delivery",
    popularity: 94,
    imageLabel: "Hyderabadi style . single serve",
    tags: ["chicken biryani", "biryani", "food", "dinner"],
    specs: {
      Restaurant: "Biryani House",
      Serving: "Single",
      Cuisine: "Indian",
      "Spice level": "Medium"
    },
    offers: [
      { platform: "Magicpin", price: 179, mrp: 299, discount: 40, rating: 4.3, delivery: "28 min", deliveryMinutes: 28, availability: "In Stock", offer: "SAVE80", meta: "Rs. 18 delivery fee" },
      { platform: "Swiggy", price: 224, mrp: 299, discount: 25, rating: 4.5, delivery: "24 min", deliveryMinutes: 24, availability: "In Stock", offer: "TRYNEW", meta: "Rs. 32 delivery fee" },
      { platform: "Zomato", price: 209, mrp: 299, discount: 30, rating: 4.4, delivery: "31 min", deliveryMinutes: 31, availability: "In Stock", offer: "ZOMATO50", meta: "Rs. 27 delivery fee" }
    ]
  },
  {
    id: "margherita-pizza",
    category: "food",
    name: "Margherita Pizza",
    brand: "Domino's Pizza",
    type: "Food Delivery",
    popularity: 89,
    imageLabel: "Regular . cheese burst optional",
    tags: ["pizza", "margherita", "food", "dominos"],
    specs: {
      Restaurant: "Domino's Pizza",
      Size: "Regular",
      Cuisine: "Italian",
      "Veg/Non-veg": "Veg"
    },
    offers: [
      { platform: "Swiggy", price: 249, mrp: 399, discount: 38, rating: 4.2, delivery: "26 min", deliveryMinutes: 26, availability: "In Stock", offer: "PIZZA40", meta: "Rs. 20 delivery fee" },
      { platform: "Zomato", price: 269, mrp: 399, discount: 33, rating: 4.1, delivery: "30 min", deliveryMinutes: 30, availability: "In Stock", offer: "ZOMATO30", meta: "Rs. 24 delivery fee" },
      { platform: "Magicpin", price: 239, mrp: 399, discount: 40, rating: 4.0, delivery: "36 min", deliveryMinutes: 36, availability: "Limited", offer: "MAGIC60", meta: "Rs. 18 delivery fee" }
    ]
  },
  {
    id: "amul-milk",
    category: "grocery",
    name: "Amul Milk 1L",
    brand: "Amul",
    type: "Grocery",
    popularity: 96,
    imageLabel: "Full cream milk . 1 litre",
    tags: ["milk", "amul milk", "grocery", "1l"],
    specs: {
      Quantity: "1L",
      Brand: "Amul",
      Type: "Full cream",
      Storage: "Refrigerated"
    },
    offers: [
      { platform: "Blinkit", price: 63, discount: 0, rating: 4.4, delivery: "8 min", deliveryMinutes: 8, availability: "In Stock", offer: "Fastest delivery" },
      { platform: "Zepto", price: 64, discount: 0, rating: 4.5, delivery: "10 min", deliveryMinutes: 10, availability: "In Stock", offer: "Free above Rs. 299" },
      { platform: "BigBasket", price: 61, discount: 3, rating: 4.3, delivery: "45 min", deliveryMinutes: 45, availability: "In Stock", offer: "Cheapest unit price" }
    ]
  },
  {
    id: "amul-ghee",
    category: "grocery",
    name: "Amul Pure Ghee 1L",
    brand: "Amul",
    type: "Grocery",
    popularity: 90,
    imageLabel: "Pure ghee . 1 litre jar",
    tags: ["ghee", "amul ghee", "grocery", "1l"],
    specs: {
      Quantity: "1L",
      Brand: "Amul",
      Type: "Pure ghee",
      Packaging: "Jar"
    },
    offers: [
      { platform: "Blinkit", price: 635, mrp: 699, discount: 9, rating: 4.4, delivery: "10 min", deliveryMinutes: 10, availability: "In Stock", offer: "10% off above Rs. 399" },
      { platform: "Zepto", price: 648, mrp: 699, discount: 7, rating: 4.5, delivery: "9 min", deliveryMinutes: 9, availability: "In Stock", offer: "Free above Rs. 299" },
      { platform: "BigBasket", price: 670, mrp: 699, discount: 4, rating: 4.3, delivery: "55 min", deliveryMinutes: 55, availability: "In Stock", offer: "SAVEOF above Rs. 1500" }
    ]
  },
  {
    id: "airport-cab",
    category: "cabs",
    name: "College Campus to Airport",
    brand: "Bangalore",
    type: "Cab Fare",
    popularity: 91,
    imageLabel: "Campus pickup . Airport drop",
    tags: ["cab", "airport", "uber", "ola", "rapido"],
    specs: {
      Pickup: "College Campus",
      Drop: "Kempegowda Airport",
      Distance: "38 km",
      Time: "52 min"
    },
    offers: [
      { platform: "Rapido", price: 165, discount: 0, rating: 4.4, delivery: "4 min", deliveryMinutes: 4, availability: "In Stock", offer: "Cheapest", meta: "Bike taxi" },
      { platform: "Ola", price: 190, discount: 0, rating: 4.3, delivery: "6 min", deliveryMinutes: 6, availability: "In Stock", offer: "Mini", meta: "No surge" },
      { platform: "Uber", price: 210, discount: 0, rating: 4.7, delivery: "5 min", deliveryMinutes: 5, availability: "In Stock", offer: "Go Sedan", meta: "1.1x surge" }
    ]
  }
];

export function toCurrency(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

export function getBestOffer(item: ComparisonItem, mode: SortKey = "best") {
  const offers = [...item.offers].filter((offer) => offer.availability !== "Unavailable");
  if (mode === "rating") return offers.sort((a, b) => b.rating - a.rating || a.price - b.price)[0];
  if (mode === "fastest") return offers.sort((a, b) => a.deliveryMinutes - b.deliveryMinutes || a.price - b.price)[0];
  return offers.sort((a, b) => a.price - b.price || b.rating - a.rating)[0];
}

export function getRecommendation(item: ComparisonItem) {
  const cheapest = getBestOffer(item, "price");
  const rated = getBestOffer(item, "rating");
  const fastest = getBestOffer(item, "fastest");
  const best = [...item.offers]
    .map((offer) => {
      const priceScore = cheapest.price / offer.price;
      const ratingScore = offer.rating / 5;
      const speedScore = fastest.deliveryMinutes / offer.deliveryMinutes;
      const availabilityScore = offer.availability === "In Stock" ? 1 : 0.7;
      const score = Math.round((priceScore * 42 + ratingScore * 28 + speedScore * 20 + availabilityScore * 10));
      return { ...offer, score };
    })
    .sort((a, b) => b.score - a.score)[0];

  return {
    best,
    cheapest,
    rated,
    fastest,
    title: `${best.platform} is the best value choice`,
    summary: `${best.platform} balances ${toCurrency(best.price)}, ${best.rating.toFixed(1)} rating, ${best.delivery.toLowerCase()} availability, and ${best.offer.toLowerCase()} for the strongest value score.`,
    points: [
      `Lowest price: ${cheapest.platform} at ${toCurrency(cheapest.price)}.`,
      `Best rated: ${rated.platform} with ${rated.rating.toFixed(1)} stars.`,
      `Fastest option: ${fastest.platform} in ${fastest.delivery}.`
    ]
  };
}

export function searchComparisons({
  query = "",
  category = "all",
  sort = "best",
  maxPrice
}: {
  query?: string;
  category?: Category | "all";
  sort?: SortKey;
  maxPrice?: number;
}) {
  const normalized = query.trim().toLowerCase();
  let results = comparisonItems.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const text = `${item.name} ${item.brand} ${item.type} ${item.tags.join(" ")} ${Object.values(item.specs).join(" ")}`.toLowerCase();
    const queryMatch = !normalized || text.includes(normalized);
    const priceMatch = !maxPrice || getBestOffer(item).price <= maxPrice;
    return categoryMatch && queryMatch && priceMatch;
  });

  results = results.sort((a, b) => {
    if (sort === "price") return getBestOffer(a).price - getBestOffer(b).price;
    if (sort === "rating") return getBestOffer(b, "rating").rating - getBestOffer(a, "rating").rating;
    if (sort === "popular") return b.popularity - a.popularity;
    if (sort === "fastest") return getBestOffer(a, "fastest").deliveryMinutes - getBestOffer(b, "fastest").deliveryMinutes;
    return getRecommendation(b).best.score - getRecommendation(a).best.score;
  });

  return results;
}

export function getSuggestions(query: string) {
  const normalized = query.trim().toLowerCase();
  return comparisonItems
    .filter((item) => !normalized || `${item.name} ${item.tags.join(" ")}`.toLowerCase().includes(normalized))
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      label: item.name,
      category: item.category,
      href: `/${item.category === "electronics" ? "electronics" : item.category}?q=${encodeURIComponent(item.name)}`
    }));
}
