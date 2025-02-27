import typia from "typia";
import { Handmade } from "../tools/handmade";
import { openai } from "../gpt";
import { Agentica } from "@agentica/core";

/**
 * 직접 구현한 클래스를 사용하는 Agent입니다.
 * 해당 클래스는 src/tools/handmade.ts 파일에 있습니다.
 * Agent에게 다음과 같이 발화해보세요.
 * "내 이메일을 알려줘."
 * "내 이메일을 변경해줘."
 * Example.
 * "7471919@naver.com으로 이메일을 변경해줘."
 */
export const handmadeAgent = new Agentica({
  provider: {
    api: openai,
    model: "gpt-4o-mini",
    type: "chatgpt",
  },
  controllers: [
    {
      // 컨트롤러의 이름을 설정합니다. 아무렇게나 지어주셔도 됩니다.
      name: "Gmail Connector",

      // Protocol을 class로 설정하여, class의 method들을 call 하도록 설정.
      protocol: "class",

      /**
       * application에는 function들의 openapi schema 정의가 들어가야합니다.
       * typia.llm.applicationOfValidate<Class or Interface>() 함수를 사용하여,
       * function들의 openapi schema 정의를 생성할 수 있습니다. (자동으로 생성해줍니다)
       */
      application: typia.llm.applicationOfValidate<Handmade, "chatgpt">(),

      /**
       * 해당 부분에는 application에 정의한 function들의 실제 구현부가 들어가야합니다.
       * 여기서는 protocol이 class이므로 Class의 구현체가 들어가야합니다.
       * Handmade 클래스는 직접 구현한 클래스입니다.
       */
      execute: new Handmade(),
    },
  ],
});
