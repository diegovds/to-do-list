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
        className="bg-darker p-5 rounded-xl shadow-card text-center w-[90%] lg:w-[50%]"
        ref={contentRef}
      >
        {children}
        <div className="flex w-full justify-center gap-5 mt-5">
          <Button
            className="w-24"
            onClick={!submission ? handleClickOutside : () => {}}
            disabled={submission}
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-500 w-24"
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
