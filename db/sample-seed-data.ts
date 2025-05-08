import { hashSync } from "bcrypt-ts-edge";

const microgreensData = {
  users: [
    {
      name: "Admin A. Admin",
      email: "admin@yahoo.com",
      password: hashSync("qwerty", 10),
      role: "admin",
    },
  ],
  products: {
    microgreens: [
      {
        name: "Radish Purple",
        slug: "radish-purple-microgreens",
        category: "microgreens",
        description: [
          "Spicy, peppery, and slightly earthy",
          "Radish Purple microgreens have a spicy, peppery taste with a crisp texture. Their vibrant purple stems enhance the look of any dish. Rich in vitamins A, C, E, and K, they support immune health. They grow quickly, ready for harvest in 6–10 days. Popular in salads, sandwiches, and gourmet plating.",
        ],
        images: [
          "/images/microgreens/radish-purple/rp-1.jpg",
          "/images/microgreens/radish-purple/rp-2.jpg",
          "/images/microgreens/radish-purple/rp-3.jpg",
        ],
        price: 99.99,
        rating: 3.5,
        numberOfReviews: 10,
        stock: 10,
      },
      {
        name: "Micro Mix",
        slug: "micro-mix-microgreens",
        category: "microgreens",
        description: [
          "A balanced mix of sweet, spicy",
          "Micromix microgreens offer a mix of mild, sweet, and spicy flavors. They are rich in vitamins, minerals, and antioxidants. Ideal for salads, sandwiches, and garnishes, they add variety to dishes. Harvest-ready in 7–14 days, they grow fast and in abundance. Their vibrant colors make them visually appealing for chefs and home cooks.",
        ],
        images: [
          "/images/microgreens/micro-mix/mx-1.jpg",
          "/images/microgreens/micro-mix/mx-2.jpg",
          "/images/microgreens/micro-mix/mx-3.jpg",
        ],
        price: 99.99,
        rating: 3.5,
        numberOfReviews: 10,
        stock: 10,
      },
      {
        name: "Broccoli",
        slug: "broccoli-microgreens",
        category: "microgreens",
        description: [
          "Mild, slightly bitter taste",
          "Broccoli microgreens have a mild, slightly earthy taste. They are packed with sulforaphane, a powerful antioxidant. Great for smoothies, salads, and soups, they boost health benefits. Growing in 8–12 days, they are easy to cultivate. A top choice for health-conscious consumers and wellness diets.",
        ],
        images: [
          "/images/microgreens/broccoli/b-1.jpg",
          "/images/microgreens/broccoli/b-2.jpg",
          "/images/microgreens/broccoli/b-3.jpg",
        ],
        price: 99.99,
        rating: 3.5,
        numberOfReviews: 10,
        stock: 10,
      },
      {
        name: "Cilantro",
        slug: "cilantro-microgreens",
        category: "microgreens",
        description: [
          "Citrusy, fresh taste",
          "Cilantro microgreens have a fresh, citrusy flavor, perfect for Mexican and Asian dishes. They are rich in vitamins and antioxidants, aiding digestion and immunity. Commonly used in soups, tacos, and garnishes, they enhance flavor. Harvestable in 10–14 days, they grow easily indoors. Their distinct taste makes them a favorite in many cuisines.",
        ],
        images: [
          "/images/microgreens/cilantro/c-1.jpg",
          "/images/microgreens/cilantro/c-2.jpg",
          "/images/microgreens/cilantro/c-3.jpg",
        ],
        price: 99.99,
        rating: 3.5,
        numberOfReviews: 10,
        stock: 10,
      },
      {
        name: "Kale",
        slug: "kale-microgreens",
        category: "microgreens",
        description: [
          "Mild with a hint of earthiness",
          "Kale microgreens have a mild, slightly sweet, earthy taste. Packed with vitamins A, C, and K, they promote health and wellness. Great for smoothies, salads, and sandwiches, they add nutrition effortlessly. Ready in 8–12 days, they are easy to grow. A staple in health-focused diets and plant-based meals.",
        ],
        images: [
          "/images/microgreens/kale/k-1.jpg",
          "/images/microgreens/kale/k-2.jpg",
          "/images/microgreens/kale/k-3.jpg",
        ],
        price: 99.99,
        rating: 3.5,
        numberOfReviews: 10,
        stock: 10,
      },
      {
        name: "Pea Shoots",
        slug: "pea-shoots-microgreens",
        category: "microgreens",
        description: [
          "Mild with a crunchy texture",
          "Pea Shoots have a mild, sweet, and crunchy taste, similar to fresh peas. They are high in protein, fiber, and essential nutrients. Used in salads, stir-fries, and sandwiches, they add texture and flavor. Fast-growing, they are harvest-ready in 10–14 days. A favorite in both gourmet and health food markets.",
        ],
        images: [
          "/images/microgreens/pea-shoots/ps-1.jpg",
          "/images/microgreens/pea-shoots/ps-2.jpg",
          "/images/microgreens/pea-shoots/ps-3.jpg",
        ],
        price: 99.99,
        rating: 3.5,
        numberOfReviews: 10,
        stock: 10,
      },
      {
        name: "Radish",
        slug: "radish-microgreens",
        category: "microgreens",
        description: [
          "Spicy, peppery",
          "Radish microgreens have a spicy, crisp bite, similar to mature radish. They are loaded with vitamins A, C, and K, boosting immunity. Perfect for salads, sandwiches, and Asian dishes, they add a sharp kick. Growing in just 6–10 days, they are one of the fastest microgreens to harvest. Their bold flavor and color make them highly desirable.",
        ],
        images: [
          "/images/microgreens/radish/r-1.jpg",
          "/images/microgreens/radish/r-2.jpg",
          "/images/microgreens/radish/r-3.jpg",
        ],
        price: 99.99,
        rating: 3.5,
        numberOfReviews: 10,
        stock: 10,
      },
      {
        name: "Arugula",
        slug: "arugula-microgreens",
        category: "microgreens",
        description: [
          "Peppery, slightly nutty",
          "Arugula microgreens have a peppery, nutty flavor with a mild spice. They are rich in vitamins A, C, and K, supporting overall health. Used in salads, pasta, and gourmet dishes, they add a zesty kick. Fast-growing, they are ready in 7–10 days. Popular among chefs and health-conscious eaters.",
        ],
        images: [
          "/images/microgreens/arugula/a-1.jpg",
          "/images/microgreens/arugula/a-2.jpg",
          "/images/microgreens/arugula/a-3.jpg",
        ],
        price: 99.99,
        rating: 3.5,
        numberOfReviews: 10,
        stock: 10,
      },
    ],
  },
};

export default microgreensData;
