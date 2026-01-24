import { createFileRoute } from "@tanstack/react-router";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PageBase } from "@/features/console/components/page-base";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/")({
  head: () => ({
    meta: seo({
      path: "/console/",
      title: "Dashboard overview",
      description:
        "Track revenue, customer growth, account activity, and performance trends in one place.",
    }),
  }),
  component: () => {
    return (
      <PageBase
        subtitle="Track revenue, customer growth, account activity, and performance trends in one place."
        title="Dashboard overview"
      >
        <DashboardCards />
        <ChartAreaInteractive />
      </PageBase>
    );
  },
});

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  customers: {
    label: "Customers",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface RevenueChartDataPoint {
  date: string;
  revenue: number;
  customers: number;
}

const chartData: RevenueChartDataPoint[] = [
  { date: "2024-04-01", revenue: 222, customers: 150 },
  { date: "2024-04-02", revenue: 97, customers: 180 },
  { date: "2024-04-03", revenue: 167, customers: 120 },
  { date: "2024-04-04", revenue: 242, customers: 260 },
  { date: "2024-04-05", revenue: 373, customers: 290 },
  { date: "2024-04-06", revenue: 301, customers: 340 },
  { date: "2024-04-07", revenue: 245, customers: 180 },
  { date: "2024-04-08", revenue: 409, customers: 320 },
  { date: "2024-04-09", revenue: 59, customers: 110 },
  { date: "2024-04-10", revenue: 261, customers: 190 },
  { date: "2024-04-11", revenue: 327, customers: 350 },
  { date: "2024-04-12", revenue: 292, customers: 210 },
  { date: "2024-04-13", revenue: 342, customers: 380 },
  { date: "2024-04-14", revenue: 137, customers: 220 },
  { date: "2024-04-15", revenue: 120, customers: 170 },
  { date: "2024-04-16", revenue: 138, customers: 190 },
  { date: "2024-04-17", revenue: 446, customers: 360 },
  { date: "2024-04-18", revenue: 364, customers: 410 },
  { date: "2024-04-19", revenue: 243, customers: 180 },
  { date: "2024-04-20", revenue: 89, customers: 150 },
  { date: "2024-04-21", revenue: 137, customers: 200 },
  { date: "2024-04-22", revenue: 224, customers: 170 },
  { date: "2024-04-23", revenue: 138, customers: 230 },
  { date: "2024-04-24", revenue: 387, customers: 290 },
  { date: "2024-04-25", revenue: 215, customers: 250 },
  { date: "2024-04-26", revenue: 75, customers: 130 },
  { date: "2024-04-27", revenue: 383, customers: 420 },
  { date: "2024-04-28", revenue: 122, customers: 180 },
  { date: "2024-04-29", revenue: 315, customers: 240 },
  { date: "2024-04-30", revenue: 454, customers: 380 },
  { date: "2024-05-01", revenue: 165, customers: 220 },
  { date: "2024-05-02", revenue: 293, customers: 310 },
  { date: "2024-05-03", revenue: 247, customers: 190 },
  { date: "2024-05-04", revenue: 385, customers: 420 },
  { date: "2024-05-05", revenue: 481, customers: 390 },
  { date: "2024-05-06", revenue: 498, customers: 520 },
  { date: "2024-05-07", revenue: 388, customers: 300 },
  { date: "2024-05-08", revenue: 149, customers: 210 },
  { date: "2024-05-09", revenue: 227, customers: 180 },
  { date: "2024-05-10", revenue: 293, customers: 330 },
  { date: "2024-05-11", revenue: 335, customers: 270 },
  { date: "2024-05-12", revenue: 197, customers: 240 },
  { date: "2024-05-13", revenue: 197, customers: 160 },
  { date: "2024-05-14", revenue: 448, customers: 490 },
  { date: "2024-05-15", revenue: 473, customers: 380 },
  { date: "2024-05-16", revenue: 338, customers: 400 },
  { date: "2024-05-17", revenue: 499, customers: 420 },
  { date: "2024-05-18", revenue: 315, customers: 350 },
  { date: "2024-05-19", revenue: 235, customers: 180 },
  { date: "2024-05-20", revenue: 177, customers: 230 },
  { date: "2024-05-21", revenue: 82, customers: 140 },
  { date: "2024-05-22", revenue: 81, customers: 120 },
  { date: "2024-05-23", revenue: 252, customers: 290 },
  { date: "2024-05-24", revenue: 294, customers: 220 },
  { date: "2024-05-25", revenue: 201, customers: 250 },
  { date: "2024-05-26", revenue: 213, customers: 170 },
  { date: "2024-05-27", revenue: 420, customers: 460 },
  { date: "2024-05-28", revenue: 233, customers: 190 },
  { date: "2024-05-29", revenue: 78, customers: 130 },
  { date: "2024-05-30", revenue: 340, customers: 280 },
  { date: "2024-05-31", revenue: 178, customers: 230 },
  { date: "2024-06-01", revenue: 178, customers: 200 },
  { date: "2024-06-02", revenue: 470, customers: 410 },
  { date: "2024-06-03", revenue: 103, customers: 160 },
  { date: "2024-06-04", revenue: 439, customers: 380 },
  { date: "2024-06-05", revenue: 88, customers: 140 },
  { date: "2024-06-06", revenue: 294, customers: 250 },
  { date: "2024-06-07", revenue: 323, customers: 370 },
  { date: "2024-06-08", revenue: 385, customers: 320 },
  { date: "2024-06-09", revenue: 438, customers: 480 },
  { date: "2024-06-10", revenue: 155, customers: 200 },
  { date: "2024-06-11", revenue: 92, customers: 150 },
  { date: "2024-06-12", revenue: 492, customers: 420 },
  { date: "2024-06-13", revenue: 81, customers: 130 },
  { date: "2024-06-14", revenue: 426, customers: 380 },
  { date: "2024-06-15", revenue: 307, customers: 350 },
  { date: "2024-06-16", revenue: 371, customers: 310 },
  { date: "2024-06-17", revenue: 475, customers: 520 },
  { date: "2024-06-18", revenue: 107, customers: 170 },
  { date: "2024-06-19", revenue: 341, customers: 290 },
  { date: "2024-06-20", revenue: 408, customers: 450 },
  { date: "2024-06-21", revenue: 169, customers: 210 },
  { date: "2024-06-22", revenue: 317, customers: 270 },
  { date: "2024-06-23", revenue: 480, customers: 530 },
  { date: "2024-06-24", revenue: 132, customers: 180 },
  { date: "2024-06-25", revenue: 141, customers: 190 },
  { date: "2024-06-26", revenue: 434, customers: 380 },
  { date: "2024-06-27", revenue: 448, customers: 490 },
  { date: "2024-06-28", revenue: 149, customers: 200 },
  { date: "2024-06-29", revenue: 103, customers: 160 },
  { date: "2024-06-30", revenue: 446, customers: 400 },
];

function ChartAreaInteractive() {
  const [range, setRange] = useState<"1m" | "2m" | "3m">("3m");
  const revenueGradientId = useId().replaceAll(":", "");
  const customersGradientId = useId().replaceAll(":", "");

  const data = useMemo(() => {
    if (range === "1m") {
      return chartData.slice(-4);
    }

    if (range === "2m") {
      return chartData.slice(-8);
    }

    return chartData;
  }, [range]);

  const totalRevenue = data
    .reduce((accumulator, item) => accumulator + item.revenue, 0)
    .toLocaleString();

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardDescription>Revenue vs customer trend</CardDescription>
        <CardTitle className="text-2xl tabular-nums">${totalRevenue}</CardTitle>
        <CardAction className="flex items-center gap-2">
          <Button
            onClick={() => setRange("1m")}
            size="sm"
            type="button"
            variant={range === "1m" ? "default" : "outline"}
          >
            1M
          </Button>
          <Button
            onClick={() => setRange("2m")}
            size="sm"
            type="button"
            variant={range === "2m" ? "default" : "outline"}
          >
            2M
          </Button>
          <Button
            onClick={() => setRange("3m")}
            size="sm"
            type="button"
            variant={range === "3m" ? "default" : "outline"}
          >
            3M
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-70 w-full" config={chartConfig}>
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
            <defs>
              <linearGradient
                id={revenueGradientId}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient
                id={customersGradientId}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-customers)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-customers)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              minTickGap={28}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                })
              }
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }
                />
              }
              cursor={false}
            />
            <Area
              dataKey="revenue"
              fill={`url(#${revenueGradientId})`}
              fillOpacity={1}
              stroke="var(--color-revenue)"
              strokeWidth={2}
              type="monotone"
            />
            <Area
              dataKey="customers"
              fill={`url(#${customersGradientId})`}
              fillOpacity={1}
              stroke="var(--color-customers)"
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function DashboardCards() {
  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="font-semibold text-2xl tabular-nums">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="font-semibold text-2xl tabular-nums">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>

      <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="font-semibold text-2xl tabular-nums">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>

      <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="font-semibold text-2xl tabular-nums">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}
