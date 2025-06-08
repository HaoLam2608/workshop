import { Conference } from '@/types/conference';
import { Article } from '@/types/article';
import { Reviewer } from '@/types/reviewer';

const BASE_URL = 'http://localhost:2000/api';

export const getAllConferences = async (): Promise<Conference[]> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${BASE_URL}/hoithao/getall`, { signal: controller.signal });
    clearTimeout(timeout);

    const data = await res.json();
    console.log("API RESPONSE:", data);

    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') return [data];
    console.warn("API không trả về dữ liệu hợp lệ, trả về mảng rỗng");
    return [];
  } catch (error) {
    console.error('Lỗi khi gọi API getAllConferences:', error);
    return [];
  }
};

export const getConferenceById = async (maht: number): Promise<Conference | null> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${BASE_URL}/hoithao/${maht}`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Hội thảo với maht ${maht} không tồn tại`);
        return null;
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API RESPONSE for getConferenceById:", data);

    if (data && typeof data === 'object' && !Array.isArray(data)) return data as Conference;
    console.warn("API không trả về dữ liệu hợp lệ, trả về null");
    return null;
  } catch (error) {
    console.error(`Lỗi khi gọi API getConferenceById với maht ${maht}:`, error);
    return null;
  }
};

export const getArticlesByConference = async (maht: number): Promise<Article[]> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${BASE_URL}/baibao/hoithao/${maht}`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Không tìm thấy bài báo cho hội thảo maht ${maht}`);
        return [];
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API RESPONSE for getArticlesByConference:", data);

    if (Array.isArray(data)) return data as Article[];
    console.warn("API không trả về mảng bài báo hợp lệ, trả về mảng rỗng");
    return [];
  } catch (error) {
    console.error(`Lỗi khi gọi API getArticlesByConference với maht ${maht}:`, error);
    return [];
  }
};

export const getAvailableReviewers = async (): Promise<Reviewer[]> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${BASE_URL}/user/reviewers/available`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Không tìm thấy reviewer nào thỏa mãn điều kiện`);
        return [];
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API RESPONSE for getAvailableReviewers:", data);

    if (Array.isArray(data)) return data as Reviewer[];
    console.warn("API không trả về mảng reviewer hợp lệ, trả về mảng rỗng");
    return [];
  } catch (error) {
    console.error('Lỗi khi gọi API getAvailableReviewers:', error);
    return [];
  }
};

export const assignReviewers = async (mabaibao: number, reviewerIds: number[], mapbtc: number): Promise<{ message: string }> => {
  try {
    if (!reviewerIds?.length) throw new Error("Danh sách reviewer không hợp lệ");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${BASE_URL}/phancong/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mabaibao, reviewerIds, mapbtc }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

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

export const getAssignedPapers = async (reviewerId: number): Promise<Article[]> => {
  try {
    console.log("Calling getAssignedPapers with reviewerId:", reviewerId);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(`${BASE_URL}/reviewer/assigned/${reviewerId}`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`Không tìm thấy bài báo cho reviewerId ${reviewerId}, status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    console.log("DATA RECEIVED from assigned papers API:", data);

    const articles = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
    return articles.map((article: any) => ({
      id: article.id || '',
      title: article.title || 'Không có tiêu đề',
      authors: article.authors || 'Không có tác giả',
      field: article.field || 'Không xác định',
      status: article.status || 'Chưa đánh giá',
      deadline: article.deadline || 'Không xác định',
      reviewForm: article.reviewForm || null,
    }));
  } catch (error) {
    console.error("Error fetching assigned papers:", error);
    return [];
  }
};


export const createReview = async (
  reviewerId: number,
  paperId: number,
  review: ReviewForm
): Promise<{ maphieuncx: number }> => {
  try {
    if (!review || Object.values(review).some(value => !value.trim())) {
      throw new Error("Dữ liệu đánh giá không hợp lệ");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    // Gửi dữ liệu đúng format backend yêu cầu: tách từng trường review ra
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviewerId,
        paperId,
        scientificValue: review.scientificValue,
        novelty: review.novelty,
        researchResults: review.researchResults,
        conclusion: review.conclusion,
        finalDecision: review.finalDecision,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi gọi API createReview:', error);
    throw error;
  }
};
export const loginOrganizer = async (username: string, password: string): Promise<{ id: number; hoten: string; username: string } | null> => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login-btc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API RESPONSE for loginOrganizer:", data);
    console.log("User data:", data.data.user);
    if (data.data) { 
      const { id, hoten, username } = data.data; 
      // Lưu vào localStorage
      localStorage.setItem('userId', id.toString());
      localStorage.setItem('hoten', hoten);
      localStorage.setItem('username', username);
      return { id, hoten, username };
    }

    console.warn("API không trả về dữ liệu người dùng hợp lệ");
    return null;
  } catch (error) {
    console.error('Lỗi khi gọi API loginOrganizer:', error);
    throw error;
  }
};
export const getConferencesByOrganizer = async (mapbtc: number): Promise<Conference[]> => {
  try {
    const res = await fetch(`${BASE_URL}/hoithao/btc/${mapbtc}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("API RESPONSE for getConferencesByOrganizer:", data);

    return data;
  } catch (error) {
    console.error(`Lỗi khi gọi API getConferencesByOrganizer với mapbtc ${mapbtc}:`, error);
    return [];
  }
};
export const getReviewsByPaper = async (mabaibao: number): Promise<any[]> => {
  try {
    const res = await fetch(`${BASE_URL}/baibao/pnx/${mabaibao}`);

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Không tìm thấy phiếu nhận xét cho bài báo ${mabaibao}`);
        return [];
      }
      const errorData = await res.json();
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("API RESPONSE for getReviewsByPaper:", data);

    return data;

  } catch (error) {
    console.error(`Lỗi khi gọi API getReviewsByPaper với mabaibao ${mabaibao}:`, error);
    return [];
  }
};
