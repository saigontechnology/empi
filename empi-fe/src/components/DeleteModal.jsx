import { Modal, FocusTrap } from "@mantine/core";
import { useState } from "react";
import { API, TYPE } from "../constants";
import axios from "../utils/axios";
import { notifyError, notifySuccess } from "../utils/toast";

const DeleteModal = (props) => {
  const { opened, close, type, skillId, skillName } = props;
  const [isCalling, setCalling] = useState(false);

  const handleDelete = async () => {
    try {
      setCalling(true);
      const url =
        type === TYPE.ADDITIONAL_SKILL
          ? API.DELETE_ADDTIONAL_SKILL
          : API.DELETE_BUSINESS_DOMAIN;
      const response = await axios.delete(`${url}/${skillId}`);
      notifySuccess(response.data.message);
    } catch (e) {
      notifyError(e.response.data.message);
    } finally {
      setCalling(false);
    }
  };

  const handleCancel = () => {
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      withCloseButton={false}
      size="auto"
    >
      <FocusTrap.InitialFocus />
      <div className="text-center px-4 py-2">
        <div className="text-sm ">
          <span className="font-semibold">{skillName}</span> will be deleted!
        </div>
        <div className="mt-1 text-sm ">
          Are you sure you want to delete this item?
        </div>
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={handleDelete}
            className={`px-8 py-2  text-white rounded text-sm flex items-center ${
              isCalling
                ? "bg-red-500/60 cursor-not-allowed"
                : "bg-red-500 active:scale-95"
            }`}
          >
            <img src="./bin.svg" className="w-4 h-4 mr-2" />
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="px-8 py-2 border border-[#ebedf2] rounded text-sm flex items-center active:scale-95"
          >
            <img src="./cross.svg" className="w-4 h-4 mr-2" />
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
