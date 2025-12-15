import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useEffect } from "react";

export function SalesOrderDetailItems({ soId, triggerComponent }: { soId: number, triggerComponent: React.ReactNode }) {
  useEffect(() => {
    console.log(soId);
  }, [soId]);

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sales Order - Item List</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-64 pr-4">
          <div className="flex flex-col gap-2">
            <Card>
              <CardHeader>
                <CardTitle>Laptop</CardTitle>
                <CardDescription>LPT-DL-XPS-13</CardDescription>
              </CardHeader>
              <CardContent>
                Ordered Quantity 5. Special Instruction: Please check the body…
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wireless Mouse</CardTitle>
                <CardDescription>ACC-MS-LOGI-MX</CardDescription>
              </CardHeader>
              <CardContent>
                Ordered Quantity: 5. Special Instruction: Please check…
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Laptop</CardTitle>
                <CardDescription>ACC-MS-LOGI-MX</CardDescription>
              </CardHeader>
              <CardContent>
                Ordered Quantity: 3. Special Instruction: Please check…
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mechanical Keyboard</CardTitle>
                <CardDescription>ACC-KB-RAZ-BH</CardDescription>
              </CardHeader>
              <CardContent>
                Ordered Quantity: 4. Special Instruction: Please check…
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-end mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PopupConfirmAction({ triggerComponent }: { triggerComponent: React.ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Action Name</AlertDialogTitle>
          <AlertDialogDescription>Are you sure do this action ?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
