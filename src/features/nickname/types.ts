export type NicknameStyle = 'ko' | 'ja';

export interface NicknameItem {
  text: string;
  meaning: string;
  subText?: string;
}

export interface GenerateRequest {
  style: NicknameStyle;
  length: number;
  exclude?: string[];
}

export interface GenerateResponse {
  nicknames: NicknameItem[];
}

export interface NicknameBookmark {
  id: string;
  text: string;
  meaning: string;
  subText?: string;
  style: NicknameStyle;
  createdAt: string;
}

export interface NicknameHistory {
  id: string;
  parameters: GenerateRequest;
  nicknames: NicknameItem[];
  createdAt: string;
}
