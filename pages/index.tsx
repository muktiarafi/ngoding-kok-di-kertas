import { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { toggleModal } from "../utils/toggle-modal";
import { SketchConfig } from "../utils/interfaces/sketch-config";
import SaveModal from "../components/SaveModal";
import dynamic from "next/dynamic";
import p5Types from "p5";
import ConfigurationModal from "../components/ConfigurationModal";

const Home = () => {
  let text = "";
  let save = false;
  let fileName = "";
  let image: p5Types.Image;
  let imageX = 0;
  let imageY = 0;
  let font: p5Types.Font;
  let textConfig: SketchConfig = {
    x: 60,
    y: 85,
    fill: 30,
    textLeading: 22,
    textSize: 36,
  };

  const preload = (p5: p5Types) => {
    font = p5.loadFont("My_handwriting.ttf");
    image = p5.loadImage("/folio1.jpg", (p1) => {
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

  const setNewConfig = (config: SketchConfig) => {
    textConfig.x = config.x;
    textConfig.y = config.y;
    textConfig.fill = config.fill;
    textConfig.textLeading = config.textLeading;
    textConfig.textSize = config.textSize;
    localStorage.setItem("text-config", JSON.stringify(textConfig));
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

  useEffect(() => {
    const savedConfig = localStorage.getItem("text-config");
    if (savedConfig) {
      const config: SketchConfig = JSON.parse(savedConfig);
      textConfig.x = config.x;
      textConfig.y = config.y;
      textConfig.fill = config.fill;
      textConfig.textLeading = config.textLeading;
      textConfig.textSize = config.textSize;
    }
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
        <button
          onClick={() => {
            // save = true;
            toggleModal("config-modal");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
        >
          Atur Text
        </button>
        <button
          onClick={() => {
            // save = true;
            toggleModal("save-modal");
          }}
          className="row-span-1 col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
        >
          Simpan Gambar
        </button>
      </div>
      <ConfigurationModal
        configInit={textConfig}
        onSaveCallback={setNewConfig}
      />
      <SaveModal onSaveCallback={saveFileName} />
    </div>
  );
};

export default Home;
