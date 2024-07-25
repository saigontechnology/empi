import Badge from "../components/Badge";
import MultiSelect from "../components/MultiSelect";
import {
  API,
  listAdditionalSkill,
  listBusinessDomain,
  TYPE,
} from "../constants";

import { useDisclosure } from "@mantine/hooks";
import AdditionalSkillsModal from "../components/AdditionalSkillsModal";
import BusinessDomainsModal from "../components/BusinessDomainsModal";
import { useState } from "react";
import { useMemo } from "react";
import DeleteModal from "../components/DeleteModal";
import { useEffect } from "react";
import axios from "../utils/axios";
import { notifyError } from "../utils/toast";

const levelBgColor = {
  Beginner: "bg-green-200",
  Intermediate: "bg-yellow-200",
  Advanced: "bg-orange-300",
};

const additionalSkills = listAdditionalSkill.map((item) => {
  return {
    value: item.type,
    label: item.name,
  };
});

const businessDomains = listBusinessDomain.map((item) => {
  return {
    value: item.type,
    label: item.name,
  };
});

export default function Home() {
  const [openedSkill, { open: openSkill, close: closeSkill }] =
    useDisclosure(false);
  const [openedDomain, { open: openDomain, close: closeDomain }] =
    useDisclosure(false);
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const [employeeList, setEmployeeList] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [existedSkillList, setExistedSkillList] = useState([]);
  const [existedDomainList, setExistedDomainList] = useState([]);
  const [filterSkills, setFilterSkills] = useState([]);
  const [filterDomains, setFilterDomains] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteType, setDeleteType] = useState(null);
  const [skillId, setSkillId] = useState(null);
  const [skillName, setSkillName] = useState("");

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async () => {
    try {
      const response = await axios.get(API.GET_EMPLOYEE_LIST);
      setEmployeeList(response.data);
    } catch (e) {
      notifyError(e.response.data.message);
    }
  };

  const openModal = (modal, id, list) => {
    console.log(filterSkills, filterDomains);
    setEmployeeId(id);

    switch (modal) {
      case "skill":
        openSkill();
        setExistedSkillList(list.map((item) => item.additionalSkillId));
        break;
      case "domain":
        openDomain();
        setExistedDomainList(list.map((item) => item.businessDomainId));
        break;
      default:
        openSkill();
    }
  };

  const empList = useMemo(() => {
    return employeeList.filter((item) => {
      const empSkillList = item.additionalSkills.map(
        (empSk) => empSk.additionalSkillId
      );
      const empDomainList = item.businessDomains.map(
        (empDm) => empDm.businessDomainId
      );
      return !filterSkills.length && !filterDomains.length && !search
        ? employeeList
        : filterSkills.every((filterSk) => empSkillList.includes(filterSk)) &&
            filterDomains.every((filterDm) =>
              empDomainList.includes(filterDm)
            ) &&
            item.empCode.toLowerCase().includes(search.toLowerCase());
    });
  }, [employeeList, filterDomains, filterSkills, search]);

  const handleSetFilterSkills = (data) => {
    setFilterSkills(data.map((item) => item.value));
  };

  const handleSetFilterDomains = (data) => {
    setFilterDomains(data.map((item) => item.value));
  };

  const handleOpenDelete = (id, label, type) => {
    setDeleteType(type);
    setSkillId(id);
    setSkillName(label);
    openDelete();
  };

  return (
    <>
      <div className="container p-8">
        <div className="text-xl font-medium">Employee List</div>
        <div className="py-6 bg-white shadow mt-8">
          <div className="grid grid-cols-3 gap-4 px-4">
            <div>
              <input
                type="text"
                className="w-full rounded border border-[#ebedf2] px-2 py-2 text-sm outline-[#2684ff] placeholder:font-light placeholder:text-[#BFC3C7]"
                placeholder="Emp code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <MultiSelect
              placeholder="Additional Skills"
              list={additionalSkills}
              onChange={handleSetFilterSkills}
              defaultValue={filterSkills}
            />
            <MultiSelect
              placeholder="Business Domains"
              list={businessDomains}
              onChange={handleSetFilterDomains}
              defaultValue={filterDomains}
            />
          </div>
          <div className="grid grid-cols-9 bg-[#F5F4F8] mt-6 border-b border-[#f4f5f8]">
            <div className="p-4 text-center text-sm font-medium">Emp Code</div>
            <div className="p-4 col-span-2 text-center font-medium  text-sm">
              Primary Skills
            </div>
            <div className="p-4 col-span-3 text-center font-medium text-sm">
              Additional Skills
            </div>
            <div className="p-4 col-span-3 text-center font-medium text-sm">
              Business Domains
            </div>
          </div>
          {empList.map((emp) => {
            return (
              <div
                className="grid grid-cols-9 even:bg-[#F8F9FA] odd:bg-white items-center border-b border-[#f4f5f8]"
                key={emp.empCode}
              >
                <div className="p-4 text-center text-sm">{emp.empCode}</div>
                <div className="p-4 col-span-2">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {emp.primarySkills.map((skill) => {
                      return (
                        <Badge
                          backgroundColor={levelBgColor[skill.proficiencyName]}
                          label={skill.skillName}
                          key={skill.skillId}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="p-4 col-span-3">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {emp.additionalSkills.map((skill) => {
                      return (
                        <Badge
                          backgroundColor={levelBgColor[skill.proficiencyName]}
                          label={skill.additionalSkillName}
                          key={skill.additionalSkillId}
                          id={skill.id}
                          hasDelete
                          onDelete={(id, label) =>
                            handleOpenDelete(id, label, TYPE.ADDITIONAL_SKILL)
                          }
                        />
                      );
                    })}
                    <div
                      className="h-7 w-7 bg-primary flex items-center justify-center cursor-pointer rounded-lg"
                      onClick={() =>
                        openModal("skill", emp.id, emp.additionalSkills)
                      }
                    >
                      <img src="./plus.svg" className="w-4 h-4" alt="plus" />
                    </div>
                  </div>
                </div>
                <div className="p-4 col-span-3">
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {emp.businessDomains.map((domain) => {
                      return (
                        <Badge
                          label={domain.businessDomainName}
                          key={domain.businessDomainId}
                          id={domain.id}
                          hasDelete
                          onDelete={(id, label) =>
                            handleOpenDelete(id, label, TYPE.BUSINESS_DOMAIN)
                          }
                        />
                      );
                    })}
                    <div
                      className="h-7 w-7 bg-primary flex items-center justify-center cursor-pointer rounded-lg"
                      onClick={() =>
                        openModal("domain", emp.id, emp.businessDomains)
                      }
                    >
                      <img src="./plus.svg" className="w-4 h-4" alt="plus" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AdditionalSkillsModal
        opened={openedSkill}
        close={closeSkill}
        employeeId={employeeId}
        existedSkillList={existedSkillList}
        onChange={getEmployeeList}
      />
      <BusinessDomainsModal
        opened={openedDomain}
        close={closeDomain}
        employeeId={employeeId}
        existedDomainList={existedDomainList}
        onChange={getEmployeeList}
      />
      <DeleteModal
        opened={openedDelete}
        close={closeDelete}
        type={deleteType}
        employeeId={employeeId}
        skillId={skillId}
        skillName={skillName}
        onChange={getEmployeeList}
      />
    </>
  );
}
