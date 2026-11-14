/**
 * SAVE AMERICA PETITION PLATFORM
 * US Zip Code Resolution & Geocoding Engine
 * Maps 5-digit US Zip Codes to State, City, Congressional District, Latitude & Longitude,
 * and retrieves Federal House & Senate Representatives with mailing addresses.
 */

// Comprehensive 3-digit Zip Prefix Table covering all 50 US States + DC
const ZIP_PREFIX_MAP = {
  // MA: 010-027
  "010": { state: "MA", city: "Springfield", lat: 42.1015, lng: -72.5898, district: 1 },
  "011": { state: "MA", city: "Springfield", lat: 42.1015, lng: -72.5898, district: 1 },
  "012": { state: "MA", city: "Pittsfield", lat: 42.4501, lng: -73.2454, district: 1 },
  "013": { state: "MA", city: "Greenfield", lat: 42.5879, lng: -72.5998, district: 1 },
  "014": { state: "MA", city: "Fitchburg", lat: 42.5834, lng: -71.8023, district: 3 },
  "015": { state: "MA", city: "Worcester", lat: 42.2626, lng: -71.8023, district: 2 },
  "016": { state: "MA", city: "Worcester", lat: 42.2626, lng: -71.8023, district: 2 },
  "017": { state: "MA", city: "Framingham", lat: 42.2793, lng: -71.4162, district: 5 },
  "018": { state: "MA", city: "Lowell", lat: 42.6334, lng: -71.3162, district: 3 },
  "019": { state: "MA", city: "Salem", lat: 42.5195, lng: -70.8967, district: 6 },
  "020": { state: "MA", city: "Brockton", lat: 42.0834, lng: -71.0184, district: 8 },
  "021": { state: "MA", city: "Boston", lat: 42.3601, lng: -71.0589, district: 7 },
  "022": { state: "MA", city: "Boston", lat: 42.3601, lng: -71.0589, district: 7 },
  "023": { state: "MA", city: "Plymouth", lat: 41.9584, lng: -70.6673, district: 9 },
  "024": { state: "MA", city: "Newton", lat: 42.3370, lng: -71.2092, district: 4 },
  "025": { state: "MA", city: "Hyannis", lat: 41.6529, lng: -70.2822, district: 9 },
  "026": { state: "MA", city: "Barnstable", lat: 41.7001, lng: -70.3000, district: 9 },
  "027": { state: "MA", city: "New Bedford", lat: 41.6362, lng: -70.9326, district: 9 },
  // RI: 028-029
  "028": { state: "RI", city: "Newport", lat: 41.4901, lng: -71.3128, district: 1 },
  "029": { state: "RI", city: "Providence", lat: 41.8240, lng: -71.4128, district: 1 },
  // NH: 030-038
  "030": { state: "NH", city: "Nashua", lat: 42.7654, lng: -71.4676, district: 1 },
  "031": { state: "NH", city: "Manchester", lat: 42.9956, lng: -71.4548, district: 1 },
  "032": { state: "NH", city: "Concord", lat: 43.2081, lng: -71.5376, district: 2 },
  "033": { state: "NH", city: "Concord", lat: 43.2081, lng: -71.5376, district: 2 },
  "034": { state: "NH", city: "Keene", lat: 42.9337, lng: -72.2781, district: 2 },
  "035": { state: "NH", city: "Lancaster", lat: 44.4887, lng: -71.5695, district: 2 },
  "036": { state: "NH", city: "Walpole", lat: 43.0792, lng: -72.4270, district: 2 },
  "037": { state: "NH", city: "Lebanon", lat: 43.6423, lng: -72.2518, district: 2 },
  "038": { state: "NH", city: "Portsmouth", lat: 43.0718, lng: -70.7626, district: 1 },
  // ME: 039-049
  "039": { state: "ME", city: "York", lat: 43.1618, lng: -70.6484, district: 1 },
  "040": { state: "ME", city: "Portland", lat: 43.6615, lng: -70.2553, district: 1 },
  "041": { state: "ME", city: "Portland", lat: 43.6615, lng: -70.2553, district: 1 },
  "042": { state: "ME", city: "Auburn", lat: 44.0979, lng: -70.2312, district: 2 },
  "043": { state: "ME", city: "Augusta", lat: 44.3106, lng: -69.7795, district: 1 },
  "044": { state: "ME", city: "Bangor", lat: 44.8016, lng: -68.7712, district: 2 },
  "045": { state: "ME", city: "Bath", lat: 43.9106, lng: -69.8212, district: 1 },
  "046": { state: "ME", city: "Ellsworth", lat: 44.5434, lng: -68.4195, district: 2 },
  "047": { state: "ME", city: "Presque Isle", lat: 46.6814, lng: -68.0159, district: 2 },
  "048": { state: "ME", city: "Rockland", lat: 44.1037, lng: -69.1095, district: 1 },
  "049": { state: "ME", city: "Waterville", lat: 44.5520, lng: -69.6317, district: 2 },
  // VT: 050-059
  "050": { state: "VT", city: "White River Jct", lat: 43.6481, lng: -72.3184, district: 1 },
  "054": { state: "VT", city: "Burlington", lat: 44.4759, lng: -73.2121, district: 1 },
  "056": { state: "VT", city: "Montpelier", lat: 44.2601, lng: -72.5754, district: 1 },
  // CT: 060-069
  "060": { state: "CT", city: "Hartford", lat: 41.7658, lng: -72.6734, district: 1 },
  "061": { state: "CT", city: "Hartford", lat: 41.7658, lng: -72.6734, district: 1 },
  "064": { state: "CT", city: "New Haven", lat: 41.3083, lng: -72.9279, district: 3 },
  "065": { state: "CT", city: "New Haven", lat: 41.3083, lng: -72.9279, district: 3 },
  "068": { state: "CT", city: "Bridgeport", lat: 41.1792, lng: -73.1894, district: 4 },
  "069": { state: "CT", city: "Stamford", lat: 41.0534, lng: -73.5387, district: 4 },
  // NJ: 070-089
  "070": { state: "NJ", city: "Newark", lat: 40.7357, lng: -74.1724, district: 10 },
  "071": { state: "NJ", city: "Newark", lat: 40.7357, lng: -74.1724, district: 10 },
  "074": { state: "NJ", city: "Paterson", lat: 40.9168, lng: -74.1718, district: 9 },
  "077": { state: "NJ", city: "Red Bank", lat: 40.3471, lng: -74.0643, district: 4 },
  "080": { state: "NJ", city: "Camden", lat: 39.9259, lng: -75.1196, district: 1 },
  "085": { state: "NJ", city: "Trenton", lat: 40.2171, lng: -74.7429, district: 4 },
  "087": { state: "NJ", city: "Toms River", lat: 39.9537, lng: -74.1979, district: 4 },
  // NY: 100-149
  "100": { state: "NY", city: "New York", lat: 40.7128, lng: -74.0060, district: 12 },
  "101": { state: "NY", city: "New York", lat: 40.7128, lng: -74.0060, district: 12 },
  "104": { state: "NY", city: "Bronx", lat: 40.8448, lng: -73.8648, district: 14 },
  "112": { state: "NY", city: "Brooklyn", lat: 40.6782, lng: -73.9442, district: 8 },
  "117": { state: "NY", city: "Melville", lat: 40.7934, lng: -73.4151, district: 2 },
  "122": { state: "NY", city: "Albany", lat: 42.6526, lng: -73.7562, district: 20 },
  "129": { state: "NY", city: "Plattsburgh", lat: 44.6995, lng: -73.4529, district: 21 },
  "132": { state: "NY", city: "Syracuse", lat: 43.0481, lng: -76.1474, district: 24 },
  "142": { state: "NY", city: "Buffalo", lat: 42.8864, lng: -78.8784, district: 26 },
  "146": { state: "NY", city: "Rochester", lat: 43.1566, lng: -77.6088, district: 25 },
  // PA: 150-196
  "152": { state: "PA", city: "Pittsburgh", lat: 40.4406, lng: -79.9959, district: 12 },
  "165": { state: "PA", city: "Erie", lat: 42.1292, lng: -80.0851, district: 16 },
  "171": { state: "PA", city: "Harrisburg", lat: 40.2732, lng: -76.8867, district: 10 },
  "181": { state: "PA", city: "Allentown", lat: 40.6084, lng: -75.4902, district: 7 },
  "191": { state: "PA", city: "Philadelphia", lat: 39.9526, lng: -75.1652, district: 2 },
  // DE: 197-199
  "197": { state: "DE", city: "Wilmington", lat: 39.7391, lng: -75.5398, district: 1 },
  "199": { state: "DE", city: "Dover", lat: 39.1582, lng: -75.5244, district: 1 },
  // DC: 200-205
  "200": { state: "DC", city: "Washington", lat: 38.9072, lng: -77.0369, district: 1 },
  "205": { state: "DC", city: "Washington", lat: 38.9072, lng: -77.0369, district: 1 },
  // MD: 206-219
  "207": { state: "MD", city: "College Park", lat: 38.9897, lng: -76.9378, district: 5 },
  "208": { state: "MD", city: "Bethesda", lat: 38.9847, lng: -77.0947, district: 8 },
  "212": { state: "MD", city: "Baltimore", lat: 39.2904, lng: -76.6122, district: 7 },
  "216": { state: "MD", city: "Easton", lat: 38.7743, lng: -76.0763, district: 1 },
  // VA: 220-246
  "220": { state: "VA", city: "Fairfax", lat: 38.8462, lng: -77.3064, district: 11 },
  "222": { state: "VA", city: "Arlington", lat: 38.8799, lng: -77.1068, district: 8 },
  "224": { state: "VA", city: "Fredericksburg", lat: 38.3032, lng: -77.4605, district: 1 },
  "229": { state: "VA", city: "Charlottesville", lat: 38.0293, lng: -78.4767, district: 5 },
  "232": { state: "VA", city: "Richmond", lat: 37.5407, lng: -77.4360, district: 4 },
  "234": { state: "VA", city: "Virginia Beach", lat: 36.8529, lng: -75.9780, district: 2 },
  "240": { state: "VA", city: "Roanoke", lat: 37.2710, lng: -79.9414, district: 6 },
  // WV: 247-268
  "253": { state: "WV", city: "Charleston", lat: 38.3498, lng: -81.6326, district: 2 },
  "257": { state: "WV", city: "Huntington", lat: 38.4192, lng: -82.4452, district: 1 },
  "265": { state: "WV", city: "Morgantown", lat: 39.6295, lng: -79.9559, district: 2 },
  // NC: 270-289
  "271": { state: "NC", city: "Winston-Salem", lat: 36.0999, lng: -80.2442, district: 6 },
  "274": { state: "NC", city: "Greensboro", lat: 36.0726, lng: -79.7920, district: 6 },
  "276": { state: "NC", city: "Raleigh", lat: 35.7796, lng: -78.6382, district: 2 },
  "277": { state: "NC", city: "Durham", lat: 35.9940, lng: -78.8986, district: 4 },
  "282": { state: "NC", city: "Charlotte", lat: 35.2271, lng: -80.8431, district: 8 },
  "284": { state: "NC", city: "Wilmington", lat: 34.2257, lng: -77.9447, district: 7 },
  "288": { state: "NC", city: "Asheville", lat: 35.5951, lng: -82.5515, district: 11 },
  // SC: 290-299
  "290": { state: "SC", city: "Columbia", lat: 34.0007, lng: -81.0348, district: 2 },
  "292": { state: "SC", city: "Columbia", lat: 34.0007, lng: -81.0348, district: 2 },
  "294": { state: "SC", city: "Charleston", lat: 32.7765, lng: -79.9311, district: 1 },
  "296": { state: "SC", city: "Greenville", lat: 34.8526, lng: -82.3940, district: 3 },
  // GA: 300-319
  "300": { state: "GA", city: "Norcross", lat: 33.9412, lng: -84.2135, district: 6 },
  "301": { state: "GA", city: "Marietta", lat: 33.9526, lng: -84.5499, district: 14 },
  "303": { state: "GA", city: "Atlanta", lat: 33.7490, lng: -84.3880, district: 5 },
  "307": { state: "GA", city: "Dalton", lat: 34.7698, lng: -84.9702, district: 14 },
  "312": { state: "GA", city: "Macon", lat: 32.8407, lng: -83.6324, district: 2 },
  "314": { state: "GA", city: "Savannah", lat: 32.0809, lng: -81.0912, district: 1 },
  // FL: 320-349
  "322": { state: "FL", city: "Jacksonville", lat: 30.3322, lng: -81.6557, district: 4 },
  "323": { state: "FL", city: "Tallahassee", lat: 30.4383, lng: -84.2807, district: 2 },
  "325": { state: "FL", city: "Pensacola", lat: 30.4213, lng: -87.2169, district: 1 },
  "328": { state: "FL", city: "Orlando", lat: 28.5383, lng: -81.3792, district: 10 },
  "329": { state: "FL", city: "Melbourne", lat: 28.0836, lng: -80.6081, district: 8 },
  "331": { state: "FL", city: "Miami", lat: 25.7617, lng: -80.1918, district: 27 },
  "334": { state: "FL", city: "West Palm Beach", lat: 26.7153, lng: -80.0534, district: 21 },
  "336": { state: "FL", city: "Tampa", lat: 27.9506, lng: -82.4572, district: 14 },
  "337": { state: "FL", city: "St. Petersburg", lat: 27.7676, lng: -82.6403, district: 13 },
  "341": { state: "FL", city: "Naples", lat: 26.1420, lng: -81.7948, district: 19 },
  // AL: 350-369
  "352": { state: "AL", city: "Birmingham", lat: 33.5186, lng: -86.8104, district: 7 },
  "358": { state: "AL", city: "Huntsville", lat: 34.7304, lng: -86.5861, district: 5 },
  "361": { state: "AL", city: "Montgomery", lat: 32.3792, lng: -86.3077, district: 2 },
  "366": { state: "AL", city: "Mobile", lat: 30.6954, lng: -88.0399, district: 1 },
  // TN: 370-385
  "372": { state: "TN", city: "Nashville", lat: 36.1627, lng: -86.7816, district: 5 },
  "374": { state: "TN", city: "Chattanooga", lat: 35.0456, lng: -85.3097, district: 3 },
  "379": { state: "TN", city: "Knoxville", lat: 35.9606, lng: -83.9207, district: 2 },
  "381": { state: "TN", city: "Memphis", lat: 35.1495, lng: -90.0490, district: 9 },
  // MS: 386-397
  "392": { state: "MS", city: "Jackson", lat: 32.2988, lng: -90.1848, district: 2 },
  "395": { state: "MS", city: "Gulfport", lat: 30.3674, lng: -89.0928, district: 4 },
  // KY: 400-427
  "402": { state: "KY", city: "Louisville", lat: 38.2527, lng: -85.7585, district: 3 },
  "405": { state: "KY", city: "Lexington", lat: 38.0406, lng: -84.5037, district: 6 },
  "410": { state: "KY", city: "Covington", lat: 39.0837, lng: -84.5086, district: 4 },
  "421": { state: "KY", city: "Bowling Green", lat: 36.9685, lng: -86.4808, district: 1 },
  // OH: 430-459
  "432": { state: "OH", city: "Columbus", lat: 39.9612, lng: -82.9988, district: 3 },
  "441": { state: "OH", city: "Cleveland", lat: 41.4993, lng: -81.6944, district: 11 },
  "443": { state: "OH", city: "Akron", lat: 41.0814, lng: -81.5190, district: 13 },
  "447": { state: "OH", city: "Canton", lat: 40.7989, lng: -81.3784, district: 7 },
  "452": { state: "OH", city: "Cincinnati", lat: 39.1031, lng: -84.5120, district: 1 },
  "454": { state: "OH", city: "Dayton", lat: 39.7589, lng: -84.1916, district: 10 },
  "458": { state: "OH", city: "Lima", lat: 40.7425, lng: -84.1052, district: 4 },
  // IN: 460-479
  "462": { state: "IN", city: "Indianapolis", lat: 39.7684, lng: -86.1581, district: 7 },
  "460": { state: "IN", city: "Carmel / Noblesville", lat: 39.9784, lng: -86.1180, district: 5 },
  "468": { state: "IN", city: "Fort Wayne", lat: 41.0793, lng: -85.1394, district: 3 },
  "477": { state: "IN", city: "Evansville", lat: 37.9716, lng: -87.5711, district: 8 },
  // MI: 480-499
  "482": { state: "MI", city: "Detroit", lat: 42.3314, lng: -83.0458, district: 12 },
  "483": { state: "MI", city: "Pontiac", lat: 42.6389, lng: -83.2910, district: 10 },
  "488": { state: "MI", city: "Lansing", lat: 42.7325, lng: -84.5555, district: 7 },
  "495": { state: "MI", city: "Grand Rapids", lat: 42.9634, lng: -85.6681, district: 3 },
  "497": { state: "MI", city: "Gaylord", lat: 45.0275, lng: -84.6747, district: 1 },
  // IA: 500-528
  "503": { state: "IA", city: "Des Moines", lat: 41.5868, lng: -93.6250, district: 3 },
  "524": { state: "IA", city: "Cedar Rapids", lat: 41.9779, lng: -91.6656, district: 2 },
  "528": { state: "IA", city: "Davenport", lat: 41.5236, lng: -90.5776, district: 1 },
  // WI: 530-549
  "532": { state: "WI", city: "Milwaukee", lat: 43.0389, lng: -87.9065, district: 4 },
  "537": { state: "WI", city: "Madison", lat: 43.0731, lng: -89.4012, district: 2 },
  "543": { state: "WI", city: "Green Bay", lat: 44.5192, lng: -88.0198, district: 8 },
  // MN: 550-567
  "551": { state: "MN", city: "St. Paul", lat: 44.9537, lng: -93.0900, district: 4 },
  "554": { state: "MN", city: "Minneapolis", lat: 44.9778, lng: -93.2650, district: 5 },
  "558": { state: "MN", city: "Duluth", lat: 46.7867, lng: -92.1005, district: 8 },
  // SD: 570-577
  "571": { state: "SD", city: "Sioux Falls", lat: 43.5460, lng: -96.7313, district: 1 },
  "577": { state: "SD", city: "Rapid City", lat: 44.0805, lng: -103.2310, district: 1 },
  // ND: 580-588
  "581": { state: "ND", city: "Fargo", lat: 46.8772, lng: -96.7898, district: 1 },
  "585": { state: "ND", city: "Bismarck", lat: 46.8083, lng: -100.7837, district: 1 },
  // MT: 590-599
  "591": { state: "MT", city: "Billings", lat: 45.7833, lng: -108.5007, district: 2 },
  "596": { state: "MT", city: "Helena", lat: 46.5958, lng: -112.0270, district: 1 },
  "598": { state: "MT", city: "Missoula", lat: 46.8721, lng: -113.9940, district: 1 },
  // IL: 600-629
  "600": { state: "IL", city: "Arlington Heights", lat: 42.0884, lng: -87.9806, district: 8 },
  "606": { state: "IL", city: "Chicago", lat: 41.8781, lng: -87.6298, district: 7 },
  "616": { state: "IL", city: "Peoria", lat: 40.6936, lng: -89.5890, district: 17 },
  "627": { state: "IL", city: "Springfield", lat: 39.7817, lng: -89.6501, district: 13 },
  "629": { state: "IL", city: "Carbondale", lat: 37.7273, lng: -89.2168, district: 12 },
  // MO: 630-658
  "631": { state: "MO", city: "St. Louis", lat: 38.6270, lng: -90.1994, district: 1 },
  "641": { state: "MO", city: "Kansas City", lat: 39.0997, lng: -94.5786, district: 5 },
  "651": { state: "MO", city: "Jefferson City", lat: 38.5767, lng: -92.1735, district: 3 },
  "658": { state: "MO", city: "Springfield", lat: 37.2090, lng: -93.2923, district: 7 },
  // KS: 660-679
  "661": { state: "KS", city: "Kansas City", lat: 39.1155, lng: -94.6268, district: 3 },
  "666": { state: "KS", city: "Topeka", lat: 39.0558, lng: -95.6890, district: 2 },
  "672": { state: "KS", city: "Wichita", lat: 37.6872, lng: -97.3301, district: 4 },
  "674": { state: "KS", city: "Salina", lat: 38.8403, lng: -97.6114, district: 1 },
  // NE: 680-693
  "681": { state: "NE", city: "Omaha", lat: 41.2565, lng: -95.9345, district: 2 },
  "685": { state: "NE", city: "Lincoln", lat: 40.8136, lng: -96.7026, district: 1 },
  // LA: 700-714
  "701": { state: "LA", city: "New Orleans", lat: 29.9511, lng: -90.0715, district: 2 },
  "704": { state: "LA", city: "Hammond / Metairie", lat: 30.0037, lng: -90.1798, district: 1 },
  "708": { state: "LA", city: "Baton Rouge", lat: 30.4515, lng: -91.1871, district: 6 },
  "711": { state: "LA", city: "Shreveport", lat: 32.5252, lng: -93.7502, district: 4 },
  // AR: 716-729
  "722": { state: "AR", city: "Little Rock", lat: 34.7465, lng: -92.2896, district: 2 },
  "724": { state: "AR", city: "Jonesboro", lat: 35.8423, lng: -90.7043, district: 1 },
  "727": { state: "AR", city: "Fayetteville", lat: 36.0822, lng: -94.1719, district: 3 },
  // OK: 730-749
  "731": { state: "OK", city: "Oklahoma City", lat: 35.4676, lng: -97.5164, district: 5 },
  "741": { state: "OK", city: "Tulsa", lat: 36.1540, lng: -95.9928, district: 1 },
  "744": { state: "OK", city: "Muskogee", lat: 35.7479, lng: -95.3697, district: 2 },
  // TX: 750-799
  "750": { state: "TX", city: "Plano / Dallas Suburbs", lat: 33.0198, lng: -96.6989, district: 24 },
  "752": { state: "TX", city: "Dallas", lat: 32.7767, lng: -96.7970, district: 24 },
  "760": { state: "TX", city: "Arlington / Fort Worth", lat: 32.7357, lng: -97.1081, district: 6 },
  "761": { state: "TX", city: "Fort Worth", lat: 32.7555, lng: -97.3308, district: 12 },
  "769": { state: "TX", city: "San Angelo", lat: 31.4638, lng: -100.4370, district: 11 },
  "770": { state: "TX", city: "Houston", lat: 29.7604, lng: -95.3698, district: 2 },
  "773": { state: "TX", city: "The Woodlands", lat: 30.1658, lng: -95.4613, district: 2 },
  "782": { state: "TX", city: "San Antonio", lat: 29.4241, lng: -98.4936, district: 21 },
  "787": { state: "TX", city: "Austin", lat: 30.2672, lng: -97.7431, district: 21 },
  "791": { state: "TX", city: "Amarillo", lat: 35.2220, lng: -101.8313, district: 13 },
  "799": { state: "TX", city: "El Paso", lat: 31.7619, lng: -106.4850, district: 16 },
  // CO: 800-816
  "802": { state: "CO", city: "Denver", lat: 39.7392, lng: -104.9903, district: 1 },
  "805": { state: "CO", city: "Fort Collins", lat: 40.5853, lng: -105.0844, district: 2 },
  "809": { state: "CO", city: "Colorado Springs", lat: 38.8339, lng: -104.8214, district: 5 },
  "815": { state: "CO", city: "Grand Junction", lat: 39.0639, lng: -108.5506, district: 3 },
  // WY: 820-831
  "820": { state: "WY", city: "Cheyenne", lat: 41.1400, lng: -104.8202, district: 1 },
  "826": { state: "WY", city: "Casper", lat: 42.8666, lng: -106.3131, district: 1 },
  // ID: 832-838
  "832": { state: "ID", city: "Pocatello", lat: 42.8713, lng: -112.4455, district: 2 },
  "837": { state: "ID", city: "Boise", lat: 43.6150, lng: -116.2023, district: 1 },
  "838": { state: "ID", city: "Coeur d'Alene", lat: 47.6777, lng: -116.7805, district: 1 },
  // UT: 840-847
  "840": { state: "UT", city: "West Valley City", lat: 40.6916, lng: -112.0011, district: 4 },
  "841": { state: "UT", city: "Salt Lake City", lat: 40.7608, lng: -111.8910, district: 1 },
  "846": { state: "UT", city: "Provo", lat: 40.2338, lng: -111.6585, district: 3 },
  "847": { state: "UT", city: "St. George", lat: 37.0965, lng: -113.5684, district: 2 },
  // AZ: 850-865
  "850": { state: "AZ", city: "Phoenix", lat: 33.4484, lng: -112.0740, district: 1 },
  "852": { state: "AZ", city: "Mesa / Scottsdale", lat: 33.4152, lng: -111.8315, district: 5 },
  "853": { state: "AZ", city: "Peoria / Glendale", lat: 33.5806, lng: -112.2374, district: 8 },
  "857": { state: "AZ", city: "Tucson", lat: 32.2226, lng: -110.9747, district: 6 },
  "860": { state: "AZ", city: "Flagstaff", lat: 35.1983, lng: -111.6513, district: 2 },
  // NM: 870-884
  "871": { state: "NM", city: "Albuquerque", lat: 35.0844, lng: -106.6504, district: 1 },
  "875": { state: "NM", city: "Santa Fe", lat: 35.6870, lng: -105.9378, district: 3 },
  "880": { state: "NM", city: "Las Cruces", lat: 32.3199, lng: -106.7637, district: 2 },
  // NV: 890-898
  "890": { state: "NV", city: "Henderson", lat: 36.0395, lng: -114.9817, district: 3 },
  "891": { state: "NV", city: "Las Vegas", lat: 36.1699, lng: -115.1398, district: 1 },
  "895": { state: "NV", city: "Reno", lat: 39.5296, lng: -119.8138, district: 2 },
  // CA: 900-961
  "900": { state: "CA", city: "Los Angeles", lat: 34.0522, lng: -118.2437, district: 30 },
  "902": { state: "CA", city: "Beverly Hills / Inglewood", lat: 34.0736, lng: -118.4004, district: 36 },
  "913": { state: "CA", city: "San Fernando Valley", lat: 34.2011, lng: -118.5287, district: 32 },
  "921": { state: "CA", city: "San Diego", lat: 32.7157, lng: -117.1611, district: 50 },
  "925": { state: "CA", city: "Riverside", lat: 33.9806, lng: -117.3755, district: 41 },
  "926": { state: "CA", city: "Irvine / Newport", lat: 33.6846, lng: -117.8265, district: 40 },
  "928": { state: "CA", city: "Anaheim", lat: 33.8366, lng: -117.9143, district: 40 },
  "933": { state: "CA", city: "Bakersfield", lat: 35.3733, lng: -119.0187, district: 20 },
  "937": { state: "CA", city: "Fresno", lat: 36.7468, lng: -119.7726, district: 20 },
  "941": { state: "CA", city: "San Francisco", lat: 37.7749, lng: -122.4194, district: 11 },
  "946": { state: "CA", city: "Oakland", lat: 37.8044, lng: -122.2712, district: 12 },
  "951": { state: "CA", city: "San Jose", lat: 37.3382, lng: -121.8863, district: 17 },
  "958": { state: "CA", city: "Sacramento", lat: 38.5816, lng: -121.4944, district: 6 },
  "960": { state: "CA", city: "Redding", lat: 40.5865, lng: -122.3917, district: 1 },
  // HI: 967-968
  "968": { state: "HI", city: "Honolulu", lat: 21.3069, lng: -157.8583, district: 1 },
  // OR: 970-979
  "972": { state: "OR", city: "Portland", lat: 45.5152, lng: -122.6784, district: 3 },
  "974": { state: "OR", city: "Eugene", lat: 44.0521, lng: -123.0868, district: 4 },
  "977": { state: "OR", city: "Bend", lat: 44.0582, lng: -121.3153, district: 2 },
  // WA: 980-994
  "981": { state: "WA", city: "Seattle", lat: 47.6062, lng: -122.3321, district: 7 },
  "984": { state: "WA", city: "Tacoma", lat: 47.2529, lng: -122.4443, district: 6 },
  "985": { state: "WA", city: "Olympia", lat: 47.0379, lng: -122.9007, district: 10 },
  "989": { state: "WA", city: "Yakima", lat: 46.6021, lng: -120.5059, district: 4 },
  "992": { state: "WA", city: "Spokane", lat: 47.6588, lng: -117.4260, district: 5 },
  // AK: 995-999
  "995": { state: "AK", city: "Anchorage", lat: 61.2181, lng: -149.9003, district: 1 },
  "997": { state: "AK", city: "Fairbanks", lat: 64.8378, lng: -147.7164, district: 1 },
  "998": { state: "AK", city: "Juneau", lat: 58.3019, lng: -134.4197, district: 1 }
};

