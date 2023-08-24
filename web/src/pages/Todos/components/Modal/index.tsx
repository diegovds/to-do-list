import { useRef, useState } from "react";

import { useOnClickOutside } from "usehooks-ts";
import Button from "../../../../components/Button";

type Props = {
  children: React.ReactNode;
  modalStatus: (status: boolean) => void;
  handleDeleteTodo: (toDelete: boolean) => void;
};

const Modal = ({ children, modalStatus, handleDeleteTodo }: Props) => {
  const [submission, setSubmission] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    modalStatus(false);
  };

  useOnClickOutside(contentRef, !submission ? handleClickOutside : () => {});

  return (
    <div className="bg-modal backdrop-blur-sm fixed top-0 bottom-0 right-0 left-0 z-10 flex items-center justify-center">
      <div
        className="bg-darker p-10 rounded-xl shadow-card text-center max-w-[90%]"
        ref={contentRef}
      >
        {children}
        <div className="flex w-full justify-center gap-6 mt-6">
          <Button
            onClick={!submission ? handleClickOutside : () => {}}
            disabled={submission}
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-500"
            onClick={() => {
              setSubmission(true);
              handleDeleteTodo(true);
            }}
            disabled={submission}
          >
            Deletar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
