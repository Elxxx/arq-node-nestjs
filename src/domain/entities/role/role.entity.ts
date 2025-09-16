
export class Role {
 readonly id: number;
  name: string;
  tenantScoped: boolean;

  constructor(props: { id: number; name: string; tenantScoped?: boolean }) {
    this.id = props.id;
    this.name = props.name;
    this.tenantScoped = props.tenantScoped ?? true;
  }
}
