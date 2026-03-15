export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  poster: string;
  backdrop?: string;
  description?: string;
  director?: string;
  cast?: { name: string; image: string }[];
  type: 'movie' | 'series' | 'anime';
  seasons?: {
    number: number;
    name: string;
    episodes: { number: number; title: string; thumbnail: string }[];
  }[];
  // Download servers - multiple servers with multiple links each
  downloadServers?: {
    [serverName: string]: DownloadLink[];
  };
}

export interface DownloadLink {
  name: string;
  size: string;
  resolution: string;
  link: string;
}

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Race',
    year: 2025,
    rating: 7.2,
    duration: '97 min',
    genres: ['Action', 'Adventure', 'Thriller'],
    poster: 'https://picsum.photos/seed/race/300/450',
    backdrop: 'https://picsum.photos/seed/raceback/800/450',
    description: 'A high-octane racing movie featuring intense car chases through city streets. Two rival racers compete in an underground racing circuit that tests their skills and courage. The story follows a young street racer who must overcome personal demons and face off against the reigning champion in a deadly competition.',
    director: 'John Smith',
    cast: [
      { name: 'Cristina Stefania', image: 'https://picsum.photos/seed/cast1/100/100' },
      { name: 'Codin Maticiuc', image: 'https://picsum.photos/seed/cast2/100/100' },
      { name: 'Denis Hanganu', image: 'https://picsum.photos/seed/cast3/100/100' },
    ],
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2 GB', resolution: '1080p', link: '#' },
        { name: 'Megaup', size: '3 GB', resolution: '1080p', link: '#' },
      ],
      'Server 2': [
        { name: 'Yoteshin', size: '1.5 GB', resolution: '720p', link: '#' },
        { name: 'Megaup', size: '2 GB', resolution: '720p', link: '#' },
      ],
      'Server 3': [
        { name: 'Yoteshin', size: '2.5 GB', resolution: '4K', link: '#' },
        { name: 'Megaup', size: '3.5 GB', resolution: '4K', link: '#' },
      ],
    },
  },
  {
    id: '2',
    title: 'The Hermit',
    year: 2025,
    rating: 8.8,
    duration: '120 min',
    genres: ['Drama', 'Mystery'],
    poster: 'https://picsum.photos/seed/hermit/300/450',
    backdrop: 'https://picsum.photos/seed/hermitback/800/450',
    description: 'A mysterious tale of a man who isolates himself from society, only to discover dark secrets about his past.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2.2 GB', resolution: '1080p', link: '#' },
        { name: 'Megaup', size: '3 GB', resolution: '1080p', link: '#' },
      ],
      'Server 2': [
        { name: 'Yoteshin', size: '1.8 GB', resolution: '720p', link: '#' },
      ],
    },
  },
  {
    id: '3',
    title: 'The Price of Goodbye',
    year: 2025,
    rating: 6.8,
    duration: '105 min',
    genres: ['Romance', 'Drama'],
    poster: 'https://picsum.photos/seed/price/300/450',
    backdrop: 'https://picsum.photos/seed/priceback/800/450',
    description: 'A heartfelt story about love, loss, and the price we pay for letting go.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '1.8 GB', resolution: '1080p', link: '#' },
        { name: 'Megaup', size: '2.5 GB', resolution: '1080p', link: '#' },
      ],
      'Server 2': [
        { name: 'Yoteshin', size: '1.2 GB', resolution: '720p', link: '#' },
      ],
    },
  },
  {
    id: '4',
    title: 'Yoroi',
    year: 2025,
    rating: 6.3,
    duration: '110 min',
    genres: ['Action', 'War'],
    poster: 'https://picsum.photos/seed/yoroi/300/450',
    backdrop: 'https://picsum.photos/seed/yoroiback/800/450',
    description: 'An epic war film set in feudal Japan, following a samurai on his quest for redemption.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2.5 GB', resolution: '1080p', link: '#' },
        { name: 'Megaup', size: '3.2 GB', resolution: '1080p', link: '#' },
      ],
      'Server 2': [
        { name: 'Yoteshin', size: '2 GB', resolution: '720p', link: '#' },
      ],
    },
  },
  {
    id: '5',
    title: 'Furious Attack',
    year: 2026,
    rating: 5.5,
    duration: '95 min',
    genres: ['Action', 'Thriller'],
    poster: 'https://picsum.photos/seed/furious/300/450',
    backdrop: 'https://picsum.photos/seed/furiousback/800/450',
    description: 'Non-stop action as a special forces team takes on a dangerous mission.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '1.9 GB', resolution: '1080p', link: '#' },
        { name: 'Megaup', size: '2.5 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '6',
    title: 'Detective Dee',
    year: 2026,
    rating: 5.0,
    duration: '130 min',
    genres: ['Mystery', 'Adventure'],
    poster: 'https://picsum.photos/seed/dee/300/450',
    backdrop: 'https://picsum.photos/seed/deeback/800/450',
    description: 'The legendary detective solves another impossible case in ancient China.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2.3 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '7',
    title: 'Salvageland',
    year: 2025,
    rating: 6.5,
    duration: '115 min',
    genres: ['Horror', 'Thriller'],
    poster: 'https://picsum.photos/seed/salvage/300/450',
    backdrop: 'https://picsum.photos/seed/salvageback/800/450',
    description: 'A group of survivors must navigate a post-apocalyptic wasteland.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2.1 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '8',
    title: '1st Kiss',
    year: 2025,
    rating: 7.0,
    duration: '100 min',
    genres: ['Romance', 'Comedy'],
    poster: 'https://picsum.photos/seed/kiss/300/450',
    backdrop: 'https://picsum.photos/seed/kissback/800/450',
    description: 'A sweet romantic comedy about first love and second chances.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '1.6 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '9',
    title: 'The Testament',
    year: 2025,
    rating: 7.0,
    duration: '125 min',
    genres: ['Drama', 'Thriller'],
    poster: 'https://picsum.photos/seed/testament/300/450',
    backdrop: 'https://picsum.photos/seed/testamentback/800/450',
    description: 'A family secret unravels when a mysterious will is discovered.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '10',
    title: 'Scarpetta',
    year: 2026,
    rating: 5.9,
    duration: '45 min/ep',
    genres: ['Crime', 'Drama'],
    poster: 'https://picsum.photos/seed/scarpetta/300/450',
    backdrop: 'https://picsum.photos/seed/scarpettaback/800/450',
    description: 'A gripping crime series based on the bestselling novels.',
    type: 'series',
    seasons: [
      {
        number: 1,
        name: 'Season 1',
        episodes: [
          { number: 1, title: 'The First Case', thumbnail: 'https://picsum.photos/seed/sc1/160/90' },
          { number: 2, title: 'Hidden Evidence', thumbnail: 'https://picsum.photos/seed/sc2/160/90' },
          { number: 3, title: 'The Silenced Witness', thumbnail: 'https://picsum.photos/seed/sc3/160/90' },
          { number: 4, title: 'Cold Trail', thumbnail: 'https://picsum.photos/seed/sc4/160/90' },
          { number: 5, title: 'The Final Verdict', thumbnail: 'https://picsum.photos/seed/sc5/160/90' },
        ],
      },
      {
        number: 2,
        name: 'Season 2',
        episodes: [
          { number: 1, title: 'New Beginnings', thumbnail: 'https://picsum.photos/seed/sc6/160/90' },
          { number: 2, title: 'Dark Secrets', thumbnail: 'https://picsum.photos/seed/sc7/160/90' },
          { number: 3, title: 'The Hunt', thumbnail: 'https://picsum.photos/seed/sc8/160/90' },
        ],
      },
    ],
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '500 MB', resolution: '1080p', link: '#' },
        { name: 'Megaup', size: '600 MB', resolution: '1080p', link: '#' },
      ],
      'Server 2': [
        { name: 'Yoteshin', size: '400 MB', resolution: '720p', link: '#' },
      ],
    },
  },
  {
    id: '11',
    title: 'Drops of God',
    year: 2023,
    rating: 7.4,
    duration: '45 min/ep',
    genres: ['Drama', 'Mystery'],
    poster: 'https://picsum.photos/seed/drops/300/450',
    backdrop: 'https://picsum.photos/seed/dropsback/800/450',
    description: 'A wine expert embarks on a quest to find the worlds greatest wines.',
    type: 'series',
    seasons: [
      {
        number: 1,
        name: 'Season 1',
        episodes: [
          { number: 1, title: 'The Legacy', thumbnail: 'https://picsum.photos/seed/dg1/160/90' },
          { number: 2, title: 'The First Bottle', thumbnail: 'https://picsum.photos/seed/dg2/160/90' },
          { number: 3, title: 'Blind Taste', thumbnail: 'https://picsum.photos/seed/dg3/160/90' },
          { number: 4, title: 'The Rivalry', thumbnail: 'https://picsum.photos/seed/dg4/160/90' },
        ],
      },
    ],
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '600 MB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '12',
    title: 'First Man',
    year: 2025,
    rating: 8.8,
    duration: '120 min',
    genres: ['Biography', 'Drama'],
    poster: 'https://picsum.photos/seed/firstman/300/450',
    backdrop: 'https://picsum.photos/seed/firstmanback/800/450',
    description: 'The inspiring story of a pioneer who changed history.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2.8 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '13',
    title: 'One Piece',
    year: 1999,
    rating: 8.7,
    duration: '24 min/ep',
    genres: ['Action & Adventure', 'Animation', 'Comedy'],
    poster: 'https://picsum.photos/seed/onepiece/300/450',
    backdrop: 'https://picsum.photos/seed/onepieceback/800/450',
    description: 'Follow Monkey D. Luffy and his crew of pirates.',
    type: 'anime',
    seasons: [
      {
        number: 1,
        name: 'East Blue',
        episodes: [
          { number: 1, title: 'Im Luffy!', thumbnail: 'https://picsum.photos/seed/op1/160/90' },
          { number: 2, title: 'Enter Zoro!', thumbnail: 'https://picsum.photos/seed/op2/160/90' },
          { number: 3, title: 'Morgan vs Luffy!', thumbnail: 'https://picsum.photos/seed/op3/160/90' },
          { number: 4, title: 'Luffys Past!', thumbnail: 'https://picsum.photos/seed/op4/160/90' },
          { number: 5, title: 'Captain Buggy!', thumbnail: 'https://picsum.photos/seed/op5/160/90' },
          { number: 6, title: 'Desperate Situation!', thumbnail: 'https://picsum.photos/seed/op6/160/90' },
          { number: 7, title: 'Grand Duel!', thumbnail: 'https://picsum.photos/seed/op7/160/90' },
          { number: 8, title: 'Who Will Win?', thumbnail: 'https://picsum.photos/seed/op8/160/90' },
        ],
      },
      {
        number: 2,
        name: 'Alabasta',
        episodes: [
          { number: 1, title: 'The Desert Kingdom', thumbnail: 'https://picsum.photos/seed/op9/160/90' },
          { number: 2, title: 'Sand Storm', thumbnail: 'https://picsum.photos/seed/op10/160/90' },
          { number: 3, title: 'Crocodiles Plan', thumbnail: 'https://picsum.photos/seed/op11/160/90' },
        ],
      },
    ],
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '300 MB', resolution: '1080p', link: '#' },
        { name: 'Megaup', size: '350 MB', resolution: '1080p', link: '#' },
      ],
      'Server 2': [
        { name: 'Yoteshin', size: '250 MB', resolution: '720p', link: '#' },
      ],
    },
  },
  {
    id: '14',
    title: 'Pearl in Red',
    year: 2026,
    rating: 8.5,
    duration: '110 min',
    genres: ['Drama', 'Romance'],
    poster: 'https://picsum.photos/seed/pearl/300/450',
    backdrop: 'https://picsum.photos/seed/pearlback/800/450',
    description: 'A beautiful story of love and sacrifice.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '15',
    title: 'Dredd',
    year: 2012,
    rating: 6.8,
    duration: '95 min',
    genres: ['Action', 'Sci-Fi'],
    poster: 'https://picsum.photos/seed/dredd/300/450',
    backdrop: 'https://picsum.photos/seed/dreddback/800/450',
    description: 'Judge Dredd becomes the ultimate law enforcer.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '1.8 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '16',
    title: 'Enforcement',
    year: 2020,
    rating: 6.4,
    duration: '108 min',
    genres: ['Action', 'Thriller'],
    poster: 'https://picsum.photos/seed/enforce/300/450',
    backdrop: 'https://picsum.photos/seed/enforceback/800/450',
    description: 'A gripping thriller about police work.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '2.1 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '17',
    title: 'Nine Colors Deer',
    year: 2022,
    rating: 7.5,
    duration: '88 min',
    genres: ['Animation', 'Fantasy'],
    poster: 'https://picsum.photos/seed/deer/300/450',
    backdrop: 'https://picsum.photos/seed/deerback/800/450',
    description: 'A magical animated adventure.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '1.5 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
  {
    id: '18',
    title: 'Climax',
    year: 2021,
    rating: 7.3,
    duration: '96 min',
    genres: ['Drama', 'Music'],
    poster: 'https://picsum.photos/seed/climax/300/450',
    backdrop: 'https://picsum.photos/seed/climaxback/800/450',
    description: 'A dance troupe descends into madness.',
    type: 'movie',
    downloadServers: {
      'Server 1': [
        { name: 'Yoteshin', size: '1.7 GB', resolution: '1080p', link: '#' },
      ],
    },
  },
];

export const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
  'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 
  'Sci-Fi', 'Thriller', 'War', 'Biography'
];

export const watchServers = ['Server 1', 'Server 2', 'Server 3'];
export const downloadServerNames = ['Server 1', 'Server 2', 'Server 3'];
