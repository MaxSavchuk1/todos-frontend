import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./styles.module.css";
import { memo } from "react";

type Props = {
  open: boolean;
  handleClose: (value: boolean) => void;
  children: React.ReactNode;
};

function DialogContainer({ handleClose, open, children }: Props) {
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop transition className={styles.backdrop} />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className={styles.panelContainer}>
          <DialogPanel transition className={styles.panel}>
            <div className={styles.closeButtonContainer}>
              <button
                type="button"
                onClick={() => handleClose(false)}
                className={styles.closeButton}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(DialogContainer);
