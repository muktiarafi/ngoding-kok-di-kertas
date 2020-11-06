import { useState } from "react";
import Modal from "./Modal";

type SaveModalProps = {
  onSaveCallback(name: string): void;
};

const SaveModal = ({ onSaveCallback }: SaveModalProps) => {
  const [fileName, setFileName] = useState("");
  return (
    <Modal
      id="save-modal"
      title="Tuliskan Nama File"
      onSaveCallback={() => {
        onSaveCallback(fileName);
        setFileName("");
      }}
    >
      <input
        type="text"
        className="bg-gray-200 rounded border-2 w-full py-2 px-4"
        value={fileName}
        onChange={(e) => {
          setFileName(e.target.value);
        }}
      />
    </Modal>
  );
};

export default SaveModal;
