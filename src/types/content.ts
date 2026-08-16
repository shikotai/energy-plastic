export type TextCard = {
  title: string;
  text: string;
};

export type NumberedStep = TextCard & {
  number?: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  items: string[];
};

export type TeamMember = {
  name: string;
  role: string;
  short: string;
  bio: string;
};

export type NewsItem = {
  year: string;
  title: string;
  text: string;
};
