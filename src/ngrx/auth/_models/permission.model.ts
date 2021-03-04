export class Permission {
  id: number;
  title: string;
  level: number;
  parentId: number;
  isSelected: boolean;
  name: string;
  _children: Permission[];
}
