import { Agentica } from "@agentica/core";
import { openai } from "../gpt";
import typia from "typia";
import { KakaoMapService } from "@wrtnlabs/connector-kakao-map";
import dotenv from "dotenv";

dotenv.config();

/**
 * Connector의 Kakao Map Service를 이용하여 만든 Kakao Map Agent입니다.
 * Agent에게 다음과 같이 발화해보세요.
 * "${주소}에 있는 맛집을 찾아줘."
 * "${주소}에 있는 카페를 찾아줘."
 * "${주소}에 있는 대형마트를 찾아줘."
 * Example.
 * "강남역 근처 맛집 찾아줘."
 */
export const kakaoMapAgent = new Agentica({
  provider: {
    api: openai,
    model: "gpt-4o-mini",
    type: "chatgpt",
  },
  controllers: [
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
