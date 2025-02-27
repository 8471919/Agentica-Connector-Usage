import { Agentica } from "@agentica/core";
import { openai } from "../gpt";
import typia from "typia";
import dotenv from "dotenv";
import { GmailService } from "@wrtnlabs/connector-gmail";
import { KakaoMapService } from "@wrtnlabs/connector-kakao-map";

dotenv.config();

/**
 * Gmail과 Kakao Map을 동시에 사용하는 Multi Agent입니다.
 * Agentica의 Controllers에 두 가지의 Tool(Connector)를 꽂아서 사용합니다.
 * Agent에게 다음과 같이 발화해보세요.
 * "${주소}에 있는 맛집을 찾아서 내 메일로 보내줘."
 * Example.
 * "강남역 근처 맛집을 찾아서 내 메일로 보내줘."
 * "내 이메일은 7471919@naver.com이야."
 * "이메일 제목과 내용은 알아서 작성해줘."
 */
export const multiAgent = new Agentica({
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
    {
      name: "Kakao Map Connector",
      protocol: "class",
      application: typia.llm.applicationOfValidate<
        KakaoMapService,
        "chatgpt"
      >(),
      execute: new KakaoMapService({
        clientId: process.env.KAKAO_TALK_CLIENT_ID!,
      }),
    },
  ],
});
