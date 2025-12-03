export interface AppSettingData {
    id: number;
    key: string;
    value: string;
}

export interface ClientLabelData {
    id: number;
    icon: string;
    name: string;
    tag_color: string;
    description?: string;
    slug?: string;
    is_active?: boolean;
    type?: string;
    sort_order?: number;
    created_at?: string;
    updated_at?: string;
}

export interface ClientSourceData {
    id: number;
    icon: string;
    name: string;
    description?: string;
    slug?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface ClientIndustryData {
    id: number;
    icon: string;
    name: string;
    description?: string;
    slug?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}
