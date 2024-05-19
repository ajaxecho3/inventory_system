/* eslint-disable react/prop-types */
import * as Dialog from "@radix-ui/react-dialog";




const Modal = (
  { children, modelTitle, modelAction, modalActionTitle, modelCancel, buttonTitle, buttonClassName }
) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonClassName}>
        {buttonTitle}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-4 w-full max-w-lg">
          <div className="bg-white rounded-md shadow-lg p-4">

            <div className="mt-2 text-center sm:text-left">
              <Dialog.Title className="text-lg font-medium text-gray-800">
                {modelTitle}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-gray-500">
                {children}
              </Dialog.Description>
              <div className="items-center gap-2 mt-3 text-sm sm:flex">
                <Dialog.Close asChild>
                  <button onClick={modelAction} className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md ring-offset-2 ring-indigo-600 focus:ring-2">
                    {modalActionTitle}
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button
                    onClick={modelCancel}
                    aria-label="Close"
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border ring-offset-2 ring-red-600 focus:ring-2"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};


export default Modal;
