import axios from 'axios';
import { GenerateRequest, GenerateResponse } from './types';

/**
 * AI 게임 닉네임 생성을 위해 백엔드 API 엔드포인트를 호출합니다.
 */
export async function generateNicknames(params: GenerateRequest): Promise<GenerateResponse> {
  const response = await axios.post<GenerateResponse>('/api/generate', params);
  return response.data;
}
