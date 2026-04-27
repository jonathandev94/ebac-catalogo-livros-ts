import { useState, useEffect } from 'react';
import api from './services/api';
import type { Book } from './types/Book';
import { GlobalStyle, Container, Title, BookCard, ActionButton } from './styles/styles';
import { BookForm } from './components/BookForm';

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => { fetchBooks(); }, []);

  const fetchBooks = async () => {
    const res = await api.get('/books');
    setBooks(res.data);
  };

  const addBook = async (newBook: Book) => {
    const res = await api.post('/books', newBook);
    setBooks([...books, res.data]);
  };

  const deleteBook = async (id: string) => {
    await api.delete(`/books/${id}`);
    setBooks(books.filter(b => b._id !== id));
  };

  // FUNÇÃO DE ATUALIZAR (PUT)
  const toggleStatus = async (book: Book) => {
    const novoStatus = book.status === 'Lido' ? 'Não lido' : 'Lido';
    
    // O segredo do CrudCrud: tirar o _id do corpo
    const { _id, ...dadosParaEnviar } = book;
    const payload = { ...dadosParaEnviar, status: novoStatus };

    try {
      await api.put(`/books/${book._id}`, payload);
      // Atualiza na tela sem precisar dar F5
      setBooks(books.map(b => b._id === book._id ? { ...b, status: novoStatus as any } : b));
    } catch (err) {
      alert("Erro ao atualizar. O ID do CrudCrud pode ter expirado!");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>📚 Meu Catálogo de Livros</Title>
        <BookForm onAdd={addBook} />
        
        <div style={{ marginTop: '20px' }}>
          {books.map(book => (
            <BookCard key={book._id} lido={book.status === 'Lido'}>
              <div>
                <strong style={{ fontSize: '18px' }}>{book.title}</strong>
                <p style={{ margin: '5px 0', color: '#718096' }}>{book.author}</p>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{book.status}</span>
              </div>
              <div>
                <ActionButton onClick={() => toggleStatus(book)}>
                  {book.status === 'Lido' ? '↩️' : '✅'}
                </ActionButton>
                <ActionButton variant="delete" onClick={() => deleteBook(book._id!)}>
                  🗑️
                </ActionButton>
              </div>
            </BookCard>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App;