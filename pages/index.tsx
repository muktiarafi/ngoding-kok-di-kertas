import { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { toggleModal } from "../utils/toggle-modal";
import { SketchConfig } from "../utils/interfaces/sketch-config";
import SaveModal from "../components/SaveModal";
import { changeConfig } from "../redux/actions";
import { StoreState } from "../redux/reducers";
import { defaultConfig, imageConfig } from "../utils/default-config";
import dynamic from "next/dynamic";
import p5Types from "p5";
import ConfigurationModal from "../components/ConfigurationModal";

type HomeProps = {
  config: imageConfig;
  changeConfig: typeof changeConfig;
};

let text = "";

const Home = ({ config, changeConfig }: HomeProps) => {
  const [select, setSelect] = useState(0);
  let save = false;
  let fileName = "";
  let image: p5Types.Image;
  let imageX = 0;
  let imageY = 0;
  let font: p5Types.Font;
  let textConfig: SketchConfig = config.sketchConfig;

  const preload = (p5: p5Types) => {
    font = p5.loadFont("My_handwriting.ttf");
    image = p5.loadImage(config.imagePath, (p1) => {
      imageX = p1.width;
      imageY = p1.height;
    });
  };

  const setup = (p5: p5Types, cavasParentRef: Element) => {
    p5.createCanvas(imageX, imageY).parent(cavasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.image(image, 0, 0, imageX, imageY);
    p5.textFont(font);
    p5.textSize(textConfig.textSize);
    p5.textLeading(textConfig.textLeading);
    p5.fill(textConfig.fill);
    p5.text(text, textConfig.x, textConfig.y);

    if (save) {
      p5.saveCanvas(fileName, "jpg");
      save = false;
    }
  };

  const setNewConfig = (newConfig: SketchConfig) => {
    textConfig = newConfig;
  };

  const saveFileName = (name: string) => {
    fileName = name;
    save = true;
  };

  const delayedText = useCallback(
    debounce((q) => {
      text = q;
    }, 500),
    []
  );

  const renderSketch = () => {
    if (typeof window !== "undefined") {
      const Sketch = dynamic(() => import("react-p5"));
      return (
        <Sketch
          className="row-span-4 rounded"
          preload={preload}
          setup={setup}
          draw={draw}
        />
      );
    }
    return null;
  };

  const renderDropDown = () => {
    const options = defaultConfig.map((cnfg, i) => {
      return (
        <option key={cnfg.id} value={i}>
          {cnfg.name}
        </option>
      );
    });
    return (
      <div className="inline-block">
        <select
          value={select}
          onChange={(e) => {
            setSelect(Number.parseInt(e.target.value));
            changeConfig(defaultConfig[Number.parseInt(e.target.value)]);
          }}
          className="text-white block appearance-none w-full bg-blue-500 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline w-1/3"
        >
          {options}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
  };

  useEffect(() => {
    (document.getElementById("text") as HTMLTextAreaElement).addEventListener(
      "keydown",
      function (e) {
        if (e.key == "Tab") {
          e.preventDefault();
          let start = this.selectionStart;
          let end = this.selectionEnd;

          this.value =
            this.value.substring(0, start) + "\t" + this.value.substring(end);
          this.selectionStart = this.selectionEnd = start + 1;
        }
      }
    );
  }, []);

  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 justify-center">
      {renderSketch()}
      <textarea
        id="text"
        className="ml-8 row-span-3 col-span-2 rounded px-4 py-2"
        cols={50}
        onChange={(e) => {
          delayedText(e.target.value);
        }}
      />
      <div className="flex-auto ml-8 row-span-1 col-span-2">
        {renderDropDown()}
        <button
          onClick={() => {
            toggleModal("config-modal");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3"
        >
          Atur Text
        </button>
        <button
          onClick={() => {
            toggleModal("save-modal");
          }}
          className="row-span-1 col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3"
        >
          Simpan Gambar
        </button>
      </div>
      <ConfigurationModal onSaveCallback={setNewConfig} />
      <SaveModal onSaveCallback={saveFileName} />
    </div>
  );
};

const mapStateToProps = ({ config }: StoreState): { config: imageConfig } => {
  return {
    config,
  };
};

const mapDispatchToProps = {
  changeConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
