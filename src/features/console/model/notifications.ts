export interface Notification {
  category: string;
  id: string;
  message: string;
  status: "read" | "unread";
  time: string;
  title: string;
}
