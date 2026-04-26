import type { Book } from '../types/Book';

interface Props {
  book: Book;
  onDelete: (id: string) => void;
}

export const BookItem = ({ book, onDelete }: Props) => (
  <li style={{ padding: '10px', borderBottom: '1px solid #444', display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <strong>{book.title}</strong> - {book.author} 
      <span style={{ marginLeft: '10px', color: book.status === 'Lido' ? '#4caf50' : '#ff9800' }}>
        ({book.status})
      </span>
    </div>
    <button onClick={() => onDelete(book._id!)} style={{ color: 'red', cursor: 'pointer' }}>Excluir</button>
  </li>
);