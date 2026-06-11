import type { ReactNode } from "react";

type ModalProps = {
  title: ReactNode;
  children: ReactNode;
  onModalClose: () => void;
};

const Modal = ({ title, children, onModalClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="w-full  max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
        <div className="flex place-content-between  w-full">
          <h2 className="text-lg font-semibold text-gray-950">{title}</h2>
          <button
            type="button"
            className="cursor-pointer"
            onClick={onModalClose}
            aria-label="Close modal"
          >
            X
          </button>
        </div>

        <div className="mt-5 flex min-h-72 items-center justify-center rounded-md bg-gray-50 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
