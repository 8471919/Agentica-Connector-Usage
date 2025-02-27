import readline from "readline";
import { handmadeAgent } from "./agents/handmadeAgent";
import { gmailAgent } from "./agents/gmailAgent";
import { kakaoMapAgent } from "./agents/kakaoMapAgent";
import { multiAgent } from "./agents/multiAgent";
import { goalAgent } from "./agents/goalAgent";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  const handmade = () => {
    rl.question(
      "Handmade Agent > 발화를 입력해주세요 (나가시려면 exit을 입력해주세요) : ",
      async (input) => {
        if (input.trim().toLowerCase() === "exit") {
          console.log("대화를 종료합니다.");
          select();
          return;
        }

        const answer = await handmadeAgent.conversate(input);
        answer.forEach((el) => {
          console.log(JSON.stringify(el, null, 2));
        });

        handmade(); // 다시 질문 받기
      }
    );
  };

  const gmail = () => {
    rl.question(
      "Gmail Agent > 발화를 입력해주세요 (나가시려면 exit을 입력해주세요) : ",
      async (input) => {
        if (input.trim().toLowerCase() === "exit") {
          console.log("대화를 종료합니다.");
          select();
          return;
        }

        const answer = await gmailAgent.conversate(input);
        answer.forEach((el) => {
          console.log(JSON.stringify(el, null, 2));
        });

        gmail();
      }
    );
  };

  const kakaoMap = () => {
    rl.question(
      "Kakao Map Agent > 발화를 입력해주세요 (나가시려면 exit을 입력해주세요) : ",
      async (input) => {
        if (input.trim().toLowerCase() === "exit") {
          console.log("대화를 종료합니다.");
          select();
          return;
        }

        const answer = await kakaoMapAgent.conversate(input);
        answer.forEach((el) => {
          console.log(JSON.stringify(el, null, 2));
        });

        kakaoMap();
      }
    );
  };

  const multi = () => {
    rl.question(
      "Multi Agent > 발화를 입력해주세요 (나가시려면 exit을 입력해주세요) : ",
      async (input) => {
        if (input.trim().toLowerCase() === "exit") {
          console.log("대화를 종료합니다.");
          select();
          return;
        }

        const answer = await multiAgent.conversate(input);
        answer.forEach((el) => {
          console.log(JSON.stringify(el, null, 2));
        });

        multi();
      }
    );
  };

  const goal = () => {
    rl.question(
      "Goal Agent > 발화를 입력해주세요 (나가시려면 exit을 입력해주세요) : ",
      async (input) => {
        if (input.trim().toLowerCase() === "exit") {
          console.log("대화를 종료합니다.");
          select();
          return;
        }

        const answer = await goalAgent.conversate(input);
        answer.forEach((el) => {
          console.log(JSON.stringify(el, null, 2));
        });

        goal();
      }
    );
  };

  const select = () => {
    rl.question(
      "1. 직접 구현한 컨트롤러 사용하기 (handmade) \n2. Gmail Connector 사용하기 (gmail) \n3. Kakao Map Connector 사용하기 (kakaoMap) \n4. Multi Agent 사용하기 (multi) \n5. 종료 (exit) : ",
      (input) => {
        if (input === "1") {
          handmade();
        } else if (input === "2") {
          gmail();
        } else if (input === "3") {
          kakaoMap();
        } else if (input === "4") {
          multi();
        } else if (input === "5") {
          console.log("대화를 종료합니다.");
          rl.close();
          return;
        } else if (input === "6") {
          goal();
        } else {
          console.log("대화를 종료합니다.");
          rl.close();
          return;
        }
      }
    );
  };

  select();
}

main()
  .then()
  .catch((e) => {
    console.error(e);
    throw e;
  });
