import type { Book } from '../types/Book';

interface Props {
  books: Book[];
  onDelete: (id: string) => void;
}

export const BookList = ({ books, onDelete }: Props) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          {book.title} - {book.author} ({book.status})
          <button onClick={() => book._id && onDelete(book._id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
};