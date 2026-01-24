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
  me: "User",
  console: "Dashboard",
};

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
  const pathWithoutLocale = `/${segments.join("/")}`;
  const isKnownConsoleRoute =
    isConsoleRoute && consoleRoutes.has(pathWithoutLocale);
  const hasUnknownSegment = isConsoleRoute && !isKnownConsoleRoute;

  if (hasUnknownSegment) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
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
      <BreadcrumbList>
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
