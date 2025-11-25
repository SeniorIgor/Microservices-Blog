export type EventType = "PostCreated" | "CommentCreated";

export interface EventItem<TData = unknown> {
  type: EventType;
  data: TData;
}
