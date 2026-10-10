import { Avatar, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { testimonials } from "@/constants/constants";

export function Testimonials() {
  return (
    <section className="mt-24">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          What our users say
        </h2>
        <p className="max-w-2xl text-lg text-muted">
          Thousands of candidates have used Prep to prepare smarter and
          interview with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.user.name}>
            <Card.Header>
              <div className="flex items-center gap-4">
                <Avatar>
                  <Avatar.Image
                    src={testimonial.user.avatar}
                    alt={testimonial.user.name}
                  />
                  <Avatar.Fallback>
                    {testimonial.user.name.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col">
                  <Card.Title>{testimonial.user.name}</Card.Title>
                  <Card.Description>{testimonial.title}</Card.Description>
                </div>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      icon="solar:star-bold"
                      className={
                        i + 1 <= testimonial.rating
                          ? "text-warning"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-muted">{testimonial.content}</p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </section>
  );
}
