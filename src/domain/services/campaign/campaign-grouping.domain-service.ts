// src/domain/services/campaign/campaign-grouping.domain-service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { DifficultyLevel } from '../../entities/campaign/campaign-group.entity';

export interface GroupingInput {
  users: Array<{ userId: string; departmentId?: string }>;
  maxSharePerDept: number; // 0.2 (20%)
  desiredGroups: number;
}

export interface GroupingResult {
  groups: Array<{
    name: string;
    difficulty: DifficultyLevel; // computed from ai score
    aiScore: number;             // 0..100
    members: Array<{ userId: string; departmentId?: string }>;
  }>;
}

@Injectable()
export class CampaignGroupingDomainService {
  /**
   * Regla principal:
   * - No más del `maxSharePerDept` por departamento en cada grupo.
   * - Balancear tamaños.
   * - Calcular un score de “riesgo” por mezcla de departamentos.
   */
  group(input: GroupingInput): GroupingResult {
    const { users, maxSharePerDept, desiredGroups } = input;
    if (desiredGroups <= 0) throw new BadRequestException('El número de grupos debe ser > 0');
    if (users.length === 0) return { groups: [] };

    // 1) distribuir usuarios en round-robin por depto, respetando maxShare
    const byDept = new Map<string, string[]>(); // deptId -> userIds
    for (const u of users) {
      const key = u.departmentId ?? 'NO_DEPT';
      const arr = byDept.get(key) ?? [];
      arr.push(u.userId);
      byDept.set(key, arr);
    }

    const groupBuckets: Array<{ members: Array<{ userId: string; departmentId?: string }> }> =
      Array.from({ length: desiredGroups }, () => ({ members: [] }));

    // helper para verificar % por dept en un grupo
    const canPlace = (bucket: { members: Array<{ userId: string; departmentId?: string }> }, dept: string) => {
      const total = bucket.members.length + 1; // +1 por el que intentas meter
      const countDept = bucket.members.filter(m => (m.departmentId ?? 'NO_DEPT') === dept).length + 1;
      return countDept / total <= maxSharePerDept + 1e-6;
    };

    // Round-robin por depto para repartir evitando exceder cuota
    const depts = Array.from(byDept.keys());
    let placed = 0;
    while (placed < users.length) {
      let progress = false;
      for (const dept of depts) {
        const arr = byDept.get(dept)!;
        if (arr.length === 0) continue;
        // buscar un bucket donde se pueda meter
        let idx = 0;
        let positioned = false;
        while (idx < groupBuckets.length) {
          const b = groupBuckets[idx];
          if (canPlace(b, dept)) {
            b.members.push({ userId: arr.shift()!, departmentId: dept === 'NO_DEPT' ? undefined : dept });
            placed++; positioned = true; progress = true;
            break;
          }
          idx++;
        }
        // si no lo pudimos poner en ninguno (regla muy restrictiva), relajar en el más pequeño
        if (!positioned) {
          const smallest = groupBuckets.reduce((min, x, i) => x.members.length < groupBuckets[min].members.length ? i : min, 0);
          groupBuckets[smallest].members.push({ userId: arr.shift()!, departmentId: dept === 'NO_DEPT' ? undefined : dept });
          placed++; progress = true;
        }
      }
      if (!progress) break;
    }

    // 2) Calcular score IA por grupo (placeholder)
    // Aquí llamarías a un servicio real de IA/ML. De momento:
    const groups = groupBuckets.map((b, i) => {
      const deptCounts = new Map<string, number>();
      for (const m of b.members) {
        const key = m.departmentId ?? 'NO_DEPT';
        deptCounts.set(key, (deptCounts.get(key) ?? 0) + 1);
      }
      const diversity = deptCounts.size;
      // score simple: menos diversidad => mayor susceptibilidad (ejemplo)
      const aiScore = Math.min(100, Math.max(10, 110 - diversity * 20));
      const difficulty: DifficultyLevel = aiScore >= 70 ? 'high' : aiScore >= 40 ? 'medium' : 'low';
      return {
        name: `Grupo ${i + 1}`,
        difficulty,
        aiScore,
        members: b.members,
      };
    });

    return { groups };
  }
}
