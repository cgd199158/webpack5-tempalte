import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";
interface IUserInfo {
  userId: string;
}
const token = useLocalStorage("token", "");
export default function () {
  const userInfo = ref<undefined | Record<string, any>>(); // 用户信息

  const getUserInfo = (): IUserInfo => {
    return {
      userId: "1",
    };
  };

  /**
   * 获取token
   * @returns token string
   */
  const getToken = (): string => {
    return token.value;
  };

  /**
   * 设置token
   * @param data token
   */
  const setToken = (data: string) => {
    token.value = data;
  };

  /**
   * 退出登录
   */
  const loginOut = () => {
    console.log("退出登录");
  };

  return {
    setToken,
    getToken,
    userInfo,
    getUserInfo,
    loginOut,
  };
}
