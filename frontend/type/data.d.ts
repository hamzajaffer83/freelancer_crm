export type AppSetting = {
  id: string
  key: string
  value: string
  active: boolean
  created_at?: string
  updated_at?: string
}

export type CustomerStatus = {
    id: number;
    name: string;
    color: string;
    active: boolean;
    created_at?: string;
    updated_at?: string;
}