export interface InitPayload {
  id: string;
  isSuccessProgress: boolean;
  canObtainData: boolean;
}

export interface UserData {
  name: string;
  age: number;
}
export interface PollingProgress {
  status: 'STARTING' | 'IN PROGRESS' | 'DONE' | 'FAILED';
}
