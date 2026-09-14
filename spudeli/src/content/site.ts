/**
 * SPÜDELI — content source of truth.
 *
 * Business facts below are taken from Spüdeli's own Instagram (@spudeli_) and
 * their live menu on The Wirral Bites. Menu items and prices are real, as
 * listed at build time. Opening times and a public phone number were not
 * published on those sources, so they are described honestly ("open 7 days")
 * rather than invented.
 *
 * Imagery in /public/img is AI-generated concept photography (Higgsfield),
 * created to set the tone — to be swapped for Spüdeli's real food photos.
 */

export const site = {
  name: "Spüdeli",
  plain: "Spudeli",
  tagline: "Cooked slow. Served fast.",
  descriptor: "Wirral's only smokehouse deli",
  place: "Birkenhead · Wirral",
  address: {
    line1: "Laird Street",
    line2: "Birkenhead, Wirral",
    postcode: "CH41 0AA",
  },
  openLine: "Open 7 days a week",
  instagram: "https://www.instagram.com/spudeli_/",
  instagramHandle: "@spudeli_",
  order: {
    // Confirmed live menu link.
    wirralBites:
      "https://www.thewirralbites.co.uk/takeaways/cmrmizarx0zdl08383ipj75j7/spudeli-birkenhead/menu",
    justEat: "https://www.just-eat.co.uk/",
    deliveroo: "https://deliveroo.co.uk/",
    minOrder: "£10 minimum",
    freeDelivery: "Free delivery over £40",
  },
  seo: {
    title: "Spüdeli — Wirral's smokehouse deli · Birkenhead",
    description:
      "Spüdeli, Wirral's only smokehouse deli. Slow-smoked meats, loaded deli spuds, hot counter specials and Sunday roasts. Cooked slow, served fast. Laird Street, Birkenhead. Order for collection or delivery.",
  },
};

export const img = {
  hero: "/img/hero.webp",
  smoke: "/img/smoke.webp",
  brisket: "/img/brisket.webp",
  steakhouse: "/img/steakhouse.webp",
  pulledpork: "/img/pulledpork.webp",
  brownie: "/img/brownie.webp",
  interior: "/img/interior.webp",
  embers: "/img/embers.webp",
};

export const marquee = [
  "Slow-smoked",
  "Loaded deli spuds",
  "Cooked slow · served fast",
  "Hot counter specials",
  "Sunday deli roasts",
  "Birkenhead · Wirral",
  "Open 7 days",
];

export const craft = {
  eyebrow: "The Craft",
  title: "Low and slow. The Wirral way.",
  paragraphs: [
    "Spüdeli is Wirral's only smoke house deli. Everything starts on the smoke — briskets, pork and lamb cooked low and slow until they pull apart, then loaded onto proper deli spuds and served fast across the counter.",
    "It's honest, generous food with real fire behind it. Deli spuds, a changing hot counter, fresh salads and Sunday roasts — for collection on Laird Street or delivered across the Wirral.",
  ],
  marks: [
    { k: "Slow-smoked", v: "Meats cooked low & slow" },
    { k: "Loaded spuds", v: "The signature deli spud" },
    { k: "7 days", v: "Collection & delivery" },
  ],
};

type Item = {
  name: string;
  desc?: string;
  price?: string;
  tag?: string;
  soldOut?: boolean;
};

export const signatures: {
  name: string;
  desc: string;
  price: string;
  image: string;
}[] = [
  {
    name: "Smoked Harissa Beef Brisket",
    desc: "Slow-cooked, smoky beef brisket marinated in our signature harissa spices for a rich, warming kick.",
    price: "12.00",
    image: img.hero,
  },
  {
    name: "The Steakhouse",
    desc: "Flash-grilled rump steak with slow-cooked onions, mushrooms and tomato. Bold and classic.",
    price: "13.00",
    image: img.steakhouse,
  },
  {
    name: "Slow-Cooked BBQ Pulled Pork",
    desc: "Tender pulled pork in a smoky BBQ sauce, piled high on a loaded deli spud.",
    price: "11.00",
    image: img.pulledpork,
  },
  {
    name: "Triple Chocolate Brownie",
    desc: "Warm, rich and indulgent, with salted caramel and chocolate sauces and an Oreo crumb.",
    price: "5.50",
    image: img.brownie,
  },
];

