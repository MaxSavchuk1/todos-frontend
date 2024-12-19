import { memo } from "react";
import { useParams } from "react-router-dom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useGetUserByIdQuery } from "@/services/api/modules/users";
import UserForm from "@/components/UserForm";
import Loader from "@/components/Loader";
import RoleEditor from "@/components/RoleEditor";
import styles from "./styles.module.css";
import useAuth from "@/hooks/useAuth";
import TodoCard from "@/components/TodoCard";
import TodoDialog from "@/components/TodoDialog";
import Alert from "@/components/ui/Alert";

function User() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const { data: user, isLoading } = useGetUserByIdQuery(+id!);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.pageContainer}>
      <TabGroup>
        <TabList className="bg-slate-200 flex justify-center">
          <Tab className={styles.tab}>Details</Tab>
          <Tab className={styles.tab}>Assigned tasks</Tab>
          {isAdmin && <Tab className={styles.tab}>Roles</Tab>}
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
              {user?.todos?.length ? (
                <>
                  <Alert type="info">You can only view todos</Alert>

                  <div className="w-full flex flex-col gap-1">
                    {(user?.todos || []).map((todo) => (
                      <TodoCard key={todo.id} todo={todo} minified />
                    ))}
                  </div>

                  <TodoDialog allowEdit={false} />
                </>
              ) : (
                <div>No tasks</div>
              )}
            </div>
          </TabPanel>

          {isAdmin && (
            <TabPanel>
              <div className={styles.tabContent}>
                <RoleEditor user={user!} />
              </div>
            </TabPanel>
          )}
        </TabPanels>
      </TabGroup>
    </div>
  );
}

export default memo(User);
