import type { Dish, MenuCategory } from '@mitay/core/catalog'

export const categoriesFixture: MenuCategory[] = [
  { id: 'category-starters', name: 'Entradas', sortOrder: 0 },
  { id: 'category-mains', name: 'Platos de fondo', sortOrder: 1 },
  { id: 'category-soups', name: 'Caldos y sopas', sortOrder: 2 },
  { id: 'category-drinks', name: 'Bebidas', sortOrder: 3 },
  { id: 'category-desserts', name: 'Postres', sortOrder: 4 },
]

function dish(
  id: string,
  categoryId: string,
  name: string,
  priceCents: number,
  description: string | null,
  isAvailable = true,
): Dish {
  return { id, categoryId, name, priceCents, description, imageUrl: null, isAvailable, sortOrder: 0 }
}

export const dishesFixture: Dish[] = [
  dish('dish-01', 'category-starters', 'Papa a la huancaína', 1200, 'Papa amarilla bañada en crema de ají amarillo y queso fresco.'),
  dish('dish-02', 'category-starters', 'Ceviche de trucha', 2200, 'Trucha de Apurímac en limón, cebolla morada, camote y cancha.'),
  dish('dish-03', 'category-starters', 'Rocoto relleno', 1800, 'Rocoto horneado relleno de carne, con pastel de papa.'),
  dish('dish-04', 'category-mains', 'Lomo saltado', 2500, 'Lomo fino salteado al wok con cebolla, tomate y papas fritas.'),
  dish('dish-05', 'category-mains', 'Cuy chactado', 4500, 'Cuy entero frito a la piedra con papas y ensalada.', false),
  dish('dish-06', 'category-mains', 'Chicharrón de chancho', 2800, 'Con mote, camote frito y sarsa criolla.'),
  dish('dish-07', 'category-mains', 'Trucha frita', 2400, 'Trucha entera dorada con arroz, papas y ensalada.'),
  dish('dish-08', 'category-soups', 'Caldo de gallina', 1500, 'Gallina de corral, fideos, papa y huevo.'),
  dish('dish-09', 'category-soups', 'Chairo apurimeño', 1400, 'Sopa espesa de chuño, carne y verduras.'),
  dish('dish-10', 'category-drinks', 'Chicha morada (jarra)', 1000, '1 litro, preparada en casa.'),
  dish('dish-11', 'category-drinks', 'Emoliente', 400, null),
  dish('dish-12', 'category-drinks', 'Inca Kola 1 L', 800, null),
  dish('dish-13', 'category-desserts', 'Arroz con leche', 600, 'Con canela y clavo de olor.'),
  dish('dish-14', 'category-desserts', 'Mazamorra morada', 600, 'Con frutas secas.', false),
]
