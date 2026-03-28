export interface TemplateRecord {
  id: string;
  name: string;
}

export interface TemplateService {
  list(): Promise<TemplateRecord[]>;
}
