export interface Notification {
  id: string;
  title: string;
  message: string;
  category: string;
  time: string;
  status: "read" | "unread";
}
