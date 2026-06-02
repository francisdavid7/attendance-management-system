
import { startSession } from "@/lib/actions/actions";

export const useAttendance = () => {
    const { trigger, isMutating, error } = startSession();

    const attendance = async (id: string) => {
        try {
            return await trigger({
                courseId: id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return {
        attendance,
        isMutating,
        error,
    };
};