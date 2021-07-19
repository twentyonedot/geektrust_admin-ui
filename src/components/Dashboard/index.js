import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import Paginate from "../Paginate";
import { config } from "../../config/config";
import { FiEdit, FiSave } from "react-icons/fi";
import { IoMdCloseCircleOutline as IoClose } from "react-icons/io";
import { RiDeleteBinLine as RiDelete } from "react-icons/ri";

export default function Dashboard() {
  // Fetches the data from the api, when the component mounts
  useEffect(() => {
    performApiCall();
  }, []);

  /* State of the component */
  const [usersData, setUsersData] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const [savedUser, setSavedUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [allSelected, setAllSelected] = useState(false);

  /* Function Handlers */

  /**
   * @description Makes an api call and update the state of the usersData.
   * @returns {void}
   */
  const performApiCall = async () => {
    const response = await fetch(config.endpoint);
    let data = await response.json();
    data = data.map((user) => {
      return { ...user, editStatus: false, selected: false };
    });
    setUsersData(data);
  };

  /**
   * @description updates the editStatus of a user to true.
   * @param {*} id The id of the user that is to be edited.
   * @returns {void}
   */
  const editHandler = (id) => {
    let data = usersData.map((user) => {
      if (user.id === id) {
        return { ...user, editStatus: true };
      }
      return user;
    });
    setUsersData(data);
  };

  /**
   * @description updates the editStatus of a user to false.
   * @param {*} id The id of the user that is to be edited.
   * @returns {void}
   */
  const closeHandler = (id) => {
    let data = usersData.map((user) => {
      if (user.id === id) {
        return { ...user, editStatus: false };
      }
      return user;
    });
    setSavedUser({ name: "", email: "", role: "" });
    setUsersData(data);
  };

  /**
   * @description saves the user with the updated data.
   * @param {*} id The id of the user that is to be saved.
   * @returns {void}
   */
  const saveHandler = (id) => {
    let data = usersData.map((user) => {
      if (user.id === id) {
        return {
          id: user.id,
          name: savedUser.name ? savedUser.name : user.name,
          email: savedUser.email ? savedUser.email : user.email,
          role: savedUser.role ? savedUser.role : user.role,
          editStatus: false,
        };
      }
      return user;
    });
    setSavedUser({ name: "", email: "", role: "" });
    setUsersData(data);
  };

  /**
   * @description deletes the user, and update the state of the usersData.
   * @param {*} id The id of the user that is to be deleted.
   * @returns {void}
   */
  const deleteHandler = (id) => {
    let data = usersData.filter((user) => user.id !== id);
    setUsersData(data);
  };

  /**
   * @description update the state of the savedUser
   * @param {*} key
   * @param {*} value
   */
  const updateHandler = (key, value) => {
    setSavedUser({ ...savedUser, [key]: value });
  };

  /**
   * @description Handler function when current page changes.
   * @param {*} start
   * @param {*} end
   */
  const onPageChangeHandler = (start, end) => {
    setCurrentPageUsers({
      startIndex: start,
      endIndex: end,
    });
    setAllSelected(false);
    let data = usersData.map((val) => {
      return { ...val, selected: false };
    });
    setUsersData(data);
  };

  /**
   * @description updates the `selected` field of the usersData.
   * @param {*} event
   */
  const allSelectHandler = (event) => {
    setAllSelected(!allSelected);
    let data;
    if (event.target.checked) {
      data = usersData.map((val) => {
        if (
          val.id > currentPageUsers.startIndex &&
          val.id <= currentPageUsers.endIndex + 1
        )
          return { ...val, selected: true };
        return val;
      });
    } else {
      data = usersData.map((val) => {
        if (
          val.id > currentPageUsers.startIndex &&
          val.id <= currentPageUsers.endIndex + 1
        )
          return { ...val, selected: false };
        return val;
      });
    }
    setUsersData(data);
  };

  /**
   * @description Function handler for `Delete Selected` button.
   */
  const deleteSelectedHandler = () => {
    let data = usersData.filter((val) => !val.selected);
    setUsersData(data);
  };

  /**
   * @description toggles the selected status of a user.
   * @param {*} id The id of the user that is to be toggled.
   */
  const selectChangeHandler = (id) => {
    let data = usersData.map((user) => {
      if (user.id === id) {
        return { ...user, selected: !user.selected };
      }
      return user;
    });
    setAllSelected(false);
    setUsersData(data);
  };

  return (
    <div>
      <table className={`${styles.userTable}`}>
        <thead>
          <tr>
            <th>
              <input
                checked={allSelected}
                onChange={allSelectHandler}
                type="checkbox"
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData
            .slice(
              currentPageUsers.startIndex,
              currentPageUsers.startIndex + 10
            )
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    checked={user.selected}
                    onChange={() => {
                      selectChangeHandler(user.id);
                    }}
                    type="checkbox"
                  />
                </td>
                {/* Name */}
                <td>
                  <div
                    style={
                      user.editStatus ? { border: "1px solid black" } : null
                    }
                    contentEditable={user.editStatus}
                    onInput={(e) => updateHandler("name", e.target.value)}
                  >
                    {user.name}
                  </div>
                </td>
                {/* Email */}
                <td>
                  <div
                    style={
                      user.editStatus ? { border: "1px solid black" } : null
                    }
                    contentEditable={user.editStatus}
                    onInput={(e) => updateHandler("email", e.target.value)}
                  >
                    {user.email}
                  </div>
                </td>
                {/* Role */}
                <td>
                  <select
                    disabled={user.editStatus ? false : true}
                    defaultValue={user.role}
                    onChange={(e) => {
                      updateHandler("role", e.target.value);
                    }}
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                </td>
                {/* Actions */}
                <td>
                  {user.editStatus ? (
                    <>
                      <button onClick={() => saveHandler(user.id)}>
                        <FiSave />
                      </button>
                      <button
                        onClick={() => {
                          closeHandler(user.id);
                        }}
                      >
                        <IoClose />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        editHandler(user.id);
                      }}
                    >
                      <FiEdit />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      deleteHandler(user.id);
                    }}
                  >
                    <RiDelete />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{ display: "flex" }}>
        <button className={styles.deleteBtn}  onClick={deleteSelectedHandler}>
          Delete Selected
        </button>
        {usersData.length > 0 && (
          <Paginate
            totalItems={usersData.length}
            onPageChange={onPageChangeHandler}
          />
        )}
      </div>
    </div>
  );
}
