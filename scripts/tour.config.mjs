// Hand-maintained facts the raw data can't tell us. Everything else
// (routes, distances, elevation, gap fill-ins, photo positions, weather)
// is derived from gpxdata/ and photos/ by tracks.mjs and build-data.mjs.
// See ../cycle-trip-2024 and ../cycle-tour-2026 for more examples.

// Masthead text and page metadata.
export const TOUR = {
  title: "Normandy → Brittany · Cycle Tour 2025", // browser tab / link previews
  from: "Normandy", // the big "From → To" heading
  to: "Brittany",
  dates: "31 August – 11 September 2025",
  riders: "Mike & me",
  lede: "Eleven days from the D-Day beaches to Roscoff, by way of Mont-Saint-Michel, Saint-Malo and the Breton coast, with ferries and trains at either end.",
  description: "An interactive map and journal of a September 2025 bike tour from Ouistreham to Roscoff.",
};

// Local offset from UTC during the trip: dates are grouped and times shown
// in this zone (French time; the UK legs show in French time too).
export const TIMEZONE_OFFSET_HOURS = 2; // CEST
export const TIME_ZONE = "Europe/Paris"; // the same zone, for the site's clock times

// How the rides were recorded. "strava": Strava's own recordings, whose
// distance and altitude are already clean, so they're counted the way
// Strava counts them. "phone": raw phone GPS (Google Fit/Health exports),
// whose altitude is despiked and smoothed hard before climbing is counted.
export const RECORDINGS = "strava";

// Route the unrecorded stretches (sparse jumps inside rides, and riding
// between rides, stays and transfers) with BRouter: `npm run data:routes`.
// Needs depart/arrive times on every transfer.
export const FILL_GAPS = true;

// Only for photos named by the camera's own clock (IMG_…). The Pixel's
// PXL_… names are UTC, so this trip needs nothing here.
export const CAMERA_CLOCK = [];

// Overnight stops, from the saved Google Maps list "France Cycle trip
// campsites". `night` is the date you went to sleep there. The night of
// 31 August was spent on the ferry.
export const stays = [
  { id: "bas-carreaux", night: "2025-09-01", kind: "campsite", name: "Camping Les Bas Carreaux", place: "Tracy-sur-Mer, near Bayeux", lat: 49.3350874, lon: -0.6348304 },
  { id: "hautdick", night: "2025-09-02", nights: 2, kind: "campsite", name: "Flower Camping Le HautDick", place: "Carentan", lat: 49.3097954, lon: -1.2391803 },
  { id: "tenzor", night: "2025-09-04", kind: "campsite", name: "Le Tenzor de la Baie", place: "Cherrueix", lat: 48.6045664, lon: -1.7079482 },
  { id: "manchette", night: "2025-09-05", kind: "campsite", name: "Camping Municipal de la Manchette", place: "Saint-Jacut-de-la-Mer", lat: 48.5932732, lon: -2.1852002 },
  { id: "vallees", night: "2025-09-06", kind: "campsite", name: "Camping des Vallées", place: "Saint-Brieuc", lat: 48.500281, lon: -2.7588359 },
  { id: "paimpol", night: "2025-09-07", kind: "campsite", name: "Accueil Camping", place: "Paimpol", lat: 48.7694893, lon: -3.0219238 },
  { id: "ernest-renan", night: "2025-09-08", kind: "campsite", name: "Camping Municipal Ernest Renan", place: "Louannec", lat: 48.7967478, lon: -3.4271337 },
  { id: "pont-ar-gler", night: "2025-09-09", kind: "campsite", name: "Camping Municipal de Pont ar Gler", place: "Plougasnou", lat: 48.6939546, lon: -3.7749732 },
  { id: "ar-kleguer", night: "2025-09-10", kind: "campsite", name: "Camping Ar Kleguer", place: "Saint-Pol-de-Léon", lat: 48.6911799, lon: -3.9672473 },
];

const STN = {
  bristol: [51.4491, -2.5813],
  salisbury: [51.0705, -1.8064],
  southampton: [50.9077, -1.414],
  portsmouthHarbour: [50.7969, -1.1077],
  carentan: [49.3037, -1.2453],
  saintLo: [49.1142, -1.0841],
  coutances: [49.0465, -1.4396],
  folligny: [48.8237, -1.3946],
  avranches: [48.6826, -1.3708],
  plymouth: [50.378, -4.1435],
  exeter: [50.7293, -3.5434],
};

