import { useCompanyModalStore } from "@/feature/companies/stores/useCompanyModalStore";
import { useCustomerModalStore } from "@/feature/customers/stores/useCustomersModel";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: any;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  // ✅ Access modal states from Zustand
  const { isOpen: isCompanyOpen } = useCompanyModalStore();
  const { isOpen: isCustomerOpen } = useCustomerModalStore();

  // ✅ Hide backdrop if another modal is open
  const backdropClass = isCompanyOpen || isCustomerOpen
  ? "bg-black/25"
  : "bg-black/50";

  return (
    <div
      id="filter-backdrop"
      className={`w-full h-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        backdropClass
      }`}
      aria-hidden={!open}
      onClick={(e) => {
        // Close when clicking the backdrop only
        if ((e.target as HTMLElement).id === "filter-backdrop") onClose();
      }}
      style={{ visibility: open ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
};

export default Modal;
