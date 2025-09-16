// src/domain/entities/campaign/campaign-group.entity.ts
export type DifficultyLevel = 'low' | 'medium' | 'high';

export class CampaignGroup {
  readonly id: string;
  readonly campaignId: string;

  name: string;
  difficulty: DifficultyLevel;
  aiScore: number; // 0..100
  createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id: string;
    campaignId: string;
    name: string;
    difficulty: DifficultyLevel;
    aiScore?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.campaignId = props.campaignId;
    this.name = props.name;
    this.difficulty = props.difficulty;
    this.aiScore = props.aiScore ?? 0;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
