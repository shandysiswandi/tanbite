import { Monitor, RefreshCw, Search, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";

export function ManagementUsers() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card>
      <CardHeader className="has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
        <CardTitle>Management Users</CardTitle>
        <CardDescription>
          Review and manage users for your workspace.
        </CardDescription>
        <CardAction className="hidden md:flex">
          <ButtonGroup>
            {isClient ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Import</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import users</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file to add users to your workspace.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter showCloseButton />
                </DialogContent>
              </Dialog>
            ) : (
              <Button size="sm">Import</Button>
            )}
            <ButtonGroupSeparator />

            {isClient ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Export</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Export users</DialogTitle>
                    <DialogDescription>
                      Download a CSV export of your current user list.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter showCloseButton />
                </DialogContent>
              </Dialog>
            ) : (
              <Button size="sm">Export</Button>
            )}
            <ButtonGroupSeparator />

            {isClient ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Create</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create user</DialogTitle>
                    <DialogDescription>
                      Add a new user to your workspace.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter showCloseButton />
                </DialogContent>
              </Dialog>
            ) : (
              <Button size="sm">Create</Button>
            )}
          </ButtonGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="hidden flex-col gap-4 md:flex">
          {/* toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
              <form className="flex flex-1">
                <InputGroup>
                  <InputGroupInput
                    className="h-8 w-full min-w-0"
                    enterKeyHint="search"
                    name="search"
                    placeholder="Search"
                    type="search"
                  />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                </InputGroup>
              </form>

              <Button size="sm" variant="ghost">
                Reset
                <X />
              </Button>
            </div>

            <Separator
              className="mx-2 data-[orientation=vertical]:h-8"
              orientation="vertical"
            />

            <div className="flex items-center gap-2">
              <Button
                className="size-8"
                size="icon"
                title="Refresh"
                variant="outline"
              >
                <span className="sr-only">Refresh</span>
                <RefreshCw />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="ml-auto hidden h-8 lg:flex"
                    size="sm"
                    title="Toggle columns"
                    variant="outline"
                  >
                    <Settings2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuCheckboxItem checked className="capitalize">
                    Example
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* table */}
        </div>

        {/* fallback required destop view */}
        <div className="flex flex-col gap-4 md:hidden">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border bg-muted">
                <Monitor className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">Desktop view required</p>
                <p className="text-balance text-muted-foreground text-sm">
                  This table is optimized for larger screens. Please open this
                  page on a laptop or desktop.
                </p>
              </div>
              <Button size="sm" variant="outline">
                Refresh
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
