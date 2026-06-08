import { attendanceList } from "@/lib/actions/actions";


export const presentStud = () => {
    const { trigger } = attendanceList();
    const getList = async (sessionId: any) => {
        const res = await trigger({ sessionId });
        return res;
    };

    return { getList };
};



