import { genSalt, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import questionSeeds from './questions.json';
import answerSeeds from './answers.json';
import recommendationSeeds from './recommendations.json';

const prisma = new PrismaClient();

const createCategorySeeds = () => {
  const categorySeeds = [
    { category_name: 'General' },
    { category_name: 'Depression' },
    { category_name: 'Anxiety' },
    { category_name: 'Burnout' },
    { category_name: 'Stress' }
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

const createTaskCategorySeeds = (user_id: number) => {
  const taskCategorySeeds = [
    { task_category_name: 'Document', user_id: user_id, priority: 1 },
    { task_category_name: 'Creativity', user_id: user_id, priority: 2 },
    { task_category_name: 'Extracurricular', user_id: user_id, priority: 3 },
    { task_category_name: 'Math', user_id: user_id, priority: 4 },
  ];

  return taskCategorySeeds;
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

    // Recommendation
    await prisma.recommendation.createMany({
      data: createRecommendationSeeds()
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

    // Task category
    await prisma.taskCategory.createMany({
      data: createTaskCategorySeeds(userAdmin.user_id)
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