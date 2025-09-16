// src/domain/entities/campaign/campaign-schedule.entity.ts
export type ScheduleType = 'once' | 'sequential' | 'windowed';

export class CampaignSchedule {
  readonly id: string;
  readonly campaignId: string;
  type: ScheduleType;
  cronJson: Record<string, unknown>;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: {
    id: string;
    campaignId: string;
    type: ScheduleType;
    cronJson?: Record<string, unknown>;
    timezone?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.campaignId = props.campaignId;
    this.type = props.type;
    this.cronJson = props.cronJson ?? {};
    this.timezone = props.timezone ?? 'UTC';
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
