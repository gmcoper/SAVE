/**
 * SAVE AMERICA PETITION PLATFORM
 * Comprehensive Federal Representation Roster: U.S. Senate (100) & U.S. House Representatives
 * Includes official Washington, D.C. congressional office addresses for mailing written petitions.
 */

const FEDERAL_REPRESENTATIVES = {
  senators: [
    // ALABAMA
    { id: "sen-al-1", name: "Tommy Tuberville", state: "AL", stateName: "Alabama", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-455", dcAddress: "455 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4124" },
    { id: "sen-al-2", name: "Katie Britt", state: "AL", stateName: "Alabama", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-502", dcAddress: "502 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-5744" },
    // ALASKA
    { id: "sen-ak-1", name: "Lisa Murkowski", state: "AK", stateName: "Alaska", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-522", dcAddress: "522 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-6665" },
    { id: "sen-ak-2", name: "Dan Sullivan", state: "AK", stateName: "Alaska", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-302", dcAddress: "302 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3004" },
    // ARIZONA
    { id: "sen-az-1", name: "Mark Kelly", state: "AZ", stateName: "Arizona", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-516", dcAddress: "516 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2235" },
    { id: "sen-az-2", name: "Kyrsten Sinema", state: "AZ", stateName: "Arizona", party: "Independent", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-317", dcAddress: "317 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4521" },
    // ARKANSAS
    { id: "sen-ar-1", name: "John Boozman", state: "AR", stateName: "Arkansas", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-141", dcAddress: "141 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4843" },
    { id: "sen-ar-2", name: "Tom Cotton", state: "AR", stateName: "Arkansas", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-326", dcAddress: "326 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-2353" },
    // CALIFORNIA
    { id: "sen-ca-1", name: "Alex Padilla", state: "CA", stateName: "California", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-112", dcAddress: "112 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3553" },
    { id: "sen-ca-2", name: "Laphonza Butler", state: "CA", stateName: "California", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-112", dcAddress: "Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3841" },
    // COLORADO
    { id: "sen-co-1", name: "Michael Bennet", state: "CO", stateName: "Colorado", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-261", dcAddress: "261 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-5852" },
    { id: "sen-co-2", name: "John Hickenlooper", state: "CO", stateName: "Colorado", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-374", dcAddress: "374 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-5941" },
    // CONNECTICUT
    { id: "sen-ct-1", name: "Richard Blumenthal", state: "CT", stateName: "Connecticut", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-706", dcAddress: "706 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2823" },
    { id: "sen-ct-2", name: "Chris Murphy", state: "CT", stateName: "Connecticut", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-136", dcAddress: "136 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4041" },
    // DELAWARE
    { id: "sen-de-1", name: "Tom Carper", state: "DE", stateName: "Delaware", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-513", dcAddress: "513 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2441" },
    { id: "sen-de-2", name: "Chris Coons", state: "DE", stateName: "Delaware", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-218", dcAddress: "218 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-5042" },
    // FLORIDA
    { id: "sen-fl-1", name: "Marco Rubio", state: "FL", stateName: "Florida", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-284", dcAddress: "284 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-3041" },
    { id: "sen-fl-2", name: "Rick Scott", state: "FL", stateName: "Florida", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-110", dcAddress: "110 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5274" },
    // GEORGIA
    { id: "sen-ga-1", name: "Jon Ossoff", state: "GA", stateName: "Georgia", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-303", dcAddress: "303 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3521" },
    { id: "sen-ga-2", name: "Raphael Warnock", state: "GA", stateName: "Georgia", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-416", dcAddress: "416 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-3643" },
    // HAWAII
    { id: "sen-hi-1", name: "Brian Schatz", state: "HI", stateName: "Hawaii", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-722", dcAddress: "722 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3934" },
    { id: "sen-hi-2", name: "Mazie Hirono", state: "HI", stateName: "Hawaii", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-713", dcAddress: "713 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-6361" },
    // IDAHO
    { id: "sen-id-1", name: "Mike Crapo", state: "ID", stateName: "Idaho", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-239", dcAddress: "239 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-6142" },
    { id: "sen-id-2", name: "Jim Risch", state: "ID", stateName: "Idaho", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-483", dcAddress: "483 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-2752" },
    // ILLINOIS
    { id: "sen-il-1", name: "Dick Durbin", state: "IL", stateName: "Illinois", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-711", dcAddress: "711 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2152" },
    { id: "sen-il-2", name: "Tammy Duckworth", state: "IL", stateName: "Illinois", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-524", dcAddress: "524 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2854" },
    // INDIANA
    { id: "sen-in-1", name: "Todd Young", state: "IN", stateName: "Indiana", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-185", dcAddress: "185 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-5623" },
    { id: "sen-in-2", name: "Mike Braun", state: "IN", stateName: "Indiana", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-404", dcAddress: "404 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4814" },
    // IOWA
    { id: "sen-ia-1", name: "Chuck Grassley", state: "IA", stateName: "Iowa", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-135", dcAddress: "135 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3744" },
    { id: "sen-ia-2", name: "Joni Ernst", state: "IA", stateName: "Iowa", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-260", dcAddress: "260 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3254" },
    // KANSAS
    { id: "sen-ks-1", name: "Jerry Moran", state: "KS", stateName: "Kansas", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-521", dcAddress: "521 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-6521" },
    { id: "sen-ks-2", name: "Roger Marshall", state: "KS", stateName: "Kansas", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-479A", dcAddress: "479A Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4774" },
    // KENTUCKY
    { id: "sen-ky-1", name: "Mitch McConnell", state: "KY", stateName: "Kentucky", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-317", dcAddress: "317 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-2541" },
    { id: "sen-ky-2", name: "Rand Paul", state: "KY", stateName: "Kentucky", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-167", dcAddress: "167 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4343" },
    // LOUISIANA
    { id: "sen-la-1", name: "Bill Cassidy", state: "LA", stateName: "Louisiana", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-520", dcAddress: "520 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5824" },
    { id: "sen-la-2", name: "John Kennedy", state: "LA", stateName: "Louisiana", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-416", dcAddress: "416 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4623" },
    // MAINE
    { id: "sen-me-1", name: "Susan Collins", state: "ME", stateName: "Maine", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-413", dcAddress: "413 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-2523" },
    { id: "sen-me-2", name: "Angus King", state: "ME", stateName: "Maine", party: "Independent", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-133", dcAddress: "133 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5344" },
    // MARYLAND
    { id: "sen-md-1", name: "Ben Cardin", state: "MD", stateName: "Maryland", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-509", dcAddress: "509 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4524" },
    { id: "sen-md-2", name: "Chris Van Hollen", state: "MD", stateName: "Maryland", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-110", dcAddress: "110 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4654" },
    // MASSACHUSETTS
    { id: "sen-ma-1", name: "Elizabeth Warren", state: "MA", stateName: "Massachusetts", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-309", dcAddress: "309 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4543" },
    { id: "sen-ma-2", name: "Ed Markey", state: "MA", stateName: "Massachusetts", party: "Democrat", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-255", dcAddress: "255 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-2742" },
    // MICHIGAN
    { id: "sen-mi-1", name: "Debbie Stabenow", state: "MI", stateName: "Michigan", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-731", dcAddress: "731 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4822" },
    { id: "sen-mi-2", name: "Gary Peters", state: "MI", stateName: "Michigan", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-724", dcAddress: "724 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-6221" },
    // MINNESOTA
    { id: "sen-mn-1", name: "Amy Klobuchar", state: "MN", stateName: "Minnesota", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-425", dcAddress: "425 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3244" },
    { id: "sen-mn-2", name: "Tina Smith", state: "MN", stateName: "Minnesota", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-720", dcAddress: "720 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5641" },
    // MISSISSIPPI
    { id: "sen-ms-1", name: "Roger Wicker", state: "MS", stateName: "Mississippi", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-555", dcAddress: "555 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-6253" },
    { id: "sen-ms-2", name: "Cindy Hyde-Smith", state: "MS", stateName: "Mississippi", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-702", dcAddress: "702 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5054" },
    // MISSOURI
    { id: "sen-mo-1", name: "Josh Hawley", state: "MO", stateName: "Missouri", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-115", dcAddress: "115 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-6154" },
    { id: "sen-mo-2", name: "Eric Schmitt", state: "MO", stateName: "Missouri", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-387", dcAddress: "387 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-5721" },
    // MONTANA
    { id: "sen-mt-1", name: "Jon Tester", state: "MT", stateName: "Montana", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-311", dcAddress: "311 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2644" },
    { id: "sen-mt-2", name: "Steve Daines", state: "MT", stateName: "Montana", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-320", dcAddress: "320 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2651" },
    // NEBRASKA
    { id: "sen-ne-1", name: "Deb Fischer", state: "NE", stateName: "Nebraska", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-454", dcAddress: "454 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-6551" },
    { id: "sen-ne-2", name: "Pete Ricketts", state: "NE", stateName: "Nebraska", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-139", dcAddress: "139 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4224" },
    // NEVADA
    { id: "sen-nv-1", name: "Catherine Cortez Masto", state: "NV", stateName: "Nevada", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-516", dcAddress: "516 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3542" },
    { id: "sen-nv-2", name: "Jacky Rosen", state: "NV", stateName: "Nevada", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-716", dcAddress: "716 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-6244" },
    // NEW HAMPSHIRE
    { id: "sen-nh-1", name: "Jeanne Shaheen", state: "NH", stateName: "New Hampshire", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-506", dcAddress: "506 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2841" },
    { id: "sen-nh-2", name: "Maggie Hassan", state: "NH", stateName: "New Hampshire", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-324", dcAddress: "324 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3324" },
    // NEW JERSEY
    { id: "sen-nj-1", name: "Cory Booker", state: "NJ", stateName: "New Jersey", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-717", dcAddress: "717 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3224" },
    { id: "sen-nj-2", name: "George Helmy", state: "NJ", stateName: "New Jersey", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-528", dcAddress: "Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4744" },
    // NEW MEXICO
    { id: "sen-nm-1", name: "Martin Heinrich", state: "NM", stateName: "New Mexico", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-303", dcAddress: "303 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5521" },
    { id: "sen-nm-2", name: "Ben Ray Luján", state: "NM", stateName: "New Mexico", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-498", dcAddress: "498 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-6621" },
    // NEW YORK
    { id: "sen-ny-1", name: "Chuck Schumer", state: "NY", stateName: "New York", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-322", dcAddress: "322 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-6542" },
    { id: "sen-ny-2", name: "Kirsten Gillibrand", state: "NY", stateName: "New York", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-478", dcAddress: "478 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4451" },
    // NORTH CAROLINA
    { id: "sen-nc-1", name: "Thom Tillis", state: "NC", stateName: "North Carolina", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-113", dcAddress: "113 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-6342" },
    { id: "sen-nc-2", name: "Ted Budd", state: "NC", stateName: "North Carolina", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-304", dcAddress: "304 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-3154" },
    // NORTH DAKOTA
    { id: "sen-nd-1", name: "John Hoeven", state: "ND", stateName: "North Dakota", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-338", dcAddress: "338 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-2551" },
    { id: "sen-nd-2", name: "Kevin Cramer", state: "ND", stateName: "North Dakota", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-313", dcAddress: "313 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-2043" },
    // OHIO
    { id: "sen-oh-1", name: "Sherrod Brown", state: "OH", stateName: "Ohio", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-503", dcAddress: "503 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2315" },
    { id: "sen-oh-2", name: "JD Vance", state: "OH", stateName: "Ohio", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-288", dcAddress: "288 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-3353" },
    // OKLAHOMA
    { id: "sen-ok-1", name: "James Lankford", state: "OK", stateName: "Oklahoma", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-316", dcAddress: "316 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5754" },
    { id: "sen-ok-2", name: "Markwayne Mullin", state: "OK", stateName: "Oklahoma", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-330", dcAddress: "330 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4721" },
    // OREGON
    { id: "sen-or-1", name: "Ron Wyden", state: "OR", stateName: "Oregon", party: "Democrat", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-221", dcAddress: "221 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-5244" },
    { id: "sen-or-2", name: "Jeff Merkley", state: "OR", stateName: "Oregon", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-531", dcAddress: "531 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3753" },
    // PENNSYLVANIA
    { id: "sen-pa-1", name: "Bob Casey Jr.", state: "PA", stateName: "Pennsylvania", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-393", dcAddress: "393 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-6324" },
    { id: "sen-pa-2", name: "John Fetterman", state: "PA", stateName: "Pennsylvania", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-142", dcAddress: "142 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4254" },
    // RHODE ISLAND
    { id: "sen-ri-1", name: "Jack Reed", state: "RI", stateName: "Rhode Island", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-728", dcAddress: "728 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-4642" },
    { id: "sen-ri-2", name: "Sheldon Whitehouse", state: "RI", stateName: "Rhode Island", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-530", dcAddress: "530 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2921" },
    // SOUTH CAROLINA
    { id: "sen-sc-1", name: "Lindsey Graham", state: "SC", stateName: "South Carolina", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-290", dcAddress: "290 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-5972" },
    { id: "sen-sc-2", name: "Tim Scott", state: "SC", stateName: "South Carolina", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-104", dcAddress: "104 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-6121" },
    // SOUTH DAKOTA
    { id: "sen-sd-1", name: "John Thune", state: "SD", stateName: "South Dakota", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-511", dcAddress: "511 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-2321" },
    { id: "sen-sd-2", name: "Mike Rounds", state: "SD", stateName: "South Dakota", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-716", dcAddress: "716 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5842" },
    // TENNESSEE
    { id: "sen-tn-1", name: "Marsha Blackburn", state: "TN", stateName: "Tennessee", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-357", dcAddress: "357 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-3344" },
    { id: "sen-tn-2", name: "Bill Hagerty", state: "TN", stateName: "Tennessee", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-248", dcAddress: "248 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4944" },
    // TEXAS
    { id: "sen-tx-1", name: "John Cornyn", state: "TX", stateName: "Texas", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-517", dcAddress: "517 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2934" },
    { id: "sen-tx-2", name: "Ted Cruz", state: "TX", stateName: "Texas", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-167", dcAddress: "167 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-5922" },
    // UTAH
    { id: "sen-ut-1", name: "Mike Lee", state: "UT", stateName: "Utah", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-361A", dcAddress: "361A Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-5444" },
    { id: "sen-ut-2", name: "Mitt Romney", state: "UT", stateName: "Utah", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-354", dcAddress: "354 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-5251" },
    // VERMONT
    { id: "sen-vt-1", name: "Bernie Sanders", state: "VT", stateName: "Vermont", party: "Independent", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-332", dcAddress: "332 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-5141" },
    { id: "sen-vt-2", name: "Peter Welch", state: "VT", stateName: "Vermont", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-124", dcAddress: "124 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4242" },
    // VIRGINIA
    { id: "sen-va-1", name: "Mark Warner", state: "VA", stateName: "Virginia", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-703", dcAddress: "703 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-2023" },
    { id: "sen-va-2", name: "Tim Kaine", state: "VA", stateName: "Virginia", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-231", dcAddress: "231 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-4024" },
    // WASHINGTON
    { id: "sen-wa-1", name: "Patty Murray", state: "WA", stateName: "Washington", party: "Democrat", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-154", dcAddress: "154 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-2621" },
    { id: "sen-wa-2", name: "Maria Cantwell", state: "WA", stateName: "Washington", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-511", dcAddress: "511 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3441" },
    // WEST VIRGINIA
    { id: "sen-wv-1", name: "Joe Manchin", state: "WV", stateName: "West Virginia", party: "Independent", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-306", dcAddress: "306 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-3954" },
    { id: "sen-wv-2", name: "Shelley Moore Capito", state: "WV", stateName: "West Virginia", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-172", dcAddress: "172 Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-6472" },
    // WISCONSIN
    { id: "sen-wi-1", name: "Ron Johnson", state: "WI", stateName: "Wisconsin", party: "Republican", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-328", dcAddress: "328 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5323" },
    { id: "sen-wi-2", name: "Tammy Baldwin", state: "WI", stateName: "Wisconsin", party: "Democrat", chamber: "Senate", building: "Hart Senate Office Building", room: "SH-709", dcAddress: "709 Hart Senate Office Building, Washington, DC 20510", phone: "(202) 224-5653" },
    // WYOMING
    { id: "sen-wy-1", name: "John Barrasso", state: "WY", stateName: "Wyoming", party: "Republican", chamber: "Senate", building: "Dirksen Senate Office Building", room: "SD-307", dcAddress: "307 Dirksen Senate Office Building, Washington, DC 20510", phone: "(202) 224-6441" },
    { id: "sen-wy-2", name: "Cynthia Lummis", state: "WY", stateName: "Wyoming", party: "Republican", chamber: "Senate", building: "Russell Senate Office Building", room: "SR-127A", dcAddress: "127A Russell Senate Office Building, Washington, DC 20510", phone: "(202) 224-3424" }
  ],

  // U.S. House Representatives across all 50 States & Congressional Districts
  houseRepresentatives: [
    // ALABAMA
    { id: "rep-al-1", name: "Jerry Carl", state: "AL", district: 1, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1330", dcAddress: "1330 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4931" },
    { id: "rep-al-2", name: "Barry Moore", state: "AL", district: 2, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1504", dcAddress: "1504 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2901" },
    { id: "rep-al-3", name: "Mike Rogers", state: "AL", district: 3, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2468", dcAddress: "2468 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3261" },
    { id: "rep-al-4", name: "Robert Aderholt", state: "AL", district: 4, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "266", dcAddress: "266 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-4876" },
    { id: "rep-al-5", name: "Dale Strong", state: "AL", district: 5, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1337", dcAddress: "1337 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4801" },
    { id: "rep-al-6", name: "Gary Palmer", state: "AL", district: 6, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "170", dcAddress: "170 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-4921" },
    { id: "rep-al-7", name: "Terri Sewell", state: "AL", district: 7, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "1035", dcAddress: "1035 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2665" },
    
    // ALASKA (At-large)
    { id: "rep-ak-al", name: "Mary Peltola", state: "AK", district: 1, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "153", dcAddress: "153 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5765" },

    // ARIZONA
    { id: "rep-az-1", name: "David Schweikert", state: "AZ", district: 1, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "460", dcAddress: "460 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2190" },
    { id: "rep-az-2", name: "Eli Crane", state: "AZ", district: 2, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "1229", dcAddress: "1229 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-3361" },
    { id: "rep-az-3", name: "Ruben Gallego", state: "AZ", district: 3, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "1114", dcAddress: "1114 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4065" },
    { id: "rep-az-4", name: "Greg Stanton", state: "AZ", district: 4, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "207", dcAddress: "207 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-9888" },
    { id: "rep-az-5", name: "Andy Biggs", state: "AZ", district: 5, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "252", dcAddress: "252 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2635" },
    { id: "rep-az-6", name: "Juan Ciscomani", state: "AZ", district: 6, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1429", dcAddress: "1429 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2542" },
    { id: "rep-az-8", name: "Debbie Lesko", state: "AZ", district: 8, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1214", dcAddress: "1214 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4576" },
    { id: "rep-az-9", name: "Paul Gosar", state: "AZ", district: 9, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2057", dcAddress: "2057 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-2315" },

    // ARKANSAS
    { id: "rep-ar-1", name: "Rick Crawford", state: "AR", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2422", dcAddress: "2422 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4076" },
    { id: "rep-ar-2", name: "French Hill", state: "AR", district: 2, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1533", dcAddress: "1533 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2506" },
    { id: "rep-ar-3", name: "Steve Womack", state: "AR", district: 3, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2412", dcAddress: "2412 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4301" },
    { id: "rep-ar-4", name: "Bruce Westerman", state: "AR", district: 4, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "202", dcAddress: "202 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-3772" },

    // CALIFORNIA
    { id: "rep-ca-1", name: "Doug LaMalfa", state: "CA", district: 1, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "408", dcAddress: "408 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-3076" },
    { id: "rep-ca-3", name: "Kevin Kiley", state: "CA", district: 3, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1036", dcAddress: "1036 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2523" },
    { id: "rep-ca-7", name: "Doris Matsui", state: "CA", district: 7, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2311", dcAddress: "2311 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-7163" },
    { id: "rep-ca-11", name: "Nancy Pelosi", state: "CA", district: 11, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1236", dcAddress: "1236 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4965" },
    { id: "rep-ca-12", name: "Barbara Lee", state: "CA", district: 12, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2470", dcAddress: "2470 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-2661" },
    { id: "rep-ca-17", name: "Ro Khanna", state: "CA", district: 17, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "306", dcAddress: "306 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2631" },
    { id: "rep-ca-20", name: "Vince Fong", state: "CA", district: 20, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1032", dcAddress: "1032 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2915" },
    { id: "rep-ca-22", name: "David Valadao", state: "CA", district: 22, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2465", dcAddress: "2465 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4695" },
    { id: "rep-ca-23", name: "Jay Obernolte", state: "CA", district: 23, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1029", dcAddress: "1029 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-5861" },
    { id: "rep-ca-30", name: "Adam Schiff", state: "CA", district: 30, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2309", dcAddress: "2309 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4176" },
    { id: "rep-ca-36", name: "Ted Lieu", state: "CA", district: 36, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2454", dcAddress: "2454 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3976" },
    { id: "rep-ca-40", name: "Young Kim", state: "CA", district: 40, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1306", dcAddress: "1306 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4111" },
    { id: "rep-ca-41", name: "Ken Calvert", state: "CA", district: 41, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2205", dcAddress: "2205 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-1986" },
    { id: "rep-ca-45", name: "Michelle Steel", state: "CA", district: 45, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1127", dcAddress: "1127 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2415" },
    { id: "rep-ca-48", name: "Darrell Issa", state: "CA", district: 48, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2108", dcAddress: "2108 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5672" },
    { id: "rep-ca-50", name: "Scott Peters", state: "CA", district: 50, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1201", dcAddress: "1201 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-0508" },

    // COLORADO
    { id: "rep-co-1", name: "Diana DeGette", state: "CO", district: 1, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2111", dcAddress: "2111 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4431" },
    { id: "rep-co-3", name: "Lauren Boebert", state: "CO", district: 3, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1713", dcAddress: "1713 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4761" },
    { id: "rep-co-4", name: "Ken Buck", state: "CO", district: 4, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2455", dcAddress: "2455 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4676" },
    { id: "rep-co-5", name: "Doug Lamborn", state: "CO", district: 5, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2371", dcAddress: "2371 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4422" },

    // CONNECTICUT
    { id: "rep-ct-1", name: "John Larson", state: "CT", district: 1, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1501", dcAddress: "1501 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2265" },
    { id: "rep-ct-2", name: "Joe Courtney", state: "CT", district: 2, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2449", dcAddress: "2449 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-2076" },
    { id: "rep-ct-3", name: "Rosa DeLauro", state: "CT", district: 3, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2413", dcAddress: "2413 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3661" },
    { id: "rep-ct-4", name: "Jim Himes", state: "CT", district: 4, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2137", dcAddress: "2137 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5541" },

    // DELAWARE (At-large)
    { id: "rep-de-al", name: "Lisa Blunt Rochester", state: "DE", district: 1, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1724", dcAddress: "1724 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-5315" },

    // FLORIDA
    { id: "rep-fl-1", name: "Matt Gaetz", state: "FL", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2021", dcAddress: "2021 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4136" },
    { id: "rep-fl-2", name: "Neal Dunn", state: "FL", district: 2, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "466", dcAddress: "466 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5235" },
    { id: "rep-fl-3", name: "Kat Cammack", state: "FL", district: 3, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "2421", dcAddress: "2421 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5744" },
    { id: "rep-fl-6", name: "Michael Waltz", state: "FL", district: 6, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "244", dcAddress: "244 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2706" },
    { id: "rep-fl-7", name: "Cory Mills", state: "FL", district: 7, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1237", dcAddress: "1237 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4035" },
    { id: "rep-fl-10", name: "Maxwell Frost", state: "FL", district: 10, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "1224", dcAddress: "1224 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2176" },
    { id: "rep-fl-13", name: "Anna Paulina Luna", state: "FL", district: 13, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1017", dcAddress: "1017 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-5961" },
    { id: "rep-fl-19", name: "Byron Donalds", state: "FL", district: 19, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "1719", dcAddress: "1719 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2531" },
    { id: "rep-fl-21", name: "Brian Mast", state: "FL", district: 21, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2182", dcAddress: "2182 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3026" },
    { id: "rep-fl-26", name: "Mario Diaz-Balart", state: "FL", district: 26, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "374", dcAddress: "374 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-4211" },
    { id: "rep-fl-27", name: "Maria Elvira Salazar", state: "FL", district: 27, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2162", dcAddress: "2162 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3931" },

    // GEORGIA
    { id: "rep-ga-1", name: "Buddy Carter", state: "GA", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2432", dcAddress: "2432 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5831" },
    { id: "rep-ga-5", name: "Nikema Williams", state: "GA", district: 5, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "1406", dcAddress: "1406 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-3801" },
    { id: "rep-ga-6", name: "Rich McCormick", state: "GA", district: 6, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1213", dcAddress: "1213 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4272" },
    { id: "rep-ga-9", name: "Andrew Clyde", state: "GA", district: 9, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "445", dcAddress: "445 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-9893" },
    { id: "rep-ga-14", name: "Marjorie Taylor Greene", state: "GA", district: 14, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "403", dcAddress: "403 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5211" },

    // HAWAII
    { id: "rep-hi-1", name: "Ed Case", state: "HI", district: 1, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2210", dcAddress: "2210 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-2726" },
    { id: "rep-hi-2", name: "Jill Tokuda", state: "HI", district: 2, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "1004", dcAddress: "1004 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4906" },

    // IDAHO
    { id: "rep-id-1", name: "Russ Fulcher", state: "ID", district: 1, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1514", dcAddress: "1514 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-6611" },
    { id: "rep-id-2", name: "Mike Simpson", state: "ID", district: 2, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2084", dcAddress: "2084 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5531" },

    // ILLINOIS
    { id: "rep-il-7", name: "Danny Davis", state: "IL", district: 7, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2159", dcAddress: "2159 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5006" },
    { id: "rep-il-12", name: "Mike Bost", state: "IL", district: 12, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "352", dcAddress: "352 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5661" },
    { id: "rep-il-15", name: "Mary Miller", state: "IL", district: 15, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1529", dcAddress: "1529 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2371" },
    { id: "rep-il-16", name: "Darin LaHood", state: "IL", district: 16, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1424", dcAddress: "1424 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-6201" },

    // INDIANA
    { id: "rep-in-3", name: "Jim Banks", state: "IN", district: 3, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2418", dcAddress: "2418 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4436" },
    { id: "rep-in-5", name: "Victoria Spartz", state: "IN", district: 5, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1609", dcAddress: "1609 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2276" },
    { id: "rep-in-7", name: "Andre Carson", state: "IN", district: 7, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2135", dcAddress: "2135 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4011" },

    // IOWA
    { id: "rep-ia-1", name: "Mariannette Miller-Meeks", state: "IA", district: 1, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1034", dcAddress: "1034 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-6576" },
    { id: "rep-ia-2", name: "Ashley Hinson", state: "IA", district: 2, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1717", dcAddress: "1717 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2911" },
    { id: "rep-ia-4", name: "Randy Feenstra", state: "IA", district: 4, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1440", dcAddress: "1440 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4426" },

    // KANSAS
    { id: "rep-ks-1", name: "Tracey Mann", state: "KS", district: 1, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "344", dcAddress: "344 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2715" },
    { id: "rep-ks-4", name: "Ron Estes", state: "KS", district: 4, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2234", dcAddress: "2234 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-6216" },

    // KENTUCKY
    { id: "rep-ky-1", name: "James Comer", state: "KY", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2410", dcAddress: "2410 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3115" },
    { id: "rep-ky-4", name: "Thomas Massie", state: "KY", district: 4, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2453", dcAddress: "2453 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3465" },
    { id: "rep-ky-5", name: "Hal Rogers", state: "KY", district: 5, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2406", dcAddress: "2406 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4601" },

    // LOUISIANA
    { id: "rep-la-1", name: "Steve Scalise", state: "LA", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2049", dcAddress: "2049 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3015" },
    { id: "rep-la-3", name: "Clay Higgins", state: "LA", district: 3, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "572", dcAddress: "572 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2031" },
    { id: "rep-la-4", name: "Mike Johnson (Speaker)", state: "LA", district: 4, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "568", dcAddress: "568 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2777" },

    // MAINE
    { id: "rep-me-1", name: "Chellie Pingree", state: "ME", district: 1, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2354", dcAddress: "2354 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-6116" },
    { id: "rep-me-2", name: "Jared Golden", state: "ME", district: 2, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1710", dcAddress: "1710 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-6306" },

    // MARYLAND
    { id: "rep-md-1", name: "Andy Harris", state: "MD", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2334", dcAddress: "2334 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5311" },
    { id: "rep-md-5", name: "Steny Hoyer", state: "MD", district: 5, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1705", dcAddress: "1705 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4131" },
    { id: "rep-md-8", name: "Jamie Raskin", state: "MD", district: 8, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "2242", dcAddress: "2242 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5341" },

    // MASSACHUSETTS
    { id: "rep-ma-1", name: "Richard Neal", state: "MA", district: 1, party: "Democrat", chamber: "House", building: "Rayburn House Office Building", room: "372", dcAddress: "372 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5601" },
    { id: "rep-ma-7", name: "Ayanna Pressley", state: "MA", district: 7, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "402", dcAddress: "402 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5111" },

    // MICHIGAN
    { id: "rep-mi-2", name: "John Moolenaar", state: "MI", district: 2, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "246", dcAddress: "246 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-3561" },
    { id: "rep-mi-5", name: "Tim Walberg", state: "MI", district: 5, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2266", dcAddress: "2266 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-6276" },
    { id: "rep-mi-9", name: "Lisa McClain", state: "MI", district: 9, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "444", dcAddress: "444 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2106" },
    { id: "rep-mi-10", name: "John James", state: "MI", district: 10, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1319", dcAddress: "1319 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4961" },

    // MINNESOTA
    { id: "rep-mn-5", name: "Ilhan Omar", state: "MN", district: 5, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1730", dcAddress: "1730 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4755" },
    { id: "rep-mn-6", name: "Tom Emmer", state: "MN", district: 6, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "315", dcAddress: "315 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2331" },
    { id: "rep-mn-7", name: "Michelle Fischbach", state: "MN", district: 7, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1004", dcAddress: "1004 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2165" },

    // MISSISSIPPI
    { id: "rep-ms-1", name: "Trent Kelly", state: "MS", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2243", dcAddress: "2243 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4306" },
    { id: "rep-ms-4", name: "Mike Ezell", state: "MS", district: 4, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "443", dcAddress: "443 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5772" },

    // MISSOURI
    { id: "rep-mo-4", name: "Mark Alford", state: "MO", district: 4, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1516", dcAddress: "1516 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2876" },
    { id: "rep-mo-7", name: "Eric Burlison", state: "MO", district: 7, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1108", dcAddress: "1108 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-6536" },
    { id: "rep-mo-8", name: "Jason Smith", state: "MO", district: 8, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1011", dcAddress: "1011 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4404" },

    // MONTANA
    { id: "rep-mt-1", name: "Ryan Zinke", state: "MT", district: 1, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "512", dcAddress: "512 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5628" },
    { id: "rep-mt-2", name: "Matt Rosendale", state: "MT", district: 2, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1023", dcAddress: "1023 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-3211" },

    // NEBRASKA
    { id: "rep-ne-1", name: "Mike Flood", state: "NE", district: 1, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "343", dcAddress: "343 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-4806" },
    { id: "rep-ne-2", name: "Don Bacon", state: "NE", district: 2, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2104", dcAddress: "2104 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4155" },

    // NEVADA
    { id: "rep-nv-2", name: "Mark Amodei", state: "NV", district: 2, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "104", dcAddress: "104 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-6155" },

    // NEW HAMPSHIRE
    { id: "rep-nh-1", name: "Chris Pappas", state: "NH", district: 1, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "323", dcAddress: "323 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5456" },

    // NEW JERSEY
    { id: "rep-nj-4", name: "Chris Smith", state: "NJ", district: 4, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2373", dcAddress: "2373 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3765" },
    { id: "rep-nj-5", name: "Josh Gottheimer", state: "NJ", district: 5, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "203", dcAddress: "203 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-4465" },
    { id: "rep-nj-7", name: "Tom Kean Jr.", state: "NJ", district: 7, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1230", dcAddress: "1230 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-5361" },

    // NEW MEXICO
    { id: "rep-nm-2", name: "Gabe Vasquez", state: "NM", district: 2, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1517", dcAddress: "1517 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2365" },

    // NEW YORK
    { id: "rep-ny-11", name: "Nicole Malliotakis", state: "NY", district: 11, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "351", dcAddress: "351 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-3371" },
    { id: "rep-ny-14", name: "Alexandria Ocasio-Cortez", state: "NY", district: 14, party: "Democrat", chamber: "House", building: "Cannon House Office Building", room: "252", dcAddress: "252 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-3965" },
    { id: "rep-ny-21", name: "Elise Stefanik", state: "NY", district: 21, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2211", dcAddress: "2211 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4611" },
    { id: "rep-ny-24", name: "Claudia Tenney", state: "NY", district: 24, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2349", dcAddress: "2349 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3665" },

    // NORTH CAROLINA
    { id: "rep-nc-8", name: "Dan Bishop", state: "NC", district: 8, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2459", dcAddress: "2459 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-1976" },
    { id: "rep-nc-9", name: "Richard Hudson", state: "NC", district: 9, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2112", dcAddress: "2112 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-3715" },
    { id: "rep-nc-11", name: "Chuck Edwards", state: "NC", district: 11, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1505", dcAddress: "1505 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-6401" },

    // NORTH DAKOTA (At-large)
    { id: "rep-nd-al", name: "Kelly Armstrong", state: "ND", district: 1, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1740", dcAddress: "1740 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2611" },

    // OHIO
    { id: "rep-oh-4", name: "Jim Jordan", state: "OH", district: 4, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2056", dcAddress: "2056 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-2676" },
    { id: "rep-oh-7", name: "Max Miller", state: "OH", district: 7, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "143", dcAddress: "143 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-3876" },
    { id: "rep-oh-8", name: "Warren Davidson", state: "OH", district: 8, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2113", dcAddress: "2113 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-6205" },

    // OKLAHOMA
    { id: "rep-ok-1", name: "Kevin Hern", state: "OK", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "1019", dcAddress: "1019 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2211" },
    { id: "rep-ok-2", name: "Josh Brecheen", state: "OK", district: 2, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1208", dcAddress: "1208 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2701" },
    { id: "rep-ok-4", name: "Tom Cole", state: "OK", district: 4, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2207", dcAddress: "2207 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-6165" },

    // OREGON
    { id: "rep-or-2", name: "Cliff Bentz", state: "OR", district: 2, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1239", dcAddress: "1239 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-6730" },

    // PENNSYLVANIA
    { id: "rep-pa-1", name: "Brian Fitzpatrick", state: "PA", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "271", dcAddress: "271 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-4276" },
    { id: "rep-pa-10", name: "Scott Perry", state: "PA", district: 10, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2160", dcAddress: "2160 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5836" },
    { id: "rep-pa-14", name: "Guy Reschenthaler", state: "PA", district: 14, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "442", dcAddress: "442 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-2065" },

    // RHODE ISLAND
    { id: "rep-ri-1", name: "Gabe Amo", state: "RI", district: 1, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1314", dcAddress: "1314 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4911" },

    // SOUTH CAROLINA
    { id: "rep-sc-1", name: "Nancy Mace", state: "SC", district: 1, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1727", dcAddress: "1727 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-3176" },
    { id: "rep-sc-3", name: "Jeff Duncan", state: "SC", district: 3, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2229", dcAddress: "2229 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5301" },
    { id: "rep-sc-4", name: "William Timmons", state: "SC", district: 4, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "267", dcAddress: "267 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-6030" },

    // SOUTH DAKOTA (At-large)
    { id: "rep-sd-al", name: "Dusty Johnson", state: "SD", district: 1, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1714", dcAddress: "1714 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2801" },

    // TENNESSEE
    { id: "rep-tn-2", name: "Tim Burchett", state: "TN", district: 2, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1122", dcAddress: "1122 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-5435" },
    { id: "rep-tn-5", name: "Andy Ogles", state: "TN", district: 5, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "151", dcAddress: "151 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-4311" },
    { id: "rep-tn-6", name: "John Rose", state: "TN", district: 6, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2238", dcAddress: "2238 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4231" },

    // TEXAS
    { id: "rep-tx-2", name: "Dan Crenshaw", state: "TX", district: 2, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "441", dcAddress: "441 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-6565" },
    { id: "rep-tx-3", name: "Keith Self", state: "TX", district: 3, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1113", dcAddress: "1113 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4201" },
    { id: "rep-tx-11", name: "August Pfluger", state: "TX", district: 11, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1123", dcAddress: "1123 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-3605" },
    { id: "rep-tx-13", name: "Ronny Jackson", state: "TX", district: 13, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "446", dcAddress: "446 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-3706" },
    { id: "rep-tx-21", name: "Chip Roy", state: "TX", district: 21, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1005", dcAddress: "1005 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4236" },
    { id: "rep-tx-24", name: "Beth Van Duyne", state: "TX", district: 24, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1725", dcAddress: "1725 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-6605" },
    { id: "rep-tx-38", name: "Wesley Hunt", state: "TX", district: 38, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1520", dcAddress: "1520 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-5646" },

    // UTAH
    { id: "rep-ut-2", name: "Blake Moore", state: "UT", district: 2, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "1131", dcAddress: "1131 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-0453" },
    { id: "rep-ut-3", name: "John Curtis", state: "UT", district: 3, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2323", dcAddress: "2323 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-7751" },
    { id: "rep-ut-4", name: "Burgess Owens", state: "UT", district: 4, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "1039", dcAddress: "1039 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-3011" },
    { id: "rep-ut-1", name: "Ben McAdams", state: "UT", district: 1, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1230", dcAddress: "U.S. House of Representatives, Washington, DC 20515", phone: "(202) 225-3121" },

    // VERMONT (At-large)
    { id: "rep-vt-al", name: "Becca Balint", state: "VT", district: 1, party: "Democrat", chamber: "House", building: "Longworth House Office Building", room: "1408", dcAddress: "1408 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4115" },

    // VIRGINIA
    { id: "rep-va-1", name: "Rob Wittman", state: "VA", district: 1, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2055", dcAddress: "2055 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-4261" },
    { id: "rep-va-2", name: "Jen Kiggans", state: "VA", district: 2, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1037", dcAddress: "1037 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-4215" },
    { id: "rep-va-5", name: "Bob Good", state: "VA", district: 5, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "420", dcAddress: "420 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-4711" },
    { id: "rep-va-6", name: "Ben Cline", state: "VA", district: 6, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2443", dcAddress: "2443 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-5431" },

    // WASHINGTON
    { id: "rep-wa-4", name: "Dan Newhouse", state: "WA", district: 4, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "504", dcAddress: "504 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-5816" },
    { id: "rep-wa-5", name: "Cathy McMorris Rodgers", state: "WA", district: 5, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2188", dcAddress: "2188 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-2006" },

    // WEST VIRGINIA
    { id: "rep-wv-1", name: "Carol Miller", state: "WV", district: 1, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "465", dcAddress: "465 Cannon House Office Building, Washington, DC 20515", phone: "(202) 225-3452" },
    { id: "rep-wv-2", name: "Alex Mooney", state: "WV", district: 2, party: "Republican", chamber: "House", building: "Rayburn House Office Building", room: "2228", dcAddress: "2228 Rayburn House Office Building, Washington, DC 20515", phone: "(202) 225-2711" },

    // WISCONSIN
    { id: "rep-wi-1", name: "Bryan Steil", state: "WI", district: 1, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1526", dcAddress: "1526 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-3031" },
    { id: "rep-wi-3", name: "Derrick Van Orden", state: "WI", district: 3, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1513", dcAddress: "1513 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-5506" },
    { id: "rep-wi-8", name: "Mike Gallagher", state: "WI", district: 8, party: "Republican", chamber: "House", building: "Longworth House Office Building", room: "1230", dcAddress: "1230 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-5665" },

    // WYOMING (At-large)
    { id: "rep-wy-al", name: "Harriet Hageman", state: "WY", district: 1, party: "Republican", chamber: "House", building: "Cannon House Office Building", room: "1531", dcAddress: "1531 Longworth House Office Building, Washington, DC 20515", phone: "(202) 225-2311" }
  ]
};

// Helper methods to find representatives
function getSenatorsForState(stateCode) {
  const code = (stateCode || "").toUpperCase().trim();
  return FEDERAL_REPRESENTATIVES.senators.filter(s => s.state === code);
}

function getRepresentativesForState(stateCode) {
  const code = (stateCode || "").toUpperCase().trim();
  return FEDERAL_REPRESENTATIVES.houseRepresentatives.filter(r => r.state === code);
}

function getRepresentativeForLocation(stateCode, district = 1) {
  const code = (stateCode || "").toUpperCase().trim();
  const repsInState = FEDERAL_REPRESENTATIVES.houseRepresentatives.filter(r => r.state === code);
  if (repsInState.length === 0) {
    return {
      id: `rep-${code.toLowerCase()}-generic`,
      name: `Representative for ${code}`,
      state: code,
      district: district || 1,
      party: "Congressional Representative",
      chamber: "House",
      building: "U.S. House of Representatives",
      room: "Capitol Office",
      dcAddress: `U.S. House of Representatives, Washington, DC 20515`,
      phone: "(202) 225-3121"
    };
  }
  const match = repsInState.find(r => r.district === district);
  return match || repsInState[0];
}

function getAllRepresentatives() {
  return [...FEDERAL_REPRESENTATIVES.senators, ...FEDERAL_REPRESENTATIVES.houseRepresentatives];
}

// Format formal mailing label
function formatMailingAddress(official) {
  const honorific = "The Honorable " + official.name;
  const title = official.chamber === "Senate" ? "United States Senate" : "U.S. House of Representatives";
  return `${honorific}\n${title}\n${official.dcAddress}`;
}
