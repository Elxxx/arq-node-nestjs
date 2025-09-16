// src/domain/entities/campaign/campaign-group-member.entity.ts
export class CampaignGroupMember {
  readonly id: string;
  readonly groupId: string;
  readonly userId: string;
  readonly departmentId?: string;

  constructor(props: { id: string; groupId: string; userId: string; departmentId?: string }) {
    this.id = props.id;
    this.groupId = props.groupId;
    this.userId = props.userId;
    this.departmentId = props.departmentId;
  }
}
