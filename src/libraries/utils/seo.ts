import type { AnyRouteMatch } from "@tanstack/react-router";
import { APP } from "@/libraries/constants/app";
import { getLocale } from "@/libraries/paraglide/runtime";

interface SeoProps {
  path: string;
  title: string;
  description: string;

  type?: "website" | "article" | "profile" | "product ";
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;

  keywords?: string;
  siteName?: string;
  themeColor?: string;
  twitterHandle?: string;
}

export function seo(props: SeoProps): AnyRouteMatch["meta"] {
  const image = props.image ?? APP.ogImage;
  const imageAlt = props.imageAlt ?? APP.ogImageAlt;
  const siteName = props.siteName ?? APP.siteName;
  const twitterHandle = props.twitterHandle ?? APP.twitterHandle;

  return [
    { title: props.title },
    { name: "description", content: props.description },
    {
      name: "robots",
      content: props.noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: props.noIndex ? "noindex, nofollow" : "index, follow",
    },
    //
    { property: "og:title", content: props.title },
    { property: "og:description", content: props.description },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:type", content: props.type ?? "website" },
    { property: "og:url", content: APP.siteUrl },
    { property: "og:site_name", content: siteName },
    { property: "og:locale", content: getLocale() },
    //
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: twitterHandle },
    { name: "twitter:creator", content: twitterHandle },
    { name: "twitter:title", content: props.title },
    { name: "twitter:url", content: APP.siteUrl },
    { name: "twitter:description", content: props.description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
    //
    { name: "keywords", content: props.keywords ?? APP.keywords },
    { name: "author", content: siteName },
    { name: "theme-color", content: props.themeColor ?? "#000000" },
    { name: "apple-mobile-web-app-title", content: siteName },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    { name: "application-name", content: siteName },
    { name: "format-detection", content: "telephone=no" },
    { name: "mobile-web-app-capable", content: "yes" },
  ];
}
