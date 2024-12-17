import { memo } from "react";
import { useParams } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useGetUserByIdQuery } from "@/services/api/modules/users";
import UserForm from "@/components/UserForm";
import Loader from "@/components/Loader";
import RoleEditor from "@/components/RoleEditor";
import styles from "./styles.module.css";

function User() {
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserByIdQuery(+id!);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.pageContainer}>
      <TabGroup>
        <TabList className="bg-slate-200 flex justify-center">
          <Tab className={styles.tab}>Details</Tab>
          <Tab className={styles.tab}>Roles</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className={styles.tabContent}>
              <h1 className={styles.fullName}>
                {user?.firstName + " " + user?.lastName}
              </h1>

              <UserForm userData={user!} />
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.tabContent}>
              <RoleEditor user={user!} />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}

export default memo(User);
