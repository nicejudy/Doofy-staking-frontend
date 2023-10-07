import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import { messages } from "src/constants/messages";

export const metamaskErrorWrap = (
  err: { code: ""; message: ""; data: { message: ""; data: "" } },
  dispatch: Dispatch,
) => {
  let text = messages.something_wrong;
  console.log("debug code", err.message.split("reason=")[1].split(",")[0]);

  if ((err.code && err.code === -32603) || (err.code && err.code == "UNPREDICTABLE_GAS_LIMIT")) {
    text = err.message.split("reason=")[1].split(",")[0];
  }

  if (err.code && err.code === 4001) {
    if (err.message.includes("User denied transaction signature")) {
      text = "User denied transaction signature";
    }
  }

  return toast.error(text);
};
