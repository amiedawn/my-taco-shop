const db = require('./connection');
const { User, Item, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([{ name: 'Entrees' }, { name: 'Appetizers' }, { name: 'Drinks' }]);

  console.log('categories seeded');

  await Item.deleteMany();

  const items = await Item.insertMany([
    {
      name: 'Tacos',
      description: 'Three tacos stuffed with your choice of meat, cheese, pico de gallo, guacamole, and sour cream.',
      image: 'tacos.jpg',
      category: categories[0]._id,
      price: 8,
      quantity: 500,
    },
    {
      name: 'Burrito',
      description:
        'Gigantic burrito stuffed with your choice of meat, rice, beans, cheese, lettuce, pico de gallo, guacamole, and sour cream.',
      image: 'burrito.jpg',
      category: categories[0]._id,
      price: 9,
      quantity: 500,
    },
    {
      name: 'Quesadilla',
      category: categories[0]._id,
      description: 'Four large quarters of tortilla stuffed with your choice of meat and cheese.',
      image: 'quesadilla.jpg',
      price: 5,
      quantity: 500,
    },
    {
      name: 'Pozole',
      category: categories[0]._id,
      description:
        'Delicious soup with hominy and pork, garnished with cabbage, onion, radishes, avocado, salsa and limes.',
      image: 'pozole.jpg',
      price: 9,
      quantity: 500,
    },
    {
      name: 'Chips, Salsa, and Guacamole',
      category: categories[1]._id,
      description: 'Hot and fresh tortilla chips along with our award-winning salsa and guacamole.',
      image: 'chips.jpg',
      price: 3,
      quantity: 100,
    },
    {
      name: 'Mexican Rice',
      category: categories[1]._id,
      description: 'Side of rice infused with a complex tomato flavor giving each grain just the right amount of bite.',
      image: 'rice.jpg',
      price: 4,
      quantity: 100,
    },
    {
      name: 'Horchata',
      category: categories[2]._id,
      description:
        'Traditional Mexican drink made of white rice soaked in water, flavored and sweetened with cinnamon and sugar.',
      image: 'horchata.jpg',
      price: 4,
      quantity: 300,
    },
    {
      name: 'Infused Bottled Water',
      category: categories[2]._id,
      description: 'Bottled water infused with lemon and herbs.',
      image: 'water.jpg',
      price: 2,
      quantity: 300,
    },
  ]);

  console.log('items seeded');

  await User.deleteMany();

  await User.create({
    username: 'bobwhite',
    email: 'bob@email.com',
    password: 'password',
    orders: [
      {
        items: [items[0]._id, items[0]._id, items[1]._id],
      },
    ],
  });

  await User.create({
    username: 'shellysmith',
    email: 'ssmith@email.com',
    password: 'password',
  });

  console.log('users seeded');

  process.exit();
});
