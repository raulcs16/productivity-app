import { FDFile } from "./file";

export type FDDirectory = {
  id: number;
  title: string;
  files: FDFile[];
};
