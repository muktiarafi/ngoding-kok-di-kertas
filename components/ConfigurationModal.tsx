import { useState } from "react";
import Modal from "./Modal";
import { SketchConfig } from "../utils/interfaces/sketch-config";

type ConfigurationModalProps = {
  configInit: SketchConfig;
  onSaveCallback(config: SketchConfig): void;
};

const ConfigurationModal = ({
  configInit,
  onSaveCallback,
}: ConfigurationModalProps) => {
  const [x, setX] = useState(configInit.x);
  const [y, setY] = useState(configInit.y);
  const [fill, setFill] = useState(configInit.fill);
  const [leading, setLeading] = useState(configInit.textLeading);
  const [size, setSize] = useState(configInit.textSize);

  return (
    <Modal
      id="config-modal"
      title="Atur Teks"
      onSaveCallback={() => {
        onSaveCallback({
          x,
          y,
          fill,
          textLeading: leading,
          textSize: size,
        });
      }}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="x"
        >
          X-Coordinate
        </label>
        <input
          name="x"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="x-coordinate"
          value={x}
          onChange={(e) => setX(Number.parseInt(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="y"
        >
          Y-Coordinate
        </label>
        <input
          name="y"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Y-coordinate"
          value={y}
          onChange={(e) => setY(Number.parseInt(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="fill"
        >
          Text Fill
        </label>
        <input
          name="fill"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Text Fill"
          value={fill}
          onChange={(e) => setFill(Number.parseInt(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="leading"
        >
          Text Leading
        </label>
        <input
          name="leading"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Text Leading"
          value={leading}
          onChange={(e) => setLeading(Number.parseInt(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="size"
        >
          Text Size
        </label>
        <input
          name="size"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="x-coordinate"
          value={size}
          onChange={(e) => setSize(Number.parseInt(e.target.value))}
        />
      </div>
    </Modal>
  );
};

export default ConfigurationModal;
