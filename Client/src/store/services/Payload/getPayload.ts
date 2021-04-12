export default function getPayload() {
  const token = localStorage.getItem("token");
  let payload;
  if (token) {
    try {
      payload = token.split(".")[1];
      payload = JSON.parse(atob(payload));
      return payload;
    } catch (error) {
      console.log(error);
      if (payload == undefined) {
        localStorage.removeItem("token");
      }
    }
  }
}
