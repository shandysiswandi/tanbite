import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageBase } from "@/features/console/components/page-base";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/managements/")({
  head: () => ({
    meta: seo({
      path: "/console/managements",
      title: "Management",
      description:
        "Monitor workspace access, governance, and administrative activity.",
    }),
  }),
  component: () => {
    return (
      <PageBase
        subtitle="Monitor workspace access, governance, and administrative activity."
        title="Management"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <CardDescription>Total members</CardDescription>
              <Users className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-2xl leading-none">184</p>
              <p className="mt-2 text-muted-foreground text-xs">
                +12 this month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <CardDescription>Pending invites</CardDescription>
              <UserPlus className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-2xl leading-none">9</p>
              <p className="mt-2 text-muted-foreground text-xs">
                3 expiring soon
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <CardDescription>Policies enabled</CardDescription>
              <ShieldCheck className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-2xl leading-none">27</p>
              <p className="mt-2 text-muted-foreground text-xs">
                2 need review
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Control center</CardTitle>
            <CardDescription>
              Jump into user access and policy administration tasks.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 transition-colors duration-200 hover:bg-accent/30">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="inline-flex items-center gap-2 font-medium text-sm">
                    <Users className="size-4" />
                    Users and roles
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Invite members, assign permissions, and audit account
                    status.
                  </p>
                </div>
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <Button asChild className="w-full sm:w-auto" size="sm">
                    <Link to="/console/managements/users" viewTransition>
                      Open
                      <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="rounded-lg border p-4 transition-colors duration-200 hover:bg-accent/30">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="inline-flex items-center gap-2 font-medium text-sm">
                    <ShieldCheck className="size-4" />
                    Policies and controls
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Define role boundaries and enforce governance requirements.
                  </p>
                </div>
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <Button asChild className="w-full sm:w-auto" size="sm">
                    <Link to="/console/managements/policies" viewTransition>
                      Open
                      <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageBase>
    );
  },
});
