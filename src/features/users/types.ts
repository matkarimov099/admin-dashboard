import type { PaginationFilter, Position, Role } from '@/types/common.ts';

export interface User {
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: Role;
  position?: Position;
  isGithubMember: boolean;
  avatarUrl?: string;
  idkUrl?: string;
  imagescount?: number;
  araUrl?:  string;
  imgCount?: number;
  cntryname?: string;
  posts_first_code?: string;
  commcount?: number;
  dlastname?: string;
  updTime: string;
  postReboot: number;
  aplcInn: number;
  qolgan_summa: string;
  offenseId: number;
  id: string;
  state: number;
  stateNm: string;
  generationPdf: number;
  partcount: number;
  g21no: string;
  cd_nm1: string;
  warranty_type: string;
  cameratime: string;
  autodeclid: string;
  way: number;
  uncodId: string;
  channel_way: number;
  g29: string;
  tulagan_summa: number;
  offense_id: number;
  postsdate: string;
  dpassport: string;
  cd_nm: string;
  jami_summa: string;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: Role;
  position?: Position;
}

export interface UserFilter extends PaginationFilter {
  fullName?: string;
  role?: Role;
  position?: Position;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: Role;
  position?: Position;
}
