import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronDown,
  MoreHorizontal,
  RefreshCw,
  Search,
  Settings2,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageBase } from "@/features/console/components/page-base";
import { requirePermission } from "@/features/console/libraries/permission";
import { PERMISSIONS } from "@/libraries/constants/permission";
import { seo } from "@/libraries/utils/seo";

type UserStatus = "Active" | "Invited" | "Suspended";

const users: Array<{
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  status: UserStatus;
  lastActive: string;
}> = [
  {
    id: "USR-1001",
    name: "Sofia Carter",
    email: "sofia@tanbite.com",
    role: "Owner",
    team: "Leadership",
    status: "Active",
    lastActive: "2 minutes ago",
  },
  {
    id: "USR-1042",
    name: "Liam Brooks",
    email: "liam@tanbite.com",
    role: "Admin",
    team: "Operations",
    status: "Active",
    lastActive: "10 minutes ago",
  },
  {
    id: "USR-1077",
    name: "Maya Patel",
    email: "maya@tanbite.com",
    role: "Manager",
    team: "Marketing",
    status: "Invited",
    lastActive: "Pending invite",
  },
  {
    id: "USR-1130",
    name: "Ethan Moore",
    email: "ethan@tanbite.com",
    role: "Member",
    team: "Product",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: "USR-1186",
    name: "Ava Nguyen",
    email: "ava@tanbite.com",
    role: "Member",
    team: "Engineering",
    status: "Suspended",
    lastActive: "3 days ago",
  },
  {
    id: "USR-1221",
    name: "Noah Reyes",
    email: "noah@tanbite.com",
    role: "Support",
    team: "Customer success",
    status: "Active",
    lastActive: "5 hours ago",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((value) => value[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStatusBadgeVariant(status: UserStatus): "default" | "outline" {
  return status === "Active" ? "default" : "outline";
}

export const Route = createFileRoute("/console/managements/users/")({
  head: () => ({
    meta: seo({
      path: "/console/managements/users",
      title: "User management",
      description:
        "Manage workspace members, roles, and access from one place.",
    }),
  }),
  loader: async ({ context, location }) => {
    await requirePermission({
      queryClient: context.queryClient,
      permission: PERMISSIONS.management.users,
      locationHref: location.href,
    });
  },
  component: () => {
    return (
      <PageBase
        subtitle="Manage workspace members, roles, and access from one place."
        title="User management"
      >
        <Card>
          <CardHeader className="has-data-[slot=card-action]:grid-cols-1 md:has-data-[slot=card-action]:grid-cols-[1fr_auto]">
            <CardTitle>User management</CardTitle>
            <CardDescription>
              Review workspace members, roles, and access in one place.
            </CardDescription>
            <CardAction className="hidden md:flex">
              <ButtonGroup>
                <Button asChild size="sm">
                  <Link to="/console/managements/users/import" viewTransition>
                    Import
                  </Link>
                </Button>
                <ButtonGroupSeparator />

                <Button asChild size="sm">
                  <Link to="/console/managements/users/export" viewTransition>
                    Export
                  </Link>
                </Button>
                <ButtonGroupSeparator />

                <Button asChild size="sm">
                  <Link to="/console/managements/users/create" viewTransition>
                    Create
                  </Link>
                </Button>
              </ButtonGroup>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="font-medium text-sm">All users</p>
                  <p className="text-muted-foreground text-sm">
                    Browse and manage workspace members.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <form className="flex min-w-0 flex-1">
                    <InputGroup>
                      <InputGroupInput
                        className="h-8 w-full min-w-0"
                        enterKeyHint="search"
                        name="search"
                        placeholder="Filter by name or email"
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

                <div className="flex shrink-0 items-center gap-2">
                  <Separator
                    className="data-[orientation=vertical]:h-8"
                    orientation="vertical"
                  />

                  <Button
                    className="size-8"
                    size="icon-sm"
                    title="Refresh"
                    variant="outline"
                  >
                    <span className="sr-only">Refresh</span>
                    <RefreshCw />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        title="Toggle columns"
                        variant="outline"
                      >
                        <Settings2 />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Full name
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>
                        Role
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>
                        Team
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>
                        Status
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>
                        Last active
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="overflow-hidden rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10 pl-4">
                        <Checkbox aria-label="Select all users" />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Role
                      </TableHead>
                      <TableHead className="hidden xl:table-cell">
                        Team
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Last active
                      </TableHead>
                      <TableHead className="w-10 pr-4 text-right" />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="pl-4">
                          <Checkbox aria-label={`Select ${user.name}`} />
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-0.5">
                              <p className="font-medium text-sm leading-none">
                                {user.name}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="hidden lg:table-cell">
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>

                        <TableCell className="hidden xl:table-cell">
                          {user.team}
                        </TableCell>

                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="hidden text-muted-foreground text-sm md:table-cell">
                          {user.lastActive}
                        </TableCell>

                        <TableCell className="pr-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                className="ml-auto"
                                size="icon-sm"
                                title={`Open actions for ${user.name}`}
                                variant="ghost"
                              >
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem>View profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit user</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive">
                                Remove user
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-3 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
                <p>0 of {users.length} row(s) selected.</p>
                <div className="flex items-center gap-2">
                  <span>Rows per page</span>
                  <Button size="sm" variant="outline">
                    10
                    <ChevronDown />
                  </Button>
                  <span className="hidden sm:inline">Page 1 of 1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageBase>
    );
  },
});
