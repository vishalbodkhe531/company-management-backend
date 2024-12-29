import { myCache } from "../app.js";
import { invalidateCacheProps } from "../types/types.js";

export const invalidateCache = async ({ project }: invalidateCacheProps) => {
  if (project) {
    const projectKeys: string[] = ["all-projects"];
    myCache.del(projectKeys);
  }
};
