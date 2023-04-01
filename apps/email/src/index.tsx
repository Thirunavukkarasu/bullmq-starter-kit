import { ReactElement } from "react";
import React from "react";
import { Resend } from "resend";
import { z } from "zod";
import WelcomeEmail from "../emails/welcome";

export const DeliverEmailSchema = z
  .discriminatedUnion("email", [
    z.object({
      email: z.literal("welcome"),

      name: z.string().optional(),
    }),
  ])
  .and(z.object({ to: z.string() }));

export type DeliverEmail = z.infer<typeof DeliverEmailSchema>;

export class EmailClient {
  #client: Resend;
  #imagesBaseUrl: string;
  #from: string;
  #replyTo: string;

  constructor(config: {
    apikey: string;
    imagesBaseUrl: string;
    from: string;
    replyTo: string;
  }) {
    this.#client = new Resend(config.apikey);
    this.#imagesBaseUrl = config.imagesBaseUrl;
    this.#from = config.from;
    this.#replyTo = config.replyTo;
  }

  async send(data: DeliverEmail) {
    console.log("Send email", data);

    return this.#sendEmail({
      to: data.to,
      subject: "✨ Welcome to Trigger.dev!",
      react: <WelcomeEmail />,
    });
  }

  #getTemplate(data: DeliverEmail): {
    subject: string;
    component: ReactElement;
  } {
    switch (data.email) {
      case "welcome":
        return {
          subject: "✨ Welcome to Trigger.dev!",
          component: <WelcomeEmail />,
        };
    }
  }

  async #sendEmail({
    to,
    subject,
    react,
  }: {
    to: string;
    subject: string;
    react: ReactElement;
  }) {
    await this.#client.sendEmail({
      from: this.#from,
      to,
      reply_to: this.#replyTo,
      subject,
      react,
    });
  }
}
