
// ユーザーIDを生成/取得する関数
export const getUserId = () => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('user_id', userId);
  }
  return userId;
};