// General State Ranges for fallback prefix resolution
const STATE_PREFIX_RANGES = [
  { min: 10, max: 27, state: "MA", city: "Boston Area", lat: 42.36, lng: -71.05, district: 1 },
  { min: 28, max: 29, state: "RI", city: "Providence Area", lat: 41.82, lng: -71.41, district: 1 },
  { min: 30, max: 38, state: "NH", city: "Manchester Area", lat: 43.0, lng: -71.5, district: 1 },
  { min: 39, max: 49, state: "ME", city: "Portland Area", lat: 44.0, lng: -69.5, district: 1 },
  { min: 50, max: 59, state: "VT", city: "Montpelier Area", lat: 44.2, lng: -72.6, district: 1 },
  { min: 60, max: 69, state: "CT", city: "Hartford Area", lat: 41.6, lng: -72.7, district: 1 },
  { min: 70, max: 89, state: "NJ", city: "Newark Area", lat: 40.2, lng: -74.5, district: 4 },
  { min: 100, max: 149, state: "NY", city: "New York Area", lat: 42.5, lng: -75.5, district: 12 },
  { min: 150, max: 196, state: "PA", city: "Pennsylvania Region", lat: 40.5, lng: -77.5, district: 10 },
  { min: 197, max: 199, state: "DE", city: "Wilmington Area", lat: 39.3, lng: -75.5, district: 1 },
  { min: 200, max: 205, state: "DC", city: "Washington D.C.", lat: 38.9, lng: -77.0, district: 1 },
  { min: 206, max: 219, state: "MD", city: "Maryland Region", lat: 39.0, lng: -76.8, district: 1 },
  { min: 220, max: 246, state: "VA", city: "Virginia Region", lat: 37.5, lng: -78.5, district: 1 },
  { min: 247, max: 268, state: "WV", city: "West Virginia Region", lat: 38.6, lng: -80.6, district: 2 },
  { min: 270, max: 289, state: "NC", city: "North Carolina Region", lat: 35.5, lng: -79.5, district: 8 },
  { min: 290, max: 299, state: "SC", city: "South Carolina Region", lat: 33.8, lng: -80.9, district: 1 },
  { min: 300, max: 319, state: "GA", city: "Georgia Region", lat: 32.7, lng: -83.5, district: 14 },
  { min: 320, max: 349, state: "FL", city: "Florida Region", lat: 27.8, lng: -81.7, district: 1 },
  { min: 350, max: 369, state: "AL", city: "Alabama Region", lat: 32.8, lng: -86.8, district: 1 },
  { min: 370, max: 385, state: "TN", city: "Tennessee Region", lat: 35.8, lng: -86.3, district: 2 },
  { min: 386, max: 397, state: "MS", city: "Mississippi Region", lat: 32.7, lng: -89.7, district: 4 },
  { min: 400, max: 427, state: "KY", city: "Kentucky Region", lat: 37.8, lng: -85.7, district: 1 },
  { min: 430, max: 459, state: "OH", city: "Ohio Region", lat: 40.3, lng: -82.7, district: 4 },
  { min: 460, max: 479, state: "IN", city: "Indiana Region", lat: 39.8, lng: -86.2, district: 3 },
  { min: 480, max: 499, state: "MI", city: "Michigan Region", lat: 43.3, lng: -84.5, district: 2 },
  { min: 500, max: 528, state: "IA", city: "Iowa Region", lat: 42.0, lng: -93.5, district: 1 },
  { min: 530, max: 549, state: "WI", city: "Wisconsin Region", lat: 44.5, lng: -89.5, district: 1 },
  { min: 550, max: 567, state: "MN", city: "Minnesota Region", lat: 46.0, lng: -94.0, district: 6 },
  { min: 570, max: 577, state: "SD", city: "South Dakota Region", lat: 44.4, lng: -100.2, district: 1 },
  { min: 580, max: 588, state: "ND", city: "North Dakota Region", lat: 47.5, lng: -100.5, district: 1 },
  { min: 590, max: 599, state: "MT", city: "Montana Region", lat: 47.0, lng: -110.0, district: 1 },
  { min: 600, max: 629, state: "IL", city: "Illinois Region", lat: 40.0, lng: -89.0, district: 12 },
  { min: 630, max: 658, state: "MO", city: "Missouri Region", lat: 38.5, lng: -92.5, district: 8 },
  { min: 660, max: 679, state: "KS", city: "Kansas Region", lat: 38.5, lng: -98.0, district: 1 },
  { min: 680, max: 693, state: "NE", city: "Nebraska Region", lat: 41.5, lng: -99.5, district: 1 },
  { min: 700, max: 714, state: "LA", city: "Louisiana Region", lat: 31.0, lng: -92.0, district: 1 },
  { min: 716, max: 729, state: "AR", city: "Arkansas Region", lat: 34.8, lng: -92.2, district: 1 },
  { min: 730, max: 749, state: "OK", city: "Oklahoma Region", lat: 35.5, lng: -97.5, district: 2 },
  { min: 750, max: 799, state: "TX", city: "Texas Region", lat: 31.0, lng: -99.0, district: 2 },
  { min: 800, max: 816, state: "CO", city: "Colorado Region", lat: 39.0, lng: -105.5, district: 3 },
  { min: 820, max: 831, state: "WY", city: "Wyoming Region", lat: 43.0, lng: -107.5, district: 1 },
  { min: 832, max: 838, state: "ID", city: "Idaho Region", lat: 44.5, lng: -114.5, district: 1 },
  { min: 840, max: 847, state: "UT", city: "Utah Region", lat: 39.5, lng: -111.5, district: 1 },
  { min: 850, max: 865, state: "AZ", city: "Arizona Region", lat: 34.0, lng: -111.5, district: 1 },
  { min: 870, max: 884, state: "NM", city: "New Mexico Region", lat: 34.5, lng: -106.0, district: 2 },
  { min: 890, max: 898, state: "NV", city: "Nevada Region", lat: 39.0, lng: -116.5, district: 2 },
  { min: 900, max: 961, state: "CA", city: "California Region", lat: 36.5, lng: -119.5, district: 20 },
  { min: 967, max: 968, state: "HI", city: "Hawaii Region", lat: 21.3, lng: -157.8, district: 1 },
  { min: 970, max: 979, state: "OR", city: "Oregon Region", lat: 44.0, lng: -120.5, district: 2 },
  { min: 980, max: 994, state: "WA", city: "Washington Region", lat: 47.5, lng: -120.5, district: 4 },
  { min: 995, max: 999, state: "AK", city: "Alaska Region", lat: 63.5, lng: -152.0, district: 1 }
];

