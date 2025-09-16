// src/domain/entities/campaign/campaign.entity.ts
export type CampaignStatus =
  | 'draft' | 'scheduled' | 'running' | 'paused' | 'finished' | 'cancelled';

export class Campaign {
  readonly id: string;
  readonly tenantId: string;

  name: string;
  description?: string;
  status: CampaignStatus;
  strategy: 'auto' | 'manual';
  startAt?: Date;
  endAt?: Date;
  createdBy: string;

  readonly createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id: string;
    tenantId: string;
    name: string;
    description?: string;
    status?: CampaignStatus;
    strategy?: 'auto' | 'manual';
    startAt?: Date;
    endAt?: Date;
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.tenantId = props.tenantId;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status ?? 'draft';
    this.strategy = props.strategy ?? 'auto';
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.createdBy = props.createdBy;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  schedule(): void {
    this.status = 'scheduled';
    this.touch();
  }
  launch(): void {
    this.status = 'running';
    this.touch();
  }
  finish(): void {
    this.status = 'finished';
    this.touch();
  }
  cancel(): void {
    this.status = 'cancelled';
    this.touch();
  }
  private touch(): void {
    this.updatedAt = new Date();
  }
}
