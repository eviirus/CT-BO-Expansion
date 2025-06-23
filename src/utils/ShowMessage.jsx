import { message } from "antd";

export const ShowMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showError = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const showSuccess = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const showInfo = (msg) => {
    messageApi.open({
      type: "info",
      content: msg,
    });
  };

  return {
    contextHolder,
    showError,
    showSuccess,
    showInfo,
  };
};
