import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppShell } from "./App";
import { TREATMENTS } from "./treatmentsData";

const SITE_URL = "https://serenedentalwhitefield.com";

const homepageSeo = {
  title: "Dental Clinic in Whitefield, Bangalore | Serene Dentistry",
  description:
    "Serene Dentistry is a modern dental clinic in Whitefield, Bangalore offering root canal treatment, implants, braces, clear aligners, cosmetic and family dentistry. Book an appointment today.",
  keywords: [
    "dentist",
    "dental clinic",
    "cosmetic dentistry",
    "dental implants",
    "orthodontics",
    "smile makeover",
  ],
};

export function getRoutes() {
  return [
    "/",
    ...TREATMENTS.map((treatment) => `/treatments/${treatment.slug}`),
  ];
}

export function getRouteSeo(route: string) {
  if (route === "/") return { ...homepageSeo, treatment: null };

  const slug = route.replace(/^\/treatments\//, "");
  const treatment = TREATMENTS.find((item) => item.slug === slug);
  if (!treatment) throw new Error(`Unknown prerender route: ${route}`);

  return {
    title: treatment.metaTitle,
    description: treatment.metaDescription,
    keywords: treatment.keywords,
    treatment,
  };
}

export function renderRoute(route: string) {
  return renderToString(
    <StaticRouter location={route}>
      <AppShell />
    </StaticRouter>,
  );
}

export { SITE_URL };
