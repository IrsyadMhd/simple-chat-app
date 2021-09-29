import classes from "./MessageItem.module.css";

const MessageItem = ({ item, user }) => {
  const classNm = user === item.username ? "own_user" : "";

  return (
    <li className={`${classes.message__item} ${classes[classNm]}`}>
      {user !== item.username && (
        <p className={classes.username}>{item.username}</p>
      )}
      <p className={classes.message}>{item.message}</p>
    </li>
  );
};

export default MessageItem;
