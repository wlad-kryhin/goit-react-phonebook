import PropTypes from "prop-types";
import s from "./PhoneList.module.css";

export default function PhoneList({ list, onDelete }) {
  return (
    <ul className={s.list}>
      {list.map(({ id, name, tel }) => {
        return (
          <li key={id}>
            <p className={s.text}>{name}</p>
            <p className={s.number}>{tel}</p>
            <button
              className={s.button}
              type="button"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
PhoneList.propTypes = {
  list: PropTypes.array,
  onDelete: PropTypes.func,
};
