import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface ConfirmDeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToDelete: string  | null | undefined;
  handleConfirmDelete: () => void;
  type: 'note' | 'tree note' | 'calendar note' | 'todo list' | 'variable';
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, setOpen, noteToDelete, handleConfirmDelete, type }) => {
  const t = useTranslations("confirmDelete");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>{t("confirmDeleteTitle")}</DialogTitle>
        <DialogDescription>
          {t("confirmDeleteDescription")} '<span className="font-bold">{noteToDelete && noteToDelete !== "Untitled" ? noteToDelete : "Untitled"}</span>' {type}? {t("confirmDeleteDescriptionSecond")}.
        </DialogDescription>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {t("cancel")}
          </Button>
          <Button variant="default" onClick={handleConfirmDelete}>
            {t("yesDelete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
