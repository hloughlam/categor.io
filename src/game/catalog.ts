import type { Category } from './types';

export const LETTERS = 'ABCDEFGHIJKLMNOPRSTW'.split('');

export const CATEGORIES: Category[] = [
  { id: 'animal', label: 'Animals' },
  { id: 'country', label: 'Countries' },
  { id: 'food', label: 'Foods' },
  { id: 'movie', label: 'Movies' },
  { id: 'city', label: 'Cities' },
  { id: 'person', label: 'Famous people' },
  { id: 'sport', label: 'Sports' },
  { id: 'brand', label: 'Brands' },
  { id: 'kitchen', label: 'In the kitchen' },
  { id: 'book', label: 'Books' },
  { id: 'job', label: 'Occupations' },
  { id: 'color', label: 'Colors' },
];

export const WORD_BANK: Record<string, string[]> = {
  animal: [
    'Aardvark', 'Alpaca', 'Antelope', 'Bear', 'Badger', 'Cat', 'Cobra', 'Dolphin',
    'Elephant', 'Eagle', 'Fox', 'Ferret', 'Giraffe', 'Goat', 'Hawk', 'Iguana',
    'Jaguar', 'Koala', 'Lemur', 'Lynx', 'Moose', 'Newt', 'Otter', 'Panda',
    'Parrot', 'Rabbit', 'Raven', 'Seal', 'Tiger', 'Wolf', 'Wombat',
  ],
  country: [
    'Argentina', 'Australia', 'Belgium', 'Brazil', 'Canada', 'Chile', 'Denmark',
    'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'Hungary', 'Iceland',
    'India', 'Japan', 'Kenya', 'Laos', 'Mexico', 'Morocco', 'Norway', 'Peru',
    'Poland', 'Portugal', 'Spain', 'Sweden', 'Thailand', 'Wales',
  ],
  food: [
    'Apple', 'Avocado', 'Bagel', 'Banana', 'Cheddar', 'Curry', 'Dumpling',
    'Eggplant', 'Fajita', 'Fig', 'Gnocchi', 'Grapes', 'Hummus', 'Iceberg',
    'Jalapeno', 'Kale', 'Lasagna', 'Mango', 'Naan', 'Oatmeal', 'Pasta',
    'Peach', 'Ramen', 'Risotto', 'Sushi', 'Taco', 'Waffle',
  ],
  movie: [
    'Amelie', 'Arrival', 'Batman', 'Casablanca', 'Dune', 'Elf', 'Fargo',
    'Frozen', 'Gladiator', 'Heat', 'Inception', 'Jaws', 'Juno', 'Knives Out',
    'Moonlight', 'Network', 'Parasite', 'Psycho', 'Rocky', 'Scream',
    'Titanic', 'Whiplash',
  ],
  city: [
    'Athens', 'Austin', 'Berlin', 'Boston', 'Cairo', 'Chicago', 'Dublin',
    'Edinburgh', 'Florence', 'Geneva', 'Helsinki', 'Istanbul', 'Kyoto',
    'Lisbon', 'Madrid', 'Nairobi', 'Oslo', 'Paris', 'Rome', 'Seoul',
    'Tokyo', 'Vienna', 'Warsaw',
  ],
  person: [
    'Adele', 'Beyonce', 'Bowie', 'Coppola', 'Darwin', 'Einstein', 'Fellini',
    'Gaga', 'Hitchcock', 'Ibsen', 'Jagger', 'Kahlo', 'Lamar', 'Mozart',
    'Neruda', 'Obama', 'Picasso', 'Rihanna', 'Sondheim', 'Thoreau', 'Warhol',
  ],
  sport: [
    'Archery', 'Badminton', 'Baseball', 'Cricket', 'Diving', 'Fencing',
    'Golf', 'Hockey', 'Judo', 'Karate', 'Lacrosse', 'Netball', 'Polo',
    'Rowing', 'Rugby', 'Skiing', 'Tennis', 'Wrestling',
  ],
  brand: [
    'Adidas', 'Apple', 'BMW', 'Canon', 'Dyson', 'Ferrari', 'Google',
    'Honda', 'Ikea', 'Kodak', 'Lego', 'Nike', 'Nintendo', 'Omega',
    'Patagonia', 'Rolex', 'Sony', 'Tesla', 'Uniqlo', 'Volkswagen',
  ],
  kitchen: [
    'Apron', 'Blender', 'Colander', 'Cutting board', 'Fork', 'Grater',
    'Kettle', 'Ladle', 'Mixer', 'Oven', 'Pan', 'Peeler', 'Rolling pin',
    'Spatula', 'Toaster', 'Whisk', 'Wok',
  ],
  book: [
    'Beloved', 'Circe', 'Dracula', 'Dune', 'Emma', 'Frankenstein',
    'Gatsby', 'Hamlet', 'Iliad', 'Jane Eyre', 'Lolita', 'Macbeth',
    'Nineteen Eighty-Four', 'Othello', 'Pride and Prejudice', 'Rebecca',
    'Sula', 'The Stranger', 'Ulysses', 'Wuthering Heights',
  ],
  job: [
    'Actor', 'Architect', 'Baker', 'Chef', 'Dentist', 'Editor', 'Farmer',
    'Florist', 'Gardener', 'Historian', 'Judge', 'Lawyer', 'Musician',
    'Nurse', 'Painter', 'Pilot', 'Reporter', 'Teacher', 'Writer',
  ],
  color: [
    'Amber', 'Azure', 'Burgundy', 'Cerulean', 'Crimson', 'Emerald',
    'Fuchsia', 'Gold', 'Indigo', 'Ivory', 'Jade', 'Lavender', 'Magenta',
    'Navy', 'Ochre', 'Pearl', 'Rose', 'Sapphire', 'Teal', 'Vermilion',
  ],
};

export function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function randomLetter(exclude?: string): string {
  const pool = exclude ? LETTERS.filter((letter) => letter !== exclude) : LETTERS;
  return pool[Math.floor(Math.random() * pool.length)] ?? 'C';
}

export function randomCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  return Array.from({ length: 4 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
