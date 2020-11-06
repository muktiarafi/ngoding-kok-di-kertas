import { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { toggleModal } from "../utils/toggle-modal";
import Modal from "../components/Modal";
import dynamic from "next/dynamic";
import p5Types from "p5";

const Home = () => {
  let text = "";
  let save = false;
  let fileName = "";
  let image: p5Types.Image;
  let imageX = 0;
  let imageY = 0;
  let font: p5Types.Font;

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
    p5.textSize(36);
    p5.textLeading(22);
    p5.fill(30);
    p5.text(text, 60, 85);

    if (save) {
      p5.saveCanvas(fileName, "jpg");
      save = false;
    }
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
      <button
        onClick={() => {
          // save = true;
          toggleModal();
        }}
        className="ml-8 row-span-1 col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Simpan Gambar
      </button>
      <Modal onSaveCallback={saveFileName} />
    </div>
  );
};

export default Home;
