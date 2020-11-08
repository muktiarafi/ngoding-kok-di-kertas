import { SketchConfig } from "./interfaces/sketch-config";

export interface imageConfig {
  id: number;
  name: string;
  imagePath: string;
  sketchConfig: SketchConfig;
}

export const defaultConfig: imageConfig[] = [
  {
    id: 1,
    name: "Folio 1",
    imagePath: "/folio1.jpg",
    sketchConfig: {
      x: 60,
      y: 85,
      fill: 30,
      textLeading: 22,
      textSize: 36,
    },
  },
  {
    id: 2,
    name: "Kertas Biasa",
    imagePath: "/paper.jpg",
    sketchConfig: {
      x: 80,
      y: 65,
      fill: 30,
      textLeading: 21,
      textSize: 36,
    },
  },
];
