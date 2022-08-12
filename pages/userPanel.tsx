import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserContext } from "../components/ContextProvider";
import FamilyInfo from "../components/FamilyInfo";
import { StyledUserPanel } from "../styles/UserPanel.styled";
import { Family } from "../interfaces/family";
import { getCookie } from "../common/cookies";
import { InputField } from "../components/InputField";

const userPanel = () => {
  const [familyData, setFamilyData] = useState<Family>();
  const [screen, setScreen] = useState(0);
  const [expense, setExpense] = useState(0);
  const router = useRouter();
  const user = useUserContext();
  const FetchFamily = () => {
    if (document.cookie !== null) {
      var value = getCookie("token");
      fetch("http://localhost:3000/family/data", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + value,
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: "same-origin",
      })
        .then((res) => res.json())
        .then((response) => {
          setFamilyData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (familyData !== null) {
    }
  }, [familyData]);

  useEffect(() => {
    if (user == null) {
      router.replace("/");
    }

    FetchFamily();
  }, [user]);

  if (familyData !== null)
    return (
      <StyledUserPanel>
        <FamilyInfo Family={familyData} />
        <InputField callbackFunction={setExpense} inputName={"Set expense"} />
      </StyledUserPanel>
    );
  if (familyData === null) {
    return (
      <div>
        <button
          onClick={() => {
            router.replace('/JoinFamily')
          }}
        >
          Join a family
        </button>
        <button
          onClick={() => {
            router.replace('/CreateFamily');
          }}
        >
          Create a family
        </button>
      </div>
    );
  }
};

export default userPanel;
