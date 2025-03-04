import { Agentica } from "@agentica/core";
import { openai } from "../gpt";
import dotenv from "dotenv";
import typia from "typia";
import { GmailService } from "@wrtnlabs/connector-gmail";
import { Handmade } from "../tools/handmade";
import {
  IKakaoMapService,
  KakaoMapService,
} from "@wrtnlabs/connector-kakao-map";

dotenv.config();

export class KService extends KakaoMapService {
  constructor(props: IKakaoMapService.IProps) {
    super(props);
  }

  /**
   * KakaoMap
   */
  async searchByKeyword(input: IKakaoMapService.SearchByKeywordInput) {
    const result = await super.searchByKeyword(input);
    return result;
  }
}

const a = typia.llm.applicationOfValidate<KService, "chatgpt">();
a;

/**
 * 최종적으로 만들어야 하는 Agent입니다.
 * 해당 Agent는 다음과 같은 대화를 할 수 있어야 합니다.
 * "내 이메일을 알려줘."
 * "내 이메일을 변경해줘."
 * "강남역 근처 맛집을 찾아서 내 메일로 보내줘."
 * Example.
 * "내 이메일을 7471919@naver.com으로 변경해줘."
 * "강남역 근처 맛집을 찾아서 내 메일로 보내줘."
 * "메일 내용은 알아서 작성해줘."
 */
export const goalAgent = new Agentica({
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
    {
      name: "Handmade Agent",
      protocol: "class",
      application: typia.llm.applicationOfValidate<Handmade, "chatgpt">(),
      execute: new Handmade(),
    },
  ],
});
