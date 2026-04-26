import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Book } from './types/Book';
import { BookForm } from './components/BookForm';
import { BookItem } from './components/BookItem';

// COLE SUA URL DO CRUDCRUD AQUI (adicione "/books" no final)
const API_URL = 'https://crudcrud.com/api/a96d059afb3642b08bfb1c9f6d176e61/books';

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  // Carregar livros ao iniciar
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Book[]>(API_URL);
      setBooks(response.data);
    } catch (err) {
      console.error("Erro ao buscar livros");
    }
  };

  const addBook = async (newBook: Book) => {
  try {
    // 1. Criamos um objeto limpo para enviar. 
    // NÃO inclua o _id aqui, pois a API é quem gera ele.
    const payload = {
      title: newBook.title,
      author: newBook.author,
      status: newBook.status
    };

    console.log("Enviando dados:", payload); // Para você conferir no console

    const response = await axios.post<Book>(API_URL, payload);
    
    // 2. A API responde com o objeto completo, agora com o _id gerado por ela
    setBooks([...books, response.data]);
    
  } catch (err: any) {
    console.error("Erro completo:", err.response?.data || err.message);
    alert("Erro ao salvar. Verifique se a URL do CrudCrud ainda é válida (elas duram 24h).");
  }
};

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks(books.filter(b => b._id !== id));
    } catch (err) {
      alert("Erro ao excluir");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h1>📚 Catálogo de Livros (TS)</h1>
      <BookForm onAdd={addBook} />
      <ul style={{ padding: 0 }}>
        {books.map(book => (
          <BookItem key={book._id} book={book} onDelete={deleteBook} />
        ))}
      </ul>
    </div>
  );
}

export default App;