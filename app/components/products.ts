export type Product = {
  id: number;
  name: string;
  thumb: string; // /products/product-N.png
  detail: string; // /details/product-N-details.png
};

// 10 products that match the originals from oliveapp.com
export const PRODUCTS: Product[] = [
  { id: 1, name: "Organic Bagels", thumb: "/products/product-1.png", detail: "/details/product-1-details.png" },
  { id: 2, name: "Cocao-nectar Bar, Oregon Peppermint", thumb: "/products/product-2.png", detail: "/details/product-2-details.png" },
  { id: 3, name: "Strawberry Vanilla Sparkling Tonic", thumb: "/products/product-3.png", detail: "/details/product-3-details.png" },
  { id: 4, name: "Fig and Olive Crackers", thumb: "/products/product-4.png", detail: "/details/product-4-details.png" },
  { id: 5, name: "San Pellegrino Sparkling Natural Mineral Water", thumb: "/products/product-5.png", detail: "/details/product-5-details.png" },
  { id: 6, name: "Sea Salt & Vinegar Potato Crisps", thumb: "/products/product-6.png", detail: "/details/product-6-details.png" },
  { id: 7, name: "Larabar Chocolate Chip Cookie Dough Fruit & Nut Bar", thumb: "/products/product-7.png", detail: "/details/product-7-details.png" },
  { id: 8, name: "Sourlittles", thumb: "/products/product-8.png", detail: "/details/product-8-details.png" },
  { id: 9, name: "Gradea Raw Pure Jersey Milk", thumb: "/products/product-9.png", detail: "/details/product-9-details.png" },
  { id: 10, name: "Late July Snacks Thin and Crispy Organic Tortilla", thumb: "/products/product-10.png", detail: "/details/product-10-details.png" },
];
