/* F.T.T.U Manufacturing Agent — data.
   The single source of truth for the playbook (guide.html) and the agent
   (index.html). Three ways to get F.T.T.U made, each answered with the 5 W's
   and the money; every product seen through all three. Partner facts were
   checked against live sources in September 2026: "checked" says what was
   confirmed, "caveat" what was not. Requires js/catalog.js. */
(function (global) {
  var BASE = (global.FTTU && global.FTTU.BASE) || 'https://mlgmigguhljsiopctkkj.supabase.co/storage/v1/object/public/fttu-footwear/';
  var BD = BASE + 'breakdowns/';

  /* The three ways. Keys are used in the agent's MATCH line. */
  var ROUTES = [
    { key: 'pod', short: 'Printful', name: 'Print-on-demand with Printful',
      oneLine: 'They print your artwork on their shoes and jackets, and make each one only when someone buys it.',
      upfront: 'Nothing up front', speed: 'Days', closeness: 'Your colors and logo on their shoe', risk: 'Lowest',
      w: {
        who: 'Printful. You upload the F.T.T.U artwork; they print, pack and ship each order.',
        what: 'Flip-flops, slides, printed sneakers (five shoe styles) and an all-over-print bomber jacket \u2014 the F.T.T.U colors and shield on Printful\u2019s own shoe and jacket shapes.',
        when: 'Days to set up. Order one sample for yourself first, then go live.',
        where: 'Printful\u2019s own production and shipping. You sell through an online store connected to it.',
        why: 'No minimum order and no inventory, so you learn what people buy before spending real money.'
      },
      money: 'No up-front cost; you pay Printful\u2019s base price per item when it sells, and you keep the difference. Bomber jacket base price is about $48.95\u2013$60. Bulk discount from 25 pairs of shoes. Shoe base prices are listed in their catalog \u2014 check the current price there.',
      catch: 'It is not your exact design. The knit gradient upper, custom sole and metal shield hardware are not possible \u2014 only printed artwork.',
      partners: ['printful'] },
    { key: 'print3d', short: 'Zellerfeld', name: '3D-printed with Zellerfeld',
      oneLine: 'They 3D-print your own shoe shape, one pair at a time, after each sale \u2014 no molds, no factory.',
      upfront: 'The cost of a printable 3D file', speed: 'Weeks', closeness: 'Your own shape, printed in one material', risk: 'Low',
      w: {
        who: 'Zellerfeld, plus a 3D footwear designer (freelance) to turn one F.T.T.U render into a printable 3D model.',
        what: 'A sneaker (or possibly a slide) redesigned to be printed in one piece and one material. Not the jacket, skis or snowboard.',
        when: 'Weeks for the 3D model, then listed on their marketplace and printed as orders come in.',
        where: 'Zellerfeld prints in Austin, Texas and Hamburg, Germany.',
        why: 'It is your own shoe shape \u2014 not a stock blank \u2014 without paying for molds or holding stock. Zellerfeld opened its platform to independent designers.'
      },
      money: 'Nothing to Zellerfeld up front; designers set their own retail price. The real cost is the 3D model \u2014 get quotes from freelance 3D footwear designers.',
      catch: 'A render is not a printable file, and a printed shoe is a different product from the knit design. Earlier coverage said prints were one color at a time \u2014 confirm current materials and colors with Zellerfeld.',
      partners: ['zellerfeld'] },
    { key: 'factory', short: 'Factory', name: 'A contract factory',
      oneLine: 'A shoe or garment factory builds your exact design from a tech pack, starting with paid samples, then a minimum order.',
      upfront: 'Thousands to tens of thousands', speed: 'Months', closeness: 'Your exact design', risk: 'Highest',
      w: {
        who: 'A factory found through Pietra (one project, many quotes), or directly: Italian Shoe Factory, Shoe Factory Los Angeles, and Maker\u2019s Row for the jacket.',
        what: 'The real F.T.T.U construction \u2014 knit uppers, custom soles, the shield badge \u2014 and every product in the line, including heels, hiking boots, kids\u2019 and baby shoes.',
        when: 'Months: tech pack, then several paid sample rounds, then production.',
        where: 'Los Angeles, Italy, or overseas factories through Pietra.',
        why: 'The only way to get your actual designs made, and the lowest cost per pair once you sell in volume.'
      },
      money: 'One factory publishes that custom molded sneaker soles cost $2,000\u2013$4,000 per shoe size in tooling. Eight sizes would be about $16,000\u2013$32,000 in molds alone (our math from their number, not a quote) \u2014 before samples and the first order. Sample and minimum-order costs need quotes.',
      catch: 'Custom soles need a mold for every size, and it takes several sample rounds. This is where real money goes.',
      partners: ['pietra', 'isf', 'sfla', 'makersrow'] }
  ];

  /* Can I make it myself from scratch? Honest answer, shown first. */
  var DIY = 'Not realistically for a first product. Shoes need factory machines, molds for every size and trained workers \u2014 and most big shoe brands do not own the factories that build their shoes either. You stay the owner, the brand and the designer on every route. Print-on-demand and 3D printing are the closest thing to making it yourself: you own the design and the brand, and a partner does the physical making only when an order comes in.';

  /* Real organizations. Only facts confirmed in September 2026 are stated. */
  var PARTNERS = [
    { key: 'printful', name: 'Printful', route: 'pod', url: 'https://www.printful.com/custom-shoes',
      what: 'Print-on-demand service with custom-printed shoes (five styles, print covers most of the upper), flip-flops, slides and an all-over-print bomber jacket.',
      checked: 'No order minimums; bulk discount from 25 pairs; bomber jackets listed at about $48.95\u2013$60 base price.',
      caveat: 'Stock shoe shapes with printed uppers \u2014 not the F.T.T.U knit construction.' },
    { key: 'zellerfeld', name: 'Zellerfeld', route: 'print3d', url: 'https://www.zellerfeld.com/',
      what: '3D-printed footwear platform printing in Austin, Texas and Hamburg, Germany. Opened to outside designers in 2024 and relaunched its marketplace on July 21, 2026.',
      checked: 'Independent designers can list printed shoes and set their own prices.',
      caveat: 'Needs a printable 3D model, not a render. Confirm current material and color options.' },
    { key: 'pietra', name: 'Pietra', route: 'factory', url: 'https://pietrastudio.com/platform/sourcing-and-production',
      what: 'Sourcing platform with a vetted network of 1,300\u20131,500+ factories. Post one custom project and factories reply with quotes.',
      checked: 'Custom-project requests, supplier chat and sample ordering are part of the membership.',
      caveat: 'Paid membership. Still get samples and references.' },
    { key: 'isf', name: 'Italian Shoe Factory', route: 'factory', url: 'https://italianshoefactory.com/sneakers/how-to-start-your-own-sneaker-brand/',
      what: 'Private-label shoe manufacturer aimed at startups, with prototyping packages and a free tech-pack guide.',
      checked: 'Publishes that custom molded sneaker soles can cost $2,000\u2013$4,000 per size in tooling.',
      caveat: 'Quality and minimum order not independently verified; ask for references.' },
    { key: 'sfla', name: 'Shoe Factory Los Angeles', route: 'factory', url: 'https://www.shoefactorylosangeles.com/',
      what: 'Los Angeles footwear manufacturer (since 2008 by its own account) pitching small domestic runs to new brands.',
      checked: 'Active in 2026; takes quote requests through its site.',
      caveat: 'Self-described; capabilities, pricing and reviews not independently verified.' },
    { key: 'makersrow', name: 'Maker\u2019s Row', route: 'factory', url: 'https://makersrow.com/blog/how-to-start-a-fashion-brand/',
      what: 'US directory and project board for apparel and accessory manufacturers.',
      checked: 'Active in 2026 with founder guides for tech packs and sampling.',
      caveat: 'Listings are not endorsements; vet each factory.' },
    { key: 'plc', name: 'Pensole Lewis College (PLC Detroit)', route: 'help', url: 'https://plcdetroit.com/?p=595',
      what: 'Detroit design college (Michigan\u2019s only HBCU) teaching footwear and product creation, with brand partners such as New Balance. Co-founded JEMS by Pensole, a Black-owned shoe factory in New Hampshire (opened 2023).',
      checked: 'Launched a 10-week New Balance design capstone in July 2026.',
      caveat: 'A school, not a manufacturer. JEMS\u2019 production status in 2026 not confirmed \u2014 ask PLC.' },
    { key: 'sma', name: 'Shoemakers Academy', route: 'help', url: 'https://shoemakersacademy.com/courses/',
      what: 'Online footwear development courses and consulting from a veteran shoe developer.',
      checked: 'Active in 2026 with a starting-a-shoe-business course and consulting packages.',
      caveat: 'Paid education; not a manufacturer.' },
    { key: 'fdra', name: 'Footwear LaunchPad (FDRA)', route: 'help', url: 'https://www.worldfootwear.com/news/andy-polk-from-the-footwear-innovation-foundation-changing-the-industry-from-reactive-to-visionary/10782.html',
      what: 'The footwear industry association\u2019s pipeline connecting new footwear ideas with the industry.',
      checked: 'The 2026 application window ran April 16 \u2013 May 31, 2026.',
      caveat: 'Closed for this year; watch for the next cycle.' }
  ];

  /* How each product looks through each route: [fit, what it becomes].
     fit: yes = offered; maybe = possible, confirm first; no = not offered as far as we found. */
  var FIT = {
    'sneakers':     { pod: ['yes', 'A Printful printed sneaker with the F.T.T.U gradient and shield artwork.'], print3d: ['yes', 'Your sneaker shape redrawn as a one-piece printed shoe.'], factory: ['yes', 'The full knit sneaker with the custom midsole, outsole and shield badge.'] },
    'boots':        { pod: ['maybe', 'A Printful printed high-top as a stand-in \u2014 not the boot build.'], print3d: ['maybe', 'Possible as a printed high-top shape; confirm with Zellerfeld.'], factory: ['yes', 'The full sneaker boot with padded collar and lace hardware.'] },
    'sandals':      { pod: ['maybe', 'Printful printed slides as a stand-in \u2014 not the crossover-strap sandal.'], print3d: ['maybe', 'Possible as a printed slide; confirm with Zellerfeld.'], factory: ['yes', 'The real sandal with woven straps, molded footbed and badge.'] },
    'flip-flops':   { pod: ['yes', 'Printful flip-flops with F.T.T.U artwork.'], print3d: ['maybe', 'Possible as a printed slide-style shape; confirm with Zellerfeld.'], factory: ['yes', 'The real flip-flop with the knit strap, molded footbed and shield emblem.'] },
    'high-heels':   { pod: ['no', 'Not offered by Printful.'], print3d: ['no', 'Not offered as far as we found.'], factory: ['yes', 'A pump built on an insole board, steel shank and heel block.'] },
    'hiking-boots': { pod: ['no', 'Not offered by Printful.'], print3d: ['no', 'Not offered as far as we found.'], factory: ['yes', 'The full waterproof hiking boot with shank and lugged outsole.'] },
    'kids':         { pod: ['no', 'Not confirmed on Printful.'], print3d: ['no', 'Not offered as far as we found.'], factory: ['yes', 'The kids\u2019 sneaker \u2014 plus required children\u2019s product testing.'] },
    'baby-shoes':   { pod: ['no', 'Not confirmed on Printful.'], print3d: ['no', 'Not offered as far as we found.'], factory: ['yes', 'The soft first-walker \u2014 plus required children\u2019s product testing.'] },
    'snowboard':    { pod: ['no', 'Not a print-on-demand product.'], print3d: ['no', 'Not a 3D-printed product.'], factory: ['maybe', 'A specialist board factory; none verified yet. Start with F.T.T.U graphics on an existing board shape.'] },
    'skis':         { pod: ['no', 'Not a print-on-demand product.'], print3d: ['no', 'Not a 3D-printed product.'], factory: ['maybe', 'A specialist ski factory; none verified yet. Bindings must be bought from a certified maker.'] },
    'apparel':      { pod: ['yes', 'Printful\u2019s all-over-print bomber jacket with the gradient and F.T.T.U lettering.'], print3d: ['no', 'Not a 3D-printed product.'], factory: ['yes', 'The real cut-and-sew track jacket with rib trims, zip and chenille patch.'] }
  };

  /* Every product: its render, how it is built and what it is built from.
     Each component: [part, typical material, who makes it, note]. */
  var PRODUCTS = [
    { key: 'sneakers', label: 'Sneaker', breakdown: BD + 'sneaker.jpg',
      build: 'Strobel-lasted, cemented to a molded midsole and rubber outsole.',
      components: [
        ['Engineered knit upper', 'Polyester yarn, knit to shape with the seafoam-to-teal fade programmed in', 'Knit upper supplier or the factory\u2019s knitting line', 'The gradient is set in the knitting file, not printed afterwards.'],
        ['Molded toe cap', 'TPU or synthetic leather overlay', 'Factory, cut or molded', 'Molded caps need a small tool.'],
        ['Heel counter and heel wrap', 'Internal thermoplastic counter under a navy synthetic wrap with the embossed shield', 'Factory; emboss die from a die maker', 'The shield emboss needs its own die.'],
        ['Padded collar and lining', 'PU foam padding, polyester mesh lining', 'Factory cutting and stitching', ''],
        ['Tongue and label', 'Padded mesh tongue, woven brand label', 'Label mill for the woven label', ''],
        ['Eyelets and laces', 'Punched eyelets or metal grommets, woven polyester laces with aglets', 'Lace and trim supplier', 'Match the lace to the knit color.'],
        ['Strobel board', 'Nonwoven sock stitched to the bottom of the upper', 'Factory, during lasting', 'Your render labels two parts as \u201cstrobel board\u201d; there is only one.'],
        ['Removable insole', 'Die-cut EVA or PU foam with printed F.T.U. logo', 'Insole supplier', ''],
        ['Midsole', 'Compression-molded EVA or phylon, mint over white', 'Sole factory', 'Needs a mold for every size.'],
        ['Outsole and traction pods', 'Molded rubber', 'Sole factory', 'Custom soles are the biggest tooling cost.'],
        ['Box and packaging', 'Printed shoebox, tissue, hangtag', 'Packaging printer', '']
      ] },
    { key: 'boots', label: 'Sneaker boot', breakdown: BD + 'boot.jpg',
      build: 'High-top built like the sneaker, with a padded mid collar and speed-lace hardware.',
      components: [
        ['Knit upper', 'Engineered polyester knit, mint-to-teal fade', 'Knit upper supplier', ''],
        ['Padded ankle collar', 'Segmented PU foam, mesh lining', 'Factory', ''],
        ['Gusseted tongue', 'Padded mesh sewn to the upper on both sides', 'Factory', 'Keeps debris out.'],
        ['D-rings and lace hardware', 'Metal D-rings and loop guides', 'Hardware supplier', 'Ask for plating and pull-strength specs.'],
        ['Pull tabs', 'Nylon webbing', 'Webbing supplier', ''],
        ['Heel counter and wrap', 'Internal counter, navy PU heel wrap with F.T.U. mark', 'Factory; emboss die', ''],
        ['Toe rand', 'Molded rubber or TPU', 'Sole factory', ''],
        ['Strobel board and insole', 'Nonwoven board; removable foam insole', 'Factory and insole supplier', ''],
        ['Midsole', 'EVA or phylon, mint over white', 'Sole factory', 'Mold per size.'],
        ['Lugged outsole', 'Molded rubber', 'Sole factory', 'Mold per size.']
      ] },
    { key: 'sandals', label: 'Sandal', breakdown: BD + 'sandal.jpg',
      build: 'Straps anchored into a molded footbed and midsole, cemented to a rubber outsole.',
      components: [
        ['Crossover straps', 'Knit or woven webbing, teal', 'Webbing or knit supplier', ''],
        ['Elastic heel strap', 'Elasticated knit', 'Webbing supplier', ''],
        ['Shield badge', 'Metal or molded TPU with silver finish', 'Hardware or badge supplier', 'A metal badge needs a die; TPU is cheaper to start.'],
        ['Contoured footbed', 'Molded EVA with a microsuede or wicking top cover', 'Sole factory', 'Mold per size.'],
        ['Two-layer midsole', 'Mint EVA over white EVA', 'Sole factory', ''],
        ['Shank plate', 'Thin TPU or fiberboard plate', 'Component supplier', 'Optional; adds stability.'],
        ['Outsole', 'Rubber with flex grooves', 'Sole factory', 'Mold per size.']
      ] },
    { key: 'flip-flops', label: 'Flip-flop', breakdown: BD + 'ff.jpg',
      build: 'Thong strap plugged through a molded footbed. The fewest parts in the line.',
      components: [
        ['Thong strap', 'Woven knit strap with soft padding', 'Strap supplier or the factory', ''],
        ['Toe post and anchors', 'Molded rubber or PVC plug', 'Factory', 'Pull strength matters; ask how it is tested.'],
        ['Shield emblem', 'Your render says polished SUS316 stainless steel', 'Metal badge maker', 'Metal on a flip-flop is costly; an embossed or TPU shield is the usual start.'],
        ['Footbed and liner', 'EVA with a wicking top layer and embossed logo', 'EVA molder', 'Mold per size.'],
        ['Midsole', 'Dual-density EVA', 'EVA molder', ''],
        ['Outsole', 'Non-marking rubber with grooved tread', 'EVA or rubber molder', '']
      ] },
    { key: 'high-heels', label: 'Heel', breakdown: BD + 'hh.jpg',
      build: 'Pump built on an insole board with a steel shank and a separate heel block.',
      components: [
        ['Upper', 'Your render uses a knit; pumps are usually leather or synthetic so they hold shape', 'Factory', 'Ask the factory whether knit can hold a pump shape.'],
        ['Toe rand', 'Navy leather', 'Factory', ''],
        ['Heel counter', 'Reinforced leather with F.T.U. emboss', 'Factory; emboss die', ''],
        ['Lining', 'Microfiber or leather', 'Factory', ''],
        ['Insole board and steel shank', 'Fiberboard with a steel shank', 'Component supplier', 'This carries your weight. The render\u2019s EVA \u201cplatform midsole\u201d is not how pumps are usually built.'],
        ['Cushioned insole', 'Thin PU foam sock', 'Insole supplier', ''],
        ['Stiletto heel block', 'Molded ABS plastic, wrapped', 'Heel maker', 'A heel mold per heel height.'],
        ['Top lift (heel tip)', 'Replaceable rubber or TPU', 'Heel maker', ''],
        ['Outsole', 'Leather or rubber', 'Factory', '']
      ] },
    { key: 'hiking-boots', label: 'Hiking boot', breakdown: BD + 'hiking.jpg',
      build: 'Waterproof bootie inside a knit and suede upper, on a shank and lugged outsole.',
      components: [
        ['Knit and suede upper', 'Ribbed knit with suede heel', 'Factory', ''],
        ['Waterproof lining', 'Membrane bootie', 'Membrane supplier', 'Any \u201cwaterproof\u201d claim needs testing before you print it.'],
        ['Gusseted tongue', 'Padded mesh', 'Factory', ''],
        ['Padded ankle collar', 'Memory foam', 'Factory', ''],
        ['Lacing hardware', 'Metal eyelets, D-rings, speed hooks', 'Hardware supplier', ''],
        ['Heel pull tab', 'Nylon webbing', 'Webbing supplier', ''],
        ['Toe rand', 'Textured rubber', 'Sole factory', ''],
        ['Shank plate', 'TPU or fiberglass', 'Component supplier', ''],
        ['Strobel board and insole', 'Board; removable orthotic-style footbed', 'Factory, insole supplier', ''],
        ['Midsole', 'Teal EVA', 'Sole factory', 'Mold per size.'],
        ['Lugged outsole', 'Carbon rubber, deep lugs', 'Sole factory', 'Mold per size.']
      ] },
    { key: 'kids', label: 'Kids\u2019 sneaker', breakdown: BD + 'kids.jpg',
      build: 'Sneaker construction scaled down, with toggle laces and a segmented outsole.',
      components: [
        ['Printed mesh upper', 'Breathable mesh with the star print', 'Factory; print supplier', ''],
        ['Toe cap and mudguard', 'Synthetic leather overlays', 'Factory', ''],
        ['Heel counter and star badge', 'Red overlay with F.T.U badge', 'Factory; badge maker', 'Badges must survive pull tests.'],
        ['Toggle laces', 'Elastic laces, plastic spring toggles', 'Trim supplier', 'Small parts on children\u2019s items need attachment testing.'],
        ['Eyelets', 'Metal', 'Hardware supplier', 'Coatings fall under lead limits.'],
        ['Strobel board and insole', 'Board; foam insole', 'Factory', ''],
        ['Midsole', 'Teal EVA', 'Sole factory', 'Mold per size.'],
        ['Segmented outsole', 'Rubber in blue, yellow and red blocks', 'Sole factory', 'Mold per size.']
      ] },
    { key: 'baby-shoes', label: 'Baby shoe', breakdown: BD + 'baby.jpg',
      build: 'Soft first-walker on a thin flexible sole with one hook-and-loop strap.',
      components: [
        ['Soft upper', 'Engineered mesh panels, breathable lining', 'Factory', ''],
        ['Hook-and-loop strap', 'Nylon hook-and-loop', 'Trim supplier', ''],
        ['Padded collar and tongue', 'Soft foam, textile', 'Factory', ''],
        ['Star heel badge', 'Molded or embroidered', 'Badge maker', 'For babies, embroidered beats a hard badge.'],
        ['Heel pull tab', 'Nylon webbing', 'Webbing supplier', ''],
        ['Toe rand', 'Molded rubber', 'Sole factory', ''],
        ['Strobel board and insole', 'Thin board; cushioned insole', 'Factory', ''],
        ['Flexible outsole', 'Thin rubber with flex grooves', 'Sole factory', 'Mold per size.']
      ] },
    { key: 'snowboard', label: 'Snowboard', breakdown: BD + 'snowboard.jpg',
      build: 'Sandwich construction pressed in a mold: base, edges, core, fiberglass and topsheet.',
      sourcing: 'Boards and skis are pressed in molds by specialist board and ski factories, not shoe or garment makers. No specific factory was verified yet \u2014 ask the agent what to look for, then research names before contacting anyone.', components: [
        ['Sublimated topsheet', 'Printed composite sheet with the F.T.U. graphic', 'Board factory', 'A graphic-only board on an existing shape is the realistic first step.'],
        ['Fiberglass layers', 'Triaxial top, biaxial bottom', 'Composite supplier', ''],
        ['Carbon stringers', 'Carbon fiber strips', 'Composite supplier', 'Optional.'],
        ['Wood core', 'Profiled poplar and aspen', 'Core maker', ''],
        ['Binding inserts', 'Stainless steel 4x2 insert pattern', 'Hardware supplier', ''],
        ['Sidewalls', 'ABS', 'Board factory', ''],
        ['Steel edges', 'Hardened steel', 'Edge supplier', ''],
        ['Dampening strip', 'Rubber', 'Board factory', ''],
        ['Base', 'Sintered P-tex polyethylene', 'Base material supplier', '']
      ] },
    { key: 'skis', label: 'Skis', breakdown: BD + 'skis.jpg',
      build: 'Same sandwich build as the board, plus bindings you must buy, not make.',
      sourcing: 'Boards and skis are pressed in molds by specialist board and ski factories, not shoe or garment makers. No specific factory was verified yet \u2014 ask the agent what to look for, then research names before contacting anyone.', components: [
        ['Topsheet', 'Sublimated composite with F.T.U. logo', 'Ski factory', ''],
        ['Fiberglass laminates', 'Multi-directional glass', 'Composite supplier', ''],
        ['Wood core', 'Poplar and paulownia, profiled', 'Core maker', ''],
        ['Sidewalls', 'ABS', 'Ski factory', ''],
        ['Steel edges', 'Hardened steel', 'Edge supplier', ''],
        ['Base', 'Sintered P-tex', 'Base material supplier', ''],
        ['Bindings (toe, heel, brakes)', 'Certified release bindings', 'An established binding maker only', 'Bindings are safety equipment. Never design your own; buy certified ones and have a ski shop mount them.']
      ] },
    { key: 'apparel', label: 'Track jacket', breakdown: BD + 'jacket.jpg',
      build: 'Cut-and-sew jacket with a printed gradient shell, knit trims and a full zip.',
      components: [
        ['Gradient shell', 'Polyester with the mint-to-teal fade sublimation-printed', 'Fabric printer or the garment factory', 'All-over print handles the fade easily.'],
        ['Ribbed collar, cuffs and hem', 'Flat-knit rib', 'Rib knitter', 'Color-matched rib is a separate order.'],
        ['Full-zip closure', 'Navy tape, metal slider', 'Zipper supplier', ''],
        ['Chest patch', 'Chenille or embroidered F.T.T.U. appliqu\u00e9', 'Patch maker', 'The render reads F.T.U on the jacket; the clothing line uses F.T.T.U lettering.'],
        ['Welt pockets', 'Self fabric', 'Garment factory', ''],
        ['Raglan sleeves', 'Self fabric', 'Garment factory', ''],
        ['Lining', 'Satin or mesh', 'Garment factory', ''],
        ['Labels', 'Fiber content, care, country of origin, brand', 'Label maker', 'Required on garments sold in the US.']
      ] }
  ];

  /* Rules that apply whichever route is chosen. */
  var RULES = [
    { key: 'sample', title: 'Hold a real sample before you approve anything',
      body: 'Never approve production, or sell a product, from a render or a photo. Order a sample, wear it, and approve it in writing.', applies: 'all' },
    { key: 'writing', title: 'Get every price, minimum and date in writing',
      body: 'Quotes, minimum orders, sample costs and delivery dates should all be in an email or contract before you pay.', applies: 'all' },
    { key: 'trademark', title: 'Clear the name before you print it',
      body: 'Search F.T.T.U and the F.T.U. shield in the USPTO trademark database before paying for boxes, labels or molds. A trademark attorney can file once the search is clean.', applies: 'all' },
    { key: 'renders', title: 'Renders are concepts, not product photos',
      body: 'Every F.T.T.U image is an AI render, and some labels in the exploded views are wrong. Use them as a starting point for a tech pack, never as the tech pack.', applies: 'all' },
    { key: 'kids', title: 'Kids\u2019 and baby shoes carry legal requirements',
      body: 'In the US, products made mainly for children 12 and under need third-party testing at a CPSC-accepted lab, a Children\u2019s Product Certificate, lead limits (100 ppm total, 90 ppm in paint and coatings) and a permanent tracking label on the shoe and its box.',
      applies: ['kids', 'baby-shoes'] },
    { key: 'bindings', title: 'Ski bindings are safety equipment',
      body: 'Buy certified bindings from an established binding maker and have a ski shop mount and adjust them. Do not design or source your own.', applies: ['skis'] },
    { key: 'labels', title: 'Garments need labels',
      body: 'Clothing sold in the US needs fiber content, country of origin, the maker\u2019s identity and care instructions on a label.', applies: ['apparel'] }
  ];

  /* The path, in order: start small, move up with proof. */
  var STAGES = [
    { title: 'Test with Printful', body: 'Put the flip-flop and the jacket on Printful. Order one sample of each and wear them.', route: 'pod' },
    { title: 'Hand off to marketing', body: 'Your marketing agent finds out who buys, how, and at what price. Sales are the proof.', route: 'pod' },
    { title: 'Print your own shape', body: 'Have one sneaker turned into a printable 3D model and list it with Zellerfeld.', route: 'print3d' },
    { title: 'Write the tech pack', body: 'Turn the best seller\u2019s exploded view into a tech pack and have a footwear developer check it.', route: 'factory' },
    { title: 'Quote and sample', body: 'Send the tech pack to factories through Pietra. Pay for samples and compare them.', route: 'factory' },
    { title: 'First production run', body: 'Approve the final sample in writing, pay the minimum order, and inspect before it ships.', route: 'factory' }
  ];

  /* Five videos. Existence and titles confirmed via search in September 2026; not watched end to end. */
  var VIDEOS = [
    { title: 'How We Make Our Shoes \u2014 Inside Our UK Factory', who: 'Hotter Shoes', url: 'https://www.youtube.com/watch?v=zaTl0bdNxP4', year: '2016', route: 'factory',
      why: 'A real shoe brand walks through its own factory: cutting, stitching, lasting and soling. This is the factory route, start to finish.' },
    { title: 'The truth about 3D printed shoes \u2014 Zellerfeld', who: 'Rose Anvil', url: 'https://www.youtube.com/watch?v=hoKaSfiNzKQ', year: '2024', route: 'print3d',
      why: 'A well-known shoe teardown channel takes a Zellerfeld shoe apart. An honest look at the 3D-printed route.' },
    { title: 'How On is winning the sneaker race', who: 'CNBC', url: 'https://www.cnbc.com/video/2025/05/24/how-on-is-winning-the-sneaker-race.html', year: '2025', route: 'factory',
      why: 'How a young sneaker brand gets made at scale, including where and what tariffs do. Hosted on CNBC\u2019s site.' },
    { title: 'Everything You Need to Know About Cut and Sew Manufacturing! 30 Minute Crash Course', who: 'Clothing-brand educator channel', url: 'https://www.youtube.com/watch?v=kE3Owwdad4A', year: '2023', route: 'factory',
      why: 'How a garment goes from idea to finished piece \u2014 the factory route for the jacket and future clothing.' },
    { title: 'How To Make The Perfect Tech Pack For Your Clothing Brand', who: 'Clothing-brand tutorial channel', url: 'https://www.youtube.com/watch?v=6KE1_7UJBjQ', year: '2025', route: 'factory',
      why: 'The document every factory asks for, built step by step. The same idea applies to shoes.' }
  ];

  function by(list, key) { for (var i = 0; i < list.length; i++) if (list[i].key === key) return list[i]; return null; }
  PRODUCTS.forEach(function (p) { p.fit = FIT[p.key]; });

  global.FTTU_MFG = {
    ROUTES: ROUTES, PARTNERS: PARTNERS, PRODUCTS: PRODUCTS, RULES: RULES, STAGES: STAGES, VIDEOS: VIDEOS, DIY: DIY,
    route: function (k) { return by(ROUTES, k); },
    partner: function (k) { return by(PARTNERS, k); },
    product: function (k) { return by(PRODUCTS, k); },
    rulesFor: function (k) { return RULES.filter(function (r) { return r.applies === 'all' || r.applies.indexOf(k) > -1; }); },
    CHECKED: 'September 2026'
  };
})(window);
