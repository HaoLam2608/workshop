// services/api.ts

import { Conference } from '@/types/conference'
import { Article } from '@/types/article'
import { Reviewer } from '@/types/reviewer'

const BASE_URL = 'http://localhost:2000/api' // Cập nhật URL nếu khác

export const getAllConferences = async (): Promise<Conference[]> => {
  try {
    const res = await fetch(`${BASE_URL}/hoithao/getall`)
    const data = await res.json()

    console.log("API RESPONSE:", data)

    // Nếu data là mảng, trả về trực tiếp
    if (Array.isArray(data)) {
      return data
    }
    // Nếu data là đối tượng, bọc nó vào một mảng
    if (data && typeof data === 'object') {
      return [data]
    }
    // Nếu không khớp, trả về mảng rỗng
    console.warn("API không trả về dữ liệu hợp lệ, trả về mảng rỗng")
    return []
  } catch (error) {
    console.error('Lỗi khi gọi API getAllConferences:', error)
    return []
  }
}

export const getConferenceById = async (maht: number): Promise<Conference | null> => {
  try {
    const res = await fetch(`${BASE_URL}/hoithao/${maht}`);
    
    // Kiểm tra nếu response không thành công
    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Hội thảo với maht ${maht} không tồn tại`);
        return null;
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API RESPONSE for getConferenceById:", data);

    // Đảm bảo data là một đối tượng hợp lệ
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return data as Conference;
    }

    console.warn("API không trả về dữ liệu hợp lệ, trả về null");
    return null;
  } catch (error) {
    console.error(`Lỗi khi gọi API getConferenceById với maht ${maht}:`, error);
    return null;
  }
}

export const getArticlesByConference = async (maht: number): Promise<Article[]> => {
  try {
    const res = await fetch(`${BASE_URL}/baibao/hoithao/${maht}`);

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Không tìm thấy bài báo cho hội thảo maht ${maht}`);
        return [];
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API RESPONSE for getArticlesByConference:", data);

    if (Array.isArray(data)) {
      return data as Article[];
    }

    console.warn("API không trả về mảng bài báo hợp lệ, trả về mảng rỗng");
    return [];
  } catch (error) {
    console.error(`Lỗi khi gọi API getArticlesByConference với maht ${maht}:`, error);
    return [];
  }
};

export const getAvailableReviewers = async (): Promise<Reviewer[]> => {
  try {
    const res = await fetch(`${BASE_URL}/user/reviewers/available`);
    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Không tìm thấy reviewer nào thỏa mãn điều kiện`);
        return [];
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("API RESPONSE for getAvailableReviewers:", data);
    if (Array.isArray(data)) {
      return data as Reviewer[];
    }
    console.warn("API không trả về mảng reviewer hợp lệ, trả về mảng rỗng");
    return [];
  } catch (error) {
    console.error('Lỗi khi gọi API getAvailableReviewers:', error);
    return [];
  }
};

export const assignReviewers = async (mabaibao: number, reviewerIds: number[], mapbtc: number): Promise<{ message: string }> => {
  try {
    const res = await fetch(`${BASE_URL}/phancong/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mabaibao, reviewerIds, mapbtc }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API RESPONSE for assignReviewers:", data);
    return data;
  } catch (error) {
    console.error(`Lỗi khi gọi API assignReviewers cho bài báo ${mabaibao}:`, error);
    throw error;
  }
};

