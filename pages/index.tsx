import { useEffect } from "react";

const Home = () => {
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
      <img
        src="/paper.jpg"
        alt="paper"
        className="h-screen row-span-4 rounded"
      />
      <textarea
        id="text"
        className="ml-8 row-span-3 col-span-2 rounded px-4 py-2"
        cols={50}
      />
      <button className="ml-8 row-span-1 col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Simpan Gambar
      </button>
    </div>
  );
};

export default Home;
