import { AssessmentResult, PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as dotenv from 'dotenv'; 

dotenv.config();  // Load environment variables from .env file

export class AssessmentResultService {
  private assessmentResultModel = new PrismaClient().assessmentResult;

  public async isUserHasTakenTest(user_id: number): Promise<AssessmentResult> {
    const assessmentResult = await this.assessmentResultModel.findFirst({
      where: {
        user_id: user_id,
      },
    });

    return assessmentResult;
  }

  public async createOrUpdateAssessmentResult(user_id: number, category_id: number, points: number): Promise<void> {
    await this.assessmentResultModel.upsert({
      where: {
        user_id_category_id: {
          user_id,
          category_id,
        },
      },
      create: {
        user_id,
        category_id,
        total_points: points,
      },
      update: {
        total_points: points,
      },
    });
  }

  public async getUserAssessmentResults(user_id: number): Promise<AssessmentResult[]> {
    const assessmentResult = await this.assessmentResultModel.findMany({
      where: {
        user_id: user_id,
        NOT: {
          category_id: 1,
        },
      },
      orderBy: {
        total_points: 'desc',
      },
    });

    return assessmentResult;
  }

  public async getUserGoalAnswer(user_id: number): Promise<AssessmentResult> {
    const assessmentResult = await this.assessmentResultModel.findFirst({
      where: {
        user_id: user_id,
        category_id: 1, // General
      },
    });

    return assessmentResult;
  }

public async getAiRecommendation(category: string): Promise<string> {
  console.log("Requesting AI recommendation for category:", category);

  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    throw new Error("Hugging Face API key is missing in .env file");
  }

  // Using a confirmed working model
  const url = `https://api-inference.huggingface.co/models/distilgpt2`;

  try {
    const response = await axios.post(
      url,
      {
        inputs: `Provide 3 concise health recommendations for someone struggling with ${category}:`,
        parameters: {
          max_length: 150,
          temperature: 0.7,
          do_sample: true
        }
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 10000 // 10 second timeout
      }
    );

    if (!response.data || !response.data[0]?.generated_text) {
      throw new Error("Empty response from AI model");
    }

    console.log("AI Response:", response.data);
    return response.data[0].generated_text;
    
  } catch (error) {
    console.error("Error fetching AI recommendation:", error);
    
    // Fallback recommendations jika API gagal
    // Fallback recommendations jika API gagal
    const fallbackRecommendations: Record<string, string> = {
      'Social': `1. Berinteraksi secara rutin dengan teman, keluarga, atau kolega untuk membangun hubungan yang lebih erat. Jangan ragu untuk berbagi cerita atau perasaan yang Anda alami.\n\n 2. Bergabung dalam komunitas atau kelompok sosial yang sesuai dengan minat atau hobi Anda. Hal ini dapat membuka peluang untuk mengenal orang baru dan memperluas jaringan sosial.\n\n 3. Luangkan waktu untuk kegiatan sosial seperti berkumpul atau makan bersama. Kegiatan ini dapat meningkatkan rasa kebersamaan dan memberi dukungan emosional yang dibutuhkan.`,
      
      'Communication': `1. Latih keterampilan mendengarkan aktif dengan memberi perhatian penuh pada lawan bicara, tidak hanya fokus pada kata-kata mereka, tetapi juga pada ekspresi wajah dan bahasa tubuh. Ini membantu menciptakan komunikasi yang lebih efektif dan bermakna.\n\n 2. Berbicara dengan jelas dan terbuka, pastikan pesan yang disampaikan tidak ambigu. Gunakan kalimat yang mudah dipahami agar tidak terjadi kesalahpahaman.\n\n 3. Gunakan bahasa tubuh yang positif, seperti kontak mata dan gerakan tangan, untuk menambah kepercayaan diri dan menunjukkan bahwa Anda benar-benar terlibat dalam percakapan. Ini juga membantu membuat komunikasi menjadi lebih menyenangkan dan efektif.`,
      
      'Emotion': `1. Latih meditasi mindfulness setiap hari untuk mengurangi stres dan meningkatkan konsentrasi. Dengan meditasi, Anda dapat lebih mudah mengenali dan mengelola perasaan yang datang secara sadar.\n\n 2. Tulis jurnal syukur setiap hari untuk menghargai hal-hal positif dalam hidup Anda. Ini dapat membantu meningkatkan kesejahteraan emosional dan memberi perspektif yang lebih positif terhadap hidup.\n\n 3. Cari dukungan sosial dari teman atau keluarga saat Anda merasa tertekan atau kesulitan. Tidak ada salahnya untuk berbagi perasaan dan mencari dukungan, karena berbicara dengan orang lain dapat membantu meringankan beban emosional.`,
      
      'Motoric': `1. Lakukan latihan fisik secara teratur, seperti berjalan, berlari, atau bersepeda. Aktivitas ini tidak hanya meningkatkan kebugaran fisik, tetapi juga memperbaiki mood dan kesehatan mental Anda.\n\n 2. Jaga postur tubuh yang baik saat duduk atau berdiri untuk menghindari masalah pada tulang belakang. Perhatikan ergonomi tempat kerja Anda untuk menjaga kenyamanan fisik sehari-hari.\n\n 3. Cobalah aktivitas yang melibatkan koordinasi tangan dan mata, seperti bermain olahraga, permainan video, atau kegiatan seni. Ini dapat membantu meningkatkan keterampilan motorik halus serta koordinasi tubuh secara keseluruhan.`
    };
   
    return fallbackRecommendations[category] || "Unable to get recommendations at this time. Please try again later.";
  }
}

}
