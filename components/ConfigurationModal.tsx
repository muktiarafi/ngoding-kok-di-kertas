import { useState, useEffect, useRef, ChangeEvent } from "react";
import { connect } from "react-redux";
import { StoreState } from "../redux/reducers";
import { imageConfig } from "../utils/default-config";
import Modal from "./Modal";
import { SketchConfig } from "../utils/interfaces/sketch-config";

type ConfigurationModalProps = {
  config: imageConfig;
  onSaveCallback(config: SketchConfig): void;
};

const ConfigurationModal = ({
  config,
  onSaveCallback,
}: ConfigurationModalProps) => {
  const reduxRef = useRef<SketchConfig>(config.sketchConfig);
  const [inputConfig, setInputConfig] = useState<SketchConfig>(
    config.sketchConfig
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputConfig({
      ...inputConfig,
      [e.target.name]: Number.parseInt(e.target.value),
    });
  };

  useEffect(() => {
    if (reduxRef.current !== config.sketchConfig) {
      setInputConfig(config.sketchConfig);
      reduxRef.current = config.sketchConfig;
    }
  });

  return (
    <Modal
      id="config-modal"
      title="Atur Teks"
      onSaveCallback={() => {
        onSaveCallback(inputConfig);
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
          value={inputConfig.x}
          onChange={handleInputChange}
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
          value={inputConfig.y}
          onChange={handleInputChange}
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
          value={inputConfig.fill}
          onChange={handleInputChange}
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
          name="textLeading"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Text Leading"
          value={inputConfig.textLeading}
          onChange={handleInputChange}
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
          name="textSize"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="x-coordinate"
          value={inputConfig.textSize}
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ config }: StoreState): { config: imageConfig } => {
  return {
    config,
  };
};

export default connect(mapStateToProps)(ConfigurationModal);
