import { genSalt, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import questionSeeds from './questions.json';
import answerSeeds from './answers.json';
import recommendationSeeds from './recommendations.json';

const prisma = new PrismaClient();

const createCategorySeeds = () => {
  const categorySeeds = [
    { category_name: 'General' },
    { category_name: 'Social' },
    { category_name: 'Communication' },
    { category_name: 'Emotion' },
    { category_name: 'Motoric' }
  ];

  return categorySeeds;
}



const createQuestionSeeds = () => {
  return questionSeeds;
}

const createAnswerSeeds = () => {
  return answerSeeds;
}

const createRecommendationSeeds = () => {
  return recommendationSeeds;
}


const main = async () => {
  console.log('Start seeding...');

  try {
    // Category
    await prisma.category.createMany({
      data: createCategorySeeds()
    });

    // Question
    await prisma.question.createMany({
      data: createQuestionSeeds()
    });

    // Answer
    await prisma.answer.createMany({
      data: createAnswerSeeds()
    });


    // User (Admin)
    const admin = {
      email: 'admin@disabilease.com',
      username: 'admin',
      password: 'admin',
    }

    admin.password = await hash(admin.password, await genSalt(10));

    const userAdmin = await prisma.user.create({
      data: admin
    });

  } catch (error) {
    console.error('Error while seeding data:', error);
  } finally {
    await prisma.$disconnect();

    console.log("Seeding successful");
  }
}

main().catch(async (err) => {
  console.error('Script execution failed:', err);
});