export const menu: { id: string; name: string; note?: string; items: Item[] }[] =
  [
    {
      id: "spuds",
      name: "Deli Spuds",
      note: "Our signature loaded jackets",
      items: [
        {
          name: "Smoked Harissa Beef Brisket",
          desc: "Slow-cooked, smoky beef brisket marinated in our signature harissa spices.",
          price: "12.00",
          tag: "Signature",
        },
        {
          name: "The Steakhouse",
          desc: "Flash-grilled rump steak, slow-cooked onions, mushrooms and tomato.",
          price: "13.00",
          tag: "Signature",
        },
        {
          name: "Shawarma-Style Chicken Thigh",
          desc: "Juicy chicken thigh, aromatic shawarma spices, a hint of yoghurt and lime.",
          price: "11.00",
        },
        {
          name: "Slow-Cooked BBQ Pulled Pork",
          desc: "Tender pulled pork in a smoky BBQ sauce.",
          price: "11.00",
        },
        {
          name: "Slow-Cooked Minted Lamb Leg & Shoulder",
          desc: "Melt-in-the-mouth lamb slow-cooked with fresh mint.",
          price: "11.00",
        },
        {
          name: "Texan Bean Chilli Beef",
          desc: "A deep, smoky beef chilli packed with beans and warming Texan spices.",
          price: "11.00",
        },
        {
          name: "Jamaican Chicken Curry",
          desc: "Tender chicken in a fragrant coconut curry with warm Caribbean spices.",
          price: "11.00",
        },
        {
          name: "The Bolognese One",
          desc: "Rich Italian-style beef bolognese finished with parmesan.",
          price: "11.00",
        },
        {
          name: "Chicken Teriyaki",
          desc: "Grilled chicken glazed in umami-rich teriyaki with stir-fried vegetables.",
          price: "10.50",
        },
        {
          name: "Tuna Crunch",
          desc: "Tuna mayo with diced peppers and red onion, a squeeze of lime.",
          price: "9.50",
        },
        {
          name: "Roast Squash & Veggie Bean Chilli",
          desc: "Roasted squash, beans and chickpeas in a rich smoky tomato sauce.",
          price: "11.00",
          tag: "V",
        },
        { name: "Baked Beans", desc: "A classic.", price: "8.50" },
        {
          name: "Chicken Pot Pie",
          desc: "Succulent chicken and garden vegetables in a rich, creamy velouté.",
          soldOut: true,
        },
      ],
    },
    {
      id: "hot",
      name: "Hot Counter Specials",
      note: "Changing daily",
      items: [
        {
          name: "Brisket Mac & Cheese",
          desc: "Slow-cooked pulled brisket over creamy mac and cheese with a melted cheese blend.",
          price: "9.00",
          tag: "Signature",
        },
        {
          name: "Teriyaki Steak Noodles",
          desc: "Rump steak, egg noodles and Asian-inspired stir-fry veg in homemade teriyaki.",
          price: "12.50",
        },
        {
          name: "Chilli Pasta Bowl",
          desc: "Al dente pasta in a robust chilli sauce with cumin and paprika.",
          price: "10.50",
        },
        {
          name: "Bolognese Pasta Bowl",
          desc: "Pasta coated in a slow-simmered tomato and minced beef ragu.",
          price: "10.50",
        },
        {
          name: "Teriyaki Chicken Noodles",
          desc: "Wok-tossed noodles and chicken breast in glossy teriyaki with crisp veg.",
          price: "10.00",
        },
        {
          name: "Sweet Chilli Chicken Noodles",
          desc: "Egg noodles, stir-fry veg and chicken breast tossed in sweet chilli.",
          price: "10.00",
        },
        {
          name: "Deli Sausage Rolls",
          desc: "Golden, flaky pastry filled with seasoned sausage meat, baked fresh.",
          price: "4.00",
        },
        {
          name: "Chilli Mac & Cheese",
          desc: "Creamy mac and cheese topped with a bold chilli con carne.",
          soldOut: true,
        },
        {
          name: "Loaded Deli Corn",
          desc: "Corn on the cob with hot honey, chilli and crispy onions.",
          soldOut: true,
        },
      ],
    },
    {
      id: "salads",
      name: "Salads",
      items: [
        {
          name: "Caesar Salad",
          desc: "Croutons, crispy bacon bits, parmesan, cucumber and Caesar dressing.",
          price: "9.50",
        },
        {
          name: "Build Your Own",
          desc: "Have your salad your way from the deli counter.",
          price: "7.50",
        },
        {
          name: "Loaded Potato Salad",
          desc: "Homemade potato salad topped your way with fresh deli counter veg.",
          soldOut: true,
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          name: "Triple Chocolate Brownie",
          desc: "Warm, with salted caramel and chocolate sauces and an Oreo crumb.",
          price: "5.50",
          tag: "Signature",
        },
        {
          name: "Biscoff & Berries Cheesecake",
          desc: "Baked New York-style cheesecake, crushed Biscoff and berry compote.",
          soldOut: true,
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      items: [
        { name: "Coca-Cola 330ml", price: "1.50" },
        { name: "Diet Coke 330ml", price: "1.50" },
        { name: "Rio Tropical 330ml", price: "1.50" },
        { name: "Tango Orange 330ml", price: "1.50" },
        { name: "Water 500ml", price: "1.50" },
        { name: "7UP Zero 330ml", soldOut: true },
      ],
    },
  ];
