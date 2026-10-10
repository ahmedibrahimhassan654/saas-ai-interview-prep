import { FeatureCard } from "./feature-card";

const steps = [
  {
    icon: "solar:document-add-linear",
    title: "Generate Questions",
    description:
      "Create tailored interview questions based on your field of expertise.",
  },
  {
    icon: "solar:chat-round-dots-linear",
    title: "Answer Assistance",
    description:
      "Get real-time hints and suggested answers while you practice.",
  },
  {
    icon: "solar:chart-2-linear",
    title: "Analyze & Improve",
    description:
      "Review detailed feedback and track your progress over time.",
  },
];

export function InterviewProcess() {
  return (
    <section className="mt-24">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Trusted Process
        </h2>
        <p className="max-w-2xl text-lg text-muted">
          Three simple steps to turn practice into offers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <FeatureCard
            key={step.title}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
