import { Agentica } from "@agentica/core";
import { openai } from "../gpt";
import typia from "typia";
import { GmailService } from "@wrtnlabs/connector-gmail";
import dotenv from "dotenv";

dotenv.config();

/**
 * Connector의 Gmail Service를 이용하여 만든 Gmail Agent입니다.
 * Agent에게 다음과 같이 발화해보세요.
 * "${내 이메일}로 이메일을 보내줘."
 * "${누구}에게 보낸 메일을 조회해줘."
 * "${누구}에게 받은 메일을 조회해줘."
 * Example.
 * "7471919@naver.com에게 메일 보내줘."
 */
export const gmailAgent = new Agentica({
  provider: {
    api: openai,
    model: "gpt-4o-mini",
    type: "chatgpt",
  },
  controllers: [
    {
      name: "Gmail Connector",
      protocol: "class",
      application: typia.llm.applicationOfValidate<GmailService, "chatgpt">(),
      execute: new GmailService({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        secret: process.env.GOOGLE_TEST_SECRET!,
      }),
    },
  ],
});
