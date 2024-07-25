import { Modal, FocusTrap } from "@mantine/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Dropdown from "./Dropdown";
import { useForm } from "react-hook-form";
import { API, listBusinessDomain } from "../constants";
import Textarea from "./Textarea";
import axios from "../utils/axios";
import { notifyError, notifySuccess } from "../utils/toast";
import { useMemo, useState } from "react";

const businessDomains = listBusinessDomain.map((item) => {
  return {
    value: item.type,
    label: item.name,
  };
});

const BusinessDomainsModal = (props) => {
  const { opened, close, employeeId, existedDomainList } = props;
  const [isCalling, setCalling] = useState(false);

  const domainList = useMemo(() => {
    return businessDomains.filter(
      (item) => !existedDomainList.includes(item.value)
    );
  }, [businessDomains, existedDomainList]);

  const schema = yup.object({
    businessDomainId: yup.number().required(),
    note: yup.string(),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSaveAndClose = (data) => {
    handleAddDomain(data);
    close();
    resetForm();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    close();
    resetForm();
  };

  const resetForm = () => {
    setValue("businessDomainId", "");
    setValue("note", "");
  };

  const handleAddDomain = async (data) => {
    try {
      setCalling(true);
      const response = await axios.post(API.ADD_BUSINESS_DOMAIN, {
        employeeId,
        ...data,
      });
      notifySuccess(response.data.message);
    } catch (e) {
      notifyError(e.response.data.message);
    } finally {
      setCalling(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      title="Add New Business Domain"
      size="auto"
    >
      <FocusTrap.InitialFocus />
      <form>
        <Dropdown
          label="Business Domain Name"
          name="businessDomainId"
          required
          list={domainList}
          placeholder="Enter domain name"
          control={control}
        />
        <Textarea
          label="Note"
          register={register}
          name="note"
          placeholder="Input note"
          className="mt-4"
        />
        <div className="flex justify-between items-center gap-4 mt-4">
          <button
            onClick={handleSubmit(handleAddDomain)}
            className={`px-8 py-2  text-white rounded text-sm flex items-center  transition ${
              isValid && !isCalling
                ? "bg-primary active:scale-95"
                : "bg-primary/60 cursor-not-allowed"
            }`}
          >
            <img src="./save.svg" className="w-4 h-4 mr-2" />
            Save
          </button>
          <button
            onClick={handleSubmit(handleSaveAndClose)}
            className={`px-8 py-2  text-white rounded text-sm flex items-center  transition ${
              isValid && !isCalling
                ? "bg-primary active:scale-95"
                : "bg-primary/60 cursor-not-allowed"
            }`}
          >
            <img src="./save.svg" className="w-4 h-4 mr-2" />
            Save & Close
          </button>
          <button
            onClick={handleCancel}
            className="px-8 py-2 border border-[#ebedf2] rounded text-sm flex items-center active:scale-95"
          >
            <img src="./cross.svg" className="w-4 h-4 mr-2" />
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BusinessDomainsModal;
