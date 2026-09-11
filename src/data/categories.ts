export const CATEGORIES=["Geografie","Geschichte","Wissenschaft","Sport","Technik","Kurioses"] as const;
export type Category=(typeof CATEGORIES)[number];
