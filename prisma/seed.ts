import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.photo.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.album.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name IN ('User', 'Post', 'Comment', 'Album', 'Photo')`;

  const user1 = await prisma.user.create({
    data: {
      name: 'Иван Петров',
      username: 'ivan',
      email: 'ivan@example.com',
      phone: '+7-999-123-45-67',
      website: 'ivan.ru',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Мария Смирнова',
      username: 'maria',
      email: 'maria@example.com',
      phone: '+7-999-234-56-78',
      website: 'maria.ru',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Алексей Волков',
      username: 'alex',
      email: 'alex@example.com',
      phone: '+7-999-345-67-89',
      website: 'alex.ru',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Елена Зайцева',
      username: 'elena',
      email: 'elena@example.com',
      phone: '+7-999-456-78-90',
      website: 'elena.ru',
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: 'Дмитрий Морозов',
      username: 'dmitry',
      email: 'dmitry@example.com',
      phone: '+7-999-567-89-01',
      website: 'dmitry.ru',
    },
  });

  console.log('✅ Пользователи созданы (5)');
const users = [user1, user2, user3, user4, user5]

  const posts = [];
  for (let i = 0; i < 100; i++) {
    const post = await prisma.post.create({
      data: {
        title: `Пост #${i + 1}: Заголовок статьи`,
        body: `Это текст поста номер ${
          i + 1
        }. Здесь может быть длинный контент статьи с полезной информацией для читателей.`,
        userId: users[i % users.length].id, // распределяем по 5 пользователям
      },
    });
    posts.push(post);
  }

  console.log('✅ Посты созданы (100)');

  for (const post of posts) {
    await prisma.comment.create({
      data: {
        name: 'Комментатор Аноним',
        email: 'anon@example.com',
        body: `Это комментарий к посту "${post.title}". Очень познавательно!`,
        postId: post.id,
      },
    });
    await prisma.comment.create({
      data: {
        name: 'Другой Комментатор',
        email: 'other@example.com',
        body: `Согласен с автором поста "${post.title}". Добавлю, что тема раскрыта хорошо.`,
        postId: post.id,
      },
    });
  }

  console.log('✅ Комментарии созданы (200)');

  const albums = [];
  for (let i = 0; i <users.length; i++) {
    const album = await prisma.album.create({
      data: {
        title: `Альбом пользователя #${i+1}`,
        userId: users[i].id,
      },
    });
    albums.push(album);
  }

  console.log('✅ Альбомы созданы (5)');

  for (const album of albums) {
    for (let j = 1; j <= 3; j++) {
      await prisma.photo.create({
        data: {
          title: `Фото #${j} из альбома "${album.title}"`,
          url: `https://picsum.photos/200/300?random=${album.id * 10 + j}`,
          albumId: album.id,
        },
      });
    }
  }

  console.log('✅ Фото созданы (15)');
  console.log('');
  console.log('🎉 База данных заполнена тестовыми данными!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Ошибка при заполнении:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
