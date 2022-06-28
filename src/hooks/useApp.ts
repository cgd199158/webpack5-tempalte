export type actionType = 'back' | 'loginOut' | 'toast' | 'home';

export default function () {
  /**
   * 像app传递消息
   * @param type 消息类型
   * @param params 传递的参数
   * @returns void
   */
  const postMessage = (type: actionType, params: Record<string, any>) => {
    if (typeof type !== 'string') return;
    console.log('传递消息', type, params);
  };

  return { postMessage };
}
