const API_URL = import.meta.env.VITE_API_URL;

export const bookService = {
  async getAllBooks() {
    const response = await fetch(`${API_URL}/api/books`);
    if (!response.ok) throw new Error('Failed to fetch books');
    return response.json();
  },

  async getAverageRating(bookId: number) {
    const response = await fetch(
      `${API_URL}/api/ratings/book/${bookId}/average`
    );
    if (!response.ok) return 0;
    const data = await response.json();
    return data.average || 0;
  },
};
