export interface Book {
  _id?: string;   // O crudcrud gera esse ID com underline
  title: string;
  author: string;
  status: 'Lido' | 'Não lido';
}