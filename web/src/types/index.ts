export interface Author {
  id: number;
  authorName: string;
  authorSurname: string;
  authorYears?: string;
}

export interface Genre {
  id: number;
  genreName: string;
  genreDescription?: string;
}

export interface Book {
  id: number;
  bookTitle: string;
  bookDescription?: string;
  bookImageUrl?: string; // URL обложки
  bookDone: boolean;
  author: Author;
  genre: Genre;
  rating?: number; // Добавим для UI (хотя в контроллере книг его нет, он обычно подтягивается отдельно)
}
