// src/domain/entities/campaign/campaign-template.entity.ts
export class CampaignTemplateAssignment {
  readonly id: string;
  readonly campaignId: string;
  groupId?: string;
  emailTemplateId?: string;
  landingPageId?: string;
  assignedMode: 'auto' | 'manual';
  createdAt: Date;

  constructor(props: {
    id: string;
    campaignId: string;
    groupId?: string;
    emailTemplateId?: string;
    landingPageId?: string;
    assignedMode?: 'auto' | 'manual';
    createdAt?: Date;
  }) {
    this.id = props.id;
    this.campaignId = props.campaignId;
    this.groupId = props.groupId;
    this.emailTemplateId = props.emailTemplateId;
    this.landingPageId = props.landingPageId;
    this.assignedMode = props.assignedMode ?? 'auto';
    this.createdAt = props.createdAt ?? new Date();
  }
}