const STATE_NAMES = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia", FL: "Florida",
  GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana",
  IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine",
  MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island",
  SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
  VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming"
};

/**
 * Resolves a 5-digit US Zip Code to City, State, Lat/Lng coordinates,
 * and attaches House Representative and Senators.
 */
function lookupZipCode(inputZip) {
  if (!inputZip) return { valid: false, error: "Please enter a 5-digit US zip code." };
  
  const cleanZip = String(inputZip).trim().slice(0, 5);
  if (!/^\d{5}$/.test(cleanZip)) {
    return { valid: false, error: "Zip code must be exactly 5 numbers." };
  }

  const prefix3 = cleanZip.substring(0, 3);
  const prefixInt = parseInt(prefix3, 10);
  
  let match = ZIP_PREFIX_MAP[prefix3];

  if (!match) {
    // Fall back to state range search
    const rangeMatch = STATE_PREFIX_RANGES.find(r => prefixInt >= r.min && prefixInt <= r.max);
    if (rangeMatch) {
      match = {
        state: rangeMatch.state,
        city: rangeMatch.city,
        lat: rangeMatch.lat,
        lng: rangeMatch.lng,
        district: rangeMatch.district
      };
    } else {
      // Default fallback
      match = {
        state: "DC",
        city: "Washington",
        lat: 38.9072,
        lng: -77.0369,
        district: 1
      };
    }
  }

  // Slight jitter for map scatter if multiple signers share prefix
  const jitterLat = (parseInt(cleanZip.slice(3, 5), 10) - 50) * 0.005;
  const jitterLng = (parseInt(cleanZip.slice(2, 4), 10) - 50) * 0.005;

  const stateCode = match.state;
  const stateName = STATE_NAMES[stateCode] || stateCode;
  const senators = getSenatorsForState(stateCode);
  const representative = getRepresentativeForLocation(stateCode, match.district);

  return {
    valid: true,
    zip: cleanZip,
    city: match.city,
    state: stateCode,
    stateName: stateName,
    district: match.district,
    lat: Number((match.lat + jitterLat).toFixed(4)),
    lng: Number((match.lng + jitterLng).toFixed(4)),
    senators: senators,
    representative: representative
  };
}
