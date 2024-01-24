import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface ConfirmationModalProps {
  readonly isOpen: boolean;
  readonly onOpenChange: () => void;
  readonly modalTitle: string;
  readonly modalDescription?: string;
  readonly actionTitle?: string;
  readonly modalAction?: () => void;
  readonly actionColor?:
    | 'danger'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'default';
  readonly actionPending?: boolean;
  readonly isActionSubmit?: boolean;
  readonly isActionDisabled?: boolean;
  readonly children?: ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  modalDescription,
  onOpenChange,
  modalAction,
  modalTitle,
  actionTitle,
  actionColor,
  actionPending,
  isActionSubmit,
  isActionDisabled,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="sm:mt-32">
        <ModalHeader className="flex justify-center text-center">
          {modalTitle}
        </ModalHeader>
        <ModalBody className="flex justify-center w-full text-center">
          {modalDescription}
          {children}
        </ModalBody>
        {actionTitle && modalAction && (
          <ModalFooter className="flex justify-center">
            <Button
              onClick={modalAction}
              color={actionColor || 'success'}
              className="text-white"
              isLoading={actionPending}
              type={isActionSubmit ? 'submit' : 'button'}
              isDisabled={isActionDisabled}
            >
              {actionTitle}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
