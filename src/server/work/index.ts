import { createJsonWorkRepository } from "@/server/work/json-repository";
import type { WorkRepository } from "@/server/work/repository";

export const workRepository: WorkRepository = createJsonWorkRepository();
