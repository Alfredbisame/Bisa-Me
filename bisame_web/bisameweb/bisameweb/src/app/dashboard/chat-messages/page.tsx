import DashboardSideBar from "@/app/components/DashboardSideBar/DashboardSideBar";
import Messages from "../../Messages/Messages";
import ChatContextProvider from "@/app/Messages/context/ChatContext";
import { BottomNavigation } from "@/app/components/BottomNavigation";

// Automatically revalidate my chat messages after a period of 1 second
export const revalidate = 1; // Telling next js to revalidate my page every second to get fresh data

const MessagePage = () => {
  return (
    <>
      <div className="flex flex-row md:gap-8 p-3 sm:px-5 md:px-8 lg:px-16 xl:px-24 2xl:px-56 gap-2 relative ">
        <DashboardSideBar />
        <div className="flex-1 w-full md:my-5">
          <ChatContextProvider>
            <Messages />
          </ChatContextProvider>
        </div>
      </div>
      <BottomNavigation activeTab="my-bisame" />
    </>
  );
};

export default MessagePage;
