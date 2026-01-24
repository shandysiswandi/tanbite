import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "LinkedIn", url: "https://linkedin.com" },
      { name: "GitHub", url: "https://github.com" },
    ],
  },
];

export function RootFooter() {
  return (
    <motion.footer
      className="border-border/60 border-t bg-muted/20 pt-10 text-foreground"
      initial={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1 }}
    >
      <div className="mx-auto max-w-8xl px-6">
        <div className="flex flex-col items-start justify-between gap-10 py-10 md:flex-row">
          <div className="flex flex-col gap-5 md:w-[40%]">
            <img
              alt="logo"
              className="h-8"
              height={32}
              src="/favicon-32x32.png"
              width={32}
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              We help brands unlock their digital future. Through a powerful
              blend of insight-driven strategy, stunning design, and robust
              engineering, we create digital products that users love and that
              drive measurable, sustainable business results.
            </p>
          </div>

          <div className="flex w-full flex-wrap justify-between gap-5 md:w-[50%]">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 font-semibold text-foreground md:mb-5">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  {section.links.map((link: { name: string; url: string }) => {
                    const isExternal = section.title === "Connect";

                    return (
                      <li key={link.name}>
                        <Link
                          className="transition hover:text-foreground"
                          rel={isExternal ? "noopener" : undefined}
                          target={isExternal ? "_blank" : undefined}
                          to={link.url}
                          viewTransition={!isExternal}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="border-t py-4 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} TanBite. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
