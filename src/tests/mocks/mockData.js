export const mockCategories = [
  { id: 1, name: 'Armas', description: 'Espadas, hachas y lanzas forjadas en acero real.' },
  { id: 2, name: 'Armaduras', description: 'Escudos, yelmos y cotas de malla impenetrables.' },
  { id: 3, name: 'Pociones', description: 'Elixires de sanación y pócimas místicas.' }
];

export const mockProducts = [
  {
    id: 1,
    name: 'Espada de Acero de Damasco',
    price: 150.00,
    stock: 12,
    category_id: 1,
    category: { id: 1, name: 'Armas', description: 'Espadas, hachas y lanzas forjadas en acero real.' }
  },
  {
    id: 2,
    name: 'Escudo de Roble Encantado',
    price: 85.50,
    stock: 5,
    category_id: 2,
    category: { id: 2, name: 'Armaduras', description: 'Escudos, yelmos y cotas de malla impenetrables.' }
  }
];

export const mockSingleProduct = mockProducts[0];

export const mockUsers = [
  {
    id: 1,
    name: 'Sir Galahad',
    email: 'galahad@camelot.realm',
    role: 'knight'
  },
  {
    id: 2,
    name: 'Merlin el Mago',
    email: 'merlin@avalon.realm',
    role: 'wizard'
  }
];

export const mockSingleUser = mockUsers[0];
