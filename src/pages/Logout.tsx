export default function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}
