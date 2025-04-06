export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string[];
  features: string[];
  section: number;
}

// This mock data can be replaced with API calls in the future
const products: Product[] = [
  {
    id: "retro-vhs-keyboard",
    name: "Retro VHS Keyboard",
    price: 99.99,
    image: "/images/keyboard-vhs.jpg",
    description: [
      "Our very first keyboard is a retro VHS keyboard. It is a mechanical keyboard with a unique design inspired by the classic VHS tapes. The keyboard features a vintage aesthetic with a modern twist, making it perfect for both retro enthusiasts and modern gamers alike.",
      "The design pays homage to the iconic VHS era with its color scheme and texture patterns. Each keyboard is meticulously crafted to deliver both performance and nostalgia.",
      "We've combined cutting-edge keyboard technology with retro aesthetics to create a truly unique typing experience that stands out from conventional keyboards on the market.",
      "Whether you're a content creator, programmer, or just someone who appreciates fine keyboards, our Retro VHS Keyboard delivers exceptional tactile feedback, durability, and style that will make it the centerpiece of your desk setup.",
    ],
    features: [
      "Retro cassette-inspired keycap design",
      'Custom switches with a satisfying "click"',
      "RGB backlighting with retro wave patterns",
      "Durable aluminum frame with vintage finish",
      "Programmable macros for creative workflows",
    ],
    section: 1,
  },
  {
    id: "8bit-mechanical-keyboard",
    name: "8-Bit Mechanical Keyboard",
    price: 119.99,
    image: "/images/keyboard-8bit.jpg",
    description: [
      "Introducing our 8-Bit Mechanical Keyboard, a nostalgic tribute to the golden age of gaming. This keyboard combines the tactile satisfaction of modern mechanical switches with a design inspired by classic 8-bit gaming systems from the 1980s.",
      "Each key press delivers that satisfying click reminiscent of the controllers and computers that defined an era of gaming history. The pixel-art inspired keycaps and vibrant color scheme instantly transport you back to the days of sprite-based graphics and chiptune soundtracks.",
      "We've carefully balanced retro aesthetics with modern functionality, creating a keyboard that's not just a visual statement but a high-performance typing and gaming tool. The custom LED lighting can be programmed to display pixel-art patterns or react to your keystrokes.",
      "Perfect for gamers, developers with a fondness for retro computing, or anyone who appreciates the distinctive visual style of early digital culture. The 8-Bit Mechanical Keyboard isn't just a peripheral—it's a piece of computing history reimagined for the modern desk.",
    ],
    features: [
      "Retro pixel-art inspired keycap design",
      "RGB backlighting with programmable 8-bit patterns",
      "Clicky blue mechanical switches",
      "N-key rollover for gaming performance",
      "Durable construction with classic console-inspired colors",
    ],
    section: 2,
  },
];

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    // In the future, this could be replaced with a fetch call to an API
    return Promise.resolve(products);
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    // In the future, this could be replaced with a fetch call to an API
    return Promise.resolve(products.find((product) => product.id === id));
  },

  // Additional methods can be added here in the future for CRUD operations
};
