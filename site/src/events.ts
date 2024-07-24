type User = {
    id: number;
  name: string;
  role: string;
  photo: string;
  isFriend: boolean;
  isVIP: boolean;
  username: string;
  friends: number;
  groups: number;
};

type Event = {
    price: number; // in cents
    startDate: Date,
    endDate: Date,
    attendees: User[];
    distance: number; // float
    views: number; // int
    hosts: User[];
    name: string;
    description: string;
    image: string; // URL for event image
    ticketsLeft: number;
};



function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Faythe", "Grace", "Heidi", "Ivan", "Judy"];
const eventNames = [
    "Tech Conference",
    "Music Festival",
    "Art Exhibition",
    "Food Fair",
    "Startup Pitch",
    "Science Workshop",
    "Hackathon",
    "Gaming Tournament",
    "Book Fair",
    "Health Seminar",
];
const flyers = ['https://firebasestorage.googleapis.com/v0/b/poppindatabase/o/images%2Fparty%2F5C8534DA-F867-4097-AD2B-155219D9ADEB%2Fflyer%2Flarge.jpg?alt=media&token=fb69881a-344c-4d8d-b58b-6826442128a9', 'https://firebasestorage.googleapis.com/v0/b/poppindatabase/o/images%2Fparty%2FA2392719-6315-4376-95DC-89BAD76AA334%2Fflyer%2Flarge.jpg?alt=media&token=71a8f20f-e59e-43fa-b88e-7d3eb5157716', 'https://firebasestorage.googleapis.com/v0/b/poppindatabase/o/images%2Fparty%2FC3D16BDE-A945-4719-ABA2-68E449EDBCCF%2Fflyer%2Flarge.jpg?alt=media&token=31e43adf-13cf-44a3-a239-5bb547c5377f', 'https://firebasestorage.googleapis.com/v0/b/poppindatabase/o/images%2Fparty%2FFD3A1673-1BE2-43C4-BBBB-E7B2BBEC548F%2Fflyer%2Flarge.jpg?alt=media&token=32095b5d-e211-4cfd-bb96-481020cfeb12']
const roles = ["Guest", "Host"]
const bools = [true, false]
const aspectRatios = ["4:3", "16:9", "9:16"];
const descriptions = ['Join us every Thursday for College Night @ Parkside Sports Bar. Main Room: DJ DM spinning Club Hits Early Arrival Highly Suggested. This is an 18+ Event 21+ to Sip Free Guestlist till 11pm. Redeem Free Entry Below Address: 330 G St., Davis', 'Halloween 🎃 is 4 1/2 Months Away But it’s never 2 early In LA WE GOT YOU COVERED 🫶🏾 Hollywood Hills 6 bedroom mansion , Pool and jacuzzi overlooking LA ALL ATTENDEES MUST WEAR A ONESIE 🥳 - DJ playing House / Hip hop / Rock - Drink tickets 🎟️ given at the door * Max two so don’t lose them * for girls only (sorry guys) - party Games from Twister , Tequila Simon Says , piñata 🪅 and many more - On site security so door will Be strict plz rsvp This Event will go From 9-11 at Night After two party busses will take us from the mansion 2 the club ( This is only for the first 40 girls) ALL GUYS MUST PAY 30.00 FEE FOR THIS SERVICE And The Party Continues At Warwick LA RSVP LIST PRIORITIZE FOR CLUB GUESTLIST.', 'POPPIN TEST POPPIN TEST POPPIN TEST!!!!'];


function generateUser(seed: number, id: number): User {

    const name = getRandomElement(names);
    return {
        id: id,
        name: name,
        photo: `https://picsum.photos/seed/${seed}/200`,
        role: getRandomElement(roles),
        isFriend: getRandomElement(bools),
        isVIP: getRandomElement(bools),
        username: name,
        friends: getRandomInt(1, 100),
        groups: getRandomInt(0, 5)

    };
}

export function generateRandomUsers(): User[] {
    const users: User[] = [];
    for (let i = 0; i < 20; i++) {
        users.push(generateUser(i + 1, i + 1));
    }
    return users;
}


export function generateEvent(seed: number): Event {
    const attendeesCount = getRandomInt(5, 10);
    const attendees: User[] = Array.from({ length: attendeesCount }, (_, i) => {
        const user = generateUser(seed + i + 1, i);
        if (i < 2) {
            user.role = "Host";
        }
        else {
            user.role = "Guest"
        }
        return user;
    });
    const aspectRatio = getRandomElement(aspectRatios);
    const [width, height] = aspectRatio.split(":").map(Number);
    const imageWidth = getRandomInt(400, 800);
    const imageHeight = Math.floor((imageWidth / width) * height);
    const startDate = new Date();
    startDate.setHours(22, 0, 0, 0);
    startDate.setDate(startDate.getDate() + getRandomInt(1, 30));
    const endDate = new Date();
    endDate.setHours(22, 0, 0, 0);
    endDate.setDate(startDate.getDate() + getRandomInt(1, 30));

    return {
        price: 0,
        startDate: startDate,
        endDate: new Date(endDate.setHours(startDate.getHours() + 4)),
        attendees: attendees,
        distance: getRandomFloat(1, 100),
        views: getRandomInt(0, 1000),
        hosts: attendees.filter(user => user.role === "Host"),
        name: getRandomElement(eventNames),
        //image: `https://picsum.photos/seed/event${seed}/${imageWidth}/${imageHeight}`,
        image: getRandomElement(flyers),
        description: getRandomElement(descriptions),
        ticketsLeft: getRandomInt(1, 100)
    };
}

// const events: Event[] = Array.from({ length: 10 }, (_, i) => generateEvent(i + 1));

export async function generateEvents(n: number): Promise<Event[]> {
    // resolve after 0.5s
    return new Promise((resolve) => {
        setTimeout(() => {
            const events: Event[] = Array.from({ length: n }, (_, i) => generateEvent(i + 1));
            resolve(events);
        }, 500);
    });
}

export default Event;