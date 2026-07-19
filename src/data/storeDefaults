export const DEMO_USERS = [
  {
    id: 'admin-01',
    name: 'Ava Mercer',
    email: 'admin@adrenax.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 'member-01',
    name: 'Jordan Pace',
    email: 'member@adrenax.com',
    password: 'member123',
    role: 'member',
  },
];

export const CATEGORY_LABELS = {
  tshirts: 'T-Shirts',
  hoodies: 'Hoodies',
  sweatshirts: 'Sweatshirts',
  polos: 'Polos',
  customizable: 'Custom Lab',
};

export const DEFAULT_SITE_CONTENT = {
  announcement:
    'Free shipping on launch-week orders and priority fulfillment on all custom lab pieces.',
  heroBadge: 'Est. 2026 // Performance Streetwear',
  heroLead: 'ELEVATE YOUR',
  heroHighlight: 'MOTION.',
  heroSubLead: 'DEFINE YOUR',
  heroAccent: 'STYLE.',
  heroDescription:
    'Engineered high-performance activewear and streetwear classics for athletes, creators, and teams that move with intent.',
  heroPrimaryCta: 'Shop Collection',
  heroSecondaryCta: 'Design Custom Tee',
};

export const DEFAULT_PRODUCTS = [
  {
    id: 'heavy-tee',
    name: 'Heavy Oversized Tee',
    price: 39,
    category: 'tshirts',
    description:
      '360gsm heavy-blend organic cotton with dropped shoulders and a boxy drape.',
    story:
      'Built for post-training downtime with a premium hand feel and a confident street silhouette.',
    performanceNote: '360gsm heavyweight / garment washed / all-day drape',
    fabric: '100% Organic Cotton',
    badge: 'Best Seller',
    dropLabel: 'Drop 01',
    accentColor: '#00f2fe',
    stock: 48,
    colors: [
      { name: 'Core Black', value: '#12151c' },
      { name: 'Chalk White', value: '#ffffff' },
      { name: 'Acid Lime', value: '#39ff14' },
      { name: 'Volt Orange', value: '#ff5e36' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isCustomizable: false,
    type: 'tshirt',
  },
  {
    id: 'stealth-hoodie',
    name: 'Stealth Tech Hoodie',
    price: 65,
    category: 'hoodies',
    description:
      'Technical fleece hoodie with waterproof seam detailing and concealed utility pockets.',
    story:
      'The layer for night sessions, airport runs, and cold starts when mobility still matters.',
    performanceNote: 'water-resistant seams / hidden storage / ergonomic cuffs',
    fabric: '80% Cotton / 20% Polyester Tech Fleece',
    badge: 'Utility',
    dropLabel: 'Drop 02',
    accentColor: '#4facfe',
    stock: 24,
    colors: [
      { name: 'Stealth Black', value: '#0a0b0e' },
      { name: 'Cobalt Blue', value: '#4facfe' },
      { name: 'Cyber Pink', value: '#f80077' },
    ],
    sizes: ['M', 'L', 'XL'],
    isCustomizable: false,
    type: 'hoodie',
  },
  {
    id: 'apex-sweatshirt',
    name: 'Apex Athletic Sweatshirt',
    price: 55,
    category: 'sweatshirts',
    description:
      'Relaxed athletic crewneck with raglan sleeves and resilient ribbed trims.',
    story:
      'A clean training-to-street essential designed to sit between performance and lifestyle.',
    performanceNote: 'raglan mobility / loopback fleece / easy layering',
    fabric: '90% Cotton Loopback Fleece',
    badge: 'Core Layer',
    dropLabel: 'Drop 03',
    accentColor: '#39ff14',
    stock: 31,
    colors: [
      { name: 'Heather Gray', value: '#9ca3af' },
      { name: 'Obsidian Black', value: '#12151c' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isCustomizable: false,
    type: 'sweatshirt',
  },
  {
    id: 'vanguard-polo',
    name: 'Vanguard Court Polo',
    price: 45,
    category: 'polos',
    description:
      'Breathable recycled pique polo with a contrast collar and moisture-wicking finish.',
    story:
      'A sharper silhouette for club sessions, travel days, and elevated team kits.',
    performanceNote: 'pique knit / moisture control / tailored collar',
    fabric: '100% Recycled Poly-blend Pique',
    badge: 'Court Ready',
    dropLabel: 'Drop 04',
    accentColor: '#ff5e36',
    stock: 17,
    colors: [
      { name: 'Chalk White', value: '#ffffff' },
      { name: 'Core Black', value: '#12151c' },
      { name: 'Electric Cyan', value: '#00f2fe' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isCustomizable: false,
    type: 'polo',
  },
  {
    id: 'custom-tee',
    name: 'Design-Your-Own Oversized Tee',
    price: 45,
    category: 'customizable',
    description:
      'Our signature heavyweight tee opened up for custom graphics, text placement, and brand storytelling.',
    story:
      'The lab piece for teams, creators, and drop experiments that need a premium blank canvas.',
    performanceNote: 'custom graphics / premium blank / limited-run ready',
    fabric: '360gsm Heavyweight Organic Cotton',
    badge: 'Customizer',
    dropLabel: 'Lab Exclusive',
    accentColor: '#f80077',
    stock: 999,
    colors: [
      { name: 'Chalk White', value: '#ffffff' },
      { name: 'Core Black', value: '#12151c' },
      { name: 'Acid Lime', value: '#39ff14' },
      { name: 'Electric Cyan', value: '#00f2fe' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isCustomizable: true,
    type: 'tshirt',
  },
];

export const createStoreSeed = () => ({
  products: DEFAULT_PRODUCTS,
  orders: [],
  subscribers: [],
  siteContent: DEFAULT_SITE_CONTENT,
});

const fallbackColors = [
  { name: 'Core Black', value: '#12151c' },
  { name: 'Chalk White', value: '#ffffff' },
];

const fallbackSizes = ['S', 'M', 'L', 'XL'];

const ensureHex = (value) => {
  if (!value) {
    return '#00f2fe';
  }

  const trimmed = value.trim();
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
};

export const parseSizesInput = (value) =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

export const formatSizesInput = (sizes = []) => sizes.join(', ');

export const parseColorInput = (value) => {
  const parsed = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, hex] = line.split('|').map((entry) => entry.trim());

      if (!name || !hex) {
        return null;
      }

      return {
        name,
        value: ensureHex(hex),
      };
    })
    .filter(Boolean);

  return parsed.length ? parsed : fallbackColors;
};

export const formatColorInput = (colors = []) =>
  colors.map((color) => `${color.name}|${color.value}`).join('\n');

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const buildProductDraft = (product) => ({
  id: product?.id || '',
  name: product?.name || '',
  price: product?.price?.toString() || '',
  category: product?.category || 'tshirts',
  description: product?.description || '',
  story: product?.story || '',
  performanceNote: product?.performanceNote || '',
  fabric: product?.fabric || '',
  badge: product?.badge || 'New Drop',
  dropLabel: product?.dropLabel || 'Drop 01',
  accentColor: product?.accentColor || '#00f2fe',
  stock: product?.stock?.toString() || '12',
  type: product?.type || 'tshirt',
  isCustomizable: Boolean(product?.isCustomizable),
  sizesText: formatSizesInput(product?.sizes || fallbackSizes),
  colorsText: formatColorInput(product?.colors || fallbackColors),
});

export const normalizeProduct = (draft, existingIds = []) => {
  const baseId = draft.id?.trim() || slugify(draft.name || 'adrenax-product');
  let nextId = baseId;

  while (existingIds.includes(nextId) && nextId !== draft.id?.trim()) {
    nextId = `${baseId}-${Math.floor(Math.random() * 1000)}`;
  }

  const sizes = parseSizesInput(draft.sizesText || '');
  const colors = parseColorInput(draft.colorsText || '');

  return {
    id: nextId,
    name: draft.name.trim(),
    price: Number(draft.price) || 0,
    category: draft.category.trim() || 'tshirts',
    description: draft.description.trim(),
    story: draft.story.trim(),
    performanceNote: draft.performanceNote.trim(),
    fabric: draft.fabric.trim(),
    badge: draft.badge.trim() || 'New Drop',
    dropLabel: draft.dropLabel.trim() || 'Drop 01',
    accentColor: ensureHex(draft.accentColor),
    stock: Math.max(0, Number(draft.stock) || 0),
    colors: colors.length ? colors : fallbackColors,
    sizes: sizes.length ? sizes : fallbackSizes,
    isCustomizable: Boolean(draft.isCustomizable),
    type: draft.type || 'tshirt',
  };
};

export const toCategoryLabel = (category) => {
  if (CATEGORY_LABELS[category]) {
    return CATEGORY_LABELS[category];
  }

  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};
