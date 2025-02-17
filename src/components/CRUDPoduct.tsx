import { useState } from 'react';
import { sendData } from '../services/api';

export const CRUDProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = { title, price, description };
      await sendData<{ id: number }>('products', data);
      setTitle('');
      setPrice(0);
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label>
        Price
        <input type="number" name="price" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
      </label>
      <label>
        Description
        <textarea name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};
