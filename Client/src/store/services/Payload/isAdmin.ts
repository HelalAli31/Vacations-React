import getPayload from "./getPayload";

export default function getIsAdmin() {
  const user = getPayload();
  if (!user) return;
  const { userType } = user.data;
  if (!userType) return;
  const isAdmin = userType === "admin" ? true : false;
  return isAdmin;
}
