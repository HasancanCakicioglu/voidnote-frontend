import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToDelete: { title: string } | null;
  handleConfirmDelete: () => void;
  type: 'note' | 'tree note' | 'calendar note' | 'todo list';
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, setOpen, noteToDelete, handleConfirmDelete, type }) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the '<span className="font-bold">{noteToDelete?.title && noteToDelete.title !== "Untitled" ? noteToDelete.title : "Untitled"}</span>' {type}? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
