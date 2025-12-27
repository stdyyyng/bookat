
export enum BookStatus {
  WANT_TO_READ = '읽고 싶은 책',
  READING = '읽고 있는 책',
  COMPLETED = '읽은 책',
  STOPPED = '중단한 책'
}

export interface Quote {
  id: string;
  text: string;
  page: number;
  createdAt: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  totalPages: number;
  currentPages: number;
  coverUrl: string;
  spineUrl?: string; // Optional spine image
  status: BookStatus;
  progress: number; // Calculated percentage
  rating: number;
  categories: string[];
  quotes: Quote[];
  isLifeBook: boolean;
  updatedAt: number;
}

export interface UserProfile {
  id: string;
  profilePic?: string;
  kittenName: string;
}

export type TabType = 'bookshelf' | 'home' | 'collection' | 'account';
