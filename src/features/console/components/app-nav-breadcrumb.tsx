import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { type Locale, locales } from "@/libraries/paraglide/runtime";

const ROUTE_LABELS: Record<string, string> = {
  feature1: "Feature 1",
  feature2: "Feature 2",
  page1: "Page 1",
  page2: "Page 2",
  console: "Dashboard",
};

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

function matchesRoutePath(pathname: string, routePath: string) {
  const normalizedPathname = normalizePath(pathname);
  const normalizedRoutePath = normalizePath(routePath);

  const pathnameSegments = normalizedPathname.split("/").filter(Boolean);
  const routeSegments = normalizedRoutePath.split("/").filter(Boolean);

  if (pathnameSegments.length !== routeSegments.length) {
    return false;
  }

  for (const [index, routeSegment] of routeSegments.entries()) {
    const pathnameSegment = pathnameSegments[index];

    if (routeSegment.startsWith("$")) {
      continue;
    }

    if (pathnameSegment !== routeSegment) {
      return false;
    }
  }

  return true;
}

export function AppNavBreadcrumb() {
  const { pathname } = useLocation();
  const router = useRouter();

  const consoleRoutes = new Set(
    Object.keys(router.routesByPath ?? {}).filter((path) =>
      path.startsWith("/console")
    )
  );

  const allSegments = pathname.split("/").filter(Boolean);
  const isLocale = locales.includes(allSegments[0] as Locale);
  const segments = isLocale ? allSegments.slice(1) : allSegments;

  const isConsoleRoute = segments[0] === "console";
  const pathWithoutLocale = normalizePath(`/${segments.join("/")}`);
  const isKnownConsoleRoute =
    isConsoleRoute &&
    Array.from(consoleRoutes).some((routePath) =>
      matchesRoutePath(pathWithoutLocale, routePath)
    );
  const hasUnknownSegment = isConsoleRoute && !isKnownConsoleRoute;

  if (hasUnknownSegment) {
    return (
      <Breadcrumb>
        <BreadcrumbList className="text-xs">
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link to="/console" viewTransition>
                Console
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Not found</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const pathSection = segments.slice(0, index + 1).join("/");
          const to = `/${pathSection}`;

          const title =
            ROUTE_LABELS[segment] ||
            segment.charAt(0).toUpperCase() +
              segment.slice(1).replace(/-/g, " ");

          return (
            <Fragment key={pathSection}>
              <BreadcrumbItem className={isLast ? "block" : "hidden md:block"}>
                {isLast ? (
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to} viewTransition>
                      {title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