// Non-cycling legs. Times are local (CEST) and approximate, read off photo
// timestamps and the gaps between rides; "+1" means the next day. Gaps
// around them are filled with routed riding (e.g. station → ferry port).
// Ferry paths are hand-drawn, with harbour approaches following photos
// taken from the deck.
export const transfers = [
  { id: "train-bristol-portsmouth", offTour: true, date: "2025-08-31", depart: "16:30", arrive: "19:15", mode: "train", name: "Bristol → Portsmouth Harbour", note: "GWR via Salisbury and Southampton", from: STN.bristol, to: STN.portsmouthHarbour, via: [STN.salisbury, STN.southampton] },
  { id: "ferry-portsmouth-ouistreham", date: "2025-08-31", depart: "00:15+1", arrive: "06:30+1", mode: "ferry", name: "Portsmouth → Ouistreham (Caen)", note: "Overnight Brittany Ferries crossing", path: [[50.8122, -1.0921], [50.8027, -1.1152], [50.7953, -1.1131], [50.785, -1.105], [50.74, -1.07], [50.55, -0.95], [49.6, -0.42], [49.33, -0.255], [49.2893, -0.2479]] },
  { id: "train-carentan-avranches", date: "2025-09-04", depart: "11:15", arrive: "13:15", mode: "train", name: "Carentan → Avranches", note: "TER via Saint-Lô and Coutances", from: STN.carentan, to: STN.avranches, via: [STN.saintLo, STN.coutances, STN.folligny] },
  { id: "ferry-saint-malo-dinard", date: "2025-09-05", depart: "15:30", arrive: "15:55", mode: "ferry", name: "Saint-Malo → Dinard", note: "Bus de mer across the Rance estuary (photos on board at 15:32 and 15:46)", path: [[48.6454, -2.0254], [48.642, -2.035], [48.6365, -2.045], [48.6348, -2.0492]] },
  { id: "ferry-roscoff-plymouth", date: "2025-09-11", depart: "15:00", arrive: "21:00", mode: "ferry", name: "Roscoff → Plymouth", note: "Brittany Ferries home", path: [[48.7221, -3.9651], [48.74, -3.96], [49.5, -4.05], [50.25, -4.16], [50.298, -4.1686], [50.3275, -4.1716], [50.3315, -4.1678], [50.3434, -4.1718], [50.3463, -4.1464], [50.3577, -4.1456], [50.3676, -4.1551]] },
  { id: "train-plymouth-bristol", offTour: true, date: "2025-09-11", depart: "22:00", arrive: "00:30+1", mode: "train", name: "Plymouth → Bristol", note: "GWR along the coast via Exeter", from: STN.plymouth, to: STN.bristol, via: [STN.exeter] },
];

// Riding in England is getting to and from the tour: drawn, not counted.
export const isOffTour = (pts) => pts.every((p) => p.lat > 50);

// Per-day headline used in the sidebar and map tooltips.
export const dayTitles = {
  "2025-08-31": { title: "Bristol → Portsmouth", subtitle: "Train to the coast & the night ferry" },
  "2025-09-01": { title: "Ouistreham → Tracy-sur-Mer", subtitle: "Along the D-Day beaches" },
  "2025-09-02": { title: "Tracy-sur-Mer → Carentan", subtitle: "Omaha Beach & Pointe du Hoc" },
  "2025-09-03": { title: "Carentan loop", subtitle: "Out to Sainte-Mère-Église and back" },
  "2025-09-04": { title: "Carentan → Avranches → Cherrueix", subtitle: "Train south, then Mont-Saint-Michel" },
  "2025-09-05": { title: "Cherrueix → Saint-Malo → Saint-Jacut", subtitle: "Saint-Malo's walls & the ferry to Dinard" },
  "2025-09-06": { title: "Saint-Jacut-de-la-Mer → Saint-Brieuc", subtitle: "Along the Côte d'Émeraude" },
  "2025-09-07": { title: "Saint-Brieuc → Paimpol", subtitle: "Up the Goëlo coast" },
  "2025-09-08": { title: "Paimpol → Louannec", subtitle: "Towards the Pink Granite Coast" },
  "2025-09-09": { title: "Louannec → Plougasnou", subtitle: "Into Finistère" },
  "2025-09-10": { title: "Plougasnou → Saint-Pol-de-Léon", subtitle: "Around the Bay of Morlaix" },
  "2025-09-11": { title: "Saint-Pol-de-Léon → Roscoff → Bristol", subtitle: "Ferry & train home" },
};
