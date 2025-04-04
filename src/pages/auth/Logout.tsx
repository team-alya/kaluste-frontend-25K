export default function Logout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("username");
}
