"use client";

import { Dispatch, SetStateAction } from "react";
import Loader from "../Loader/Loader";

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
  isLoading: boolean;
  type: string;
};

function ModalConfirmationDelete({
  showModal,
  setShowModal,
  onDelete,
  isLoading,
  type,
}: Props) {
  return (
    <div className="fixed inset-0 bg-white/60 z-[999] flex items-center justify-center transition-all duration-200">
      <div className="flex flex-col gap-3 px-10 py-8 max-w-xs bg-champagne-50 rounded-xl border-2 border-champagne-100">
        <h1 className="text-xl font-semibold tracking-wide">Peringatan.</h1>
        <h1 className="text-base tracking-wide">
          Apakah anda yakin ingin menghapus {type} ini ?
        </h1>
        <h1 className="text-red-500 text-xs">
          *Jika anda menghapusnya, maka tidak akan bisa dikembalikan kembali
        </h1>

        <div className="flex flex-row justify-around items-center mt-5">
          <button
            onClick={() => setShowModal(!showModal)}
            disabled={isLoading}
            className="border border-sage-300 py-2 px-4 rounded-md tracking-wide text-sm text-black transition-all duration-200 hover:bg-sage-300 disabled:cursor-auto disabled:text-black disabled:bg-stone-300 disabled:border-stone-400/50"
          >
            Kembali
          </button>
          <button
            onClick={onDelete}
            disabled={isLoading}
            className="border border-red-400 bg-red-400 py-2 px-4 rounded-md tracking-wide text-sm text-white transition-all duration-200 hover:bg-red-300 disabled:cursor-auto disabled:text-black disabled:bg-stone-300 disabled:border-stone-400/50"
          >
            {isLoading ? (
              <Loader borderColor="border-black" text="Loading" />
            ) : (
              "Hapus aja"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmationDelete;
