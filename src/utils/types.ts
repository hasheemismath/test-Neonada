export interface ShowProps {
  id: string;
  url: string;
  name: string;
  rating: number;
  summary: string;
}

export interface InfoProps {
  title: string;
  value: string | string[];
}

export interface StarringProps {
  person: string;
  role: string;
}

export interface StarProps {
  rate: number;
  fontSize?: number;
  lineHeight?: number;
}

export interface SettingType {
  isScheduleFetching: boolean;
  isShowFetching: boolean;
  schedules: [];
  show: any;
  error: { value: boolean; message: string };
}
