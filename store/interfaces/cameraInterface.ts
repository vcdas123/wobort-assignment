export type grade = "A" | "B" | "C" | "D" | "E" | "F";
export type statusType = "Active" | "Inactive";

export interface Health {
  cloud: grade;
  device: grade;
  _id: string;
  id: string;
}

export interface CameraData {
  name: string;
  location: string;
  recorder: string;
  tasks: string;
  status: statusType;
  _id: string;
  id: number;
  current_status: "Online" | "Offline";
  health: Health;
  hasWarning: boolean;
}

export interface CameraListResponse {
  status: number;
  message: string;
  data: CameraData[];
}

export interface StatusChangePayload {
  id: number;
  status: statusType;
}

export interface CommonResponse {
  status: number;
  message: string;
  data: any[];
}
