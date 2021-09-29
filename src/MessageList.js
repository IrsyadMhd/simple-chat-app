import MessageItem from "./MessageItem";

const MessageList = ({ items, user }) => {
  return (
    <ul>
      {items.map((item) => (
        <MessageItem key={Math.random()} item={item} user={user} />
      ))}
    </ul>
  );
};

export default MessageList;
