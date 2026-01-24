import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/features/public/components/section-title";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/_public/terms")({ head, component });

function head() {
  return {
    meta: seo({
      path: "/terms",
      title: "Terms of Service",
      description: "The terms and conditions for using TanBite services.",
    }),
  };
}

function component() {
  return (
    <section className="py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <SectionTitle
          align="left"
          description="These terms govern your access to and use of TanBite services."
          heading="Terms of Service"
          title="Legal"
        />

        <div className="space-y-8 text-muted-foreground">
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Agreement to terms
            </h2>
            <p>
              By accessing our website or using our services, you agree to these
              terms and any additional guidelines provided.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Services and scope
            </h2>
            <p>
              We provide digital strategy, design, and development services.
              Project scope, timelines, and deliverables are defined in
              proposals or statements of work.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Payments and billing
            </h2>
            <p>
              Fees, payment schedules, and refunds are outlined in your
              agreement. Late payments may pause or delay delivery.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Intellectual property
            </h2>
            <p>
              Unless otherwise stated, you retain ownership of your content and
              grant us a license to use it to deliver services. Final
              deliverables become yours upon full payment.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Limitation of liability
            </h2>
            <p>
              TanBite is not liable for indirect or consequential damages. Our
              total liability is limited to the fees paid for the service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-semibold text-foreground text-lg">
              Contact us
            </h2>
            <p>
              If you have questions about these terms, contact
              support@tanbite.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
