import { useState } from 'react';
import type { Book } from '../types/Book';

interface Props {
  onAdd: (book: Book) => void;
}

export const BookForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<'Lido' | 'Não lido'>('Não lido');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;
    onAdd({ title, author, status });
    setTitle(''); setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value as 'Lido' | 'Não lido')}>
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
};