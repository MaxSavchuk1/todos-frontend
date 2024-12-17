import UserForm from "@/components/UserForm";
import styles from "./styles.module.css";
import { useGetProfileQuery } from "@/services/api/modules/users";

export default function Profile() {
  const { data: userData } = useGetProfileQuery();

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <UserForm userData={userData!} />
    </div>
  );
}
