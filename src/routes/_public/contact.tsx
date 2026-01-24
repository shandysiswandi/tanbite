import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "@/features/public/components/section-title";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_public/contact")({ head, component });

function head() {
  return {
    meta: seo({
      path: "/contact",
      title: "Contact",
      description: "Get in touch with the TanBite team.",
    }),
  };
}

function component() {
  return (
    <section className="py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <SectionTitle
          align="left"
          description="Tell us about your goals. We will respond within 1-2 business days."
          heading="Contact"
          title="Let's talk"
        />

        <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <form className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Full name" type="text" />
              <Input placeholder="Email address" type="email" />
            </div>
            <Input placeholder="Company or product" type="text" />
            <Textarea
              className="min-h-32"
              placeholder="Tell us about your project"
              rows={5}
            />
            <Button type="submit" variant="default">
              Send message
            </Button>
          </form>
        </div>

        <div className="text-muted-foreground text-sm">
          Prefer email? Reach us at <strong>support@tanbite.com</strong>
        </div>
      </div>
    </section>
  );
}
