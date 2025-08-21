import React, { useEffect } from "react";
import BaseLayout from "../components/layout/BaseLayout";
import SidebarLayout from "../components/layout/SidebarLayout";
import GroupList from "../components/GroupList";
import { useGroupStore } from "../store/useGroupStore";
import NoChatSelected from "../components/skelton/NoChatSelected";
import GroupChatContainer from "../components/groupChat/GroupChatContainer";
import { useChatStore } from "../store/useChatStore";

const Group = () => {
  const { groups, selectedGroup, setSelectedGroup, getGroups, createGroup } =
    useGroupStore();
  const { users, getUsers } = useChatStore();

  useEffect(() => {
    getUsers();
    getGroups();
  }, [getUsers, getGroups]);

  return (
    <BaseLayout
      // sidebar
      sidebar={
        <SidebarLayout
          content={
            <GroupList
              groups={groups}
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              allUsers={users}
              createGroup={createGroup}
            />
          }
        />
      }
      // content
      content={!selectedGroup ? <NoChatSelected /> : <GroupChatContainer />}
    />
  );
};

export default Group;
